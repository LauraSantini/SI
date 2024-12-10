<?php
// Database connection
$host = 'localhost';
$db = 'reviewsDB';
$user = 'root'; // Replace with your DB username
$password = ''; // Replace with your DB password

$conn = new mysqli($host, $user, $password, $db);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Handle form submission
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = $conn->real_escape_string($_POST['name']);
    $rating = (int)$_POST['rating'];
    $review = $conn->real_escape_string($_POST['review']);
    $date = $conn->real_escape_string($_POST['date']);

    $sql = "INSERT INTO reviews (name, rating, review, date) VALUES ('$name', $rating, '$review', '$date')";
    if ($conn->query($sql) === TRUE) {
        echo "<script>alert('Review submitted successfully!');</script>";
    } else {
        echo "Error: " . $sql . "<br>" . $conn->error;
    }
}

// Fetch all reviews
$sql = "SELECT * FROM reviews ORDER BY id DESC";
$result = $conn->query($sql);
$reviews = [];
if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $reviews[] = $row;
    }
}

$conn->close();
?>


