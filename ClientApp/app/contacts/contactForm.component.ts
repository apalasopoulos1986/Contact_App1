import { Component, Input } from '@angular/core';
import { DBOperation } from '../../shared/Enums/DBOperation';
import { Contact } from '../../shared/Models/contact';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DataService } from '../../shared/Services/dataService';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { PostContactRequest } from '../../shared/Models/postContactRequest';


@Component({
    selector: 'app-contactForm',
    templateUrl: './contactForm.component.html'
})

export class ContactFormComponent {
    @Input() dbops: DBOperation;
    @Input() modalTitle: string;
    @Input() modalBtnTitle: string;
    @Input() contact: Contact;

    msg: string;
    indLoading = false;
    contactFrm: FormGroup;

    constructor(private fb: FormBuilder,
        private data: DataService,
        public activeModal: NgbActiveModal) { }

    ngOnInit() {
        // built reactive contact form
        //add client side validators
        this.contactFrm = this.fb.group({

            id: [''],
            name: ['', Validators.required],
            surname: ['', Validators.required],
            email: ['', [Validators.required, Validators.email]],
            address: [''],
            fixedPhone: [''],
            mobilePhone: ['',Validators.required]
            
        });
        
        //load form initial data
        if (this.dbops === DBOperation.create) {
            this.contactFrm.reset();
        } else {
            this.contactFrm.setValue(this.contact);
        }
        this.SetControlsState(this.dbops === DBOperation.delete ? false : true);
    }
    
    
    
    onSubmit(formData: any) {
        const contactId = this.getContactId(formData.value);
        switch (this.dbops) {
            case DBOperation.create:
               
                const contactDataInsert = this.mapDataForInsert(formData.value);
                this.data.postContact(contactDataInsert).subscribe(
                    success => {
                        // Success
                        if (success) {
                            this.activeModal.close('success');
                        } else {
                            this.activeModal.close('error');
                        }
                    },
                    error => {
                        this.activeModal.close('error');
                    }
                );
                break;
            case DBOperation.update:
                const contactDataUpdate = this.mapData(formData.value);
                
                this.data.updateContact(contactId, contactDataUpdate).subscribe(
                    success => {
                        // Success
                        if (success) {
                            this.activeModal.close('success');
                        } else {
                            this.activeModal.close('error');
                        }
                    },
                    error => {
                        this.activeModal.close('error');
                    }
                );
                break;
            case DBOperation.delete:
                
                this.data.deleteContact(contactId).subscribe(
                    success => {
                        // Success
                        if (success) {
                            this.activeModal.close('success');
                        } else {
                            this.activeModal.close('error');
                        }
                    },
                    error => {
                        this.activeModal.close('error');
                    }
                );
                break;
        }
    }
    SetControlsState(isEnable: boolean) {
        isEnable ? this.contactFrm.enable() : this.contactFrm.disable();
    }

    mapData(contact: Contact): Contact {      
        return contact;
    }

    mapDataForInsert(contact: Contact): PostContactRequest {
        let postContactRequest = new PostContactRequest();
        postContactRequest.name = contact.name;
        postContactRequest.surname = contact.surname;
        postContactRequest.email = contact.email;
        postContactRequest.address = contact.address;
        postContactRequest.fixedPhone = contact.fixedPhone;
        postContactRequest.mobilePhone = contact.mobilePhone;
        return postContactRequest;
    }

   

    getContactId(contact: Contact): string {
        return contact.id;
    }
}