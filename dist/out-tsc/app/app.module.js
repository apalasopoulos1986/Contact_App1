import { __decorate } from "tslib";
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppComponent } from './app.component';
import { AgendaComponent } from '../Agenda/agenda.component';
import { HttpClientModule } from '@angular/common/http';
import { DataService } from '../shared/Services/dataService';
import { ContactListComponent } from './contacts/contactList.component';
import { ContactFormComponent } from './contacts/contactForm.component';
import { AppToastsComponent } from '../shared/Components/appToasts.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ToastService } from '../shared/Services/toastService';
let AppModule = class AppModule {
};
AppModule = __decorate([
    NgModule({
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
        entryComponents: [ContactFormComponent]
    })
], AppModule);
export { AppModule };
//# sourceMappingURL=app.module.js.map