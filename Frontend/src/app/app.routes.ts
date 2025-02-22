import { Routes } from '@angular/router';

export const routes: Routes = [
    { path: 'contato', loadComponent: () => import('./components/features/contato/contato.component').then(m => m.ContatoComponent) },
    { path: 'empresa', loadComponent: () => import('./components/features/empresa/empresa.component').then(m => m.EmpresaComponent) },
    { path: 'endereco', loadComponent: () => import('./components/features/endereco/endereco.component').then(m => m.EnderecoComponent) },
    { path: 'estado', loadComponent: () => import('./components/features/estado/estado.component').then(m => m.EstadoComponent) },
    { path: 'municipio', loadComponent: () => import('./components/features/municipio/municipio.component').then(m => m.MunicipioComponent) },
    {
        path: ':modelo/novo',
        loadComponent: () => import('./components/shared/generic-form/generic-form.component').then(m => m.GenericFormComponent)
    },
    {
        path: ':modelo/editar/:id',
        loadComponent: () => import('./components/shared/generic-form/generic-form.component').then(m => m.GenericFormComponent)
    },
    { path: 'login', loadComponent: () => import('./components/login/login.component').then(m => m.LoginComponent) },
    { path: '', redirectTo: 'municipio', pathMatch: 'full' },
    { path: '**', redirectTo: 'municipio' },
];