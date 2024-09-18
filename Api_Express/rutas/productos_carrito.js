const express = require('express');
const router = express.Router();
const conexion = require('../models/conexion.js');




// Ruta para obtener todos los productos del carrito
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
  
  // Ruta para obtener un producto del carrito por su ID
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
  
  // Ruta para agregar un nuevo producto al carrito
  router.post("/agregar", (req, res) => {
    const productoCarrito = {
      id_producto: req.body.id_producto,
      id_carrito: req.body.id_carrito,
      cantidad: req.body.cantidad,
    };
    const query = `INSERT INTO productos_carrito SET ?`;
    conexion.query(query, productoCarrito, (error, resultado) => {
      if (error) {
        console.error(error.message);
        res.status(500).send("Error al insertar el producto en el carrito");
      } else {
        res.json("Se insertó correctamente el producto en el carrito");
      }
    });
  });
  
  // Ruta para actualizar un producto del carrito por su ID
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
  
  // Ruta para eliminar un producto del carrito por su ID
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