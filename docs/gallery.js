// Gallery Page JavaScript for HandyBites Café

class GalleryPage {
  constructor() {
    this.completeMenu = [];
    this.init();
  }

  async init() {
    this.setupEventListeners();
    this.setupImageProtection();
    await this.loadData();
    this.loadGalleryGrid();
  }

  setupImageProtection() {
    // Disable right-click context menu
    document.addEventListener('contextmenu', (e) => {
      e.preventDefault();
      this.showProtectionWarning();
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

    // Disable text selection on images
    document.addEventListener('selectstart', (e) => {
      if (e.target.tagName === 'IMG' || e.target.closest('.image-container')) {
        e.preventDefault();
      }
    });

    // Add blur effect when user tries to take screenshot (detect focus loss)
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        document.body.classList.add('screenshot-protection');
      } else {
        setTimeout(() => {
          document.body.classList.remove('screenshot-protection');
        }, 500);
      }
    });
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

  setupEventListeners() {
    // Instagram view handlers
    const instagramView = document.getElementById('instagramView');
    const instagramBackdrop = document.getElementById('instagramBackdrop');
    const instagramBack = document.getElementById('instagramBack');
    const instagramClose = document.getElementById('instagramClose');

    if (instagramBackdrop && instagramView) {
      instagramBackdrop.addEventListener('click', () => {
        instagramView.classList.remove('active');
        document.body.style.overflow = '';
      });
    }

    if (instagramBack && instagramView) {
      instagramBack.addEventListener('click', () => {
        instagramView.classList.remove('active');
        document.body.style.overflow = '';
      });
    }

    if (instagramClose && instagramView) {
      instagramClose.addEventListener('click', () => {
        instagramView.classList.remove('active');
        document.body.style.overflow = '';
      });
    }

    // Close with Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && instagramView.classList.contains('active')) {
        instagramView.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
  }

  async loadData() {
    try {
      // Load menu items from structured JSON
      const menuResponse = await fetch('assets/menuItems.json');
      if (menuResponse.ok) {
        const menuData = await menuResponse.json();
        this.completeMenu = menuData.completeMenu || this.getFallbackCompleteMenu();
      } else {
        console.warn('Could not load menu items, using fallback');
        this.completeMenu = this.getFallbackCompleteMenu();
      }
    } catch (error) {
      console.error('Error loading data:', error);
      this.completeMenu = this.getFallbackCompleteMenu();
    }
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

  loadGalleryGrid() {
    const galleryGrid = document.getElementById('galleryGrid');
    if (!galleryGrid) return;

    // Clear existing items
    galleryGrid.innerHTML = '';

    // Load all items in 4-column grid
    this.completeMenu.forEach((item, index) => {
      const gridItem = document.createElement('div');
      gridItem.className = 'gallery-grid-item';
      
      // Create image container with watermark
      const imageContainer = document.createElement('div');
      imageContainer.className = 'image-container grid-image-container';
      
      const img = document.createElement('img');
      img.src = `assets/MenuItems/${item}`;
      img.alt = `Menu item ${index + 1}`;
      img.loading = 'lazy';
      img.className = 'protected-image';
      
      // Add subtle watermark for grid view
      const watermark = document.createElement('div');
      watermark.className = 'watermark-overlay grid-watermark';
      watermark.innerHTML = `<div class="watermark-text">© HandyBites</div>`;
      
      // Click to open Instagram view at the correct image
      gridItem.addEventListener('click', (e) => {
        e.stopPropagation();
        this.openInstagramView(index);
      });
      
      // Handle image load errors
      img.onerror = () => {
        console.error('Failed to load gallery image:', img.src);
        img.src = 'assets/HBLogo.png';
        img.alt = 'Menu item placeholder';
        gridItem.classList.add('placeholder');
      };
      
      // Handle successful load
      img.onload = () => {
        gridItem.classList.add('loaded');
      };
      
      imageContainer.appendChild(img);
      imageContainer.appendChild(watermark);
      gridItem.appendChild(imageContainer);
      galleryGrid.appendChild(gridItem);
    });
  }

  openInstagramView(startIndex = 0) {
    const instagramView = document.getElementById('instagramView');
    const instagramScroll = document.getElementById('instagramScroll');
    
    if (!instagramView || !instagramScroll) return;

    // Show Instagram view
    instagramView.classList.add('active');
    document.body.style.overflow = 'hidden';
    
    // Clear existing items
    instagramScroll.innerHTML = '';

    // Store current index and total items
    this.currentInstagramIndex = startIndex;
    this.totalItems = this.completeMenu.length;

    // Load only the clicked image first, then progressively load others
    this.loadImageProgressively(startIndex);
    
    // Set up intersection observer for lazy loading
    this.setupIntersectionObserver();
  }

  loadImageProgressively(startIndex) {
    const instagramScroll = document.getElementById('instagramScroll');
    if (!instagramScroll) return;

    // Create placeholder items for all images
    this.completeMenu.forEach((item, index) => {
      const instagramItem = document.createElement('div');
      instagramItem.className = 'instagram-item';
      instagramItem.id = `instagram-item-${index}`;
      instagramItem.dataset.index = index;
      instagramItem.dataset.src = `assets/MenuItems/${item}`;
      
      // Add loading placeholder
      const placeholder = document.createElement('div');
      placeholder.className = 'image-placeholder';
      placeholder.innerHTML = `
        <div class="loading-spinner"></div>
        <span>Loading image ${index + 1}...</span>
      `;
      
      instagramItem.appendChild(placeholder);
      instagramScroll.appendChild(instagramItem);
    });

    // Load the clicked image immediately
    this.loadSingleImage(startIndex);
    
    // Load nearby images (1 above and 1 below)
    if (startIndex > 0) this.loadSingleImage(startIndex - 1);
    if (startIndex < this.totalItems - 1) this.loadSingleImage(startIndex + 1);

    // Position view at the clicked image without scrolling animation
    setTimeout(() => {
      const targetItem = document.getElementById(`instagram-item-${startIndex}`);
      if (targetItem) {
        // Use scrollTop for instant positioning without animation
        const scrollContainer = instagramScroll;
        const itemTop = targetItem.offsetTop;
        const containerHeight = scrollContainer.clientHeight;
        const itemHeight = targetItem.clientHeight;
        
        // Center the item in the viewport
        scrollContainer.scrollTop = itemTop - (containerHeight / 2) + (itemHeight / 2);
      }
    }, 50);
  }

  loadSingleImage(index) {
    const item = document.getElementById(`instagram-item-${index}`);
    if (!item || item.dataset.loaded === 'true') return;

    const imageSrc = item.dataset.src;
    const placeholder = item.querySelector('.image-placeholder');
    
    // Create image container with watermark
    const imageContainer = document.createElement('div');
    imageContainer.className = 'image-container';
    
    // Create and load the image
    const img = document.createElement('img');
    img.alt = `Menu item ${index + 1}`;
    img.className = 'protected-image';
    
    // Add watermark overlay
    const watermark = document.createElement('div');
    watermark.className = 'watermark-overlay';
    watermark.innerHTML = `
      <div class="watermark-text">© HandyBites Café</div>
      <div class="watermark-logo">HandyBites</div>
    `;
    
    // Handle successful load
    img.onload = () => {
      if (placeholder) {
        item.removeChild(placeholder);
      }
      imageContainer.appendChild(img);
      imageContainer.appendChild(watermark);
      item.appendChild(imageContainer);
      item.dataset.loaded = 'true';
      item.classList.add('loaded');
    };
    
    // Handle load errors
    img.onerror = () => {
      img.src = 'assets/HBLogo.png';
      img.alt = 'Menu item placeholder';
      if (placeholder) {
        placeholder.innerHTML = '<span>Failed to load image</span>';
      }
    };
    
    // Start loading
    img.src = imageSrc;
  }

  setupIntersectionObserver() {
    // Set up intersection observer for progressive loading
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const index = parseInt(entry.target.dataset.index);
          this.loadSingleImage(index);
          
          // Also load adjacent images for smooth scrolling
          if (index > 0) this.loadSingleImage(index - 1);
          if (index < this.totalItems - 1) this.loadSingleImage(index + 1);
        }
      });
    }, {
      rootMargin: '100px', // Start loading when image is 100px away from viewport
      threshold: 0.1
    });

    // Observe all items
    document.querySelectorAll('.instagram-item').forEach(item => {
      observer.observe(item);
    });
  }
}

// Initialize the gallery page
document.addEventListener('DOMContentLoaded', () => {
  new GalleryPage();
});
