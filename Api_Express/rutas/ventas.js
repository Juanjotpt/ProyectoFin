const express = require('express');
const router = express.Router();
const conexion = require('../models/conexion.js');



router.get("/", (req, res) => {
    const query = `
      SELECT 
        ventas.id_venta, 
        ventas.id_usuario, 
        usuarios.nombre AS nombre_usuario,
        ventas.total
      FROM 
        ventas
      JOIN 
        usuarios ON ventas.id_usuario = usuarios.id_usuario
    `;
  
    conexion.query(query, (error, resultado) => {
      if (error) {
        console.log(error.message);
        res.status(500).send("Error al obtener las ventas");
      } else {
        res.json(resultado.length > 0 ? resultado : "No hay registros");
      }
    });
  });
  router.get("/:id", (req, res) => {
    const { id } = req.params;
    const query = `SELECT * FROM ventas WHERE id_venta=${id}`;
    conexion.query(query, (error, resultado) => {
      if (error) {
        console.error(error.message);
        res.status(500).send("Error al obtener la venta");
      } else {
        res.json(resultado.length > 0 ? resultado : "No hay registro con ese id");
      }
    });
  });
  
  
  router.post("/agregar", (req, res) => {
    const { id_usuario, total } = req.body;
    const query = `INSERT INTO ventas (id_usuario, total) VALUES (?, ?)`;
    conexion.query(query, [id_usuario, total], (error, resultado) => {
      if (error) {
        console.error(error.message);
        res.status(500).send("Error al insertar la venta");
      } else {
        res.json("Se insertó correctamente la venta");
      }
    });
  });
  
  router.put("/actualizar/:id", (req, res) => {
    const { id } = req.params;
    const { id_usuario, total } = req.body;
    const query = `UPDATE ventas SET id_usuario=?, total=? WHERE id_venta=?`;
    conexion.query(query, [id_usuario, total, id], (error, resultado) => {
      if (error) {
        console.error(error.message);
        res.status(500).send("Error al actualizar la venta");
      } else {
        res.json("Se actualizó la venta");
      }
    });
  });
  
  router.delete("/borrar/:id", (req, res) => {
    const { id } = req.params;
    const query = `DELETE FROM ventas WHERE id_venta=${id}`;
    conexion.query(query, (error, resultado) => {
      if (error) {
        console.error(error.message);
        res.status(500).send("Error al eliminar la venta");
      } else {
        res.json("Se eliminó la venta");
      }
    });
  });
  
  
  module.exports = router;