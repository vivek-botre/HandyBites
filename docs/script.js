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
            
            // Add shimmer to current button with smoother timing
            if (buttons[currentIndex]) {
                buttons[currentIndex].classList.add('shimmer');
            }
            
            // Move to next button
            currentIndex = (currentIndex + 1) % buttons.length;
            
            // Schedule next shimmer with improved timing
            setTimeout(shimmerNext, 1200);
        }

        // Start the sequence
        shimmerNext();
    }

    // Start shimmer sequence after a short delay
    setTimeout(startShimmerSequence, 800);

    // Dynamic slideshow functionality
    function initSlideshow() {
        const slideshowContainer = document.getElementById('slideshow');
        if (!slideshowContainer) return;

        // List of menu images - add or remove images here and they'll automatically be included
        const menuImages = [
            '5O2A1219@2x.jpg',
            '5O2A1226@2x.jpg',
            '5O2A1247@2x.jpg',
            '5O2A1259@2x.jpg',
            '5O2A1274@2x.jpg'
            // Add more images here as needed:
            // '5O2A1275@2x.jpg',
            // '5O2A1276@2x.jpg',
        ];

        // Function to create slide elements
        function createSlides() {
            slideshowContainer.innerHTML = ''; // Clear existing slides
            
            menuImages.forEach((imageName, index) => {
                const slide = document.createElement('div');
                slide.className = 'slide' + (index === 0 ? ' active' : '');
                
                const img = document.createElement('img');
                img.src = `assets/MenuItems/${imageName}`;
                img.alt = `Menu Item ${index + 1}`;
                img.draggable = false;
                img.onerror = function() {
                    // If image fails to load, remove this slide
                    console.warn(`Image not found: ${imageName}`);
                    slide.remove();
                };
                
                // Add protection event listeners
                img.addEventListener('contextmenu', function(e) {
                    e.preventDefault();
                    return false;
                });
                
                img.addEventListener('dragstart', function(e) {
                    e.preventDefault();
                    return false;
                });
                
                img.addEventListener('selectstart', function(e) {
                    e.preventDefault();
                    return false;
                });
                
                slide.appendChild(img);
                slideshowContainer.appendChild(slide);
            });
        }

        // Create slides from the image list
        createSlides();

        // Wait a moment for images to load, then start slideshow
        setTimeout(() => {
            const slides = slideshowContainer.querySelectorAll('.slide');
            if (slides.length === 0) {
                console.warn('No valid menu images found');
                return;
            }

            let currentSlide = 0;

            function showSlide(index) {
                slides.forEach((slide, i) => {
                    slide.classList.remove('active', 'prev');
                    if (i === index) {
                        slide.classList.add('active');
                    } else if (i === (index - 1 + slides.length) % slides.length) {
                        slide.classList.add('prev');
                    }
                });
            }

            function nextSlide() {
                currentSlide = (currentSlide + 1) % slides.length;
                showSlide(currentSlide);
            }

            // Only start auto-advance if we have multiple slides
            if (slides.length > 1) {
                setInterval(nextSlide, 4000); // Slower transition for better viewing
            }

            // Initialize first slide
            showSlide(0);
        }, 500);
    }

    // Start slideshow
    initSlideshow();

    // Add global image protection
    function addImageProtection() {
        // Disable right-click on slideshow
        const slideshow = document.querySelector('.slideshow-container');
        if (slideshow) {
            slideshow.addEventListener('contextmenu', function(e) {
                e.preventDefault();
                return false;
            });
            
            slideshow.addEventListener('dragstart', function(e) {
                e.preventDefault();
                return false;
            });
            
            slideshow.addEventListener('selectstart', function(e) {
                e.preventDefault();
                return false;
            });
        }

        // Disable common keyboard shortcuts for saving images
        document.addEventListener('keydown', function(e) {
            // Disable Ctrl+S (Save), Ctrl+A (Select All), Ctrl+P (Print), F12 (DevTools)
            if ((e.ctrlKey && (e.key === 's' || e.key === 'a' || e.key === 'p')) || e.key === 'F12') {
                e.preventDefault();
                return false;
            }
        });

        // Disable print screen (limited effectiveness)
        document.addEventListener('keyup', function(e) {
            if (e.key === 'PrintScreen') {
                navigator.clipboard.writeText('');
                console.log('Screenshot attempt detected');
            }
        });
    }

    // Initialize protection
    addImageProtection();
});
