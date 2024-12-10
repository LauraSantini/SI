<?php
// Database connection settings (update with your credentials)
$servername = "localhost";
$username = "your_username";
$password = "your_password";
$dbname = "your_database_name";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Fetch reviews from the database
$sql = "SELECT name, rating, review, date FROM reviews ORDER BY date DESC";
$result = $conn->query($sql);

// Check if there are reviews
$reviews = [];
if ($result->num_rows > 0) {
    // Store reviews in the $reviews array
    while($row = $result->fetch_assoc()) {
        $reviews[] = $row;
    }
} else {
    // If no reviews, we can display a message
    $reviews = [];
}

// Close the database connection
$conn->close();
?>
