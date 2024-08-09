// Importación de módulos necesarios
const express = require("express"); // Framework para manejar el servidor y las rutas
const mysql = require("mysql"); // Cliente MySQL para interactuar con la base de datos
const bodyParser = require("body-parser"); // Middleware para parsear el cuerpo de las solicitudes
const cors = require('cors'); //Importante requerir cors y utilizarlo para permisos

const app = express(); // Creación de una instancia de Express

// Middleware para configurar CORS (Cross-Origin Resource Sharing)
app.use(function (req, res, next) {
  res.setHeader("Acess-Control-Allow-Origin", "*"); // Permite el acceso desde cualquier origen
  res.setHeader("Acess-Control-Allow-methods", "*"); // Permite cualquier método HTTP
  next(); // Pasa al siguiente middleware
});

// Middleware para parsear cuerpos de solicitudes JSON
app.use(bodyParser.json());
app.use(cors());

const PUERTO = 3000; // Define el puerto en el que el servidor escuchará

// Configuración de la conexión a la base de datos MySQL
const conexion = mysql.createConnection({
  host: "localhost",
  database: "proyecto",
  user: "root",
  password: "",
});

// Inicia el servidor y escucha en el puerto especificado
app.listen(PUERTO, () => {
  console.log(`Servidor OK en ${PUERTO}`);
});

// Conexión a la base de datos
conexion.connect((error) => {
  if (error) throw error; // Lanza un error si la conexión falla
  console.log("Exito en la conexión "); // Mensaje de éxito si la conexión es exitosa
});

// Ruta raíz que responde con "API"
app.get("/", (req, res) => {
  res.send("API");
});

// Ruta para obtener todos los usuarios
app.get("/usuarios", (req, res) => {
  const query = "SELECT * FROM usuarios"; // Consulta SQL para obtener todos los usuarios
  conexion.query(query, (error, resultado) => {
    if (error) return console.log(error.message); // Muestra el error si la consulta falla

    if (resultado.length > 0) { // Comprueba si hay resultados
      res.json(resultado); // Envía los resultados en formato JSON
    } else {
      res.json("No hay registros"); // Mensaje si no hay registros
    }
  });
});

// Ruta para obtener un usuario por su ID
app.get("/usuarios/:id", (req, res) => {
  const { id } = req.params; // Obtiene el ID de los parámetros de la ruta

  const query = `SELECT * FROM usuarios WHERE id_usuario=${id}`; // Consulta SQL para obtener el usuario por ID
  conexion.query(query, (error, resultado) => {
    if (error) return console.error(error.message); // Muestra el error si la consulta falla

    if (resultado.length > 0) { // Comprueba si hay resultados
      res.json(resultado); // Envía los resultados en formato JSON
    } else {
      res.json("No hay registro con ese id"); // Mensaje si no hay registros
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
   
  }; // Crea un objeto usuario con los datos del cuerpo de la solicitud

  const query = `INSERT INTO usuarios SET ?`; // Consulta SQL para insertar un nuevo usuario
  conexion.query(query, usuario, (error, resultado) => {
    if (error) return console.error(error.message); // Muestra el error si la consulta falla

    res.json(`Se insertó correctamente el usuario`); 
  });
});

// Ruta para actualizar un usuario por su ID
app.put("/usuarios/actualizar/:id", (req, res) => {
  const { id } = req.params; // Obtiene el ID de los parámetros de la ruta
  const { nombre, email,apellidos, password } = req.body; // Obtiene los datos del cuerpo de la solicitud

  const query = `UPDATE usuarios SET nombre='${nombre}', email='${email}', apellidos='${apellidos}', password='${password}' WHERE id_usuario='${id}'`; // Consulta SQL para actualizar el usuario

  conexion.query(query, (error, resultado) => {
    if (error) return console.error(error.message); // Muestra el error si la consulta falla

    res.json(`Se actualizó el usuario`); 
  });
});


app.delete("/usuarios/borrar/:id", (req, res) => {
  const { id } = req.params; // Obtiene el ID de los parámetros de la ruta

  const query = `DELETE from usuarios WHERE id_usuario=${id}`; // Consulta SQL para eliminar el usuario
  conexion.query(query, (error, resultado) => {
    if (error) return console.error(error.message); // Muestra el error si la consulta falla

    res.json("Se eliminó el usuario"); 
  });
});
