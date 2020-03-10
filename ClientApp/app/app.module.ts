import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


import { AppComponent } from './app.component';
import { AgendaComponent } from '../Agenda/agenda.component';
import { HttpClientModule } from '@angular/common/http';
import { DataService } from '../shared/Services/dataService';
import { from } from 'rxjs';
import { ContactListComponent } from './contacts/contactList.component';
import { ContactFormComponent } from './contacts/contactForm.component';
import { AppToastsComponent } from '../shared/Components/appToasts.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ToastService } from '../shared/Services/toastService';
@NgModule({
    declarations: [
        AppComponent,
        ContactListComponent,
        ContactFormComponent,
        AgendaComponent,
        AppToastsComponent
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        NgbModule,
        ReactiveFormsModule
    ],
    providers: [DataService, ToastService],
    bootstrap: [ContactListComponent],
    entryComponents:[ContactFormComponent]
})
export class AppModule { }
