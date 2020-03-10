import { __decorate } from "tslib";
import { Component } from '@angular/core';
import { DBOperation } from '../../shared/Enums/DBOperation';
import { ContactFormComponent } from './contactForm.component';
let ContactListComponent = class ContactListComponent {
    constructor(data, modalService, toastService) {
        this.data = data;
        this.modalService = modalService;
        this.toastService = toastService;
    }
    ngOnInit() {
        this.loadingState = true;
        this.loadContacts();
    }
    openDialog() {
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
            }
            else if (result === 'error') {
                this.toastService.show('Something went wrong.Please repeat', { classname: 'bg-danger text-light', delay: 10000 });
            }
            else {
            }
        });
    }
    loadContacts() {
        this.data.loadAllContacts()
            .subscribe(success => {
            if (success) {
                this.loadingState = false;
                this.contacts = this.data.contacts;
            }
        });
    }
    addContact() {
        this.dbops = DBOperation.create;
        this.modalTitle = 'Add New Contact';
        this.modalBtnTitle = 'Add';
        this.openDialog();
    }
    editContact(id) {
        this.dbops = DBOperation.update;
        this.modalTitle = 'Edit Contact';
        this.modalBtnTitle = 'Update';
        this.contact = this.contacts.filter(x => x.id === id)[0];
        this.openDialog();
    }
    deleteContact(id) {
        this.dbops = DBOperation.delete;
        this.modalTitle = 'Confirm to Delete ?';
        this.modalBtnTitle = 'Delete';
        this.contact = this.contacts.filter(x => x.id === id)[0];
        this.openDialog();
    }
    showMessage(msg) {
        this.toastService.show(msg);
    }
};
ContactListComponent = __decorate([
    Component({
        selector: 'app-contactList',
        templateUrl: './contactList.component.html',
        styleUrls: ['./contactList.component.css']
    })
], ContactListComponent);
export { ContactListComponent };
//# sourceMappingURL=contactList.component.js.map