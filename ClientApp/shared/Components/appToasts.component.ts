//component used for messages to the user
import { Component, TemplateRef } from '@angular/core';
import { ToastService } from '../Services/toastService';

@Component({
    selector: 'app-toasts',
    templateUrl: './appToasts.component.html',
    host: { '[class.ngb-toasts]': 'true' }
})
export class AppToastsComponent {
    constructor(public toastService: ToastService) {
        
    }

    isTemplate(toast) { return toast.textOrTpl instanceof TemplateRef; }
}