CREATE DATABASE ItWacho;
GO

USE ItWacho;
GO

CREATE LOGIN UsuarioItWacho WITH PASSWORD = 'UsuarioItWacho'
GO

USE ItWacho;
GO

IF NOT EXISTS (SELECT * FROM sys.database_principals WHERE name = N'UsuarioItWacho')
BEGIN
    CREATE USER [UsuarioItWacho] FOR LOGIN [UsuarioItWacho]
    EXEC sp_addrolemember N'db_owner', N'UsuarioItWacho'
END;
GO

-- TABLAS
CREATE TABLE Ente
(
    Id integer PRIMARY KEY IDENTITY(0, 1)
    , Nombre varchar(40)
    , ApellidoPaterno varchar(20)
    , ApellidoMaterno varchar(20)
);
GO

CREATE TABLE Actividad
(
    Id integer PRIMARY KEY IDENTITY(0, 1)
    , Nombre varchar(50)
);
GO

CREATE TABLE Ente_Actividad
(
    Ente_Id integer REFERENCES Ente (Id)
    , Actividad_Id integer REFERENCES Actividad (Id)
);
GO

CREATE TABLE Lugar
(
    Id integer PRIMARY KEY IDENTITY(0, 1)
    , Nombre varchar(50)
);
GO

CREATE TABLE Ente_Lugar
(
    Ente_Id integer REFERENCES Ente (Id)
    , Lugar_Id integer REFERENCES Lugar (Id)
);
GO

-- PROCEDIMIENTOS
-- Formato para tirar procedimientos.
--IF EXISTS (SELECT 1 FROM INFORMATION_SCHEMA.ROUTINES
--WHERE ROUTINE_NAME = 'SP_ProcedureName'
--AND ROUTINE_SCHEMA = 'dbo' AND ROUTINE_TYPE = 'PROCEDURE')
--EXEC ('DROP PROCEDURE dbo.SP_ProcedureName');
--GO

IF EXISTS (SELECT 1 FROM INFORMATION_SCHEMA.ROUTINES
WHERE ROUTINE_NAME = 'SP_InsertEnte'
AND ROUTINE_SCHEMA = 'dbo' AND ROUTINE_TYPE = 'PROCEDURE')
EXEC ('DROP PROCEDURE dbo.SP_InsertEnte');
GO

-- Procedimiento para insertar un ente a la base de datos si no existe.
CREATE PROCEDURE dbo.SP_InsertEnte @Nombre varchar(40) = NULL
, @ApellidoPaterno varchar(20) = NULL, @ApellidoMaterno varchar(20) = NULL
AS
BEGIN
	IF (@Nombre IS NOT NULL OR @ApellidoPaterno IS NOT NULL
	OR @ApellidoMaterno IS NOT NULL)
	BEGIN
		SELECT * FROM Ente
		WHERE
		Nombre LIKE (@Nombre + '%')
		OR ApellidoPaterno LIKE (@ApellidoPaterno + '%')
		OR ApellidoMaterno LIKE (@ApellidoMaterno + '%');

		INSERT INTO Ente (Nombre, ApellidoPaterno, ApellidoMaterno) VALUES
		(@Nombre, @ApellidoPaterno, @ApellidoMaterno);
	END
END
GO

IF EXISTS (SELECT 1 FROM INFORMATION_SCHEMA.ROUTINES
WHERE ROUTINE_NAME = 'SP_SelectEnte'
AND ROUTINE_SCHEMA = 'dbo' AND ROUTINE_TYPE = 'PROCEDURE')
EXEC ('DROP PROCEDURE dbo.SP_SelectEnte');
GO

-- Procedimietno para seleccionar todos los entes que tengan cadenas similares a las ingresadas.
CREATE PROCEDURE dbo.SP_SelectEnte @Nombre varchar(40) = NULL
, @ApellidoPaterno varchar(20) = NULL, @ApellidoMaterno varchar(20) = NULL
AS
BEGIN
	IF (@Nombre IS NOT NULL OR @ApellidoPaterno IS NOT NULL
	OR @ApellidoMaterno IS NOT NULL)
	BEGIN
		SELECT e.Id, e.Nombre, e.ApellidoPaterno AS [Apellido Paterno]
		, e.ApellidoMaterno AS [Apellido Materno]
		FROM Ente e
		WHERE e.Nombre LIKE (@Nombre + '%')
		OR e.ApellidoPaterno LIKE (@ApellidoPaterno + '%')
		OR e.ApellidoMaterno LIKE (@ApellidoMaterno + '%');
	END
END
GO

IF EXISTS (SELECT 1 FROM INFORMATION_SCHEMA.ROUTINES
WHERE ROUTINE_NAME = 'SP_SelectActividad'
AND ROUTINE_SCHEMA = 'dbo' AND ROUTINE_TYPE = 'PROCEDURE')
EXEC ('DROP PROCEDURE dbo.SP_SelectActividad');
GO

-- Procedimiento para seleccionar las actividades que realiza el ente.
CREATE PROCEDURE dbo.SP_SelectActividad @Ente_Id integer
AS
BEGIN
    SELECT a.Nombre
    FROM Actividad a, Ente_Actividad ea
    WHERE ea.Ente_Id = @Ente_Id
    AND a.Id = ea.Actividad_Id;
END
GO

IF EXISTS (SELECT 1 FROM INFORMATION_SCHEMA.ROUTINES
WHERE ROUTINE_NAME = 'SP_SelectLugar'
AND ROUTINE_SCHEMA = 'dbo' AND ROUTINE_TYPE = 'PROCEDURE')
EXEC ('DROP PROCEDURE dbo.SP_SelectLugar');
GO

-- Procedimiento para seleccionar los lugares que el ente transita usualmente por.
CREATE PROCEDURE dbo.SP_SelectLugar @Ente_Id integer
AS
BEGIN
    SELECT l.Nombre
    FROM Lugar l, Ente_Lugar el
    WHERE el.Ente_Id = @Ente_Id
    AND l.Id = el.Lugar_Id;
END
GO
