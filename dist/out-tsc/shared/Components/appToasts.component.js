import { __decorate } from "tslib";
import { Component, TemplateRef } from '@angular/core';
let AppToastsComponent = class AppToastsComponent {
    constructor(toastService) {
        this.toastService = toastService;
    }
    isTemplate(toast) { return toast.textOrTpl instanceof TemplateRef; }
};
AppToastsComponent = __decorate([
    Component({
        selector: 'app-toasts',
        templateUrl: './appToasts.component.html',
        host: { '[class.ngb-toasts]': 'true' }
    })
], AppToastsComponent);
export { AppToastsComponent };
//# sourceMappingURL=appToasts.component.js.map