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

app.use(bodyParser.urlencoded({extended: false}));
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

  const usuariosRoutes = require("./rutas/usuarios");
  const productosRoutes = require("./rutas/productos");
  const carritoRoutes = require("./rutas/carritos");
  const productosCarritoRoutes = require("./rutas/productos_carrito");
  const rolesRoutes = require("./rutas/roles");
 

  const loginRoutes= require("./rutas/login");
  

  // Usar las rutas
  app.use("/usuarios", usuariosRoutes);
  app.use("/productos", productosRoutes);
  app.use("/carritos", carritoRoutes);
  app.use("/productos_carrito", productosCarritoRoutes);
  app.use("/roles", rolesRoutes);

 
  app.use("/login", loginRoutes);
  

  // Inicia el servidor después de ejecutar el script SQL
  app.listen(PUERTO, () => {
    console.log(`Servidor OK en ${PUERTO}`);
  });
});

// Ruta raíz que responde con un archivo HTML
app.get("/", (req, res) => {
  res.sendFile("../Tienda/src/index.html", { root: __dirname });
});
