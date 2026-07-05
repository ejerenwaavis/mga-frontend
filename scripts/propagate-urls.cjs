const fs = require('fs');
const path = require('path');

const mapFile = path.join(__dirname, '..', 'image-migration-map.json');
const targetDir = path.join(__dirname, '..', 'src', 'data');
const targetFile = path.join(targetDir, 'vehicleImages.ts');
const pagesDir = path.join(__dirname, '..', 'src', 'pages');

async function run() {
  const mapContent = fs.readFileSync(mapFile, 'utf8');
  const map = JSON.parse(mapContent);
  
  const entries = Object.entries(map).filter(([localPath, data]) => data.cloudinaryUrl);
  console.log(`Loaded ${entries.length} Cloudinary URLs to propagate...`);

  function processFile(filePath) {
    if (!fs.existsSync(filePath)) return;
    
    let content = fs.readFileSync(filePath, 'utf8');
    let originalContent = content;

    for (const [localPath, data] of entries) {
      if (!data.cloudinaryUrl) continue;
      
      // To avoid the double URL injection bug, we ONLY replace the localPath 
      // if it's strictly enclosed in quotes (double, single, or backticks).
      // Example: "/vehicles/car.jpg" -> "https://res.cloudinary.com/.../car.jpg"
      
      const doubleQuotes = `"${localPath}"`;
      const singleQuotes = `'${localPath}'`;
      const backTicks = `\`${localPath}\``;
      
      content = content.split(doubleQuotes).join(`"${data.cloudinaryUrl}"`);
      content = content.split(singleQuotes).join(`'${data.cloudinaryUrl}'`);
      content = content.split(backTicks).join(`\`${data.cloudinaryUrl}\``);
    }

    if (content !== originalContent) {
      fs.writeFileSync(filePath, content);
      console.log(`Updated paths in: ${filePath}`);
    }
  }

  processFile(targetFile);
  
  if (fs.existsSync(pagesDir)) {
    const pages = fs.readdirSync(pagesDir).filter(f => f.endsWith('.tsx'));
    for (const page of pages) {
      processFile(path.join(pagesDir, page));
    }
  }

  console.log(`URL propagation complete!`);
}

run();
