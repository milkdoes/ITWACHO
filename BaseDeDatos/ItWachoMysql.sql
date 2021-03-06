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
    , ApellidoPaterno varchar(20) NULL
    , ApellidoMaterno varchar(20) NULL
);

CREATE TABLE IF NOT EXISTS actividad
(
    Id integer NOT NULL PRIMARY KEY AUTO_INCREMENT
    , Nombre varchar(60) NOT NULL
);

CREATE TABLE IF NOT EXISTS ente_actividad
(
    Ente_Id integer NOT NULL REFERENCES ente (Id)
    , Actividad_Id integer NOT NULL REFERENCES actividad (Id)
);

CREATE TABLE IF NOT EXISTS lugar
(
    Id integer NOT NULL PRIMARY KEY AUTO_INCREMENT
    , Nombre varchar(60) NOT NULL
);

CREATE TABLE IF NOT EXISTS ente_lugar
(
    Ente_Id integer NOT NULL REFERENCES ente (Id)
    , Lugar_Id integer NOT NULL REFERENCES lugar (Id)
);

CREATE TABLE IF NOT EXISTS rastrear
(
    Ente_Id integer NOT NULL REFERENCES ente (Id)
    , UltimoLugar integer NULL REFERENCES lugar (Id)
    , Buscado BIT DEFAULT 0
);

-- PROCEDIMIENTOS


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


DROP PROCEDURE IF EXISTS SP_SelectEnteWhereId;

-- Procedimiento para seleccionar el ente con el id dado.
DELIMITER $$
CREATE PROCEDURE SP_SelectEnteWhereId (IN id integer)
BEGIN
    IF (id IS NOT NULL)
        THEN BEGIN
        SELECT e.Nombre, e.ApellidoPaterno AS 'Apellido Paterno'
        , e.ApellidoMaterno AS 'Apellido Materno'
        FROM Ente e
        WHERE e.Id = id;
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


DROP PROCEDURE IF EXISTS SP_SelectRastrear;

-- Procedimiento para seleccionar el ultimo lugar en el cual el ente se encontro.
DELIMITER $$
CREATE PROCEDURE SP_SelectRastrear (IN ente_Id integer)
BEGIN
    SELECT e.Nombre AS 'NombreEnte', l.Nombre AS 'NombreLugar'
    FROM rastrear AS r
    INNER JOIN ente AS e ON e.Id = r.Ente_Id
    INNER JOIN lugar AS l ON l.Id = r.UltimoLugar
    WHERE r.Ente_Id = ente_Id;
END $$
DELIMITER ;


DROP PROCEDURE IF EXISTS SP_InsertEnte;

-- Procedimiento para insertar un ente a la base de datos si no existe.
DELIMITER $$
CREATE PROCEDURE SP_InsertEnte (IN nombre varchar(40)
    , IN apellidoPaterno varchar(20), IN apellidoMaterno varchar(20)
)
BEGIN
    -- Si el nombre no es nulo, continuar.
    IF (nombre IS NOT NULL)
        THEN BEGIN

        -- Si hay mas de un conteo en la tabla, no continuar con la insercion.
        IF ((SELECT COUNT(*) FROM ente AS e WHERE e.Nombre = nombre
            AND e.ApellidoPaterno = apellidoPaterno AND e.ApellidoMaterno = apellidoMaterno LIMIT 1) < 1)
            THEN BEGIN
            INSERT INTO ente(Nombre, ApellidoPaterno, ApellidoMaterno)
            VALUES(nombre, apellidoPaterno, apellidoMaterno);
        END; END IF;

END; END IF;
END $$
DELIMITER ;


DROP PROCEDURE IF EXISTS SP_InsertActividad;

-- Procedimiento para insertar una actividad a la base de datos si no existe.
DELIMITER $$
CREATE PROCEDURE SP_InsertActividad (IN nombreActividad varchar(60))
BEGIN
    IF (nombreActividad IS NOT NULL)
        THEN BEGIN

        -- Verificar si existe. Si no, insertar.
        IF ((SELECT COUNT(a.Id) FROM actividad AS a WHERE a.Nombre = nombreActividad LIMIT 1) < 1)
            THEN BEGIN
            INSERT INTO actividad(Nombre) VALUES(nombreActividad);
        END; END IF;

END; END IF;
END $$
DELIMITER ;


DROP PROCEDURE IF EXISTS SP_InsertLugar;

-- Procedimiento para insertar una actividad a la base de datos si no existe.
DELIMITER $$
CREATE PROCEDURE SP_InsertLugar (IN nombreLugar varchar(60))
BEGIN
    IF (nombreLugar IS NOT NULL)
        THEN BEGIN

        -- Verificar si existe. Si no, insertar.
        IF ((SELECT COUNT(l.Id) FROM lugar AS l WHERE l.Nombre = nombreLugar LIMIT 1) < 1)
            THEN BEGIN
            INSERT INTO lugar(Nombre) VALUES(nombreLugar);
        END; END IF;

END; END IF;
END $$
DELIMITER ;


DROP PROCEDURE IF EXISTS SP_InsertEnteActividad;

-- Procedimiento para insertar las actividades que el ente usualmente realiza.
DELIMITER $$
CREATE PROCEDURE SP_InsertEnteActividad (IN idEnte integer, IN idActividad integer
    , IN nombreActividad varchar(60))
BEGIN
    -- Revisar si el id dado existe. Si no, terminar.
    IF ((SELECT COUNT(e.Id) FROM ente AS e WHERE e.Id = idEnte LIMIT 1) >= 1
        AND (idActividad IS NOT NULL OR nombreActividad IS NOT NULL))
        THEN BEGIN

        -- Si no se dio el id de la actividad, buscar si la actividad existe.
        IF (idActividad IS NULL AND nombreActividad IS NOT NULL)
            THEN BEGIN

            -- Insertar nueva actividad si no existe.
            CALL SP_InsertActividad(nombreActividad);

            -- Asignar valor a la variable local.
            SET idActividad = (SELECT a.Id FROM actividad AS a WHERE a.Nombre = nombreActividad);
        END; END IF;

        -- Vincular ente y actividad.
        IF ((SELECT COUNT(*) FROM ente_actividad AS ea WHERE ea.Ente_Id = idEnte AND ea.Actividad_Id = idActividad LIMIT 1) < 1)
            THEN BEGIN
            INSERT INTO ente_actividad (Ente_Id, Actividad_Id) VALUES(idEnte, idActividad);
        END; END IF;

    END; END IF;

END $$
DELIMITER ;


DROP PROCEDURE IF EXISTS SP_InsertEnteLugar;

-- Procedimiento para insertar las actividades que el ente usualmente transita por.
DELIMITER $$
CREATE PROCEDURE SP_InsertEnteLugar (IN idEnte integer, IN idLugar integer
    , IN nombreLugar varchar(60))
BEGIN
    -- Revisar si el id dado existe. Si no, terminar.
    IF ((SELECT COUNT(e.Id) FROM ente AS e WHERE e.Id = idEnte LIMIT 1) >= 1
        AND (idLugar IS NOT NULL OR nombreLugar IS NOT NULL))
        THEN BEGIN

        -- Si no se dio el id del lugar, buscar si la actividad existe.
        IF (idLugar IS NULL AND nombreLugar IS NOT NULL)
            THEN BEGIN

            -- Insertar nuevo lugar si no existe.
            CALL SP_InsertLugar(nombreLugar);

            -- Asignar valor a la variable local.
            SET idLugar = (SELECT l.Id FROM lugar AS l WHERE l.Nombre = nombreLugar);
        END; END IF;

        -- Vincular ente y lugar.
        IF ((SELECT COUNT(*) FROM ente_lugar AS el WHERE el.Ente_Id = idEnte AND el.Lugar_Id = idLugar LIMIT 1) < 1)
            THEN BEGIN
            INSERT INTO ente_lugar (Ente_Id, Lugar_Id) VALUES(idEnte, idLugar);
        END; END IF;

    END; END IF;

END $$
DELIMITER ;


DROP PROCEDURE IF EXISTS SP_ModifyRastrear;

-- Procedimiento para modificar el registro en el cual se rastrea a un ente.
DELIMITER $$
CREATE PROCEDURE SP_ModifyRastrear (IN EnteId integer, IN buscado BIT, IN LugarId integer, IN LugarNombre varchar(60))
Label_ModifyRastrear:
BEGIN
    -- Continuar si el id del ente no es nulo.
    IF (EnteId IS NOT NULL)
        THEN BEGIN

        -- Si el registro para rastrear al ente no existe, insertar uno nuevo.
        IF ((SELECT COUNT(r.Ente_Id) FROM rastrear AS r WHERE r.Ente_Id = EnteId LIMIT 1) < 1)
            THEN BEGIN
            INSERT INTO rastrear(Ente_Id) VALUES(EnteId);
        END; END IF;

        -- Si el ente se esta buscando y los otros parametros son nulos, actualizar busqueda.
        IF (buscado >= 1 AND LugarId IS NULL AND LugarNombre IS NULL)
            THEN BEGIN
            UPDATE rastrear SET
            UltimoLugar = NULL
            , Buscado = 1
            WHERE Ente_Id = EnteId;

            -- Salir del procedimiento.
            LEAVE Label_ModifyRastrear;
        END; END IF;

        -- Si el id del lugar es nulo pero el nombre no, continuar.
        IF (LugarId IS NULL AND LugarNombre IS NOT NULL)
            THEN BEGIN

            -- Insertar lugar si no existe.
            CALL SP_InsertLugar(LugarNombre);

            -- Asignar valor a la variable local.
            SET LugarId = (SELECT l.Id FROM lugar AS l WHERE l.Nombre = LugarNombre LIMIT 1);
        END; END IF;

        -- Actualizar el lugar en el cual se encontro al ente en el mapa.
        UPDATE rastrear SET
        UltimoLugar = LugarId
        , Buscado = 0
        WHERE Ente_Id = EnteId;

        -- Vincular al ente y al lugar como lugares transitados.
        CALL SP_InsertEnteLugar(EnteId, LugarId, NULL);
END; END IF;
END $$
DELIMITER ;