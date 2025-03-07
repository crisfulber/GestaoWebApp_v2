import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AppLayout } from './components/layout/app.layout';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [RouterModule, AppLayout],
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
})
export class AppComponent {}