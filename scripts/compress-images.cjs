const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const mapFile = path.join(__dirname, '..', 'image-migration-map.json');

async function run() {
  const mapContent = fs.readFileSync(mapFile, 'utf8');
  const map = JSON.parse(mapContent);
  
  const entries = Object.entries(map);
  console.log(`Starting compression of ${entries.length} images...`);

  let compressedCount = 0;
  
  for (const [localPath, data] of entries) {
    if (data.compressed) continue; // Skip already compressed ones in case of retry
    
    try {
      const { absolutePath } = data;
      const originalBuffer = fs.readFileSync(absolutePath);
      
      // Use Sharp to resize to max width 1600, converting everything to webp for immense size savings
      // The user mentioned reducing to ~900KB, but webp compression often achieves much smaller sizes without visual loss.
      // We will keep the original extension for now to not break paths before Cloudinary upload, 
      // but compress the internal format using webp or just heavily optimize the jpeg/png.
      // Wait, Cloudinary handles auto-format (f_auto). We just need to shrink the files going into Git/Cloudinary.
      
      let sharpInstance = sharp(originalBuffer).resize({ width: 1600, withoutEnlargement: true });
      
      const ext = path.extname(absolutePath).toLowerCase();
      let outputBuffer;
      
      if (ext === '.png') {
        outputBuffer = await sharpInstance.png({ quality: 80, compressionLevel: 9 }).toBuffer();
      } else if (ext === '.webp') {
        outputBuffer = await sharpInstance.webp({ quality: 80 }).toBuffer();
      } else {
        // default to jpeg
        outputBuffer = await sharpInstance.jpeg({ quality: 80, mozjpeg: true }).toBuffer();
      }
      
      fs.writeFileSync(absolutePath, outputBuffer);
      
      const newSize = outputBuffer.length;
      console.log(`Compressed: ${localPath} -> ${(newSize / 1024).toFixed(2)} KB`);
      
      // Update map to indicate it has been compressed
      map[localPath].compressed = true;
      compressedCount++;
      
    } catch (e) {
      console.error(`Failed to compress ${localPath}:`, e.message);
    }
  }

  // Save the updated map
  fs.writeFileSync(mapFile, JSON.stringify(map, null, 2));
  console.log(`Successfully compressed ${compressedCount} images!`);
}

run();
