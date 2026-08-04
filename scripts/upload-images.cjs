const fs = require('fs');
const path = require('path');
const cloudinary = require('cloudinary').v2;

cloudinary.config({ 
  cloud_name: 'di1mj1zqc', 
  api_key: '389376199881353', 
  api_secret: 'oCLTrid6CwPeBJwA80KFDppOO1A',
  secure: true
});

const mapFile = path.join(__dirname, '..', 'image-migration-map.json');

async function run() {
  const mapContent = fs.readFileSync(mapFile, 'utf8');
  const map = JSON.parse(mapContent);
  
  const entries = Object.entries(map);
  console.log(`Starting upload of ${entries.length} images to Cloudinary...`);

  let uploadedCount = 0;
  
  for (const [localPath, data] of entries) {
    if (data.cloudinaryUrl) {
      console.log(`Skipping already uploaded: ${localPath}`);
      continue;
    }
    
    try {
      console.log(`Uploading ${localPath}...`);
      
      // Upload to Cloudinary under the folder mga/vehicles
      // Using the original filename (without extension) as the public_id to keep it clean
      const publicId = path.parse(data.fileName).name;
      
      const result = await cloudinary.uploader.upload(data.absolutePath, {
        folder: 'mga/vehicles',
        public_id: publicId,
        use_filename: true,
        unique_filename: false,
        overwrite: true
      });
      
      // Save the secure URL back to the map
      data.cloudinaryUrl = result.secure_url;
      uploadedCount++;
      
      console.log(`Success: ${result.secure_url}`);
      
      // Save the map progressively so if it crashes we don't lose progress
      fs.writeFileSync(mapFile, JSON.stringify(map, null, 2));
      
    } catch (e) {
      console.error(`Failed to upload ${localPath}:`, e.message);
    }
  }

  console.log(`Successfully uploaded ${uploadedCount} images to Cloudinary!`);
}

run();
