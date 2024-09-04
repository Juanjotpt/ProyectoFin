const express = require('express');
const router = express.Router();
const conexion = require('../models/conexion.js');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');
const { verificarUsuario } = require('../models/User');

const secret_key = 'secretkey123456'; // Debe ser un secreto fuerte

// Ruta para el registro de usuarios
router.post('/registro',
  body('email').isEmail().withMessage('Debe ser un email válido'),
  body('password').isLength({ min: 6 }).withMessage('La contraseña debe tener al menos 6 caracteres'),
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errores: errors.array() });
    }

    const { nombre, email, password, apellidos, direccion, dni } = req.body;

    // Inserción en la tabla usuarios
    const newUser = {
      nombre,
      email,
      password: bcrypt.hashSync(password, 8),
      apellidos,
      direccion,
      dni,
    };

    const queryUsuario = 'INSERT INTO usuarios SET ?';
    conexion.query(queryUsuario, newUser, (err, result) => {
      if (err) {
        console.error('Error al insertar el usuario:', err);
        return res.status(500).send('Error en el servidor');
      }

      const userId = result.insertId;

      // Inserción en la tabla roles
      const newRole = {
        id_usuario: userId,
        tipo: 0 // Valor por defecto para el tipo de rol
      };

      const queryRole = 'INSERT INTO rol SET ?';
      conexion.query(queryRole, newRole, (err) => {
        if (err) {
          console.error('Error al insertar el rol:', err);
          return res.status(500).send('Error en el servidor');
        }

        const expiresIn = 24 * 60 * 60; // 24 horas
        const accessToken = jwt.sign({ id: userId }, secret_key, {
          expiresIn: expiresIn,
        });

        res.status(201).send({ usuario: { id: userId, nombre, email }, accessToken });
      });
    });
  }
);


// Ruta para el login de usuarios
router.post('/', (req, res) => {
  const { email, password } = req.body;

  verificarUsuario(email, password, (err, usuario) => {
    if (err) {
      return res.status(500).send('Error al verificar el usuario');
    }
    if (!usuario) {
      return res.status(401).send('Credenciales incorrectas');
    }

    // Crear el token JWT
    const payload = { id: usuario.id_usuario, rol_tipo: usuario.rol_tipo };
    const token = jwt.sign(payload, secret_key, { expiresIn: '1h' });

    // Redirigir según el tipo de rol
    if (usuario.rol_tipo === 1) {
      res.json({ token, redirectTo: '/admin' });
    } else if (usuario.rol_tipo === 0) {
      res.json({ token, redirectTo: '/cliente' });
    } else {
      res.status(403).send('Rol no reconocido');
    }
  });
});

module.exports = router;