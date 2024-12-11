// app.js

// Select the gallery div, modal elements, and search bar
const gallery = document.getElementById('gallery');
const modal = document.getElementById('modal');
const modalImg = document.getElementById('modal-img');
const closeBtn = document.getElementById('close-btn');
const searchBar = document.getElementById('search-bar');

// Function to create and display images in the gallery
function displayImages(filteredImages) {
  gallery.innerHTML = '';  // Clear the gallery before re-adding the images
  filteredImages.forEach(image => {
    // Create a gallery item for each image
    const galleryItem = document.createElement('div');
    galleryItem.classList.add('gallery-item');

    // Create the image element
    const imgElement = document.createElement('img');
    imgElement.src = image.src;
    imgElement.alt = image.nametag;
    imgElement.title = image.nametag;

    // Create info element (artist + song name)
    const infoElement = document.createElement('div');
    infoElement.classList.add('info');
    const artistName = image.nametag.split(' ')[0]; // Extract artist name from nametag
    const songName = image.nametag.split(' ').slice(1).join(' '); // Extract song name from nametag (handles whitespaces)
    infoElement.innerHTML = `${artistName}  ${songName}`;  // Display artist and song directly

    // Add event listener to open the image in fullscreen
    imgElement.addEventListener('click', () => {
      modal.style.display = 'flex';  // Show the modal
      modalImg.src = image.src;  // Set the image source in the modal
    });

    // Append the image and info to the gallery item
    galleryItem.appendChild(imgElement);
    galleryItem.appendChild(infoElement);

    // Append the gallery item to the gallery
    gallery.appendChild(galleryItem);
  });
}

// Function to close the modal
closeBtn.addEventListener('click', () => {
  modal.style.display = 'none';  // Hide the modal
});

// Function to close the modal when clicked outside the image
window.addEventListener('click', (e) => {
  if (e.target === modal) {
    modal.style.display = 'none';  // Hide the modal if clicked outside the image
  }
});

// Function to filter images based on search input
function filterImages(query) {
  const filteredImages = images.filter(image =>
    image.nametag.toLowerCase().includes(query.toLowerCase())
  );
  displayImages(filteredImages);  // Display the filtered images
}

// Add event listener to the search bar
searchBar.addEventListener('input', (event) => {
  const query = event.target.value;
  filterImages(query);  // Filter images based on the search input
});

// Call the function to display all images initially
displayImages(images);
