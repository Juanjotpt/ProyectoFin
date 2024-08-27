const express = require('express');
const router = express.Router();
const conexion = require('../models/conexion.js');

// Ruta para obtener todos los detalles de venta
router.get("/", (req, res) => {
    const query = `
      SELECT 
        detalle_venta.id_detalle_venta, 
        detalle_venta.id_venta, 
        detalle_venta.id_producto,
        productos.nombre_producto AS nombre_producto,
        detalle_venta.cantidad,
        detalle_venta.precio
      FROM 
        detalle_venta
      JOIN 
        productos ON detalle_venta.id_producto = productos.id_producto
    `;
  
    conexion.query(query, (error, resultado) => {
      if (error) {
        console.error(error.message);
        res.status(500).send("Error al obtener los detalles de venta");
      } else {
        res.json(resultado.length > 0 ? resultado : "No hay registros");
      }
    });
  });

// Ruta para obtener un detalle de venta por su ID
router.get("/:id", (req, res) => {
    const { id } = req.params;
    const query = `SELECT * FROM detalle_venta WHERE id_detalle_venta = ?`;
    conexion.query(query, [id], (error, resultado) => {
      if (error) {
        console.error(error.message);
        res.status(500).send("Error al obtener el detalle de venta");
      } else {
        res.json(resultado.length > 0 ? resultado[0] : "No hay registro con ese id");
      }
    });
  });
  
// Ruta para agregar un nuevo detalle de venta
router.post("/agregar", (req, res) => {
    const { id_venta, id_producto, cantidad, precio } = req.body;
    const query = `INSERT INTO detalle_venta (id_venta, id_producto, cantidad, precio) VALUES (?, ?, ?, ?)`;
    conexion.query(query, [id_venta, id_producto, cantidad, precio], (error, resultado) => {
      if (error) {
        console.error(error.message);
        res.status(500).send("Error al insertar el detalle de venta");
      } else {
        res.json("Se insertó correctamente el detalle de venta");
      }
    });
  });
  
// Ruta para actualizar un detalle de venta por su ID
router.put("/actualizar/:id", (req, res) => {
    const { id } = req.params;
    const { id_venta, id_producto, cantidad, precio } = req.body;
    const query = `UPDATE detalle_venta SET id_venta = ?, id_producto = ?, cantidad = ?, precio = ? WHERE id_detalle_venta = ?`;
    conexion.query(query, [id_venta, id_producto, cantidad, precio, id], (error, resultado) => {
      if (error) {
        console.error(error.message);
        res.status(500).send("Error al actualizar el detalle de venta");
      } else {
        res.json("Se actualizó el detalle de venta");
      }
    });
  });
  
// Ruta para eliminar un detalle de venta por su ID
router.delete("/borrar/:id", (req, res) => {
    const { id } = req.params;
    const query = `DELETE FROM detalle_venta WHERE id_detalle_venta = ?`;
    conexion.query(query, [id], (error, resultado) => {
      if (error) {
        console.error(error.message);
        res.status(500).send("Error al eliminar el detalle de venta");
      } else {
        res.json("Se eliminó el detalle de venta");
      }
    });
  });
  
module.exports = router;

