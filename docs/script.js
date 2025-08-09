// Modern JavaScript for HandyBites Café Website
// Mobile-first, performance-optimized, and accessible

class ModernHandyBites {
  constructor() {
    this.currentMenuSlide = 0;
    this.currentCafeSlide = 0;
    this.currentHeroBg = 0;
    this.menuItems = [];
    this.completeMenu = [];
    this.slideshowItems = [];
    this.gridItems = [];
    this.cafeImages = [];
    this.heroBgImages = [];
    
    this.init();
  }

  async init() {
    this.setupEventListeners();
    this.setupImageProtection();
    await this.loadData();
    this.initSlideshows();
    this.initGallery();
    this.initScrollEffects();
    this.initAccessibility();
  }

  setupEventListeners() {
    // Mobile navigation
    const menuToggle = document.getElementById('menuToggle');
    const mobileMenu = document.getElementById('mobileMenu');
    
    if (menuToggle && mobileMenu) {
      menuToggle.addEventListener('click', () => {
        menuToggle.classList.toggle('active');
        mobileMenu.classList.toggle('active');
      });

      // Close menu when clicking on menu items
      const menuItems = mobileMenu.querySelectorAll('.menu-item');
      menuItems.forEach(item => {
        item.addEventListener('click', () => {
          menuToggle.classList.remove('active');
          mobileMenu.classList.remove('active');
        });
      });
    }

    // Slideshow controls
    this.setupSlideshowControls();
    
    // Gallery modal
    this.setupGalleryModal();
    
    // Smooth scrolling for navigation
    this.setupSmoothScrolling();
  }

  setupSlideshowControls() {
    // Menu slideshow controls
    const prevSlide = document.getElementById('prevSlide');
    const nextSlide = document.getElementById('nextSlide');
    
    if (prevSlide && nextSlide) {
      prevSlide.addEventListener('click', () => this.previousMenuSlide());
      nextSlide.addEventListener('click', () => this.nextMenuSlide());
    }

    // Café slideshow controls
    const prevCafe = document.getElementById('prevCafe');
    const nextCafe = document.getElementById('nextCafe');
    
    if (prevCafe && nextCafe) {
      prevCafe.addEventListener('click', () => this.previousCafeSlide());
      nextCafe.addEventListener('click', () => this.nextCafeSlide());
    }
  }

  setupGalleryModal() {
    // Gallery functionality moved to separate page
    // Only maintain grid preview functionality
    const menuPreview = document.getElementById('menuPreview');
    if (menuPreview) {
      // Grid preview click handler is already set via onclick in HTML
      console.log('Gallery preview configured - redirects to gallery.html');
    }
  }

  setupSmoothScrolling() {
    const menuItems = document.querySelectorAll('.menu-item[href^="#"]');
    
    menuItems.forEach(item => {
      item.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = item.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);
        
        if (targetElement) {
          const headerHeight = 80; // Approximate header height
          const targetPosition = targetElement.offsetTop - headerHeight;
          
          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
          });
        }
      });
    });
  }

  async loadData() {
    try {
      // Load menu items from structured JSON
      const menuResponse = await fetch('assets/menuItems.json');
      if (menuResponse.ok) {
        const menuData = await menuResponse.json();
        
        console.log('Menu data loaded:', menuData); // Debug log
        
        // Use structured data with proper fallbacks
        this.completeMenu = menuData.completeMenu || this.getFallbackCompleteMenu();
        this.slideshowItems = menuData.featuredSlideshow || this.getFallbackSlideshowItems();
        this.gridItems = menuData.instagramGrid || this.getFallbackGridItems();
        
        console.log('Complete menu items:', this.completeMenu.length); // Debug log
        
        // Ensure size limits (defensive programming)
        this.slideshowItems = this.slideshowItems.slice(0, 8); // Max 8 for slideshow
        this.gridItems = this.gridItems.slice(0, 12); // Max 12 for grid (4x3)
        
        // For backward compatibility, set menuItems to complete menu
        this.menuItems = this.completeMenu;
        
      } else {
        console.warn('Could not load menu items, using fallback');
        this.useAllFallbacks();
      }

      // Load café images
      this.cafeImages = this.getCafeImages();
      
      // Set hero background images
      this.heroBgImages = [
        'assets/CafeBackground.jpeg',
        'assets/CafeImages/cafeimage_1.jpeg',
        'assets/CafeImages/cafeimage_2.jpeg',
        'assets/CafeImages/cafeimage_3.jpeg'
      ];

    } catch (error) {
      console.error('Error loading data:', error);
      this.useAllFallbacks();
      this.cafeImages = this.getCafeImages();
      this.heroBgImages = ['assets/CafeBackground.jpeg'];
    }
  }

  useAllFallbacks() {
    this.completeMenu = this.getFallbackCompleteMenu();
    this.slideshowItems = this.getFallbackSlideshowItems();
    this.gridItems = this.getFallbackGridItems();
    this.menuItems = this.completeMenu;
  }

  getFallbackCompleteMenu() {
    // Complete menu fallback (all available images) - using actual filenames
    return [
      'Image 2025-08-08 at 2.57.54 PM.jpeg',
      'Image 2025-08-08 at 2.57.55 PM (1).jpeg',
      'Image 2025-08-08 at 2.57.55 PM.jpeg',
      'Image 2025-08-08 at 2.57.56 PM (1).jpeg',
      'Image 2025-08-08 at 2.57.56 PM.jpeg',
      'Image 2025-08-08 at 2.57.57 PM (1).jpeg',
      'Image 2025-08-08 at 2.57.57 PM.jpeg',
      'Image 2025-08-08 at 2.57.58 PM (1).jpeg',
      'Image 2025-08-08 at 2.57.58 PM.jpeg',
      'Image 2025-08-08 at 2.57.59 PM.jpeg',
      'Image 2025-08-08 at 2.58.00 PM (1).jpeg',
      'Image 2025-08-08 at 2.58.00 PM (2).jpeg',
      'Image 2025-08-08 at 2.58.00 PM.jpeg',
      'Image 2025-08-08 at 2.58.01 PM (1).jpeg',
      'Image 2025-08-08 at 2.58.01 PM.jpeg',
      'Image 2025-08-08 at 2.58.02 PM (1).jpeg',
      'Image 2025-08-08 at 2.58.02 PM.jpeg',
      'Image 2025-08-08 at 2.58.03 PM.jpeg',
      'Image 2025-08-08 at 2.58.04 PM.jpeg',
      'Image 2025-08-08 at 2.58.05 PM.jpeg',
      'Image 2025-08-08 at 2.58.06 PM (1).jpeg',
      'Image 2025-08-08 at 2.58.06 PM.jpeg',
      'Image 2025-08-08 at 2.58.07 PM (1).jpeg',
      'Image 2025-08-08 at 2.58.07 PM (2).jpeg',
      'Image 2025-08-08 at 2.58.07 PM.jpeg',
      'Image 2025-08-08 at 2.58.08 PM (1).jpeg',
      'Image 2025-08-08 at 2.58.08 PM.jpeg',
      'Image 2025-08-08 at 2.58.09 PM (1).jpeg',
      'Image 2025-08-08 at 2.58.09 PM (2).jpeg',
      'Image 2025-08-08 at 2.58.09 PM.jpeg',
      'Image 2025-08-08 at 2.58.10 PM (1).jpeg',
      'Image 2025-08-08 at 2.58.10 PM.jpeg',
      'Image 2025-08-08 at 2.58.11 PM (1).jpeg',
      'Image 2025-08-08 at 2.58.11 PM (2).jpeg',
      'Image 2025-08-08 at 2.58.11 PM.jpeg',
      'Image 2025-08-08 at 2.58.12 PM (1).jpeg',
      'Image 2025-08-08 at 2.58.12 PM (2).jpeg',
      'Image 2025-08-08 at 2.58.12 PM.jpeg',
      'Image 2025-08-08 at 2.58.13 PM (1).jpeg',
      'Image 2025-08-08 at 2.58.13 PM.jpeg',
      'Image 2025-08-08 at 2.58.14 PM (1).jpeg',
      'Image 2025-08-08 at 2.58.14 PM (2).jpeg',
      'Image 2025-08-08 at 2.58.14 PM.jpeg',
      'Image 2025-08-08 at 2.58.15 PM (1).jpeg',
      'Image 2025-08-08 at 2.58.15 PM (2).jpeg',
      'Image 2025-08-08 at 2.58.15 PM.jpeg',
      'Image 2025-08-08 at 2.58.16 PM (1).jpeg',
      'Image 2025-08-08 at 2.58.16 PM (2).jpeg',
      'Image 2025-08-08 at 2.58.16 PM.jpeg',
      'Image 2025-08-08 at 2.58.17 PM (1).jpeg',
      'Image 2025-08-08 at 2.58.17 PM.jpeg',
      'Image 2025-08-08 at 2.58.18 PM (1).jpeg',
      'Image 2025-08-08 at 2.58.18 PM (2).jpeg',
      'Image 2025-08-08 at 2.58.18 PM.jpeg',
      'Image 2025-08-08 at 2.58.19 PM (1).jpeg',
      'Image 2025-08-08 at 2.58.19 PM.jpeg',
      'Image 2025-08-08 at 2.58.20 PM (1).jpeg',
      'Image 2025-08-08 at 2.58.20 PM.jpeg',
      'Image 2025-08-08 at 2.58.21 PM (1).jpeg',
      'Image 2025-08-08 at 2.58.21 PM.jpeg',
      'Image 2025-08-08 at 2.58.22 PM (1).jpeg',
      'Image 2025-08-08 at 2.58.22 PM (2).jpeg',
      'Image 2025-08-08 at 2.58.22 PM.jpeg',
      'Image 2025-08-08 at 2.58.23 PM (1).jpeg',
      'Image 2025-08-08 at 2.58.23 PM (2).jpeg',
      'Image 2025-08-08 at 2.58.23 PM.jpeg',
      'Image 2025-08-08 at 2.58.24 PM (1).jpeg',
      'Image 2025-08-08 at 2.58.24 PM.jpeg',
      'Image 2025-08-08 at 2.58.25 PM (1).jpeg',
      'Image 2025-08-08 at 2.58.25 PM (2).jpeg',
      'Image 2025-08-08 at 2.58.25 PM.jpeg',
      'Image 2025-08-08 at 2.58.26 PM (1).jpeg',
      'Image 2025-08-08 at 2.58.26 PM.jpeg',
      'Image 2025-08-08 at 2.58.27 PM (1).jpeg',
      'Image 2025-08-08 at 2.58.27 PM (2).jpeg',
      'Image 2025-08-08 at 2.58.27 PM.jpeg',
      'Image 2025-08-08 at 2.58.28 PM.jpeg',
      'Image 2025-08-08 at 2.58.29 PM (1).jpeg',
      'Image 2025-08-08 at 2.58.29 PM (2).jpeg',
      'Image 2025-08-08 at 2.58.29 PM.jpeg',
      'Image 2025-08-08 at 2.58.30 PM (1).jpeg',
      'Image 2025-08-08 at 2.58.30 PM.jpeg',
      'Image 2025-08-08 at 2.58.31 PM (1).jpeg',
      'Image 2025-08-08 at 2.58.31 PM (2).jpeg',
      'Image 2025-08-08 at 2.58.31 PM.jpeg',
      'Image 2025-08-08 at 2.58.32 PM (1).jpeg',
      'Image 2025-08-08 at 2.58.32 PM.jpeg',
      'Image 2025-08-08 at 2.58.33 PM (1).jpeg',
      'Image 2025-08-08 at 2.58.33 PM (2).jpeg',
      'Image 2025-08-08 at 2.58.33 PM.jpeg',
      'Image 2025-08-08 at 2.58.34 PM (1).jpeg',
      'Image 2025-08-08 at 2.58.34 PM.jpeg',
      'Image 2025-08-08 at 2.58.35 PM (1).jpeg',
      'Image 2025-08-08 at 2.58.35 PM (2).jpeg',
      'Image 2025-08-08 at 2.58.35 PM.jpeg',
      'Image 2025-08-08 at 2.58.36 PM (1).jpeg',
      'Image 2025-08-08 at 2.58.36 PM (2).jpeg',
      'Image 2025-08-08 at 2.58.36 PM.jpeg'
    ];
  }

  getFallbackSlideshowItems() {
    // Slideshow fallback (8 best images)
    return [
      'Image 2025-08-08 at 2.57.54 PM.jpeg',
      'Image 2025-08-08 at 2.57.55 PM.jpeg',
      'Image 2025-08-08 at 2.57.56 PM.jpeg',
      'Image 2025-08-08 at 2.57.57 PM.jpeg',
      'Image 2025-08-08 at 2.58.04 PM.jpeg',
      'Image 2025-08-08 at 2.58.06 PM.jpeg',
      'Image 2025-08-08 at 2.58.09 PM.jpeg',
      'Image 2025-08-08 at 2.58.14 PM.jpeg'
    ];
  }

  getFallbackGridItems() {
    // Instagram grid fallback (12 curated images)
    return [
      'Image 2025-08-08 at 2.57.54 PM.jpeg',
      'Image 2025-08-08 at 2.57.55 PM.jpeg',
      'Image 2025-08-08 at 2.57.56 PM.jpeg',
      'Image 2025-08-08 at 2.57.57 PM.jpeg',
      'Image 2025-08-08 at 2.58.04 PM.jpeg',
      'Image 2025-08-08 at 2.58.06 PM.jpeg',
      'Image 2025-08-08 at 2.58.09 PM.jpeg',
      'Image 2025-08-08 at 2.58.14 PM.jpeg',
      'Image 2025-08-08 at 2.58.15 PM.jpeg',
      'Image 2025-08-08 at 2.58.19 PM.jpeg',
      'Image 2025-08-08 at 2.58.00 PM.jpeg',
      'Image 2025-08-08 at 2.58.01 PM.jpeg'
    ];
  }



  getCafeImages() {
    return [
      'assets/CafeImages/cafeimage_1.jpeg',
      'assets/CafeImages/cafeimage_2.jpeg',
      'assets/CafeImages/cafeimage_3.jpeg',
      'assets/CafeImages/cafeimage_4.jpeg',
      'assets/CafeImages/cafeimage_5.jpeg',
      'assets/CafeImages/cafeimage_6.jpeg',
      'assets/CafeImages/cafeimage_7.jpeg',
      'assets/CafeImages/cafeimage_8.jpeg'
    ];
  }

  initSlideshows() {
    this.initHeroBgSlideshow();
    this.initMenuSlideshow();
    this.initCafeSlideshow();
  }

  initHeroBgSlideshow() {
    const heroBgSlideshow = document.getElementById('heroBgSlideshow');
    if (!heroBgSlideshow) return;

    // Create background slides
    this.heroBgImages.forEach((image, index) => {
      const slide = document.createElement('div');
      slide.className = `hero-bg-slide ${index === 0 ? 'active' : ''}`;
      slide.style.backgroundImage = `url('${image}')`;
      heroBgSlideshow.appendChild(slide);
    });

    // Auto-advance hero background every 5 seconds
    if (this.heroBgImages.length > 1) {
      setInterval(() => {
        this.nextHeroBg();
      }, 5000);
    }
  }

  initMenuSlideshow() {
    const menuSlideshow = document.getElementById('menuSlideshow');
    const slideIndicators = document.getElementById('slideIndicators');
    
    if (!menuSlideshow) return;

    // Use dedicated slideshow items (max 8)
    const slideshowItems = this.slideshowItems || this.getFallbackSlideshowItems();
    const limitedItems = slideshowItems.slice(0, 8); // Ensure max 8 items
    
    // Create slides with better error handling
    limitedItems.forEach((item, index) => {
      const slide = document.createElement('div');
      slide.className = `menu-slide ${index === 0 ? 'active' : ''}`;
      
      const img = document.createElement('img');
      img.src = `assets/MenuItems/${item}`;
      img.alt = `Featured menu item ${index + 1}`;
      img.loading = index === 0 ? 'eager' : 'lazy';
      img.className = 'protected-image';
      
      // Add watermark overlay for slideshow
      const watermark = document.createElement('div');
      watermark.className = 'watermark-overlay slideshow-watermark';
      watermark.innerHTML = `
        <div class="watermark-text">© HandyBites Café</div>
        <div class="watermark-logo">HandyBites</div>
      `;
      
      // Better error handling - hide the slide if image fails
      img.onerror = () => {
        console.warn(`Failed to load slideshow image: ${item}`);
        slide.style.display = 'none';
        // Try to activate the next slide if this was the active one
        if (slide.classList.contains('active')) {
          this.nextMenuSlide();
        }
      };
      
      // Ensure image loads properly
      img.onload = () => {
        slide.classList.add('loaded');
      };
      
      slide.appendChild(img);
      slide.appendChild(watermark);
      menuSlideshow.appendChild(slide);
    });

    // Create indicators only for slides that will actually show
    if (slideIndicators && limitedItems.length > 1) {
      limitedItems.forEach((_, index) => {
        const indicator = document.createElement('div');
        indicator.className = `slide-indicator ${index === 0 ? 'active' : ''}`;
        indicator.addEventListener('click', () => this.goToMenuSlide(index));
        slideIndicators.appendChild(indicator);
      });
    }

    // Auto-advance slideshow every 3 seconds (faster pace)
    if (limitedItems.length > 1) {
      setInterval(() => {
        this.nextMenuSlide();
      }, 3000);
    }
  }

  initCafeSlideshow() {
    const cafeSlideshow = document.getElementById('cafeSlideshow');
    if (!cafeSlideshow) return;

    // Create café slides
    this.cafeImages.forEach((image, index) => {
      const slide = document.createElement('div');
      slide.className = `cafe-slide ${index === 0 ? 'active' : ''}`;
      
      const img = document.createElement('img');
      img.src = image;
      img.alt = `Café ambiance ${index + 1}`;
      img.loading = index === 0 ? 'eager' : 'lazy';
      
      // Handle image load errors
      img.onerror = () => {
        img.src = 'assets/HBLogo.png';
        img.alt = 'Café image placeholder';
      };
      
      slide.appendChild(img);
      cafeSlideshow.appendChild(slide);
    });

    // Auto-advance café slideshow every 3 seconds
    if (this.cafeImages.length > 1) {
      setInterval(() => {
        this.nextCafeSlide();
      }, 3000);
    }
  }

  initGallery() {
    const menuPreview = document.getElementById('menuPreview');
    if (!menuPreview) return;

    // Use dedicated Instagram grid items (max 12 for 4x3 grid)
    const gridItems = this.gridItems || this.getFallbackGridItems();
    const limitedItems = gridItems.slice(0, 12); // Ensure exactly 12 items for 4x3 grid
    
    limitedItems.forEach((item, index) => {
      const gridItem = document.createElement('div');
      gridItem.className = 'instagram-grid-item';
      
      const img = document.createElement('img');
      img.src = `assets/MenuItems/${item}`;
      img.alt = `Menu preview ${index + 1}`;
      img.loading = index < 4 ? 'eager' : 'lazy'; // Load first row eagerly
      
      // Handle image load errors
      img.onerror = () => {
        console.warn(`Failed to load grid image: ${item}`);
        img.src = 'assets/HBLogo.png';
        img.alt = 'Menu item placeholder';
      };
      
      gridItem.appendChild(img);
      menuPreview.appendChild(gridItem);
    });
  }







  nextHeroBg() {
    const slides = document.querySelectorAll('.hero-bg-slide');
    if (slides.length <= 1) return;

    slides[this.currentHeroBg].classList.remove('active');
    this.currentHeroBg = (this.currentHeroBg + 1) % slides.length;
    slides[this.currentHeroBg].classList.add('active');
  }

  nextMenuSlide() {
    const slides = document.querySelectorAll('.menu-slide');
    const indicators = document.querySelectorAll('.slide-indicator');
    
    if (slides.length <= 1) return;

    // Remove active class from current slide
    slides[this.currentMenuSlide].classList.remove('active');
    if (indicators[this.currentMenuSlide]) {
      indicators[this.currentMenuSlide].classList.remove('active');
    }

    // Find next visible slide
    let nextSlide = (this.currentMenuSlide + 1) % slides.length;
    let attempts = 0;
    
    // Skip hidden slides (failed to load images)
    while (slides[nextSlide].style.display === 'none' && attempts < slides.length) {
      nextSlide = (nextSlide + 1) % slides.length;
      attempts++;
    }
    
    // If all slides are hidden, stay on current slide
    if (attempts >= slides.length) {
      slides[this.currentMenuSlide].classList.add('active');
      if (indicators[this.currentMenuSlide]) {
        indicators[this.currentMenuSlide].classList.add('active');
      }
      return;
    }

    this.currentMenuSlide = nextSlide;

    slides[this.currentMenuSlide].classList.add('active');
    if (indicators[this.currentMenuSlide]) {
      indicators[this.currentMenuSlide].classList.add('active');
    }
  }

  previousMenuSlide() {
    const slides = document.querySelectorAll('.menu-slide');
    const indicators = document.querySelectorAll('.slide-indicator');
    
    if (slides.length <= 1) return;

    slides[this.currentMenuSlide].classList.remove('active');
    if (indicators[this.currentMenuSlide]) {
      indicators[this.currentMenuSlide].classList.remove('active');
    }

    this.currentMenuSlide = this.currentMenuSlide === 0 ? slides.length - 1 : this.currentMenuSlide - 1;

    slides[this.currentMenuSlide].classList.add('active');
    if (indicators[this.currentMenuSlide]) {
      indicators[this.currentMenuSlide].classList.add('active');
    }
  }

  goToMenuSlide(index) {
    const slides = document.querySelectorAll('.menu-slide');
    const indicators = document.querySelectorAll('.slide-indicator');
    
    if (index < 0 || index >= slides.length) return;
    
    // Don't go to hidden slides
    if (slides[index].style.display === 'none') return;

    slides[this.currentMenuSlide].classList.remove('active');
    if (indicators[this.currentMenuSlide]) {
      indicators[this.currentMenuSlide].classList.remove('active');
    }

    this.currentMenuSlide = index;

    slides[this.currentMenuSlide].classList.add('active');
    if (indicators[this.currentMenuSlide]) {
      indicators[this.currentMenuSlide].classList.add('active');
    }
  }

  nextCafeSlide() {
    const slides = document.querySelectorAll('.cafe-slide');
    if (slides.length <= 1) return;

    slides[this.currentCafeSlide].classList.remove('active');
    this.currentCafeSlide = (this.currentCafeSlide + 1) % slides.length;
    slides[this.currentCafeSlide].classList.add('active');
  }

  previousCafeSlide() {
    const slides = document.querySelectorAll('.cafe-slide');
    if (slides.length <= 1) return;

    slides[this.currentCafeSlide].classList.remove('active');
    this.currentCafeSlide = this.currentCafeSlide === 0 ? slides.length - 1 : this.currentCafeSlide - 1;
    slides[this.currentCafeSlide].classList.add('active');
  }

  initScrollEffects() {
    // Add scroll-based animations
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }
      });
    }, observerOptions);

    // Observe glass cards for fade-in effect
    const glassCards = document.querySelectorAll('.glass-card');
    glassCards.forEach(card => {
      card.style.opacity = '0';
      card.style.transform = 'translateY(30px)';
      card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
      observer.observe(card);
    });

    // Hide/show navigation based on scroll
    let lastScrollY = window.scrollY;
    const nav = document.querySelector('.mobile-nav');
    
    window.addEventListener('scroll', () => {
      const currentScrollY = window.scrollY;
      
      if (nav) {
        if (currentScrollY > lastScrollY && currentScrollY > 100) {
          nav.style.transform = 'translateY(-100%)';
        } else {
          nav.style.transform = 'translateY(0)';
        }
      }
      
      lastScrollY = currentScrollY;
    }, { passive: true });
  }

  initAccessibility() {
    // Add keyboard navigation for slideshows
    document.addEventListener('keydown', (e) => {
      const galleryModal = document.getElementById('galleryModal');
      
      // Only handle arrow keys if modal is not open
      if (!galleryModal || !galleryModal.classList.contains('active')) {
        if (e.key === 'ArrowLeft') {
          this.previousMenuSlide();
        } else if (e.key === 'ArrowRight') {
          this.nextMenuSlide();
        }
      }
    });

    // Add ARIA labels and roles
    const slideButtons = document.querySelectorAll('.slide-btn, .cafe-btn');
    slideButtons.forEach(button => {
      button.setAttribute('role', 'button');
      button.setAttribute('tabindex', '0');
    });

    // Add focus management for modal
    const galleryModal = document.getElementById('galleryModal');
    if (galleryModal) {
      galleryModal.addEventListener('show', () => {
        const closeButton = document.getElementById('closeModal');
        if (closeButton) {
          closeButton.focus();
        }
      });
    }

    // Announce slideshow changes for screen readers
    const announcer = document.createElement('div');
    announcer.setAttribute('aria-live', 'polite');
    announcer.setAttribute('aria-atomic', 'true');
    announcer.style.position = 'absolute';
    announcer.style.left = '-10000px';
    announcer.style.width = '1px';
    announcer.style.height = '1px';
    announcer.style.overflow = 'hidden';
    document.body.appendChild(announcer);

    this.announcer = announcer;
  }

  announceSlideChange(slideNumber, totalSlides, type = 'menu') {
    if (this.announcer) {
      this.announcer.textContent = `${type} slide ${slideNumber} of ${totalSlides}`;
    }
  }

  setupImageProtection() {
    // Disable right-click context menu on images
    document.addEventListener('contextmenu', (e) => {
      if (e.target.tagName === 'IMG' || e.target.closest('.gallery-item') || e.target.closest('.menu-slide')) {
        e.preventDefault();
        this.showProtectionWarning();
      }
    });

    // Disable common screenshot shortcuts
    document.addEventListener('keydown', (e) => {
      // Disable F12, Ctrl+Shift+I, Ctrl+U, Ctrl+S, Print Screen
      if (e.key === 'F12' || 
          (e.ctrlKey && e.shiftKey && e.key === 'I') ||
          (e.ctrlKey && e.key === 'u') ||
          (e.ctrlKey && e.key === 's') ||
          e.key === 'PrintScreen') {
        e.preventDefault();
        this.showProtectionWarning();
      }
    });

    // Disable drag and drop of images
    document.addEventListener('dragstart', (e) => {
      if (e.target.tagName === 'IMG') {
        e.preventDefault();
      }
    });

    // Add protection classes to images
    setTimeout(() => {
      const images = document.querySelectorAll('img');
      images.forEach(img => {
        img.classList.add('protected-image');
        img.style.userSelect = 'none';
        img.style.webkitUserSelect = 'none';
        img.style.mozUserSelect = 'none';
        img.style.msUserSelect = 'none';
      });
    }, 1000);
  }

  showProtectionWarning() {
    // Create or show protection warning
    let warning = document.getElementById('protection-warning');
    if (!warning) {
      warning = document.createElement('div');
      warning.id = 'protection-warning';
      warning.className = 'protection-warning';
      warning.innerHTML = `
        <div class="warning-content">
          <h3>⚠️ Content Protected</h3>
          <p>This content is protected by copyright.</p>
          <p>Unauthorized copying, downloading, or distribution is prohibited.</p>
          <p>© ${new Date().getFullYear()} HandyBites Café. All rights reserved.</p>
          <button onclick="this.parentElement.parentElement.remove()">Understood</button>
        </div>
      `;
      document.body.appendChild(warning);
    }
    
    warning.style.display = 'flex';
    setTimeout(() => {
      if (warning) warning.remove();
    }, 5000);
  }
}

// Performance optimizations
class PerformanceOptimizer {
  static preloadCriticalImages() {
    const criticalImages = [
      'assets/HBLogo.png',
      'assets/CafeBackground.jpeg',
      'assets/pure-veg.svg'
    ];

    criticalImages.forEach(src => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'image';
      link.href = src;
      document.head.appendChild(link);
    });
  }

  static deferNonCriticalCSS() {
    // This would be implemented if we had separate CSS files
    // For now, all CSS is in one optimized file
  }

  static enableServiceWorker() {
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
          .then(registration => {
            console.log('SW registered: ', registration);
          })
          .catch(registrationError => {
            console.log('SW registration failed: ', registrationError);
          });
      });
    }
  }
}

// Error handling
class ErrorHandler {
  static init() {
    window.addEventListener('error', (e) => {
      console.error('JavaScript error:', e.error);
      // Could send to analytics service in production
    });

    window.addEventListener('unhandledrejection', (e) => {
      console.error('Unhandled promise rejection:', e.reason);
      // Could send to analytics service in production
    });
  }
}

// Initialize everything when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initApp);
} else {
  initApp();
}

function initApp() {
  // Initialize error handling
  ErrorHandler.init();
  
  // Preload critical images
  PerformanceOptimizer.preloadCriticalImages();
  
  // Initialize main app
  new ModernHandyBites();
  
  // Service Worker disabled for file:// protocol compatibility
  // PerformanceOptimizer.enableServiceWorker();
}

// Export for potential module usage
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { ModernHandyBites, PerformanceOptimizer, ErrorHandler };
}
