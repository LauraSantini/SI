-- Create the database
CREATE DATABASE [database];
USE [database];

-- Create the clientes table
CREATE TABLE clientes (
    UserID INT IDENTITY(1,1) PRIMARY KEY,
    Username NVARCHAR(50) NOT NULL,
    Email NVARCHAR(100) NOT NULL UNIQUE,
    Password NVARCHAR(100) NOT NULL,  -- Store hashed password
    Role NVARCHAR(20) NOT NULL DEFAULT 'client',  -- Role (client/admin)
    CreatedAt DATETIME DEFAULT GETDATE()
);


-- Create the Credits table
CREATE TABLE Credits (
    CreditID INT IDENTITY(1,1) PRIMARY KEY,
    UserID INT,  
    TotalCredits DECIMAL(10, 2) NOT NULL DEFAULT 0,
    LastUpdated DATETIME DEFAULT GETDATE(),
    FOREIGN KEY (UserID) REFERENCES clientes(UserID)  
);

-- Create the carros table
CREATE TABLE carros (
    id_carro INT PRIMARY KEY IDENTITY(1,1),  -- Added IDENTITY for auto-increment
    matricula VARCHAR(50) NOT NULL,
    disponibilidade VARCHAR(20) DEFAULT 'available' NOT NULL,  
    custo FLOAT NOT NULL,
    numero_lugares SMALLINT NOT NULL
);

-- Create the Reservations table
CREATE TABLE Reservations (
    ReservationID INT IDENTITY(1,1) PRIMARY KEY,
    UserID INT,  
    ReservationDate DATETIME NOT NULL,
    custo FLOAT,  
    id_carro INT,  
    FOREIGN KEY (UserID) REFERENCES clientes(UserID),  
    FOREIGN KEY (id_carro) REFERENCES carros(id_carro)  
);

-- Create the admin_função table (fixed syntax error)
CREATE TABLE admin_função (
    id INT IDENTITY(1,1) PRIMARY KEY,
    nome VARCHAR(50) NOT NULL,
    role VARCHAR(20) NOT NULL DEFAULT 'admin'
);

-- Insert admin user data (fixed)
INSERT INTO admin_função (nome, role) VALUES ('Administrator', 'admin');
INSERT INTO admin_função (nome, role) VALUES ('SetAdmin', 'admin');

-- Create a login for the admin user
CREATE LOGIN SetAdmin WITH PASSWORD = 'StrongPassword123';

-- Create a user in the database for the admin
CREATE USER SetAdmin FOR LOGIN SetAdmin;

-- Grant necessary permissions for SetAdmin on the carros table
GRANT INSERT, DELETE, UPDATE ON carros TO SetAdmin;

-- Insert initial data for the carros table (fixed insert statement)
INSERT INTO carros (matricula, disponibilidade, custo, numero_lugares)
VALUES
('ABC123', 'available', 50.00, 4),
('XYZ456', 'available', 75.00, 5),
('LMN789', 'available', 100.00, 7);

-- Create stored procedure to add a car
CREATE PROCEDURE AddCar (
    @matricula VARCHAR(50),
    @disponibilidade VARCHAR(20),
    @custo FLOAT,
    @numero_lugares SMALLINT
)
AS
BEGIN
    INSERT INTO carros (matricula, disponibilidade, custo, numero_lugares)
    VALUES (@matricula, @disponibilidade, @custo, @numero_lugares);
END;

-- Create stored procedure to remove a car
CREATE PROCEDURE RemoveCar (
    @id_carro INT
)
AS
BEGIN
    DELETE FROM carros WHERE id_carro = @id_carro;
END;

-- Create stored procedure to update car cost
CREATE PROCEDURE UpdateCarCost (
    @id_carro INT,   -- The ID of the car to update
    @new_custo FLOAT -- The new cost value for the car
)
AS
BEGIN
    -- Update the `custo` column of the specified car
    UPDATE carros
    SET custo = @new_custo
    WHERE id_carro = @id_carro;
END;

-- Grant execute permissions for SetAdmin to run the procedures
GRANT EXECUTE ON PROCEDURE AddCar TO SetAdmin;
GRANT EXECUTE ON PROCEDURE RemoveCar TO SetAdmin;
GRANT EXECUTE ON PROCEDURE UpdateCarCost TO SetAdmin;
