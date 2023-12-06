document.addEventListener('DOMContentLoaded', function() {
    const elements = Array.from(document.querySelectorAll(".image-container img, .image-container video"));
    let currentIndex = 0;
    let startY = 0;
    const swipeThreshold = 50; // Set the swipe threshold for touch events

    // Shuffle the elements randomly
    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    shuffleArray(elements);


    function handleTouchStart(e) {
        startY = e.touches[0].clientY;
    }
    
    function handleTouchMove(e) {
        // Prevent the default behavior to avoid page scrolling
    
        const currentY = e.touches[0].clientY;
        const deltaY = currentY - startY;
    
        // Use deltaY to determine the direction of the swipe
        if (Math.abs(deltaY) >= swipeThreshold) {
            if (deltaY > 0) {
                // Swiping down
                if (currentIndex > 0) {
                    elements[currentIndex].style.zIndex = 0;
                    currentIndex++;
                    elements[currentIndex].style.zIndex = 100;
                    elements[currentIndex].style.display = 'block';
                }
            } else {
                // Swiping up
                if (currentIndex < elements.length - 1) {
                    elements[currentIndex].style.zIndex = 0;
                    currentIndex--;
                    elements[currentIndex].style.zIndex = 100;
                }
            }
        }
    }
    
    function handleTouchEnd() {
        // Reset startY after touch end
        startY = 0;
    }
    
    document.addEventListener('touchstart', handleTouchStart);
    document.addEventListener('touchmove', handleTouchMove);
    document.addEventListener('touchend', handleTouchEnd);


