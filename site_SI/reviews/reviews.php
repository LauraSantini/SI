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