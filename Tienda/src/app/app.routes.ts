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
import { ListarVentasComponent } from './ventas/listar-ventas/listar-ventas.component';
import { EditarVentasComponent } from './ventas/editar-ventas/editar-ventas.component';
import { ListarDetallesVentasComponent } from './detalle_venta/listar-detalle-venta/listar-detalle-venta.component';
import { EditarDetalleVentaComponent } from './detalle_venta/editar-detalle-venta/editar-detalle-venta.component';
import { LoginComponent } from './login/login/login.component';
import { AdminComponent } from './admin/admin.component';
import { RegistroComponent } from './registro/registro.component';
import { ClientesComponent } from './clientes/clientes.component';
import { ProductsComponent } from './products/products.component';
import { VerCarritoComponent } from './ver-carrito/ver-carrito.component';
import { ContactoComponent } from './contacto/contacto.component';

export const routes: Routes = [
  {
    path: 'usuarios',
    component: ListarUsuariosComponent,
    canActivate: [AuthGuard],
    data: {requiredRole:1}
  },
  {
    path: 'usuarios/editar/:id',
    component: EditarUsuariosComponent,
    canActivate: [AuthGuard],
    data: {requiredRole:1}
  },
  {
    path: 'usuarios/agregar',
    component: EditarUsuariosComponent,
    canActivate: [AuthGuard],
    data: {requiredRole:1}
  },
  {
    path: 'productos',
    component: ListarProductosComponent,
    canActivate: [AuthGuard],
    data: {requiredRole:1}
  },
  {
    path: 'productos/:id',
    component: ProductsComponent,
  },
  {
    path: 'productos/editar/:id',
    component: EditarProductosComponent,
    canActivate: [AuthGuard],
    data: {requiredRole:1}
  },
  {
    path: 'productos/agregar',
    component: EditarProductosComponent,
    canActivate: [AuthGuard],
    data: {requiredRole:1}
  },
  {
    path: 'carritos',
    component: ListarCarritosComponent,
    canActivate: [AuthGuard],
    data: {requiredRole:1}
  },
  {
    path: 'productoscarrito',
    component: ListarProductosCarritoComponent,
  },
  {
    path: 'productoscarrito/editar/:id',
    component: EditarProductosCarritoComponent,
  },
  {
    path: 'productoscarrito/agregar',
    component: ProductsComponent,
  },
  {
    path: 'productoscarrito/borrar/:id',
    component: ProductsComponent,
  },
  {
    path: 'rol',
    component: ListarRolComponent,
    canActivate: [AuthGuard],
    data: {requiredRole:1}
  },
  {
    path: 'rol/editar/:id',
    component: EditarRolComponent,
    canActivate: [AuthGuard],
    data: {requiredRole:1}
  },
  {
    path: 'rol/agregar',
    component: EditarRolComponent,
  },
  {
    path: 'ventas',
    component: ListarVentasComponent,
    canActivate: [AuthGuard],
    data: {requiredRole:1}
  },
  {
    path: 'ventas/editar/:id',
    component: EditarVentasComponent,
    canActivate: [AuthGuard],
    data: {requiredRole:1}
  },
  {
    path: 'ventas/agregar',
    component: EditarVentasComponent,
    canActivate: [AuthGuard],
    data: {requiredRole:1}
  },
  {
    path: 'detalleVenta',
    component: ListarDetallesVentasComponent,
    canActivate: [AuthGuard],
    data: {requiredRole:1}
    
  },
  {
    path: 'detalleVenta/editar/:id',
    component: EditarDetalleVentaComponent,
    canActivate: [AuthGuard],
    data: {requiredRole:1}
  },
  {
    path: 'detalleVenta/agregar',
    component: EditarDetalleVentaComponent,
    canActivate: [AuthGuard],
    data: {requiredRole:1}
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [AuthGuard],
    data: {requiredRole:1}
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
    path: 'productos/:id',
    component: ProductsComponent
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
    path: '**',
    redirectTo: '/login',
    pathMatch: 'full',
  },
];

