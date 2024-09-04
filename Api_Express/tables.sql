
CREATE TABLE IF NOT EXISTS usuarios (
    id_usuario INT NOT NULL AUTO_INCREMENT,
    nombre VARCHAR(50),
    apellidos VARCHAR(50),
    email VARCHAR(50),
    password VARCHAR(100),
    direccion VARCHAR(60),
    dni VARCHAR(9) UNIQUE,
    PRIMARY KEY (id_usuario)
);


CREATE TABLE IF NOT EXISTS productos (
    id_producto INT NOT NULL AUTO_INCREMENT,
    nombre_producto VARCHAR(50) UNIQUE,
    descripcion VARCHAR(100),
    precio_unitario DECIMAL(10,2),
    stock INT,
    categoria VARCHAR(50),
    PRIMARY KEY (id_producto)
);
CREATE TABLE IF NOT EXISTS rol (
    id_rol INT NOT NULL AUTO_INCREMENT,
    id_usuario INT NOT NULL,
    tipo BOOLEAN NOT NULL,
    PRIMARY KEY (id_rol),
    FOREIGN KEY (id_usuario) REFERENCES usuarios(id_usuario)
);

CREATE TABLE IF NOT EXISTS carrito (
    id_carrito INT NOT NULL AUTO_INCREMENT,
    id_usuario INT NOT NULL,
    PRIMARY KEY (id_carrito),
    FOREIGN KEY (id_usuario) REFERENCES usuarios(id_usuario)
);

CREATE TABLE IF NOT EXISTS productos_carrito (
    id_productos_carrito INT NOT NULL AUTO_INCREMENT,
    id_producto INT NOT NULL,
    id_carrito INT NOT NULL,
    cantidad INT NOT NULL,
    PRIMARY KEY (id_productos_carrito),
    UNIQUE KEY unique_product_carrito (id_producto, id_carrito),
    FOREIGN KEY (id_producto) REFERENCES productos(id_producto),
    FOREIGN KEY (id_carrito) REFERENCES carrito(id_carrito)
);

CREATE TABLE IF NOT EXISTS ventas (
    id_venta INT NOT NULL AUTO_INCREMENT,
    id_usuario INT NOT NULL,
    total DECIMAL(10, 2) NOT NULL,
    PRIMARY KEY (id_venta),
    FOREIGN KEY (id_usuario) REFERENCES usuarios(id_usuario)
);


CREATE TABLE IF NOT EXISTS detalle_venta (
    id_detalle_venta INT NOT NULL AUTO_INCREMENT,
    id_venta INT NOT NULL,
    id_producto INT NOT NULL,
    cantidad INT NOT NULL,
    precio DECIMAL(10, 2) NOT NULL,
    PRIMARY KEY (id_detalle_venta),
    FOREIGN KEY (id_venta) REFERENCES ventas(id_venta),
    FOREIGN KEY (id_producto) REFERENCES productos(id_producto)
);

