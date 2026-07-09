const fs = require('fs');
const path = require('path');

const vehiclesDir = path.join(__dirname, '..', 'public', 'vehicles');
const mapFile = path.join(__dirname, '..', 'image-migration-map.json');

const map = {};

try {
  const files = fs.readdirSync(vehiclesDir);
  
  files.forEach(file => {
    // Only map image files
    if (/\.(jpg|jpeg|png|webp|avif)$/i.test(file)) {
      const localPath = `/vehicles/${file}`;
      const absolutePath = path.join(vehiclesDir, file);
      
      map[localPath] = {
        absolutePath: absolutePath,
        fileName: file,
        compressed: false,
        cloudinaryUrl: null
      };
    }
  });

  fs.writeFileSync(mapFile, JSON.stringify(map, null, 2));
  console.log(`Successfully mapped ${Object.keys(map).length} images to image-migration-map.json`);
} catch (error) {
  console.error("Error mapping files:", error);
}
