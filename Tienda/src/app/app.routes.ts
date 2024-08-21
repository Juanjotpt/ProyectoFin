import { Routes } from '@angular/router';
import { ListarUsuariosComponent } from './usuarios/listar-usuarios/listar-usuarios.component';
import { EditarUsuariosComponent } from './usuarios/editar-usuarios/editar-usuarios.component';
import { ListarProductosComponent } from './productos/listar-productos/listar-productos.component';
import { EditarProductosComponent } from './productos/editar-productos/editar-productos.component';
import { ListarCarritosComponent } from './listar-carritos/listar-carritos.component';

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
    component: ListarProductosComponent, 
  },
  {
    path: 'productos/editar/:id',
    component: EditarProductosComponent, 
  },
  {
    path: 'productos/agregar',
    component: EditarProductosComponent, 
  },
  {
    path: 'carritos',
    component: ListarCarritosComponent,
  },

  {
    path: '**',
    redirectTo: '/usuarios',
    pathMatch: 'full',
  },
];
