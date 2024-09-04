const express = require('express');
const router = express.Router();
const conexion = require('../models/conexion.js');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');

// Función de utilidad para manejar errores
function handleError(res, error, message) {
  console.error('Error:', error.message);
  res.status(500).json({ error: message, detalles: error.message });
}

// Obtener todos los usuarios
router.get('/', (req, res) => {
  const query = 'SELECT * FROM usuarios';
  conexion.query(query, (error, resultado) => {
    if (error) {
      handleError(res, error, 'Error al obtener los usuarios');
    } else {
      res.json(resultado.length > 0 ? resultado : { mensaje: 'No hay registros' });
    }
  });
});

// Obtener un usuario por ID
router.get("/:id", (req, res) => { 
  const { id } = req.params;
  const query = 'SELECT * FROM usuarios WHERE id_usuario = ?';
  conexion.query(query, [id], (error, resultado) => {
    if (error) {
      handleError(res, error, "Error al obtener el usuario");
    } else {
      res.json(resultado.length > 0 ? resultado : { mensaje: "No hay registro con ese id" });
    }
  });
});

// Agregar un nuevo usuario
router.post("/agregar",
  body('email').isEmail().withMessage('Debe ser un email válido'),
  body('password').isLength({ min: 6 }).withMessage('La contraseña debe tener al menos 6 caracteres'),
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errores: errors.array() });
    }

    const usuario = {
      nombre: req.body.nombre,
      apellidos: req.body.apellidos,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, 8),  
      direccion: req.body.direccion,
      dni: req.body.dni,
    };

    const query = 'INSERT INTO usuarios SET ?';
    conexion.query(query, usuario, (error, resultado) => {
      if (error) {
        handleError(res, error, "Error al insertar el usuario");
      } else {
        res.json({ mensaje: 'Se insertó correctamente el usuario' });
      }
    });
  }
);

// Actualizar un usuario por ID
router.put("/actualizar/:id",
  body('email').optional().isEmail().withMessage('Debe ser un email válido'),
  body('password').optional().isLength({ min: 6 }).withMessage('La contraseña debe tener al menos 6 caracteres'),
  (req, res) => { 
    const { id } = req.params;
    const { nombre, email, apellidos, password, direccion, dni } = req.body;
  
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errores: errors.array() });
    }

    const hashedPassword = password ? bcrypt.hashSync(password, 8) : undefined;

    let query = 'UPDATE usuarios SET nombre = ?, email = ?, apellidos = ?, direccion = ?, dni = ?';
    const values = [nombre, email, apellidos, direccion, dni, id];

    if (hashedPassword) {
      query += ', password = ?';
      values.splice(4, 0, hashedPassword);  // Inserta la contraseña hasheada en el lugar correcto
    }

    query += ' WHERE id_usuario = ?';

    conexion.query(query, values, (error, resultado) => {
      if (error) {
        handleError(res, error, "Error al actualizar el usuario");
      } else {
        res.json({ mensaje: 'Se actualizó el usuario' });
      }
    });
  }
);

// Eliminar un usuario por ID
router.delete("/borrar/:id", (req, res) => { 
  const { id } = req.params;
  const query = 'DELETE FROM usuarios WHERE id_usuario = ?';
  conexion.query(query, [id], (error, resultado) => {
    if (error) {
      handleError(res, error, "Error al eliminar el usuario, el usuario está referenciado en otra tabla");
    } else {
      res.json({ mensaje: 'Se eliminó el usuario' });
    }
  });
});

module.exports = router;
