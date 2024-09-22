import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule,RouterLink],
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent {
  registroForm: FormGroup;
  errorMessage: string | null = null;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {
    this.registroForm = this.fb.group({
      nombre: ['', Validators.required],
      apellidos: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      direccion: ['', Validators.required],
      dni: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.registroForm.invalid) {
      return;
    }

    const formData = this.registroForm.value;

    this.http.post('http://localhost:3000/login/registro', formData).subscribe({
      next: (response: any) => {
        // Redirige al usuario a la página de inicio de sesión o donde prefieras
        this.router.navigate(['/login']);
        this.showErrorModal(); 
      },
      error: (error) => {
        console.error('Error al registrarse:', error);
        this.errorMessage = 'Ocurrió un error al intentar registrarse. Por favor, inténtelo de nuevo más tarde.';
      }
    });
  }
  showErrorModal(): void {
    const modalElement = document.getElementById('errorModal'); 
    if (modalElement) {
      const bootstrapModal = new (window as any).bootstrap.Modal(modalElement); 
      bootstrapModal.show(); 
    }
  }
}
