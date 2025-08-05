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

    // Sequential shimmer animation for buttons
    function startShimmerSequence() {
        const buttons = [
            document.querySelector('.order-btn.zomato'),
            document.querySelector('.order-btn.swiggy'),
            document.querySelector('.insta-link'),
            document.querySelector('.order-btn.google')
        ].filter(btn => btn !== null); // Filter out any null buttons

        let currentIndex = 0;

        function shimmerNext() {
            if (buttons.length === 0) return;
            
            // Remove shimmer from all buttons
            buttons.forEach(btn => btn.classList.remove('shimmer'));
            
            // Add shimmer to current button
            buttons[currentIndex].classList.add('shimmer');
            
            // Move to next button
            currentIndex = (currentIndex + 1) % buttons.length;
            
            // Schedule next shimmer (start next one 600ms before current finishes)
            setTimeout(shimmerNext, 1000);
        }

        // Start the sequence
        shimmerNext();
    }

    // Start shimmer sequence after a short delay
    setTimeout(startShimmerSequence, 500);
});
