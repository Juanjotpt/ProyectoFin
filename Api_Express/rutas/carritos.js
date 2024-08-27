const express = require('express');
const router = express.Router();
const conexion = require('../models/conexion.js');

// Ruta para obtener todos los carritos
router.get('/', (req, res) => { 
    const query = `
        SELECT 
            carrito.id_carrito, 
            carrito.id_usuario, 
            usuarios.nombre AS nombre_usuario
        FROM 
            carrito
        JOIN 
            usuarios ON carrito.id_usuario = usuarios.id_usuario
    `;
  
    conexion.query(query, (error, resultado) => {
        if (error) {
            console.error("Error al obtener los carritos:", error.message);
            return res.status(500).send("Error al obtener los carritos");
        }
        console.log("Resultados obtenidos:", resultado); // Para depuración
        res.json(resultado.length > 0 ? resultado : "No hay registros");
    });
});

// Ruta para obtener un carrito por su ID
router.get('/:id', (req, res) => { 
    const { id } = req.params;
    const query = "SELECT * FROM carrito WHERE id_carrito = ?";
    conexion.query(query, [id], (error, resultado) => { 
        if (error) {
            console.error("Error al obtener el carrito:", error.message);
            return res.status(500).send("Error al obtener el carrito");
        }
        console.log("Resultado obtenido para el carrito con ID", id, ":", resultado); // Para depuración
        res.json(resultado.length > 0 ? resultado[0] : "No hay registro con ese id");
    });
});

// Ruta para agregar un nuevo carrito
router.post('/agregar', (req, res) => { 
    const carrito = {
        id_usuario: req.body.id_usuario,
    };
    const query = "INSERT INTO carrito SET ?";
    conexion.query(query, carrito, (error, resultado) => {
        if (error) {
            console.error("Error al insertar el carrito:", error.message);
            return res.status(500).send("Error al insertar el carrito");
        }
        console.log("Carrito insertado:", resultado); // Para depuración
        res.json("Se insertó correctamente el carrito");
    });
});

// Ruta para actualizar un carrito por su ID
router.put('/actualizar/:id', (req, res) => { 
    const { id } = req.params;
    const { id_usuario } = req.body;
    const query = "UPDATE carrito SET id_usuario = ? WHERE id_carrito = ?";
    conexion.query(query, [id_usuario, id], (error, resultado) => { 
        if (error) {
            console.error("Error al actualizar el carrito:", error.message);
            return res.status(500).send("Error al actualizar el carrito");
        }
        console.log("Carrito actualizado:", resultado); // Para depuración
        res.json("Se actualizó el carrito");
    });
});

// Ruta para eliminar un carrito por su ID
router.delete('/borrar/:id', (req, res) => { 
    const { id } = req.params;
    const query = "DELETE FROM carrito WHERE id_carrito = ?";
    conexion.query(query, [id], (error, resultado) => { 
        if (error) {
            console.error("Error al eliminar el carrito:", error.message);
            return res.status(500).send("Error al eliminar el carrito");
        }
        console.log("Carrito eliminado:", resultado); // Para depuración
        res.json("Se eliminó el carrito");
    });
});

module.exports = router;
