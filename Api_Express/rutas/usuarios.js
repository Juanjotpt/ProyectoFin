const express = require('express');
const router = express.Router();
const conexion = require('../models/conexion.js');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');
const { verificarUsuario } = require('../models/User'); 

const secret_key = 'secretkey123456';


router.get('/', (req, res) => {
  const query = 'SELECT * FROM usuarios';
  conexion.query(query, (error, resultado) => {
    if (error) {
      console.log(error.message);
      res.status(500).send('Error al obtener los usuarios');
    } else {
      res.json(resultado.length > 0 ? resultado : 'No hay registros');
    }
  });
});


router.get("/:id", (req, res) => { 
  const { id } = req.params;
  const query = 'SELECT * FROM usuarios WHERE id_usuario = ?';
  conexion.query(query, [id], (error, resultado) => {
    if (error) {
      console.error(error.message);
      res.status(500).send("Error al obtener el usuario");
    } else {
      res.json(resultado.length > 0 ? resultado : "No hay registro con ese id");
    }
  });
});


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
        console.error(error.message);
        res.status(500).send("Error al insertar el usuario");
      } else {
        res.json('Se insertó correctamente el usuario');
      }
    });
  }
);


router.put("/actualizar/:id", (req, res) => { 
  const { id } = req.params;
  const { nombre, email, apellidos, password, direccion, dni } = req.body;
  
  // Hasheando la nueva contraseña si es proporcionada
  const hashedPassword = password ? bcrypt.hashSync(password, 8) : undefined;

  const query = `
    UPDATE usuarios 
    SET nombre = ?, email = ?, apellidos = ?, password = COALESCE(?, password), direccion = ?, dni = ? 
    WHERE id_usuario = ?`;
  const values = [nombre, email, apellidos, hashedPassword, direccion, dni, id];

  conexion.query(query, values, (error, resultado) => {
    if (error) {
      console.error(error.message);
      res.status(500).send("Error al actualizar el usuario");
    } else {
      res.json('Se actualizó el usuario');
    }
  });
});


router.delete("/borrar/:id", (req, res) => { 
  const { id } = req.params;
  const query = 'DELETE FROM usuarios WHERE id_usuario = ?';
  conexion.query(query, [id], (error, resultado) => {
    if (error) {
      console.error(error.message);
      res.status(500).send("Error al eliminar el usuario, el usuario está referenciado en otra tabla");
    } else {
      res.json('Se eliminó el usuario');
    }
  });
});


router.post('/registro',
  body('email').isEmail().withMessage('Debe ser un email válido'),
  body('password').isLength({ min: 6 }).withMessage('La contraseña debe tener al menos 6 caracteres'),
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errores: errors.array() });
    }

    const { nombre, email, password,apellidos,direccion,dni } = req.body;

    const newUser = {
      nombre,
      email,
      password: bcrypt.hashSync(password, 8),
      apellidos,
      direccion,
      dni,
    };

    
    const query = 'INSERT INTO usuarios SET ?';
    conexion.query(query, newUser, (err, result) => {
      if (err) return res.status(500).send('Error en el servidor');

      const expiresIn = 24 * 60 * 60; 
      const accessToken = jwt.sign({ id: result.insertId }, secret_key, {
        expiresIn: expiresIn,
      });

      res.status(201).send({ usuario: { id: result.insertId, nombre, email }, accessToken });
    });
  }
);


router.post('/login', (req, res) => {
  const { email, password } = req.body;

  verificarUsuario(email, password, (err, usuario) => {
    if (err) {
      return res.status(500).send('Error al verificar el usuario');
    }
    if (!usuario) {
      return res.status(401).send('Credenciales incorrectas');
    }

    // Crear el token JWT
    const payload = { id: usuario.id_usuario }; // Payload con el ID del usuario
    const token = jwt.sign(payload, secret_key, { expiresIn: '1h' }); // Token válido por 1 hora

    res.json({ token });
  });
});

module.exports = router;
