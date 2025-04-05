// app.js

// Select the gallery div, modal elements, and search bar
const gallery = document.getElementById('gallery');
const modal = document.getElementById('modal');
const modalImg = document.getElementById('modal-img');
const closeBtn = document.getElementById('close-btn');
const searchBar = document.getElementById('search-bar');
const gallery1Btn = document.getElementById('gallery1-btn');
const gallery2Btn = document.getElementById('gallery2-btn');

// Get the About modal elements
const aboutModal = document.getElementById("about-modal");
const aboutBtn = document.getElementById("about-btn");
const aboutCloseBtn = document.getElementById("about-close-btn");

// Open the About modal when the button is clicked
aboutBtn.addEventListener("click", function() {
    aboutModal.style.display = "block";
});

// Close the About modal when the close button is clicked
aboutCloseBtn.addEventListener("click", function() {
    aboutModal.style.display = "none";
});

// Close the About modal when clicking outside of it
window.addEventListener("click", function(event) {
    if (event.target === aboutModal) {
        aboutModal.style.display = "none";
    }
});

// Current gallery variable
let currentGallery = gallery1Images;

// Function to create and display images in the gallery
function displayImages(filteredImages) {
    gallery.innerHTML = ''; // Clear the gallery before re-adding the images
    filteredImages.forEach(image => {
        const galleryItem = document.createElement('div');
        galleryItem.classList.add('gallery-item');

        const imgElement = document.createElement('img');
        imgElement.src = image.src;
        imgElement.alt = image.nametag;
        imgElement.title = image.nametag;

        // Extract artist name from the directory path
        const pathParts = image.src.split('/');
        const artistName = pathParts[pathParts.length - 2]; // Get the directory name (artist)

        // Extract song name from the filename (remove extension)
        const fileNameWithExt = pathParts[pathParts.length - 1];
        const songName = fileNameWithExt.replace('.webp', '');

        const infoElement = document.createElement('div');
        infoElement.classList.add('info');
        infoElement.innerHTML = `${artistName} - ${songName}`;

        imgElement.addEventListener('click', () => {
            modal.style.display = 'flex';
            modalImg.src = image.src;
        });

        galleryItem.appendChild(imgElement);
        galleryItem.appendChild(infoElement);
        gallery.appendChild(galleryItem);
    });
}

// Function to close the modal
closeBtn.addEventListener('click', () => {
  modal.style.display = 'none';
});

window.addEventListener('click', (e) => {
  if (e.target === modal) {
    modal.style.display = 'none';
  }
});

// Function to filter images based on search input
function filterImages(query) {
  const filteredImages = currentGallery.filter(image =>
    image.nametag.toLowerCase().includes(query.toLowerCase())
  );
  displayImages(filteredImages);
}

// Add event listener to the search bar
searchBar.addEventListener('input', (event) => {
  const query = event.target.value;
  filterImages(query);
});

// Add event listeners for gallery buttons
gallery1Btn.addEventListener('click', () => {
    currentGallery = gallery1Images;
    filterImages(searchBar.value); // Apply current search to new gallery
    gallery1Btn.classList.add('active');
    gallery2Btn.classList.remove('active');
  });
  
  gallery2Btn.addEventListener('click', () => {
    currentGallery = gallery2Images;
    filterImages(searchBar.value); // Apply current search to new gallery
    gallery2Btn.classList.add('active');
    gallery1Btn.classList.remove('active');
  });

  // Add an event listener for the Random button
const randomBtn = document.getElementById('random-btn');

randomBtn.addEventListener('click', () => {
    if (currentGallery.length > 0) {
        const randomIndex = Math.floor(Math.random() * currentGallery.length);
        const randomImage = currentGallery[randomIndex];

        // Open the modal with the random image
        modal.style.display = 'flex';
        modalImg.src = randomImage.src;
    }
});


// Initialize by displaying Gallery 1
displayImages(currentGallery);


