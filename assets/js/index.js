document.addEventListener('DOMContentLoaded', function() {
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
    function handleTap() {
        if (currentIndex < elements.length - 1) {
            elements[currentIndex].style.zIndex = 0; // Reset the current element
            currentIndex++;
            elements[currentIndex].style.zIndex = 100; // Bring the next element to the front
            elements[currentIndex].style.display = 'block';
        }
    }

    document.addEventListener('wheel', handleWheel);

    // Add click event listener for both desktop and mobile
    document.addEventListener('click', handleTap);



    function handleClick() {
        const currentElement = elements[currentIndex];
    
        // Toggle visibility of the clicked element
        currentElement.classList.toggle('enlarged');
    
        // Toggle background information visibility
        const backgroundInfo = document.querySelector('.borders');
        backgroundInfo.classList.toggle('hidden');

        const title = document.querySelector('.title');
        title.classList.toggle('hidden');

        const title2 = document.querySelector('.title2');
        title2.classList.toggle('hidden');

        const title3 = document.querySelector('.title3');
        title3.classList.toggle('hidden');
    
        // Toggle close button visibility
        const closeButton = document.querySelector('.close-button');
        closeButton.classList.toggle('hidden');


    }


    elements.forEach(element => {
        element.addEventListener('click', handleClick);
    });
    
    // Add close button event listener
    const closeButton = document.querySelector('.close-button');
    closeButton.addEventListener('click', handleClick);

    // Click function opening the about page
    document.querySelector('.borders').addEventListener('click', function() {
        document.querySelector('.overlay').style.display = 'block';
    });

    document.querySelector('.return').addEventListener('click', function() {
        document.querySelector('.overlay').style.display = 'none';
    });
});