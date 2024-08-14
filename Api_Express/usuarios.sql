

-- Insertar datos en la tabla 'usuarios'
INSERT INTO usuarios (nombre, apellidos, email, password, direccion, dni) VALUES
('Juanjo', 'Toledo', 'juanjo@gmail.com', 'juanjo', '1234 Elm Street', '12345678A'),
('Pepito', 'Perez', 'pepito@gmail.com', 'pepito', 'Calle Falsa 123', '23456789B'),
('Olive', 'Crallan', 'ocrallan1@arizona.edu', 'B8fK4xL6', '5678 Oak Avenue', '34567890C'),
('Hashim', 'Osgerby', 'hosgerby2@ow.ly', 'Y7uN3wJ9', '9101 Pine Lane', '45678901D'),
('Kaycee', 'Stronack', 'kstronack3@eventbrite.com', 'M4tW8dR5', '1123 Maple Street', '56789012E'),
('Nick', 'Ions', 'nions4@army.mil', 'L1hV9cP3', '1214 Cedar Road', '67890123F'),
('Ruben', 'Scoggins', 'rscoggins5@comcast.net', 'Q2rJ8wK6', '1315 Birch Blvd', '78901234G'),
('Cecil', 'Hustings', 'chustings6@tinyurl.com', 'P7dM4yV2', '1416 Walnut Way', '89012345H'),
('Baron', 'Colhoun', 'bcolhoun7@guardian.co.uk', 'X9lF5bR8', '1517 Spruce Circle', '90123456J'),
('Flin', 'Brantzen', 'fbrantzen8@statcounter.com', 'R6vT3pN1', '1618 Willow Drive', '01234567K'),
('Moishe', 'Fealey', 'mfealey9@g.co', 'K8jH1xP7', '1719 Aspen Lane', '12345678L'),
('Poppy', 'Brainsby', 'pbrainsbya@about.com', 'N4wQ2rT9', '1820 Fir Avenue', '23456789M'),
('Eb', 'Flament', 'eflamentb@uiuc.edu', 'Z3vM7xR8', '1921 Sycamore Street', '34567890N'),
('Denis', 'Golledge', 'dgolledgec@so-net.ne.jp', 'F6yL2rW9', '2022 Cedar Park', '45678901P'),
('Vally', 'Astridge', 'vastridged@nytimes.com', 'W5qN8pR3', '2123 Poplar Street', '56789012Q'),
('Aurora', 'Shattock', 'ashattocke@npr.org', 'T9hM2vF6', '2224 Birch Lane', '67890123R'),
('Boonie', 'Decruse', 'bdecrusef@so-net.ne.jp', 'J4kL9rP2', '2325 Maple Avenue', '78901234S'),
('Deane', 'Fairtlough', 'dfairtloughg@opensource.org', 'Y3vN6pT7', '2426 Oak Street', '89012345T'),
('Darnell', 'Benedicte', 'dbenedicteh@godaddy.com', 'M8rK4wQ2', '2527 Pine Way', '90123456U'),
('Syman', 'Kedward', 'skedwardi@timesonline.co.uk', 'L7xN2pF9', '2628 Elm Boulevard', '01234567V');



INSERT INTO productos (nombre_producto, descripcion, precio_unitario, stock, categoria) VALUES
('Teclado Mecánico', 'Teclado mecánico con retroiluminación RGB', 89.99, 50, 'Periféricos'),
('Ratón Gaming', 'Ratón ergonómico con 6 botones programables', 49.99, 100, 'Periféricos'),
('Pantalla 24"', 'Pantalla LCD de 24 pulgadas Full HD', 179.99, 30, 'Monitores'),
('Ordenador Portátil', 'Ordenador portátil con procesador i7 y 16GB de RAM', 1299.99, 20, 'Computadoras'),
('Auriculares Bluetooth', 'Auriculares inalámbricos con cancelación de ruido', 119.99, 75, 'Accesorios'),
('Teclado USB', 'Teclado estándar con cable USB', 29.99, 200, 'Periféricos'),
('Ratón Óptico', 'Ratón óptico con rueda de desplazamiento', 19.99, 150, 'Periféricos'),
('Pantalla 27"', 'Pantalla LCD de 27 pulgadas 4K', 299.99, 25, 'Monitores'),
('Ordenador de Sobremesa', 'Ordenador de sobremesa con procesador Ryzen 5 y 8GB de RAM', 799.99, 15, 'Computadoras'),
('Webcam HD', 'Cámara web HD con micrófono integrado', 59.99, 80, 'Accesorios'),
('Teclado Inalámbrico', 'Teclado inalámbrico compacto con batería recargable', 69.99, 60, 'Periféricos'),
('Ratón Ergonómico', 'Ratón ergonómico con ajuste de DPI', 39.99, 90, 'Periféricos'),
('Pantalla Curva 34"', 'Pantalla curva ultrapanorámica de 34 pulgadas', 499.99, 10, 'Monitores'),
('Ordenador Gaming', 'Ordenador de alto rendimiento para gaming', 1999.99, 5, 'Computadoras'),
('Monitor 4K', 'Monitor 4K de 32 pulgadas con alto rango dinámico', 399.99, 18, 'Monitores'),
('Teclado Retroiluminado', 'Teclado mecánico con retroiluminación personalizable', 109.99, 55, 'Periféricos'),
('Ratón para Diseño', 'Ratón de alta precisión para diseño gráfico', 89.99, 40, 'Periféricos'),
('Pantalla Táctil 21"', 'Pantalla táctil de 21 pulgadas para uso profesional', 249.99, 12, 'Monitores'),
('Ordenador Todo en Uno', 'Ordenador todo en uno con pantalla de 27 pulgadas', 1499.99, 8, 'Computadoras'),
('Docking Station', 'Estación de acoplamiento para laptop con múltiples puertos', 89.99, 70, 'Accesorios');




INSERT INTO rol (id_usuario, tipo) VALUES
(6, 0),  
(9, 0),  
(1, 1),  
(2, 1), 
(3, 0),  
(4, 0),  
(5, 0),  
(7, 0),  
(8, 0),  
(10, 0), 
(11, 0), 
(12, 0), 
(13, 0), 
(14, 0), 
(15, 0), 
(16, 0), 
(17, 0), 
(18, 0), 
(19, 0), 
(20, 0);  

INSERT INTO carrito (id_usuario) VALUES
(1),
(2),
(3),
(4),
(5),
(6),
(7),
(8),
(9),
(10),
(11),
(12),
(13),
(14),
(15),
(16),
(17),
(18),
(19),
(20);