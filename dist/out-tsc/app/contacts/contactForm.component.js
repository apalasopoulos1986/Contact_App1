import { __decorate } from "tslib";
import { Component, Input } from '@angular/core';
import { DBOperation } from '../../shared/Enums/DBOperation';
import { Validators } from '@angular/forms';
import { PostContactRequest } from '../../shared/Models/postContactRequest';
let ContactFormComponent = class ContactFormComponent {
    //listFilter: string;
    //selectedOption: string;
    constructor(fb, data, activeModal) {
        this.fb = fb;
        this.data = data;
        this.activeModal = activeModal;
        this.indLoading = false;
    }
    ngOnInit() {
        // built contact form
        this.contactFrm = this.fb.group({
            id: [''],
            name: ['', Validators.required],
            surname: ['', Validators.required],
            email: ['', [Validators.required, Validators.email]],
            address: [''],
            fixedPhone: [''],
            mobilePhone: ['', Validators.required]
        });
        if (this.dbops === DBOperation.create) {
            this.contactFrm.reset();
        }
        else {
            this.contactFrm.setValue(this.contact);
        }
        this.SetControlsState(this.dbops === DBOperation.delete ? false : true);
    }
    onSubmit(formData) {
        const contactId = this.getContactId(formData.value);
        switch (this.dbops) {
            case DBOperation.create:
                const contactDataInsert = this.mapDataForInsert(formData.value);
                this.data.postContact(contactDataInsert).subscribe(success => {
                    // Success
                    if (success) {
                        this.activeModal.close('success');
                    }
                    else {
                        this.activeModal.close('error');
                    }
                }, error => {
                    this.activeModal.close('error');
                });
                break;
            case DBOperation.update:
                const contactDataUpdate = this.mapData(formData.value);
                this.data.updateContact(contactId, contactDataUpdate).subscribe(success => {
                    // Success
                    if (success) {
                        this.activeModal.close('success');
                    }
                    else {
                        this.activeModal.close('error');
                    }
                }, error => {
                    this.activeModal.close('error');
                });
                break;
            case DBOperation.delete:
                this.data.deleteContact(contactId).subscribe(success => {
                    // Success
                    if (success) {
                        this.activeModal.close('success');
                    }
                    else {
                        this.activeModal.close('error');
                    }
                }, error => {
                    this.activeModal.close('error');
                });
                break;
        }
    }
    SetControlsState(isEnable) {
        isEnable ? this.contactFrm.enable() : this.contactFrm.disable();
    }
    mapData(contact) {
        return contact;
    }
    mapDataForInsert(contact) {
        let postContactRequest = new PostContactRequest();
        postContactRequest.name = contact.name;
        postContactRequest.surname = contact.surname;
        postContactRequest.email = contact.email;
        postContactRequest.address = contact.address;
        postContactRequest.fixedPhone = contact.fixedPhone;
        postContactRequest.mobilePhone = contact.mobilePhone;
        return postContactRequest;
    }
    getContactId(contact) {
        return contact.id;
    }
};
__decorate([
    Input()
], ContactFormComponent.prototype, "dbops", void 0);
__decorate([
    Input()
], ContactFormComponent.prototype, "modalTitle", void 0);
__decorate([
    Input()
], ContactFormComponent.prototype, "modalBtnTitle", void 0);
__decorate([
    Input()
], ContactFormComponent.prototype, "contact", void 0);
ContactFormComponent = __decorate([
    Component({
        selector: 'app-contactForm',
        templateUrl: './contactForm.component.html'
    })
], ContactFormComponent);
export { ContactFormComponent };
//# sourceMappingURL=contactForm.component.js.map