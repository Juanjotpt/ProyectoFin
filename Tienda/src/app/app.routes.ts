import { Routes } from '@angular/router';
import { ListarUsuariosComponent } from './listar-usuarios/listar-usuarios.component';
import { EditarUsuariosComponent } from './editar-usuarios/editar-usuarios.component';
import { ListarProductosComponent } from './listar-productos/listar-productos.component';
import { EditarProductosComponent } from './editar-productos/editar-productos.component';

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
    path: 'productos',
    component: ListarProductosComponent,  // Ruta para listar productos
  },
  {
    path: 'productos/editar/:id',
    component: EditarProductosComponent,  // Ruta para editar un producto existente
  },
  {
    path: 'productos/agregar',
    component: EditarProductosComponent,  // Ruta para agregar un nuevo producto
  },

  {
    path: '**',
    redirectTo: '/usuarios',
    pathMatch: 'full',
  },
];
