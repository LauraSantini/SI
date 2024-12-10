function toggleCollapsible(id) {
    // Get all collapsible content elements
    const allCollapsibles = document.querySelectorAll('.collapsible-content');
    
    // Loop through all collapsibles and hide them
    allCollapsibles.forEach(content => {
        if (content.id !== id) {
            content.style.display = 'none';
        }
    });

    // Toggle the visibility of the clicked collapsible section
    const clickedContent = document.getElementById(id);
    if (clickedContent.style.display === "block") {
        clickedContent.style.display = "none"; // Hide if already open
    } else {
        clickedContent.style.display = "block"; // Show the clicked section
    }
}