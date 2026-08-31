/* ============================================================
   CRUD ESTUDIANTES
   Base de Datos: SQL Server

   Script de creación y población inicial de la base de datos
   ============================================================ */

-- ============================================================
-- 1. CREACIÓN DE BASE DE DATOS
-- ============================================================

IF DB_ID('crudestudiantes') IS NULL
BEGIN
    CREATE DATABASE crudestudiantes;
END;
GO

USE crudestudiantes;
GO


-- ============================================================
-- 2. CREACIÓN DE TABLAS
-- ============================================================

-- ------------------------------------------------------------
-- Tabla: Catalogo
-- ------------------------------------------------------------

CREATE TABLE dbo.Catalogo (
    idCatalogo INT IDENTITY(1,1) NOT NULL,
    nombre VARCHAR(50) COLLATE Modern_Spanish_CI_AS NULL,

    CONSTRAINT PK_Catalogo
        PRIMARY KEY (idCatalogo)
);
GO


-- ------------------------------------------------------------
-- Tabla: CatalogoDetalle
-- ------------------------------------------------------------

CREATE TABLE dbo.CatalogoDetalle (
    idCatalogoDetalle INT IDENTITY(1,1) NOT NULL,
    idCatalogo INT NULL,
    nombre VARCHAR(50) COLLATE Modern_Spanish_CI_AS NULL,

    CONSTRAINT PK_CatalogoDetalle
        PRIMARY KEY (idCatalogoDetalle),

    CONSTRAINT FK_CatalogoDetalleALTER
        FOREIGN KEY (idCatalogo)
        REFERENCES dbo.Catalogo(idCatalogo)
);
GO


-- ------------------------------------------------------------
-- Tabla: Catedratico
-- ------------------------------------------------------------

CREATE TABLE dbo.Catedratico (
    idCatedratico INT IDENTITY(1,1) NOT NULL,
    nombre VARCHAR(50) COLLATE Modern_Spanish_CI_AS NOT NULL,
    apellido VARCHAR(50) COLLATE Modern_Spanish_CI_AS NOT NULL,
    idEstado INT NOT NULL,

    CONSTRAINT PK_Catedratico
        PRIMARY KEY (idCatedratico),

    CONSTRAINT FK_Catedratico_Estado
        FOREIGN KEY (idEstado)
        REFERENCES dbo.CatalogoDetalle(idCatalogoDetalle)
);
GO


-- ------------------------------------------------------------
-- Tabla: Curso
-- ------------------------------------------------------------

CREATE TABLE dbo.Curso (
    idCurso INT IDENTITY(1,1) NOT NULL,
    nombreCurso VARCHAR(100) COLLATE Modern_Spanish_CI_AS NOT NULL,
    idNivel INT NOT NULL,
    idGrado INT NOT NULL,
    idCarrera INT NULL,
    idCatedratico INT NOT NULL,
    idEstado INT NOT NULL,

    CONSTRAINT PK_Curso
        PRIMARY KEY (idCurso),

    CONSTRAINT FK_Curso_Carrera
        FOREIGN KEY (idCarrera)
        REFERENCES dbo.CatalogoDetalle(idCatalogoDetalle),

    CONSTRAINT FK_Curso_Catedratico
        FOREIGN KEY (idCatedratico)
        REFERENCES dbo.Catedratico(idCatedratico),

    CONSTRAINT FK_Curso_Estado
        FOREIGN KEY (idEstado)
        REFERENCES dbo.CatalogoDetalle(idCatalogoDetalle),

    CONSTRAINT FK_Curso_Grado
        FOREIGN KEY (idGrado)
        REFERENCES dbo.CatalogoDetalle(idCatalogoDetalle),

    CONSTRAINT FK_Curso_Nivel
        FOREIGN KEY (idNivel)
        REFERENCES dbo.CatalogoDetalle(idCatalogoDetalle)
);
GO


-- ------------------------------------------------------------
-- Tabla: Usuario
-- ------------------------------------------------------------

CREATE TABLE dbo.Usuario (
    idUsuario INT IDENTITY(1,1) NOT NULL,
    username VARCHAR(50) COLLATE Modern_Spanish_CI_AS NOT NULL,
    password VARCHAR(150) COLLATE Modern_Spanish_CI_AS NOT NULL,
    idRol INT NOT NULL,
    idEstado INT NOT NULL,

    CONSTRAINT PK_Usuario
        PRIMARY KEY (idUsuario),

    CONSTRAINT UQ_Usuario_Username
        UNIQUE (username),

    CONSTRAINT FK_Usuario_Estado
        FOREIGN KEY (idEstado)
        REFERENCES dbo.CatalogoDetalle(idCatalogoDetalle),

    CONSTRAINT FK_Usuario_Rol
        FOREIGN KEY (idRol)
        REFERENCES dbo.CatalogoDetalle(idCatalogoDetalle)
);
GO


-- ------------------------------------------------------------
-- Tabla: Estudiante
-- ------------------------------------------------------------

CREATE TABLE dbo.Estudiante (
    idEstudiante INT IDENTITY(1,1) NOT NULL,
    idUsuario INT NOT NULL,
    nombre VARCHAR(50) COLLATE Modern_Spanish_CI_AS NOT NULL,
    apellido VARCHAR(50) COLLATE Modern_Spanish_CI_AS NOT NULL,
    seccion VARCHAR(25) COLLATE Modern_Spanish_CI_AS NULL,
    idEstado INT NOT NULL,
    idNivel INT NOT NULL,

    CONSTRAINT PK_Estudiante
        PRIMARY KEY (idEstudiante),

    CONSTRAINT UQ_Estudiante_Usuario
        UNIQUE (idUsuario),

    CONSTRAINT FK_Estudiante_Estado
        FOREIGN KEY (idEstado)
        REFERENCES dbo.CatalogoDetalle(idCatalogoDetalle),

    CONSTRAINT FK_Estudiante_Nivel
        FOREIGN KEY (idNivel)
        REFERENCES dbo.CatalogoDetalle(idCatalogoDetalle),

    CONSTRAINT FK_Estudiante_Usuario
        FOREIGN KEY (idUsuario)
        REFERENCES dbo.Usuario(idUsuario)
);
GO


-- ------------------------------------------------------------
-- Tabla: CursoAsignado
-- ------------------------------------------------------------

CREATE TABLE dbo.CursoAsignado (
    idAsignacion INT IDENTITY(1,1) NOT NULL,
    idEstudiante INT NOT NULL,
    idCurso INT NOT NULL,

    CONSTRAINT PK_Asignacion
        PRIMARY KEY (idAsignacion),

    CONSTRAINT UQ_Asignacion_Estudiante_Curso
        UNIQUE (idEstudiante, idCurso),

    CONSTRAINT FK_Asignacion_Curso
        FOREIGN KEY (idCurso)
        REFERENCES dbo.Curso(idCurso),

    CONSTRAINT FK_Asignacion_Estudiante
        FOREIGN KEY (idEstudiante)
        REFERENCES dbo.Estudiante(idEstudiante)
);
GO


-- ============================================================
-- 3. POBLACIÓN DE CATÁLOGOS
-- ============================================================

INSERT INTO dbo.Catalogo (nombre)
VALUES
    ('Rol'),
    ('Estado'),
    ('Nivel'),
    ('Grado'),
    ('Carrera');
GO


INSERT INTO dbo.CatalogoDetalle (idCatalogo, nombre)
VALUES
    -- Roles
    (1, 'Administrador'),
    (1, 'Estudiante'),

    -- Estados
    (2, 'Activo'),
    (2, 'Inactivo'),

    -- Niveles
    (3, 'Diversificado'),
    (3, 'Basico'),
    (3, 'Primaria'),
    (3, 'Pre-Primaria'),

    -- Grados
    (4, '1ro'),
    (4, '2do'),
    (4, '3ero'),
    (4, '4to'),
    (4, '5to'),
    (4, '6to'),

    -- Carreras
    (5, 'Bachiller en ciencias y letras'),
    (5, 'Perito Contador'),
    (5, 'Mecanica');
GO


-- ============================================================
-- 4. USUARIOS INICIALES
-- ============================================================

INSERT INTO dbo.Usuario (
    username,
    password,
    idRol,
    idEstado
)
VALUES
    ('admin1', '1234', 1, 3),
    ('estud1', '1234', 2, 3),
    ('estud2', '1234', 2, 3),
    ('estud3', '1234', 2, 3);
GO


-- ============================================================
-- 5. DATOS DE PRUEBA
-- ============================================================

-- Catedráticos

INSERT INTO dbo.Catedratico (
    nombre,
    apellido,
    idEstado
)
VALUES
    ('Carlos', 'García', 3),
    ('Ana', 'López', 3);
GO

INSERT INTO dbo.Curso (
    nombreCurso,
    idNivel,
    idGrado,
    idCarrera,
    idCatedratico,
    idEstado
)
VALUES
    ('Matemática', 5, 12, 15, 1, 3),
    ('Comunicación', 5, 12, 15, 2, 3);
GO


-- Estudiantes

INSERT INTO dbo.Estudiante (
    idUsuario,
    nombre,
    apellido,
    seccion,
    idEstado,
    idNivel
)
VALUES
    (2, 'Juan', 'Pérez', 'A', 3, 5),
    (3, 'María', 'López', 'A', 3, 5),
    (4, 'Pedro', 'García', 'B', 3, 5);
GO


-- Asignación de cursos

INSERT INTO dbo.CursoAsignado (
    idEstudiante,
    idCurso
)
VALUES
    (1, 1),
    (1, 2),
    (2, 1),
    (3, 2);
GO