-- Create the reviews table
CREATE TABLE reviews (
    id SERIAL PRIMARY KEY,  -- Auto-increment in PostgreSQL
    name VARCHAR(255) NOT NULL,
    rating INT NOT NULL CHECK (rating BETWEEN 1 AND 5),  -- Ensure rating is between 1 and 5
    review TEXT NOT NULL,
    date TIMESTAMP NOT NULL  -- Storing both date and time
);


-- Inserting a review into the table
INSERT INTO reviews (name, rating, review, date)
VALUES ('John Doe', 5, 'Great product, really loved it!', NOW());

-- Retrieving all reviews, ordered by most recent
SELECT * FROM reviews
ORDER BY date DESC;