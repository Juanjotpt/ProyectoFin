import { Routes } from '@angular/router';
import { AuthGuard } from './compartido/login/auth.guard';
import { ListarUsuariosComponent } from './usuarios/listar-usuarios/listar-usuarios.component';
import { EditarUsuariosComponent } from './usuarios/editar-usuarios/editar-usuarios.component';
import { ListarProductosComponent } from './productos/listar-productos/listar-productos.component';
import { EditarProductosComponent } from './productos/editar-productos/editar-productos.component';
import { ListarCarritosComponent } from './carrito/listar-carritos/listar-carritos.component';
import { ListarProductosCarritoComponent } from './productos_carrito/listar-productos-carrito/listar-productos-carrito.component';
import { EditarProductosCarritoComponent } from './productos_carrito/editar-productos-carrito/editar-productos-carrito.component';
import { EditarRolComponent } from './rol/editar-rol/editar-rol.component';
import { ListarRolComponent } from './rol/listar-rol/listar-rol.component';
import { LoginComponent } from './login/login/login.component';
import { AdminComponent } from './admin/admin.component';
import { RegistroComponent } from './registro/registro.component';
import { ClientesComponent } from './clientes/clientes.component';
import { ProductsComponent } from './products/products.component';
import { VerCarritoComponent } from './ver-carrito/ver-carrito.component';
import { ContactoComponent } from './contacto/contacto.component';
import { PrivacidadComponent } from './privacidad/privacidad.component';


const usuarioRoutes: Routes = [
  {
    path: 'usuarios',
    component: ListarUsuariosComponent,
    canActivate: [AuthGuard],
    data: { requiredRole: 1 }
  },
  {
    path: 'usuarios/editar/:id',
    component: EditarUsuariosComponent,
    canActivate: [AuthGuard],
    data: { requiredRole: 1 }
  },
  {
    path: 'usuarios/agregar',
    component: EditarUsuariosComponent,
    canActivate: [AuthGuard],
    data: { requiredRole: 1 }
  }
];


const productoRoutes: Routes = [
  {
    path: 'productos',
    component: ListarProductosComponent,
    canActivate: [AuthGuard],
    data: { requiredRole: 1 }
  },
  {
    path: 'productos/editar/:id',
    component: EditarProductosComponent,
    canActivate: [AuthGuard],
    data: { requiredRole: 1 }
  },
  {
    path: 'productos/agregar',
    component: EditarProductosComponent,
    canActivate: [AuthGuard],
    data: { requiredRole: 1 }
  },
  {
    path: 'productos/:id',
    component: ProductsComponent
  }
];


const carritoRoutes: Routes = [
  {
    path: 'carritos',
    component: ListarCarritosComponent,
    canActivate: [AuthGuard],
    data: { requiredRole: 1 }
  },
  {
    path: 'productoscarrito',
    component: ListarProductosCarritoComponent
  },
  {
    path: 'productoscarrito/editar/:id',
    component: EditarProductosCarritoComponent
  },
  {
    path: 'productoscarrito/agregar',
    component: ProductsComponent
  },
  {
    path: 'productoscarrito/borrar/:id',
    component: ProductsComponent
  }
];


const rolRoutes: Routes = [
  {
    path: 'rol',
    component: ListarRolComponent,
    canActivate: [AuthGuard],
    data: { requiredRole: 1 }
  },
  {
    path: 'rol/editar/:id',
    component: EditarRolComponent,
    canActivate: [AuthGuard],
    data: { requiredRole: 1 }
  },
  {
    path: 'rol/agregar',
    component: EditarRolComponent
  }
];


export const routes: Routes = [
  ...usuarioRoutes,
  ...productoRoutes,
  ...carritoRoutes,
  ...rolRoutes,
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [AuthGuard],
    data: { requiredRole: 1 }
  },
  {
    path: 'registro',
    component: RegistroComponent
  },
  {
    path: 'cliente',
    component: ClientesComponent
  },
  {
    path: 'verCarrito/:id',
    component: VerCarritoComponent
  },
  {
    path: 'contacto',
    component: ContactoComponent
  },
  {
    path: 'privacidad',
    component: PrivacidadComponent
  },
  {
    path: '**',
    redirectTo: '/login',
    pathMatch: 'full',
  },
];
