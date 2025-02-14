import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-login',
    standalone: true,
    imports: [FormsModule, ButtonModule, CardModule, InputTextModule, CommonModule],
    templateUrl: './login.component.html',
    styleUrl: './login.component.scss'
})
export class LoginComponent {
    username = '';
    password = '';

    constructor(private authService: AuthService, private router: Router) { }

    login() {
        this.authService.login(this.username, this.password).subscribe(
            (response) => {
                localStorage.setItem('token', response.token);
                localStorage.setItem('role', response.role);
                this.router.navigate(['/municipio']);
            },
            (error) => {
                console.error('Erro ao fazer login:', error);
            }
        );
    }
}