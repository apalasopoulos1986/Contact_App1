//service used for calling the WebApi
import { Injectable } from '@angular/core';
import { Contact } from '../Models/contact';

import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators'
import { PostContactRequest } from '../Models/postContactRequest';

@Injectable()
export class DataService {


    contacts: Contact[] = [];




    constructor(private http: HttpClient) {

    }







    loadAllContacts(): Observable<boolean> {
        return this.http.get("/api/contacts")
            .pipe(map((data: any[]) => {
                this.contacts = data;
                return true;
            }))
    }






    postContact(contact: PostContactRequest): Observable<boolean> {
        return this.http.post("/api/contacts", contact)
            .pipe(map(response => {
                return true;
            }))
    }

    updateContact(contactId: string, contact: Contact): Observable<boolean> {
        return this.http.put("/api/contacts/" + contactId, contact)
            .pipe(map(response => {
                return true;
            }))
    }

    deleteContact(contactId: string): Observable<boolean> {
        return this.http.delete("/api/contacts/" + contactId)
            .pipe(map(response => {
                return true;
            }))
    }
}