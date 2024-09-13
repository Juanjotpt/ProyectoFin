-- Insertar datos en la tabla 'usuarios'
INSERT INTO usuarios (nombre, apellidos, email, password, direccion, dni) VALUES
('Juanjo', 'Toledo', 'juanjo@gmail.com', 'juanjo', '1234 Elm Street', '12345678A'),
('Pepito', 'Perez', 'pepito@gmail.com', 'pepito', 'Calle Falsa 123', '23456789B'),
('Olive', 'Crallan', 'ocrallan1@arizona.edu', 'B8fK4xL6', '5678 Oak Avenue', '34567890C'),
('Hashim', 'Osgerby', 'hosgerby2@ow.ly', 'Y7uN3wJ9', '9101 Pine Lane', '45678901D');

-- Insertar datos en la tabla 'productos'
INSERT INTO productos (nombre_producto, descripcion, precio_unitario, stock, categoria, imagen) VALUES
('Teclado Mecánico', 'Teclado mecánico con retroiluminación RGB', 89.99, 50, 'Periféricos', 'teclado.jpg'),
('Ratón Gaming', 'Ratón ergonómico con 6 botones programables', 49.99, 100, 'Periféricos', 'raton.png'),
('Pantalla 24"', 'Pantalla LCD de 24 pulgadas Full HD', 179.99, 30, 'Monitores', 'pantalla.png'),
('Ordenador Portátil', 'Ordenador portátil con procesador i7 y 16GB de RAM', 1299.99, 20, 'Computadoras', 'laptop.jpg'),
('Auriculares Bluetooth', 'Auriculares inalámbricos con cancelación de ruido', 119.99, 75, 'Accesorios', 'auriculares.png'),
('Teclado USB', 'Teclado estándar con cable USB', 29.99, 200, 'Periféricos', 'tecladoUsb.png'),
('Ratón Óptico', 'Ratón óptico con rueda de desplazamiento', 19.99, 150, 'Periféricos', 'ratonOptico.jpg'),
('Pantalla 27"', 'Pantalla LCD de 27 pulgadas 4K', 299.99, 25, 'Monitores', 'monitor.png'),
('Ordenador de Sobremesa', 'Ordenador de sobremesa con procesador Ryzen 5 y 8GB de RAM', 799.99, 15, 'Computadoras', 'ordenador.png');

-- Insertar datos en la tabla 'rol'
INSERT INTO rol (id_usuario, tipo) VALUES
(1, 1),  
(2, 1), 
(3, 0),  
(4, 0);

-- Insertar datos en la tabla 'carrito'
INSERT INTO carrito (id_usuario) VALUES
(1),
(2),
(3),
(4);
