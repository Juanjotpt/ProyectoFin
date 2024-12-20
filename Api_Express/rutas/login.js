const express = require("express");
const router = express.Router();
const conexion = require("../models/conexion.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { body, validationResult } = require("express-validator");
const { verificarUsuario } = require("../models/User");

const secret_key = "P@ssw0rd";

router.post(
  "/registro",
  body("email").isEmail().withMessage("Debe ser un email válido"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("La contraseña debe tener al menos 6 caracteres"),
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errores: errors.array() });
    }

    const { nombre, email, password, apellidos, direccion, dni } = req.body;

    const newUser = {
      nombre,
      email,
      password: bcrypt.hashSync(password, 8),
      apellidos,
      direccion,
      dni,
    };

    const queryUsuario = "INSERT INTO usuarios SET ?";
    conexion.query(queryUsuario, newUser, (err, result) => {
      if (err) {
        console.error("Error al insertar el usuario:", err);
        return res.status(500).send("Error en el servidor");
      }

      const userId = result.insertId;

      // Crear el rol del usuario
      const newRole = {
        id_usuario: userId,
        tipo: 0,
      };

      const queryRole = "INSERT INTO rol SET ?";
      conexion.query(queryRole, newRole, (err) => {
        if (err) {
          console.error("Error al insertar el rol:", err);
          return res.status(500).send("Error en el servidor");
        }

        const newCarrito = {
          id_usuario: userId,
        };

        const queryCarrito = "INSERT INTO carrito SET ?";
        conexion.query(queryCarrito, newCarrito, (err, resultCarrito) => {
          if (err) {
            console.error("Error al crear el carrito:", err);
            return res
              .status(500)
              .send("Error en el servidor al crear el carrito");
          }

          const idCarrito = resultCarrito.insertId;

          // Generar el token con el ID del usuario y carrito
          const expiresIn = 24 * 60 * 60;
          const accessToken = jwt.sign(
            { id: userId, id_carrito: idCarrito },
            secret_key,
            {
              expiresIn: expiresIn,
            }
          );

          // Enviar respuesta con el usuario y el token
          res.status(201).send({
            usuario: { id: userId, nombre, email, id_carrito: idCarrito },
            accessToken,
          });
        });
      });
    });
  }
);

router.post("/", (req, res) => {
  const { email, password } = req.body;

  verificarUsuario(email, password, (err, usuario) => {
    if (err) {
      return res.status(500).send("Error al verificar el usuario");
    }
    if (!usuario) {
      return res.status(401).send("Credenciales incorrectas");
    }

    const queryCarrito = "SELECT id_carrito FROM carrito WHERE id_usuario = ?";
    conexion.query(queryCarrito, [usuario.id_usuario], (err, resultCarrito) => {
      if (err) {
        console.error("Error al obtener el carrito del usuario:", err);
        return res
          .status(500)
          .send("Error en el servidor al obtener el carrito");
      }

      // Si no hay carrito, dejamos idCarrito como null
      const idCarrito =
        resultCarrito.length > 0 ? resultCarrito[0].id_carrito : null;

      // Crear el token con el ID del usuario, el rol y el carrito
      const payload = {
        id: usuario.id_usuario,
        rol_tipo: usuario.rol_tipo,
        nombre: usuario.nombre,
        id_carrito: idCarrito,
        email: usuario.email,
        direccion: usuario.direccion,
      };
      const token = jwt.sign(payload, secret_key, { expiresIn: "1h" });

      // Redirigir según el rol del usuario
      if (usuario.rol_tipo === 1) {
        res.json({ token, redirectTo: "/admin" });
      } else if (usuario.rol_tipo === 0) {
        res.json({ token, redirectTo: "/cliente" });
      } else if (usuario.rol_tipo === 2) {
        res.json({ token, redirectTo: "/comercial" });
      } else {
        res.status(403).send("Rol no reconocido");
      }
    });
  });
});

module.exports = router;
