// This script dynamically lists all images in docs/assets/MenuItems for the slideshow
// It embeds the image list directly into script.js to avoid CORS issues when opening locally

const fs = require('fs');
const path = require('path');

const menuItemsDir = path.join(__dirname, 'assets', 'MenuItems');
const scriptPath = path.join(__dirname, 'script.js');

fs.readdir(menuItemsDir, (err, files) => {
    if (err) {
        console.error('Error reading MenuItems directory:', err);
        process.exit(1);
    }
    
    // Filter for image files (jpeg, jpg, png, gif, webp)
    const imageFiles = files.filter(f => /\.(jpe?g|png|gif|webp)$/i.test(f));
    
    // Read the current script.js file
    let scriptContent = fs.readFileSync(scriptPath, 'utf8');
    
    // Create the new menuImages array as a string
    const menuImagesArray = JSON.stringify(imageFiles, null, 8);
    
    // Replace the fetch call with direct array usage
    const oldFetchPattern = /\/\/ Fetch menu images dynamically from menuItems\.json[\s\S]*?\.catch\(err => \{[\s\S]*?\}\);/;
    
    const newCode = `// Menu images array - automatically generated
        const menuImages = ${menuImagesArray};
        
        console.log('Menu images loaded:', menuImages);
        createSlides(menuImages);
        setTimeout(() => {
            const slides = slideshowContainer.querySelectorAll('.slide');
            console.log('Found', slides.length, 'slides');
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
                console.log('Showing slide:', index);
            }
            function nextSlide() {
                currentSlide = (currentSlide + 1) % slides.length;
                showSlide(currentSlide);
            }
            if (slides.length > 1) {
                setInterval(nextSlide, 4000);
                console.log('Slideshow started with', slides.length, 'slides');
            }
            showSlide(0);
        }, 500);`;
    
    // Replace the fetch code with the new embedded array code
    scriptContent = scriptContent.replace(oldFetchPattern, newCode);
    
    // Write the updated script back
    fs.writeFileSync(scriptPath, scriptContent);
    
    console.log('script.js updated with', imageFiles.length, 'images embedded directly.');
    console.log('The slideshow will now work when opening index.html locally!');
});
