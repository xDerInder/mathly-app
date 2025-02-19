function showTopics(category) {
    // Alle Topic-Sections ausblenden
    document.querySelectorAll('.topic-section').forEach(section => {
        section.style.display = 'none';
    });
    
    // Ausgewählte Topic-Section einblenden
    const selectedSection = document.getElementById(`${category}-topics`);
    if (selectedSection) {
        selectedSection.style.display = 'block';
        
        // Smooth scroll to topics
        selectedSection.scrollIntoView({ behavior: 'smooth' });
    }
}
