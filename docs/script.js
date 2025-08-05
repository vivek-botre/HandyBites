// Lightweight script for Handy Bites Cafe
document.addEventListener('DOMContentLoaded', function() {
    // Add smooth scrolling for any potential internal links
    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Add loading optimization for images
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.style.transition = 'opacity 0.3s ease';
        img.addEventListener('load', function() {
            this.style.opacity = '1';
        });
    });

    // Ensure mobile viewport optimization
    if ('ontouchstart' in window) {
        document.body.classList.add('touch-device');
    }
});
