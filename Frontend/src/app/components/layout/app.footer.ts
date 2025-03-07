import { Component } from '@angular/core';

@Component({
    standalone: true,
    selector: 'app-footer',
    template: `
    <div class="layout-footer">
        2025 Copyright &copy; | <span rel="noopener noreferrer" class="text-primary font-bold">Granja Bickel</span>
    </div>
    `
})
export class AppFooter { }
