export class DetalleVentaModel {
    constructor(
      public id_detalle_venta: number,
      public id_venta: number,
      public id_producto: number,
      public cantidad: number,
      public precio: number,
      public nombre_producto: string,
    ) {}
  }