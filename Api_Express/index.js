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

const queries1 = sqlUsuarios .split(";")
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
  const { nombre, email, apellidos, password } = req.body;
  const query = `UPDATE usuarios SET nombre='${nombre}', email='${email}', apellidos='${apellidos}', password='${password}' WHERE id_usuario='${id}'`;
  conexion.query(query, (error, resultado) => {
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
      res.status(500).send("Error al eliminar el usuario, el usuario está referenciado en otra tabla");
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
    nombre: req.body.nombre,
    precio: req.body.precio,
    descripcion: req.body.descripcion,
  };
  const query = `INSERT INTO productos SET ?`;
  conexion.query(query, producto, (error, resultado) => {
    if (error) {
      console.error(error.message);
      res.status(500).send("Error al insertar el producto");
    } else {
      res.json(`Se insertó correctamente el producto`);
    }
  });
});

// Ruta para actualizar un producto por su ID
app.put("/productos/actualizar/:id", (req, res) => {
  const { id } = req.params;
  const { nombre, precio, descripcion } = req.body;
  const query = `UPDATE productos SET nombre='${nombre}', precio=${precio}, descripcion='${descripcion}' WHERE id_producto='${id}'`;
  conexion.query(query, (error, resultado) => {
    if (error) {
      console.error(error.message);
      res.status(500).send("Error al actualizar el producto");
    } else {
      res.json(`Se actualizó el producto`);
    }
  });
});

// Ruta para eliminar un producto por su ID
app.delete("/productos/borrar/:id", (req, res) => {
  const { id } = req.params;
  const query = `DELETE FROM productos WHERE id_producto=${id}`;
  conexion.query(query, (error, resultado) => {
    if (error) {
      console.error(error.message);
      res.status(500).send("Error al eliminar el producto");
    } else {
      res.json("Se eliminó el producto");
    }
  });
});
