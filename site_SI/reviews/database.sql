-- Create the database
CREATE DATABASE reviews_db;

-- Switch to the newly created database
USE reviews_db;

-- Create the reviews table
CREATE TABLE reviews (
    id SERIAL PRIMARY KEY,  -- Auto-increment in PostgreSQL
    name VARCHAR(255) NOT NULL,
    rating INT NOT NULL CHECK (rating BETWEEN 1 AND 5),  -- Ensure rating is between 1 and 5
    review TEXT NOT NULL,
    date TIMESTAMP NOT NULL  -- Storing both date and time
);
