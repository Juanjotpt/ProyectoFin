import { Routes } from '@angular/router';
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
    path: 'productos/:id',
    component: ProductsComponent,
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
    path: 'rol',
    component: ListarRolComponent,
  },
  {
    path: 'rol/editar/:id',
    component: EditarRolComponent,
  },
  {
    path: 'rol/agregar',
    component: EditarRolComponent,
  },
  {
    path: 'ventas',
    component: ListarVentasComponent,
  },
  {
    path: 'ventas/editar/:id',
    component: EditarVentasComponent,
  },
  {
    path: 'ventas/agregar',
    component: EditarVentasComponent,
  },
  {
    path: 'detalleVenta',
    component: ListarDetallesVentasComponent
  },
  {
    path: 'detalleVenta/editar/:id',
    component: EditarDetalleVentaComponent
  },
  {
    path: 'detalleVenta/agregar',
    component: EditarDetalleVentaComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'admin',
    component: AdminComponent
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

