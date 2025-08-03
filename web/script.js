// Instagram slideshow logic
// Replace these URLs with actual Instagram post image URLs for live use
const posts = [
    'https://via.placeholder.com/600x320?text=Instagram+Post+1',
    'https://via.placeholder.com/600x320?text=Instagram+Post+2',
    'https://via.placeholder.com/600x320?text=Instagram+Post+3'
];

let current = 0;
const slideshow = document.getElementById('insta-slideshow');

function showPost(idx) {
    slideshow.innerHTML = `<img src="${posts[idx]}" alt="Instagram Post" style="width:100%;height:auto;">`;
}

function nextPost() {
    current = (current + 1) % posts.length;
    showPost(current);
}

function startSlideshow() {
    showPost(current);
    setInterval(nextPost, 3000);
}

document.addEventListener('DOMContentLoaded', startSlideshow);
