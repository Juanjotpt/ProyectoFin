
const mysql = require('mysql2');

const conexion = mysql.createConnection({
  host: 'localhost',
  database: 'proyecto',
  user: 'root',
  password: '',
});

conexion.connect((error) => {
  if (error) {
    console.error('Error connecting to the database:', error.stack);
    return;
  }
  console.log('Exito en la conexión a la base de datos');
});




module.exports = conexion;
