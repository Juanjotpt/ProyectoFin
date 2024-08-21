const express = require("express");
const mysql = require("mysql2");
const bodyParser = require("body-parser");
const fs = require("fs");
const cors = require("cors");

const app = express();
const PUERTO = 3000;

const sqlTables = fs.readFileSync("tables.sql", "utf8");

// Leer el contenido del archivo SQL
const sqlUsuarios = fs.readFileSync("usuarios.sql", "utf8");

const queries1 = sqlUsuarios
  .split(";")
  .map((query) => query.trim())
  .filter((query) => query);

const queries = sqlTables
  .split(";")
  .map((query) => query.trim())
  .filter((query) => query);

// Middleware para configurar CORS
app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "*");
  next();
});

app.use(bodyParser.json());
app.use(cors());

// Configuración de la conexión a la base de datos MySQL
const conexion = mysql.createConnection({
  host: "localhost",
  database: "proyecto",
  user: "root",
  password: "",
});

// Conexión a la base de datos y ejecución del script SQL
conexion.connect((error) => {
  if (error) {
    console.error("Error connecting to the database:", error.stack);
    return;
  }
  console.log("Exito en la conexión");
  // Ejecutar cada sentencia individualmente
  queries.forEach((query, index) => {
    conexion.query(query, (err, results) => {
      if (err) {
        console.error(`Error ejecutando la consulta ${index + 1}:`, err.stack);
        return;
      }
      console.log(`Consulta ${index + 1} ejecutada exitosamente:`, results);
    });
  });
  queries1.forEach((query, index) => {
    conexion.query(query, (err, results) => {
      if (err) {
        console.error(`Error ejecutando la consulta ${index + 1}:`, err.stack);
        return;
      }
      console.log(`Consulta ${index + 1} ejecutada exitosamente:`, results);
    });
  });

  // Inicia el servidor después de ejecutar el script SQL
  app.listen(PUERTO, () => {
    console.log(`Servidor OK en ${PUERTO}`);
  });
});

// Ruta raíz que responde con un archivo HTML
app.get("/", (req, res) => {
  res.sendFile("../Tienda/src/index.html", { root: __dirname });
});

// Ruta para obtener todos los usuarios
app.get("/usuarios", (req, res) => {
  const query = "SELECT * FROM usuarios";
  conexion.query(query, (error, resultado) => {
    if (error) {
      console.log(error.message);
      res.status(500).send("Error al obtener los usuarios");
    } else {
      res.json(resultado.length > 0 ? resultado : "No hay registros");
    }
  });
});

// Ruta para obtener un usuario por su ID
app.get("/usuarios/:id", (req, res) => {
  const { id } = req.params;
  const query = `SELECT * FROM usuarios WHERE id_usuario=${id}`;
  conexion.query(query, (error, resultado) => {
    if (error) {
      console.error(error.message);
      res.status(500).send("Error al obtener el usuario");
    } else {
      res.json(resultado.length > 0 ? resultado : "No hay registro con ese id");
    }
  });
});

// Ruta para agregar un nuevo usuario
app.post("/usuarios/agregar", (req, res) => {
  const usuario = {
    nombre: req.body.nombre,
    apellidos: req.body.apellidos,
    email: req.body.email,
    password: req.body.password,
    direccion: req.body.direccion,
    dni: req.body.dni,
  };
  const query = `INSERT INTO usuarios SET ?`;
  conexion.query(query, usuario, (error, resultado) => {
    if (error) {
      console.error(error.message);
      res.status(500).send("Error al insertar el usuario");
    } else {
      res.json(`Se insertó correctamente el usuario`);
    }
  });
});

// Ruta para actualizar un usuario por su ID
app.put("/usuarios/actualizar/:id", (req, res) => {
  const { id } = req.params;
  const { nombre, email, apellidos, password, direccion, dni } = req.body;
  const query = `
    UPDATE usuarios 
    SET nombre = ?, email = ?, apellidos = ?, password = ?, direccion = ?, dni = ? 
    WHERE id_usuario = ?`;
  const values = [nombre, email, apellidos, password, direccion, dni, id];

  conexion.query(query, values, (error, resultado) => {
    if (error) {
      console.error(error.message);
      res.status(500).send("Error al actualizar el usuario");
    } else {
      res.json(`Se actualizó el usuario`);
    }
  });
});

// Ruta para eliminar un usuario por su ID
app.delete("/usuarios/borrar/:id", (req, res) => {
  const { id } = req.params;
  const query = `DELETE FROM usuarios WHERE id_usuario=${id}`;
  conexion.query(query, (error, resultado) => {
    if (error) {
      console.error(error.message);
      res
        .status(500)
        .send(
          "Error al eliminar el usuario, el usuario está referenciado en otra tabla"
        );
    } else {
      res.json("Se eliminó el usuario");
    }
  });
});
// Ruta para obtener todos los productos
app.get("/productos", (req, res) => {
  const query = "SELECT * FROM productos";
  conexion.query(query, (error, resultado) => {
    if (error) {
      console.log(error.message);
      res.status(500).send("Error al obtener los productos");
    } else {
      res.json(resultado.length > 0 ? resultado : "No hay registros");
    }
  });
});

// Ruta para obtener un producto por su ID
app.get("/productos/:id", (req, res) => {
  const { id } = req.params;
  const query = `SELECT * FROM productos WHERE id_producto=${id}`;
  conexion.query(query, (error, resultado) => {
    if (error) {
      console.error(error.message);
      res.status(500).send("Error al obtener el producto");
    } else {
      res.json(resultado.length > 0 ? resultado : "No hay registro con ese id");
    }
  });
});



// Ruta para agregar un nuevo producto
app.post("/productos/agregar", (req, res) => {
  const producto = {
    nombre_producto: req.body.nombre_producto,
    descripcion: req.body.descripcion,
    precio_unitario: req.body.precio_unitario,
    stock: req.body.stock,
    categoria: req.body.categoria,
  };
  // Utilizar consultas parametrizadas para evitar inyecciones SQL
  const query = "INSERT INTO productos SET ?";
  conexion.query(query, producto, (error, resultado) => {
    if (error) {
      console.error(error.message);
      res.status(500).send("Error al insertar el producto");
    } else {
      res.json("Se insertó correctamente el producto");
    }
  });
});

// Ruta para actualizar un producto por su ID
app.put("/productos/actualizar/:id", (req, res) => {
  const { id } = req.params;
  const { nombre_producto, descripcion, precio_unitario, stock, categoria } = req.body;

  // Nota: Se asume que los valores en req.body están validados previamente en el cliente o en algún middleware
  
  const query = `UPDATE productos SET nombre_producto='${nombre_producto}', descripcion='${descripcion}', precio_unitario='${precio_unitario}', stock='${stock}', categoria='${categoria}' WHERE id_producto='${id}'`;

  conexion.query(query, (error, resultado) => {
    if (error) {
      console.error(error.message);
      res.status(500).send("Error al actualizar el producto");
    } else {
      res.json("Se actualizó el producto");
    }
  });
});


// Ruta para eliminar un producto por su ID
app.delete("/productos/borrar/:id", (req, res) => {
  const { id } = req.params;
  // Utilizar consultas parametrizadas para evitar inyecciones SQL
  const query = "DELETE FROM productos WHERE id_producto = ?";
  conexion.query(query, [id], (error, resultado) => {
    if (error) {
      console.error(error.message);
      res.status(500).send("Error al eliminar el producto, el producto está referenciado en otra tabla");
    } else {
      res.json("Se eliminó el producto");
    }
  });
});



// Ruta para obtener todos los carritos
app.get("/carritos", (req, res) => {
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
      console.log(error.message);
      res.status(500).send("Error al obtener los carritos");
    } else {
      res.json(resultado.length > 0 ? resultado : "No hay registros");
    }
  });
});

// Ruta para obtener un carrito por su ID
app.get("/carritos/:id", (req, res) => {
  const { id } = req.params;
  const query = `SELECT * FROM carrito WHERE id_carrito=${id}`;
  conexion.query(query, (error, resultado) => {
    if (error) {
      console.error(error.message);
      res.status(500).send("Error al obtener el carrito");
    } else {
      res.json(resultado.length > 0 ? resultado : "No hay registro con ese id");
    }
  });
});

// Ruta para agregar un nuevo carrito
app.post("/carritos/agregar", (req, res) => {
  const carrito = {
    id_usuario: req.body.id_usuario,
  };
  const query = `INSERT INTO carrito SET ?`;
  conexion.query(query, carrito, (error, resultado) => {
    if (error) {
      console.error(error.message);
      res.status(500).send("Error al insertar el carrito");
    } else {
      res.json(`Se insertó correctamente el carrito`);
    }
  });
});

// Ruta para actualizar un carrito por su ID
app.put("/carritos/actualizar/:id", (req, res) => {
  const { id } = req.params;
  const { id_usuario } = req.body;
  const query = `UPDATE carrito SET id_usuario='${id_usuario}' WHERE id_carrito=${id}`;
  conexion.query(query, (error, resultado) => {
    if (error) {
      console.error(error.message);
      res.status(500).send("Error al actualizar el carrito");
    } else {
      res.json(`Se actualizó el carrito`);
    }
  });
});

// Ruta para eliminar un carrito por su ID
app.delete("/carritos/borrar/:id", (req, res) => {
  const { id } = req.params;
  const query = `DELETE FROM carrito WHERE id_carrito=${id}`;
  conexion.query(query, (error, resultado) => {
    if (error) {
      console.error(error.message);
      res.status(500).send("Error al eliminar el carrito");
    } else {
      res.json("Se eliminó el carrito");
    }
  });
});

// Ruta para obtener todos los productos del carrito
app.get("/productos_carrito", (req, res) => {
  const query = "SELECT * FROM productos_carrito";
  conexion.query(query, (error, resultado) => {
    if (error) {
      console.log(error.message);
      res.status(500).send("Error al obtener los productos del carrito");
    } else {
      res.json(resultado.length > 0 ? resultado : "No hay registros");
    }
  });
});

// Ruta para obtener un producto del carrito por su ID
app.get("/productos_carrito/:id", (req, res) => {
  const { id } = req.params;
  const query = `SELECT * FROM productos_carrito WHERE id_productos_carrito = ?`;
  conexion.query(query, [id], (error, resultado) => {
    if (error) {
      console.error(error.message);
      res.status(500).send("Error al obtener el producto del carrito");
    } else {
      res.json(resultado.length > 0 ? resultado[0] : "No hay registro con ese id");
    }
  });
});

// Ruta para agregar un nuevo producto al carrito
app.post("/productos_carrito/agregar", (req, res) => {
  const productoCarrito = {
    id_producto: req.body.id_producto,
    id_carrito: req.body.id_carrito,
    cantidad: req.body.cantidad,
  };
  const query = `INSERT INTO productos_carrito SET ?`;
  conexion.query(query, productoCarrito, (error, resultado) => {
    if (error) {
      console.error(error.message);
      res.status(500).send("Error al insertar el producto en el carrito");
    } else {
      res.json("Se insertó correctamente el producto en el carrito");
    }
  });
});

// Ruta para actualizar un producto del carrito por su ID
app.put("/productos_carrito/actualizar/:id", (req, res) => {
  const { id } = req.params;
  const { id_producto, id_carrito, cantidad } = req.body;
  const query = `
    UPDATE productos_carrito 
    SET id_producto = ?, id_carrito = ?, cantidad = ? 
    WHERE id_productos_carrito = ?`;
  const values = [id_producto, id_carrito, cantidad, id];

  conexion.query(query, values, (error, resultado) => {
    if (error) {
      console.error(error.message);
      res.status(500).send("Error al actualizar el producto del carrito");
    } else {
      res.json("Se actualizó el producto del carrito");
    }
  });
});

// Ruta para eliminar un producto del carrito por su ID
app.delete("/productos_carrito/borrar/:id", (req, res) => {
  const { id } = req.params;
  const query = `DELETE FROM productos_carrito WHERE id_productos_carrito = ?`;
  conexion.query(query, [id], (error, resultado) => {
    if (error) {
      console.error(error.message);
      res
        .status(500)
        .send("Error al eliminar el producto del carrito");
    } else {
      res.json("Se eliminó el producto del carrito");
    }
  });
});
