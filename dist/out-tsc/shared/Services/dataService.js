import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
let DataService = class DataService {
    constructor(http) {
        this.http = http;
        this.contacts = [];
    }
    loadAllContacts() {
        return this.http.get("/api/contacts")
            .pipe(map((data) => {
            this.contacts = data;
            return true;
        }));
    }
    postContact(contact) {
        return this.http.post("/api/contacts", contact)
            .pipe(map(response => {
            return true;
        }));
    }
    updateContact(contactId, contact) {
        return this.http.put("/api/contacts/" + contactId, contact)
            .pipe(map(response => {
            return true;
        }));
    }
    deleteContact(contactId) {
        return this.http.delete("/api/contacts/" + contactId)
            .pipe(map(response => {
            return true;
        }));
    }
};
DataService = __decorate([
    Injectable()
], DataService);
export { DataService };
//# sourceMappingURL=dataService.js.map