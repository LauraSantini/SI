-- Create the database
CREATE DATABASE reviews_db;

-- Switch to the newly created database
USE reviews_db;

-- Create the reviews table
CREATE TABLE reviews (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    rating INT NOT NULL,
    review TEXT NOT NULL,
    date DATE NOT NULL
);