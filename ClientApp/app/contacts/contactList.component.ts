import { Component, OnInit } from '@angular/core';
import { Contact } from '../../shared/Models/contact';
import { DBOperation } from '../../shared/Enums/DBOperation';
import { DataService } from '../../shared/Services/dataService';
import { ToastService } from '../../shared/Services/toastService';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ContactFormComponent } from './contactForm.component';


@Component({
    selector: 'app-contactList',
    templateUrl: './contactList.component.html',
    styleUrls: ['./contactList.component.css']
})

export class ContactListComponent implements OnInit {
    contacts: Contact[];
    contact: Contact;
    loadingState: boolean;
    dbops: DBOperation;
    modalTitle: string;
    modalBtnTitle: string;
    constructor(private data: DataService, private modalService: NgbModal, private toastService: ToastService) { }

    //load initial data
    ngOnInit() {
       
        this.loadingState = true;
        this.loadContacts();
    }

    //open modal window for CRUD
    openDialog(): void {
        const modalRef = this.modalService.open(ContactFormComponent, {
            centered: true,
            backdrop: 'static'
        });
        modalRef.componentInstance.dbops = this.dbops;
        modalRef.componentInstance.modalTitle = this.modalTitle;
        modalRef.componentInstance.modalBtnTitle = this.modalBtnTitle;
        modalRef.componentInstance.contact = this.contact;

        modalRef.result.then(result => {
            console.log('The modalService was closed');
            if (result === 'success') {
                this.loadingState = true;
                this.loadContacts();
                switch (this.dbops) {
                    case DBOperation.create:
                       
                        this.toastService.show('Contact successfully added.', { classname: 'bg-success text-light', delay: 10000 });
                        break;
                    case DBOperation.update:
                        
                        this.toastService.show('Contact successfully updated.', { classname: 'bg-success text-light', delay: 10000 });
                        break;
                    case DBOperation.delete:
                        
                        this.toastService.show('Contact successfully deleted.', { classname: 'bg-success text-light', delay: 10000 });
                        break;
                }
            } else if (result === 'error') {
                this.toastService.show('Something went wrong.Please repeat', { classname: 'bg-danger text-light', delay: 10000 });
            } else {
                
            }
        });
    }

    loadContacts(): void {
        this.data.loadAllContacts()
            .subscribe(success => {
                if (success) {
                    this.loadingState = false;
                    this.contacts = this.data.contacts;
                }
            })
    }

  
   ///CRUD operations

    addContact() {
        this.dbops = DBOperation.create;
        this.modalTitle = 'Add New Contact';
        this.modalBtnTitle = 'Add';
        this.openDialog();
    }

    editContact(id: string) {
        this.dbops = DBOperation.update;
        this.modalTitle = 'Edit Contact';
        this.modalBtnTitle = 'Update';
        this.contact = this.contacts.filter(x => x.id === id)[0];
        this.openDialog();
    }

    deleteContact(id: string) {
        this.dbops = DBOperation.delete;
        this.modalTitle = 'Confirm to Delete ?';
        this.modalBtnTitle = 'Delete';
        this.contact = this.contacts.filter(x => x.id === id)[0];
        this.openDialog();
    }

    showMessage(msg: string) {
        this.toastService.show(msg);
        
    }
}