import { Component, OnInit } from '@angular/core';
import {
  ReactiveFormsModule,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { UsuarioModel } from '../../compartido/usuario/usuario.model';
import { UsuarioService } from '../../compartido/usuario/usuario.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-editar-usuarios',
  standalone: true,
  imports: [CommonModule, RouterOutlet, ReactiveFormsModule,RouterLink],
  templateUrl: './editar-usuarios.component.html',
  styleUrls: ['./editar-usuarios.component.css'],
})
export class EditarUsuariosComponent implements OnInit {
  id: number = 0;
  usuario = new UsuarioModel(0, '', '', '', '','','');

  formularioUsuario = new FormGroup({
    nombre: new FormControl('', Validators.required),
    apellidos: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required),
    direccion: new FormControl('', Validators.required),
    dni: new FormControl('', Validators.required),
  });

  constructor(
    private usuarioService: UsuarioService,
    private route: ActivatedRoute,
    private router: Router
  ) {}
  submit() {
    if (this.formularioUsuario.valid) {
      this.usuario = new UsuarioModel(
        this.usuario.id_usuario,
        this.formularioUsuario.get('email')?.value ?? '',
        this.formularioUsuario.get('nombre')?.value ?? '',
        this.formularioUsuario.get('apellidos')?.value ?? '',
        this.formularioUsuario.get('password')?.value ?? '',
        this.formularioUsuario.get('direccion')?.value ?? '',
        this.formularioUsuario.get('dni')?.value ?? ''
      );

      if (this.usuario.id_usuario) {
        this.usuarioService
          .actualizarUsuario(this.usuario)
          .subscribe((result) => {
            alert(result);
            this.router.navigate(['/usuarios']);
          });
      } else {
        this.usuarioService.agregarUsuario(this.usuario).subscribe((result) => {
          alert(result);
          this.router.navigate(['/usuarios']);
        });
      }
    } else {
      alert('Por favor, completa todos los campos requeridos.');
    }
  }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    if (this.id) {
      this.usuarioService.obtenerUsuarioId(this.id).subscribe((result) => {
        this.usuario = result[0];
        this.formularioUsuario.patchValue(this.usuario);
      });
    }
  }
}
