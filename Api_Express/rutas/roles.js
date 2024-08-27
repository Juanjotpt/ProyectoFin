const express = require('express');
const router = express.Router();
const conexion = require('../models/conexion.js');



// Ruta para obtener todos los roles
router.get("/", (req, res) => {
    const query = `
      SELECT 
        rol.id_rol, 
        rol.id_usuario, 
        usuarios.nombre AS nombre_usuario,
        rol.tipo
      FROM 
        rol
      JOIN 
        usuarios ON rol.id_usuario = usuarios.id_usuario
    `;
  
    conexion.query(query, (error, resultado) => {
      if (error) {
        console.log(error.message);
        res.status(500).send("Error al obtener los roles");
      } else {
        res.json(resultado.length > 0 ? resultado : "No hay registros");
      }
    });
  });
  
  // Ruta para obtener un rol por su ID
  router.get("/:id", (req, res) => {
    const { id } = req.params;
    const query = `
      SELECT 
        rol.id_rol, 
        rol.id_usuario, 
        usuarios.nombre AS nombre_usuario,
        rol.tipo
      FROM 
        rol
      JOIN 
        usuarios ON rol.id_usuario = usuarios.id_usuario
      WHERE 
        rol.id_rol=${id}
    `;
    conexion.query(query, (error, resultado) => {
      if (error) {
        console.error(error.message);
        res.status(500).send("Error al obtener el rol");
      } else {
        res.json(resultado.length > 0 ? resultado : "No hay registro con ese id");
      }
    });
  });
  
  // Ruta para agregar un nuevo rol
  router.post("/agregar", (req, res) => {
    const rol = {
      id_usuario: req.body.id_usuario,
      tipo: req.body.tipo,
    };
    const query = `INSERT INTO rol SET ?`;
    conexion.query(query, rol, (error, resultado) => {
      if (error) {
        console.error(error.message);
        res.status(500).send("Error al insertar el rol");
      } else {
        res.json(`Se insertó correctamente el rol`);
      }
    });
  });
  
  // Ruta para actualizar un rol por su ID
  router.put("/actualizar/:id", (req, res) => {
    const { id } = req.params;
    const { id_usuario, tipo } = req.body;
    const query = `
      UPDATE rol 
      SET id_usuario='${id_usuario}', tipo='${tipo}' 
      WHERE id_rol=${id}
    `;
    conexion.query(query, (error, resultado) => {
      if (error) {
        console.error(error.message);
        res.status(500).send("Error al actualizar el rol");
      } else {
        res.json(`Se actualizó el rol`);
      }
    });
  });
  
  // Ruta para eliminar un rol por su ID
  router.delete("/borrar/:id", (req, res) => {
    const { id } = req.params;
    const query = `DELETE FROM rol WHERE id_rol=${id}`;
    conexion.query(query, (error, resultado) => {
      if (error) {
        console.error(error.message);
        res.status(500).send("Error al eliminar el rol");
      } else {
        res.json("Se eliminó el rol");
      }
    });
  });

  module.exports = router;