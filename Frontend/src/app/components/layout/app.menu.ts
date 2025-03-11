import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { AppMenuitem } from './app.menuitem';

@Component({
    selector: 'app-menu',
    standalone: true,
    imports: [CommonModule, AppMenuitem, RouterModule],
    template: `<ul class="layout-menu">
        <ng-container *ngFor="let item of model; let i = index">
            <li app-menuitem *ngIf="!item.separator" [item]="item" [index]="i" [root]="true"></li>
            <li *ngIf="item.separator" class="menu-separator"></li>
        </ng-container>
    </ul> `
})
export class AppMenu {
    model: MenuItem[] = [];

    ngOnInit() {
        this.model = [
            {
                label: 'Home',
                items: [{ label: 'Dashboard', icon: 'pi pi-fw pi-home', routerLink: ['/'] }]
            },
            {
                label: 'Lançamentos',
                items: [
                    { label: 'Bonificação', icon: 'pi pi-fw pi-wallet', routerLink: ['/'] },
                    { label: 'Horas Extras', icon: 'pi pi-fw pi-calendar-plus', routerLink: ['/'] },
                    { label: 'Horas Faltas', icon: 'pi pi-fw pi-calendar-minus', routerLink: ['/'] },
                    { label: 'Outros Acréscimos', icon: 'pi pi-fw pi-plus', class: 'rotated-icon', routerLink: ['/'] },
                    { label: 'Outros Descontos', icon: 'pi pi-fw pi-minus', routerLink: ['/'] },
                ]
            },
            {
                label: 'Cálculos',
                items: [
                    { label: 'Folha de Pagamento', icon: 'pi pi-fw pi-money-bill', routerLink: ['/'] },
                    { label: 'Férias', icon: 'pi pi-fw pi-car', routerLink: ['/'] },
                    { label: 'Décimo Terceiro', icon: 'pi pi-fw pi-calendar', routerLink: ['/'] },
                    { label: 'Rescisão', icon: 'pi pi-fw pi-user-minus', routerLink: ['/'] },
                ]
            },
            {
                label: 'Cadastros',
                items: [
                    { label: 'Colaboradores', icon: 'pi pi-fw pi-user-plus', routerLink: ['/pessoa'] },
                    { label: 'Salários', icon: 'pi pi-fw pi-dollar', routerLink: ['/salario'] },
                    { label: 'Funções', icon: 'pi pi-fw pi-id-card', routerLink: ['/funcao'] },
                    { label: 'Escalas', icon: 'pi pi-fw pi-clock', routerLink: ['/escala'] },
                    { label: 'Período', icon: 'pi pi-fw pi-calendar', routerLink: ['/periodo'] },
                ]
            },
            {
                label: 'Gerais',
                items: [
                    { label: 'Empresas', icon: 'pi pi-fw pi-building-columns', routerLink: ['/empresa'] },
                    { label: 'Unidades', icon: 'pi pi-fw pi-building', routerLink: ['/unidade'] },
                    { label: 'Setores', icon: 'pi pi-fw pi-id-card', routerLink: ['/setor'] },
                ]
            },
        ];
    }
}
