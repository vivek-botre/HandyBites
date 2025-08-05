// Additional security measures for Handy Bites website
// Disable right-click context menu globally
document.addEventListener('contextmenu', function(e) {
    e.preventDefault();
    return false;
});

// Disable text selection globally
document.addEventListener('selectstart', function(e) {
    e.preventDefault();
    return false;
});

// Disable drag and drop
document.addEventListener('dragstart', function(e) {
    e.preventDefault();
    return false;
});

// Disable keyboard shortcuts for developer tools and common actions
document.addEventListener('keydown', function(e) {
    // Disable F12 (Developer Tools)
    if (e.keyCode === 123) {
        e.preventDefault();
        return false;
    }
    
    // Disable Ctrl+Shift+I (Developer Tools)
    if (e.ctrlKey && e.shiftKey && e.keyCode === 73) {
        e.preventDefault();
        return false;
    }
    
    // Disable Ctrl+Shift+J (Console)
    if (e.ctrlKey && e.shiftKey && e.keyCode === 74) {
        e.preventDefault();
        return false;
    }
    
    // Disable Ctrl+U (View Source)
    if (e.ctrlKey && e.keyCode === 85) {
        e.preventDefault();
        return false;
    }
    
    // Disable Ctrl+A (Select All)
    if (e.ctrlKey && e.keyCode === 65) {
        e.preventDefault();
        return false;
    }
    
    // Disable Ctrl+S (Save Page)
    if (e.ctrlKey && e.keyCode === 83) {
        e.preventDefault();
        return false;
    }
    
    // Disable Ctrl+P (Print)
    if (e.ctrlKey && e.keyCode === 80) {
        e.preventDefault();
        return false;
    }
});

// Disable image dragging
document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.addEventListener('dragstart', function(e) {
            e.preventDefault();
            return false;
        });
        
        img.addEventListener('mousedown', function(e) {
            e.preventDefault();
            return false;
        });
    });
});

// Console warning message
console.clear();
console.log('%c⚠️ WARNING! ⚠️', 'color: red; font-size: 30px; font-weight: bold;');
console.log('%cThis is a browser feature intended for developers. Content on this page is protected by copyright law.', 'color: red; font-size: 16px;');
console.log('%cUnauthorized access or modification is strictly prohibited.', 'color: red; font-size: 16px;');
console.log('%c© 2025 Handy Bites Café. All rights reserved.', 'color: red; font-size: 16px;');

// Disable console
if (typeof console !== "undefined") {
    console.log = function() {};
    console.warn = function() {};
    console.error = function() {};
    console.info = function() {};
    console.debug = function() {};
    console.clear = function() {};
}
