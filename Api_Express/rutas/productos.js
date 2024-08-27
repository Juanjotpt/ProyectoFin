const express = require('express');
const router = express.Router();
const conexion = require('../models/conexion.js'); // Archivo de conexión a la base de datos

// Ruta para obtener todos los productos
router.get('/', (req, res) => { // Ruta base, no es necesario incluir '/productos'
    const query = "SELECT * FROM productos";
    conexion.query(query, (error, resultado) => {
        if (error) {
            console.error(error.message);
            return res.status(500).send("Error al obtener los productos");
        }
        res.json(resultado.length > 0 ? resultado : "No hay registros");
    });
});

// Ruta para obtener un producto por su ID
router.get('/:id', (req, res) => { // Ruta base
    const { id } = req.params;
    const query = "SELECT * FROM productos WHERE id_producto = ?";
    conexion.query(query, [id], (error, resultado) => { // Usar consulta parametrizada
        if (error) {
            console.error(error.message);
            return res.status(500).send("Error al obtener el producto");
        }
        res.json(resultado.length > 0 ? resultado[0] : "No hay registro con ese id"); // Devolver el primer registro o un mensaje
    });
});

// Ruta para agregar un nuevo producto
router.post('/agregar', (req, res) => { // Ruta base
    const producto = {
        nombre_producto: req.body.nombre_producto,
        descripcion: req.body.descripcion,
        precio_unitario: req.body.precio_unitario,
        stock: req.body.stock,
        categoria: req.body.categoria,
    };
    const query = "INSERT INTO productos SET ?";
    conexion.query(query, producto, (error, resultado) => {
        if (error) {
            console.error(error.message);
            return res.status(500).send("Error al insertar el producto");
        }
        res.json("Se insertó correctamente el producto");
    });
});

// Ruta para actualizar un producto por su ID
router.put('/actualizar/:id', (req, res) => { // Ruta base
    const { id } = req.params;
    const { nombre_producto, descripcion, precio_unitario, stock, categoria } = req.body;
    
    const query = `
        UPDATE productos 
        SET nombre_producto = ?, descripcion = ?, precio_unitario = ?, stock = ?, categoria = ?
        WHERE id_producto = ?`;
    const values = [nombre_producto, descripcion, precio_unitario, stock, categoria, id];

    conexion.query(query, values, (error, resultado) => { // Usar consulta parametrizada
        if (error) {
            console.error(error.message);
            return res.status(500).send("Error al actualizar el producto");
        }
        res.json("Se actualizó el producto");
    });
});

// Ruta para eliminar un producto por su ID
router.delete('/borrar/:id', (req, res) => { // Ruta base
    const { id } = req.params;
    const query = "DELETE FROM productos WHERE id_producto = ?";
    conexion.query(query, [id], (error, resultado) => {
        if (error) {
            console.error(error.message);
            return res.status(500).send("Error al eliminar el producto, el producto está referenciado en otra tabla");
        }
        res.json("Se eliminó el producto");
    });
});

module.exports = router;
