export class ProductoModel {
    constructor(
      public id_producto: number,
      public nombre_producto: string,
      public precio_unitario: number,
      public descripcion: string,
      public stock: number,
      public categoria: string,
    ) {}
  }