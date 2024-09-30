const express = require('express');
const router = express.Router();
const conexion = require('../models/conexion.js');




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

  router.put("/cambiar/:id", (req, res) => {
    const { id } = req.params;
  
    const query = `
      UPDATE rol
      SET tipo = CASE
        WHEN tipo = 0 THEN 1  -- Si el tipo es 0 (admin), cambiar a 1 (cliente)
        WHEN tipo = 1 THEN 2  -- Si el tipo es 1 (cliente), cambiar a 2 (comercial)
        WHEN tipo = 2 THEN 0  -- Si el tipo es 3 (comercial), cambiar a 0 (admin)
      END
      WHERE id_rol = ?`;  
  
    conexion.query(query, [id], (err, result) => {
      if (err) {
        return res.status(500).json({ error: 'Error al cambiar el tipo de rol' });
      }
  
      if (result.affectedRows === 0) {
        return res.status(404).json({ message: 'Rol no encontrado' });
      }
  
      res.status(200).json({ message: 'Tipo de rol cambiado exitosamente' });
    });
  });
  
 

  module.exports = router;