import { Component } from '@angular/core';
import { RevenueStreamWidget } from './components/revenuestreamwidget';

@Component({
    selector: 'app-dashboard',
    imports: [RevenueStreamWidget],
    template: `
        <div >
            <app-revenue-stream-widget />
        </div>
    `
})
export class DashboardComponent { }
