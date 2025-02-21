import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { MenubarModule } from 'primeng/menubar';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterModule, CommonModule, ButtonModule, MenubarModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'frontendGestaoWebApp';
  items = [
    {
      label: 'Contatos',
      icon: 'pi pi-fw pi-phone',
      routerLink: '/contato'
    },
    {
      label: 'Empresas',
      icon: 'pi pi-fw pi-building',
      routerLink: '/empresa'
    },
    {
      label: 'Endereços',
      icon: 'pi pi-fw pi-map-marker',
      routerLink: '/endereco'
    },
    {
      label: 'Estados',
      icon: 'pi pi-fw pi-map',
      routerLink: '/estado'
    },
    {
      label: 'Municípios',
      icon: 'pi pi-fw pi-map-marker',
      routerLink: '/municipio'
    },
    {
      label: 'Funções',
      icon: 'pi pi-fw pi-briefcase',
      routerLink: '/funcao'
    },
    {
      label: 'Setores',
      icon: 'pi pi-fw pi-sitemap',
      routerLink: '/setor'
    },
    {
      label: 'Unidades',
      icon: 'pi pi-fw pi-th-large',
      routerLink: '/unidade'
    }

  ];
  ngOnInit() {

  }
}