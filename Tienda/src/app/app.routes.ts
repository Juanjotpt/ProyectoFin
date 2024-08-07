import { Routes } from '@angular/router';
import { ListarUsuariosComponent } from './listar-usuarios/listar-usuarios.component';
import { EditarUsuariosComponent } from './editar-usuarios/editar-usuarios.component';

export const routes: Routes = [
  {
    path: 'usuarios',
    component: ListarUsuariosComponent,
  },

  {
    path: 'usuarios/editar/:id',
    component: EditarUsuariosComponent,
  },

  {
    path: 'usuarios/agregar',
    component: EditarUsuariosComponent,
  },

  {
    path: '**',
    redirectTo: '/usuarios',
    pathMatch: 'full',
  },
];
