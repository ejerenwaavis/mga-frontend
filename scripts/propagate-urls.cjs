const fs = require('fs');
const path = require('path');

const mapFile = path.join(__dirname, '..', 'image-migration-map.json');
const targetDir = path.join(__dirname, '..', 'src', 'data');
const targetFile = path.join(targetDir, 'vehicleImages.ts');
// also some other files might reference it, like Index.tsx, About.tsx, Fleet.tsx, Services.tsx
const pagesDir = path.join(__dirname, '..', 'src', 'pages');

async function run() {
  const mapContent = fs.readFileSync(mapFile, 'utf8');
  const map = JSON.parse(mapContent);
  
  const entries = Object.entries(map).filter(([localPath, data]) => data.cloudinaryUrl);
  console.log(`Loaded ${entries.length} Cloudinary URLs to propagate...`);

  // Function to process a specific file
  function processFile(filePath) {
    if (!fs.existsSync(filePath)) return;
    
    let content = fs.readFileSync(filePath, 'utf8');
    let modified = false;

    for (const [localPath, data] of entries) {
      if (!data.cloudinaryUrl) continue;
      
      // Look for the exact string, usually inside quotes
      // In JS/TS it could be in single or double quotes, or template literals.
      // Easiest is to replace the exact substring.
      if (content.includes(localPath)) {
        // e.g. "/vehicles/car.jpg" -> "https://res.cloudinary.com/.../car.jpg"
        content = content.split(localPath).join(data.cloudinaryUrl);
        modified = true;
      }
    }

    if (modified) {
      fs.writeFileSync(filePath, content);
      console.log(`Updated paths in: ${filePath}`);
    }
  }

  // 1. Process vehicleImages.ts
  processFile(targetFile);
  
  // 2. Process all pages in src/pages/
  if (fs.existsSync(pagesDir)) {
    const pages = fs.readdirSync(pagesDir).filter(f => f.endsWith('.tsx'));
    for (const page of pages) {
      processFile(path.join(pagesDir, page));
    }
  }

  console.log(`URL propagation complete!`);
}

run();
