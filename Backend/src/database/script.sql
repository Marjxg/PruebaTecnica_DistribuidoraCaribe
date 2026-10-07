eate database db_ventas;
go
use db_ventas;
go
create table cliente (
	id_cliente int identity(1,1) primary key,
	nombre varchar(100) not null,
	nit varchar(20),
	telefono varchar(20),
	email varchar(100),
	activo bit not null default 1
);
go

create table producto (
	id_producto int identity(1,1) primary key,
	nombre varchar(100) not null,
	precio int not null,
	stock int not null default 0,
	activo bit not null default 1,
	constraint ck_producto_precio check(precio >= 0),
	constraint ck_product_stock check(stock >= 0)
);
go

create table venta(
	id_venta int identity(1,1) primary key,
	id_cliente int not null,
	fecha_venta datetime2 not null default sysdatetime(),
	total decimal(12,2) not null default 0, 
	estado varchar(20) not null default 'ACTIVA',
	constraint FK_VENTA_CLIENTE FOREIGN KEY (id_cliente) REFERENCES CLIENTE(id_cliente),
	constraint ck_venta_estado CHECK (estado in ('ACTIVA', 'ANULADA'))
);
go


create table detalle_venta (
	id_detalle int identity(1,1) primary key,
	id_venta int not null,
	id_producto int not null,
	cantidad int not null,
	precio_unitario decimal(10,2) not null,
	subtotal as (cantidad * precio_unitario) persisted,
	constraint fk_detalle_venta foreign key (id_venta) references venta(id_venta),
	constraint fk_detalle_producto foreign key (id_producto) references producto (id_producto),
	constraint ck_detalle_cantidad check (cantidad > 0),
	constraint ck_detalle_precio check (precio_unitario >= 0)
);
go

USE db_ventas;
GO

CREATE OR ALTER PROCEDURE sp_cliente_crear
    @nombre   VARCHAR(100),
    @nit      VARCHAR(20) = NULL,
    @telefono VARCHAR(20) = NULL,
    @email    VARCHAR(100) = NULL
AS
BEGIN
    SET NOCOUNT ON;

    INSERT INTO cliente (
        nombre,
        nit,
        telefono,
        email
    )
    VALUES (
        @nombre,
        @nit,
        @telefono,
        @email
    );

    SELECT
        id_cliente,
        nombre,
        nit,
        telefono,
        email,
        activo
    FROM cliente
    WHERE id_cliente = SCOPE_IDENTITY();
END;
GO

CREATE OR ALTER PROCEDURE sp_cliente_obtener_todos
AS
BEGIN
    SET NOCOUNT ON;

    SELECT
        id_cliente,
        nombre,
        nit,
        telefono,
        email,
        activo
    FROM cliente
    ORDER BY id_cliente DESC;
END;
GO

CREATE OR ALTER PROCEDURE sp_cliente_obtener_por_id
    @id_cliente INT
AS
BEGIN
    SET NOCOUNT ON;

    SELECT
        id_cliente,
        nombre,
        nit,
        telefono,
        email,
        activo
    FROM cliente
    WHERE id_cliente = @id_cliente;
END;
GO


CREATE OR ALTER PROCEDURE sp_cliente_actualizar
    @id_cliente INT,
    @nombre     VARCHAR(100),
    @nit        VARCHAR(20) = NULL,
    @telefono   VARCHAR(20) = NULL,
    @email      VARCHAR(100) = NULL,
    @activo     BIT
AS
BEGIN
    SET NOCOUNT ON;

    UPDATE cliente
    SET
        nombre = @nombre,
        nit = @nit,
        telefono = @telefono,
        email = @email,
        activo = @activo
    WHERE id_cliente = @id_cliente;

    IF @@ROWCOUNT = 0
    BEGIN
        THROW 50001, 'El cliente no existe.', 1;
    END;

    SELECT
        id_cliente,
        nombre,
        nit,
        telefono,
        email,
        activo
    FROM cliente
    WHERE id_cliente = @id_cliente;
END;
GO

CREATE OR ALTER PROCEDURE sp_cliente_eliminar
    @id_cliente INT
AS
BEGIN
    SET NOCOUNT ON;

    UPDATE cliente
    SET activo = 0
    WHERE id_cliente = @id_cliente;

    IF @@ROWCOUNT = 0
    BEGIN
        THROW 50002, 'El cliente no existe.', 1;
    END;

    SELECT
        id_cliente,
        nombre,
        nit,
        telefono,
        email,
        activo
    FROM cliente
    WHERE id_cliente = @id_cliente;
END;
GO

USE db_ventas;
GO

ALTER TABLE cliente
ADD password_hash VARCHAR(255) NULL;
GO
ALTER TABLE cliente
ALTER COLUMN password_hash VARCHAR(255) NOT NULL;
GO

CREATE UNIQUE INDEX UX_cliente_email
ON cliente(email)
WHERE email IS NOT NULL;
GO


CREATE OR ALTER PROCEDURE sp_cliente_crear
    @nombre        VARCHAR(100),
    @nit           VARCHAR(20) = NULL,
    @telefono      VARCHAR(20) = NULL,
    @email         VARCHAR(100) = NULL,
    @password_hash VARCHAR(255)
AS
BEGIN
    SET NOCOUNT ON;

    INSERT INTO cliente (
        nombre,
        nit,
        telefono,
        email,
        password_hash
    )
    VALUES (
        @nombre,
        @nit,
        @telefono,
        @email,
        @password_hash
    );

    SELECT
        id_cliente,
        nombre,
        nit,
        telefono,
        email,
        activo
    FROM cliente
    WHERE id_cliente = SCOPE_IDENTITY();
END;
GO

CREATE OR ALTER PROCEDURE sp_cliente_login
    @email VARCHAR(100)
AS
BEGIN
    SET NOCOUNT ON;

    SELECT
        id_cliente,
        nombre,
        email,
        password_hash,
        activo
    FROM cliente
    WHERE email = @email;
END;
GO