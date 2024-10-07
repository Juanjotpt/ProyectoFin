export class ProductosCarritoModel {
    constructor(
      public id_productos_carrito: number,  
      public id_producto: number,           
      public id_carrito: number,           
      public cantidad: number,
      public nombre_producto: string,     
      public precio_unitario: number,    
      public stock: number,            
    ) {}
  }
  