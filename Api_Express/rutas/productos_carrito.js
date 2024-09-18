const express = require('express');
const router = express.Router();
const conexion = require('../models/conexion.js');





router.get("/productos_carrito", (req, res) => {
    const query = "SELECT * FROM productos_carrito";
    conexion.query(query, (error, resultado) => {
      if (error) {
        console.log(error.message);
        res.status(500).send("Error al obtener los productos del carrito");
      } else {
        res.json(resultado.length > 0 ? resultado : "No hay registros");
      }
    });
  });
  
 
  router.get("/productos_carrito/:id", (req, res) => {
    const { id } = req.params;
    const query = `SELECT * FROM productos_carrito WHERE id_productos_carrito = ?`;
    conexion.query(query, [id], (error, resultado) => {
      if (error) {
        console.error(error.message);
        res.status(500).send("Error al obtener el producto del carrito");
      } else {
        res.json(resultado.length > 0 ? resultado[0] : "No hay registro con ese id");
      }
    });
  });
  
  router.get("/carrito/:id_carrito", (req, res) => {
    const { id_carrito } = req.params;
    
    const query = `
      SELECT 
        pc.id_productos_carrito, 
        pc.id_producto, 
        pc.id_carrito, 
        pc.cantidad, 
        p.nombre_producto, 
        p.precio_unitario 
      FROM productos_carrito pc
      JOIN productos p ON pc.id_producto = p.id_producto
      WHERE pc.id_carrito = ?`;
    
    conexion.query(query, [id_carrito], (error, resultados) => {
      if (error) {
        console.error(error.message);
        res.status(500).send("Error al obtener los productos del carrito");
      } else {
        res.json(resultados.length > 0 ? resultados : "No hay productos en este carrito");
      }
    });
  });
 
  router.post("/agregar", (req, res) => {
    const id_producto = req.body.id_producto;
    const id_carrito = req.body.id_carrito;
    const cantidad = req.body.cantidad;
  
    // Verificar si el producto ya existe en el carrito
    const verificarProductoQuery = `
      SELECT cantidad 
      FROM productos_carrito 
      WHERE id_producto = ? AND id_carrito = ?
    `;
  
    conexion.query(verificarProductoQuery, [id_producto, id_carrito], (error, resultados) => {
      if (error) {
        console.error(error.message);
        return res.status(500).send("Error al verificar el producto en el carrito");
      }
  
      if (resultados.length > 0) {
        // Si el producto ya existe, actualizar la cantidad
        const cantidadActual = resultados[0].cantidad;
        const nuevaCantidad = cantidadActual + cantidad;
  
        const actualizarProductoQuery = `
          UPDATE productos_carrito 
          SET cantidad = ? 
          WHERE id_producto = ? AND id_carrito = ?
        `;
  
        conexion.query(actualizarProductoQuery, [nuevaCantidad, id_producto, id_carrito], (error, resultado) => {
          if (error) {
            console.error(error.message);
            return res.status(500).send("Error al actualizar la cantidad del producto en el carrito");
          }
  
          res.json("Se actualizó correctamente la cantidad del producto en el carrito");
        });
  
      } else {
        // Si el producto no existe, insertar un nuevo registro
        const productoCarrito = {
          id_producto,
          id_carrito,
          cantidad,
        };
  
        const insertarProductoQuery = `INSERT INTO productos_carrito SET ?`;
  
        conexion.query(insertarProductoQuery, productoCarrito, (error, resultado) => {
          if (error) {
            console.error(error.message);
            return res.status(500).send("Error al insertar el producto en el carrito");
          }
  
          res.json("Se insertó correctamente el producto en el carrito");
        });
      }
    });
  });
  
 
  router.put("/productos_carrito/actualizar/:id", (req, res) => {
    const { id } = req.params;
    const { id_producto, id_carrito, cantidad } = req.body;
    const query = `
      UPDATE productos_carrito 
      SET id_producto = ?, id_carrito = ?, cantidad = ? 
      WHERE id_productos_carrito = ?`;
    const values = [id_producto, id_carrito, cantidad, id];
  
    conexion.query(query, values, (error, resultado) => {
      if (error) {
        console.error(error.message);
        res.status(500).send("Error al actualizar el producto del carrito");
      } else {
        res.json("Se actualizó el producto del carrito");
      }
    });
  });
  
 
  router.delete("/productos_carrito/borrar/:id", (req, res) => {
    const { id } = req.params;
    const query = `DELETE FROM productos_carrito WHERE id_productos_carrito = ?`;
    conexion.query(query, [id], (error, resultado) => {
      if (error) {
        console.error(error.message);
        res
          .status(500)
          .send("Error al eliminar el producto del carrito");
      } else {
        res.json("Se eliminó el producto del carrito");
      }
    });
  });

  module.exports = router;