const fs = require('fs');
const path = require('path');

// Base directory for the charts
const chartsDir = './Charts';

// Function to generate the images array
function generateImages() {
  let images = [];

  // Read the artist directories in the Charts folder
  const artists = fs.readdirSync(chartsDir);

  artists.forEach(artist => {
    const artistPath = path.join(chartsDir, artist);
    
    // Skip if it's not a directory
    if (!fs.statSync(artistPath).isDirectory()) return;

    // Read song images in each artist folder
    const songs = fs.readdirSync(artistPath);

    songs.forEach(song => {
      const songPath = path.join(artistPath, song);
      
      // Only consider .webp files (you can extend this to other formats if needed)
      if (path.extname(song) === '.webp') {
        // Create the image object
        const image = {
          src: songPath.replace(/\\/g, '/'),  // Make sure path is in the correct format
          nametag: artist + ' ' + path.basename(song, '.webp') // artist + song name without .webp
        };
        
        images.push(image);
      }
    });
  });

  return images;
}

// Run the function and output the result
const images = generateImages();

// Output to the console or save it to a file
console.log('const images =', JSON.stringify(images, null, 2));
