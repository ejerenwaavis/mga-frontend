import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const srcDir = path.resolve(__dirname, '../dist');
const destDir = path.resolve(__dirname, '../public_html');

try {
  // Clean destination directory if it exists
  if (fs.existsSync(destDir)) {
    fs.rmSync(destDir, { recursive: true, force: true });
  }
  
  // Copy directory recursively
  if (fs.existsSync(srcDir)) {
    fs.cpSync(srcDir, destDir, { recursive: true });
    console.log(`Successfully copied build from ${srcDir} to ${destDir}`);
  } else {
    console.error(`Source build directory does not exist: ${srcDir}`);
    process.exit(1);
  }
} catch (err) {
  console.error('Error copying build directory:', err);
  process.exit(1);
}
