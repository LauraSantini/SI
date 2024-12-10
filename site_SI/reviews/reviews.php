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

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Reviews Page</title>
    <style>
        /* Include your existing CSS here */
        /* (same as provided in your original code) */
    </style>
</head>
<body>

    <div class="reviews-container">
        <!-- Reviews Header -->
        <div class="reviews-header">
            <h1>What Our Users Say</h1>
            <p>Read feedback from our customers or leave your own review below.</p>
        </div>

        <!-- List of Reviews -->
        <div class="reviews-list">
            <?php if (!empty($reviews)): ?>
                <?php foreach ($reviews as $review): ?>
                    <div class="review-item">
                        <h3><?= htmlspecialchars($review['name']); ?></h3>
                        <div class="review-stars">
                            <?= str_repeat("⭐", $review['rating']); ?>
                        </div>
                        <p>“<?= htmlspecialchars($review['review']); ?>”</p>
                        <span>Posted on: <?= htmlspecialchars($review['date']); ?></span>
                    </div>
                <?php endforeach; ?>
            <?php else: ?>
                <p>No reviews yet.</p>
            <?php endif; ?>
        </div>

        <!-- Review Submission Form -->
        <div class="form-section">
            <h2>Leave Your Review</h2>
            <form action="reviews.php" method="post">
                <label for="name">Name</label>
                <input type="text" id="name" name="name" placeholder="Your Full Name" required>

                <label for="rating">Rating</label>
                <div class="stars">
                    <input type="radio" id="star5" name="rating" value="5" required>
                    <label for="star5">⭐</label>
                    <input type="radio" id="star4" name="rating" value="4">
                    <label for="star4">⭐</label>
                    <input type="radio" id="star3" name="rating" value="3">
                    <label for="star3">⭐</label>
                    <input type="radio" id="star2" name="rating" value="2">
                    <label for="star2">⭐</label>
                    <input type="radio" id="star1" name="rating" value="1">
                    <label for="star1">⭐</label>
                </div>

                <label for="review">Review</label>
                <textarea id="review" name="review" rows="5" placeholder="Write your feedback here..." required></textarea>

                <label for="date">Date</label>
                <input type="date" id="date" name="date" required>

                <button type="submit">Submit Review</button>
            </form>
        </div>
    </div>

</body>
</html>
