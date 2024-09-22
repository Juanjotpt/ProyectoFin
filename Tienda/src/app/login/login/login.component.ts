import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../compartido/login/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { jwtDecode } from 'jwt-decode';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }
  //Vaciamos localStorage
  ngOnInit(): void {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userInfo');
  }

  onSubmit(): void {
    if (this.loginForm.invalid) {
      return;
    }

    const { email, password } = this.loginForm.value;

    this.authService.login(email, password).subscribe(
      (response) => {
        const token = response.token;
        localStorage.setItem('authToken', token);

        const decodedToken: any = jwtDecode(token);
        localStorage.setItem(
          'userInfo',
          JSON.stringify({
            id: decodedToken.id,
            nombre: decodedToken.nombre,
            rol_tipo: decodedToken.rol_tipo,
            id_carrito: decodedToken.id_carrito,
          })
        );

        const redirectRoute = response.redirectTo || '/';
        this.router.navigate([redirectRoute]);
      },
      (error) => {
        console.error('Error en el login', error);
        this.showErrorModal(); 
      }
    );
  }

  showErrorModal(): void {
    const modalElement = document.getElementById('errorModal'); 
    if (modalElement) {
      const bootstrapModal = new (window as any).bootstrap.Modal(modalElement); 
      bootstrapModal.show(); 
    }
  }
}
