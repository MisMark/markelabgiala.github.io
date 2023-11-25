const elements = Array.from(document.querySelectorAll(".image-container img, .image-container video"));
let currentIndex = 0;
let lastScrollTime = Date.now();
let startY = 0;
const scrollThreshold = 1200; // Set the time threshold (in milliseconds)
const swipeThreshold = 50; // Set the swipe threshold for touch events

// Shuffle the elements randomly
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

shuffleArray(elements);

function handleWheel(e) {
    e.preventDefault(); // Prevent the default scroll behavior

    const currentTime = Date.now();

    // Check if enough time has passed since the last scroll event
    if (currentTime - lastScrollTime >= scrollThreshold) {
        lastScrollTime = currentTime;

        if (e.deltaY > 0) {
            // Scrolling down
            if (currentIndex < elements.length - 1) {
                elements[currentIndex].style.zIndex = 0; // Reset the current element
                currentIndex++;
                elements[currentIndex].style.zIndex = 100; // Bring the next element to the front
                elements[currentIndex].style.display = 'block';
            }
        } else if (e.deltaY < 0) {
            // Scrolling up
            if (currentIndex > 0) {
                elements[currentIndex].style.zIndex = 0; // Reset the current element
                currentIndex--;
                elements[currentIndex].style.zIndex = 100; // Bring the previous element to the front
            }
        }
    }
}

function handleTouchStart(e) {
    startY = e.touches[0].clientY;
}

function handleTouchMove(e) {
    e.preventDefault(); // Prevent the default touch move behavior

    const deltaY = e.touches[0].clientY - startY;

    if (Math.abs(deltaY) >= swipeThreshold) {
        if (deltaY > 0) {
            // Swiping down
            if (currentIndex > 0 ) {
                elements[currentIndex].style.zIndex = 0; // Reset the current element
                currentIndex++;
                elements[currentIndex].style.zIndex = 100; // Bring the next element to the front
                elements[currentIndex].style.display = 'block';
            }
        } else {
            // Swiping up
            if (currentIndex < elements.length - 1) {
                elements[currentIndex].style.zIndex = 0; // Reset the current element
                currentIndex--;
                elements[currentIndex].style.zIndex = 100; // Bring the previous element to the front
            }
        }

        // Reset startY for the next swipe
        startY = e.touches[0].clientY;
    }
}

document.addEventListener('wheel', handleWheel);
document.addEventListener('touchstart', handleTouchStart);
document.addEventListener('touchmove', handleTouchMove);


// Click function opening the about page
document.querySelector('.borders').addEventListener('click', function() {
    document.querySelector('.overlay').style.display = 'block';
});

document.querySelector('.return').addEventListener('click', function() {
    document.querySelector('.overlay').style.display = 'none';
});