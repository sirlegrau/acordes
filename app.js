// app.js

// Select the gallery div, modal elements, and search bar
const gallery = document.getElementById('gallery');
const modal = document.getElementById('modal');
const modalImg = document.getElementById('modal-img');
const closeBtn = document.getElementById('close-btn');
const searchBar = document.getElementById('search-bar');
const gallery1Btn = document.getElementById('gallery1-btn');
const gallery2Btn = document.getElementById('gallery2-btn');

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

    const infoElement = document.createElement('div');
    infoElement.classList.add('info');
    const artistName = image.nametag.split(' ')[0];
    const songName = image.nametag.split(' ').slice(1).join(' ');
    infoElement.innerHTML = `${artistName}  ${songName}`;

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

// Initialize by displaying Gallery 1
displayImages(currentGallery);