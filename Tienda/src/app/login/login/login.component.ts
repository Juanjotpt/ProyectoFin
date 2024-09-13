import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../compartido/login/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { jwtDecode } from 'jwt-decode';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule,RouterLink],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;
  

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit(): void {
    if (this.loginForm.invalid) {
      return;
    }

    const { email, password } = this.loginForm.value;

    this.authService.login(email, password).subscribe(
      response => {
        const token = response.token;
        localStorage.setItem('authToken', token);

        // Decodificar el token para extraer la información del usuario
        const decodedToken: any = jwtDecode(token);
        localStorage.setItem('userInfo', JSON.stringify({
          id: decodedToken.id,
          nombre: decodedToken.nombre,
          rol_tipo: decodedToken.rol_tipo
        }));

        // Redirigir a la ruta adecuada
        const redirectRoute = response.redirectTo || '/';
        this.router.navigate([redirectRoute]); 
      },
      error => {
        console.error('Error en el login', error);
      }
    );
  }
}
