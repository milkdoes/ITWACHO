CREATE DATABASE IF NOT EXISTS it_wacho;

USE it_wacho;

CREATE USER IF NOT EXISTS 'UsuarioItWacho'@'localhost' IDENTIFIED BY 'UsuarioItWacho';

GRANT ALL ON it_wacho.* TO 'UsuarioItWacho'@'localhost';

FLUSH PRIVILEGES;

USE it_wacho;

-- TABLAS
CREATE TABLE IF NOT EXISTS ente
(
    Id integer NOT NULL PRIMARY KEY AUTO_INCREMENT
    , Nombre varchar(40) NOT NULL
    , ApellidoPaterno varchar(20)NULL
    , ApellidoMaterno varchar(20) NULL
);

CREATE TABLE IF NOT EXISTS actividad
(
    Id integer NOT NULL PRIMARY KEY AUTO_INCREMENT
    , Nombre varchar(50) NOT NULL
);

CREATE TABLE IF NOT EXISTS ente_actividad
(
    Ente_Id integer NOT NULL REFERENCES Ente (Id)
    , Actividad_Id integer NOT NULL REFERENCES Actividad (Id)
);

CREATE TABLE IF NOT EXISTS lugar
(
    Id integer NOT NULL PRIMARY KEY AUTO_INCREMENT
    , Nombre varchar(50) NOT NULL
);

CREATE TABLE IF NOT EXISTS ente_lugar
(
    Ente_Id integer NOT NULL REFERENCES Ente (Id)
    , Lugar_Id integer NOT NULL REFERENCES Lugar (Id)
);

-- PROCEDIMIENTOS


DROP PROCEDURE IF EXISTS SP_InsertEnte;

-- Procedimiento para insertar un ente a la base de datos si no existe.
DELIMITER $$
CREATE PROCEDURE SP_InsertEnte (IN nombre varchar(40)
    , IN apellidoPaterno varchar(20), IN apellidoMaterno varchar(20)
)
BEGIN
    IF (nombre IS NOT NULL OR apellidoPaterno IS NOT NULL
        OR apellidoMaterno IS NOT NULL)
        THEN BEGIN
            INSERT INTO ente(Nombre, ApellidoPaterno, ApellidoMaterno)
            SELECT Nombre, ApellidoPaterno, ApellidoMaterno FROM ente
            WHERE NOT EXISTS (SELECT * FROM ente e
				WHERE e.Nombre = nombre AND e.ApellidoPaterno = apellidoPaterno
                AND e.ApellidoMaterno = apellidoMaterno)
                LIMIT 1;
END; END IF;
END $$
DELIMITER ;


DROP PROCEDURE IF EXISTS SP_SelectEnte;

-- Procedimiento para seleccionar todos los entes que tengan cadenas similares a las ingresadas.
DELIMITER $$
CREATE PROCEDURE SP_SelectEnte (IN nombre varchar(40)
    , IN apellidoPaterno varchar(20), IN apellidoMaterno varchar(20)
)
BEGIN
    IF (nombre IS NOT NULL OR apellidoPaterno IS NOT NULL
        OR apellidoMaterno IS NOT NULL)
        THEN BEGIN
        SELECT e.Id, e.Nombre, e.ApellidoPaterno AS 'Apellido Paterno'
        , e.ApellidoMaterno AS 'Apellido Materno'
        FROM Ente e
        WHERE e.Nombre LIKE CONCAT(nombre, '%')
        OR e.ApellidoPaterno LIKE CONCAT(apellidoPaterno, '%')
        OR e.ApellidoMaterno LIKE CONCAT(apellidoMaterno, '%');
    END; END IF;
END $$
DELIMITER ;


DROP PROCEDURE IF EXISTS SP_SelectActividad;

-- Procedimiento para seleccionar las actividades que realiza el ente.
DELIMITER $$
CREATE PROCEDURE SP_SelectActividad (IN ente_Id integer)
BEGIN
    SELECT a.Nombre
    FROM actividad a, ente_actividad ea
    WHERE ea.Ente_Id = ente_Id
    AND a.Id = ea.Actividad_Id;
END $$
DELIMITER ;


DROP PROCEDURE IF EXISTS SP_SelectLugar;

-- Procedimiento para seleccionar los lugares que el ente transita usualmente por.
DELIMITER $$
CREATE PROCEDURE SP_SelectLugar (IN ente_Id integer)
BEGIN
    SELECT l.Nombre
    FROM lugar l, ente_lugar el
    WHERE el.Ente_Id = ente_Id
    AND l.Id = el.Lugar_Id;
END $$
DELIMITER ;