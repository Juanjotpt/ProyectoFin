

INSERT INTO productos (nombre_producto, descripcion, precio_unitario, stock, categoria, imagen)
VALUES
('Teclado Mecánico', 'Teclado mecánico con retroiluminación RGB', 89.99, 50, 'Periféricos', 'teclado.jpg'),
('Ratón Gaming', 'Ratón ergonómico con 6 botones programables', 49.99, 100, 'Periféricos', 'raton.png'),
('Pantalla 24"', 'Pantalla LCD de 24 pulgadas Full HD', 179.99, 30, 'Monitores', 'pantalla.png'),
('Ordenador Portátil', 'Ordenador portátil con procesador i7 y 16GB de RAM', 1299.99, 20, 'Computadoras', 'laptop.jpg'),
('Auriculares Bluetooth', 'Auriculares inalámbricos con cancelación de ruido', 119.99, 75, 'Accesorios', 'auriculares.png'),
('Teclado USB', 'Teclado estándar con cable USB', 29.99, 200, 'Periféricos', 'tecladoUsb.png'),
('Ratón Óptico', 'Ratón óptico con rueda de desplazamiento', 19.99, 150, 'Periféricos', 'ratonOptico.jpg'),
('Pantalla 27"', 'Pantalla LCD de 27 pulgadas 4K', 299.99, 25, 'Monitores', 'monitor.png'),
('Ordenador de Sobremesa', 'Ordenador de sobremesa con procesador Ryzen 5 y 8GB de RAM', 799.99, 15, 'Computadoras', 'ordenador.png')
ON DUPLICATE KEY UPDATE nombre_producto = VALUES(nombre_producto);

