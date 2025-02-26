import { Routes } from '@angular/router';

export const routes: Routes = [
    { path: 'contato', loadComponent: () => import('./components/features/contato/contato.component').then(m => m.ContatoComponent) },
    { path: 'documento', loadComponent: () => import('./components/features/documento/documento.component').then(m => m.DocumentoComponent) },
    { path: 'dependente', loadComponent: () => import('./components/features/dependente/dependente.component').then(m => m.DependenteComponent) },
    { path: 'empresa', loadComponent: () => import('./components/features/empresa/empresa.component').then(m => m.EmpresaComponent) },
    { path: 'endereco', loadComponent: () => import('./components/features/endereco/endereco.component').then(m => m.EnderecoComponent) },
    { path: 'estado', loadComponent: () => import('./components/features/estado/estado.component').then(m => m.EstadoComponent) },
    { path: 'escala', loadComponent: () => import('./components/features/escala/escala.component').then(m => m.EscalaComponent) },
    { path: 'escolaridade', loadComponent: () => import('./components/features/escolaridade/escolaridade.component').then(m => m.EscolaridadeComponent) },
    { path: 'estadocivil', loadComponent: () => import('./components/features/estadoCivil/estadoCivil.component').then(m => m.EstadoCivilComponent) },
    { path: 'funcao', loadComponent: () => import('./components/features/funcao/funcao.component').then(m => m.FuncaoComponent) },
    { path: 'funcaoRegistro', loadComponent: () => import('./components/features/funcaoRegistro/funcaoRegistro.component').then(m => m.FuncaoRegistroComponent) },
    { path: 'municipio', loadComponent: () => import('./components/features/municipio/municipio.component').then(m => m.MunicipioComponent) },
    { path: 'nacionalidade', loadComponent: () => import('./components/features/nacionalidade/nacionalidade.component').then(m => m.NacionalidadeComponent) },
    { path: 'setor', loadComponent: () => import('./components/features/setor/setor.component').then(m => m.SetorComponent) },
    { path: 'unidade', loadComponent: () => import('./components/features/unidade/unidade.component').then(m => m.UnidadeComponent) },
    { path: 'login', loadComponent: () => import('./components/login/login.component').then(m => m.LoginComponent) },
    { path: '', redirectTo: 'empresa', pathMatch: 'full' },
    { path: '**', redirectTo: 'empresa' },
];