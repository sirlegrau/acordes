const fs = require('fs');
const path = require('path');

// Base directory for the charts
const chartsDir = './Charts';

// Function to generate the images arrays
function generateImages() {
  const categories = ['Repertorio', 'Jazz']; // Define categories to process
  const imagesData = {};

  categories.forEach(category => {
    const categoryPath = path.join(chartsDir, category);
    const images = [];

    // Check if the category directory exists
    if (fs.existsSync(categoryPath) && fs.statSync(categoryPath).isDirectory()) {
      // Read contents of the category folder
      const items = fs.readdirSync(categoryPath);

      items.forEach(item => {
        const itemPath = path.join(categoryPath, item);

        // Check if item is a directory or a file
        if (fs.statSync(itemPath).isDirectory()) {
          // Artist folder, iterate over songs
          const songs = fs.readdirSync(itemPath);

          songs.forEach(song => {
            const songPath = path.join(itemPath, song);
            if (path.extname(song) === '.webp') {
              images.push({
                src: songPath.replace(/\\/g, '/'), // Correct path format
                nametag: `${item} ${path.basename(song, '.webp')}` // Artist + song
              });
            }
          });
        } else if (path.extname(item) === '.webp') {
          // If it's a file directly in the category folder
          images.push({
            src: itemPath.replace(/\\/g, '/'),
            nametag: path.basename(item, '.webp') // Only the song name
          });
        }
      });
    }

    imagesData[category] = images;
  });

  return imagesData;
}

// Generate the images data
const imagesData = generateImages();

// Write the data to images.js
const outputPath = path.join(__dirname, 'images.js');
const outputContent = `
const gallery1Images = ${JSON.stringify(imagesData['Repertorio'], null, 2)};
const gallery2Images = ${JSON.stringify(imagesData['Jazz'], null, 2)};
`;

fs.writeFileSync(outputPath, outputContent, 'utf8');
console.log('Images data written to images.js successfully!');