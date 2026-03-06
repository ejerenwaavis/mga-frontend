/**
 * optimize-images.mjs
 *
 * Compresses all vehicle images in /public/vehicles/ using sharp.
 * Outputs WebP versions alongside originals, and generates a
 * manifest so your app can reference the optimized paths.
 *
 * Usage:
 *   npm install sharp --save-dev
 *   node optimize-images.mjs
 */

import sharp from "sharp";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// ── Config ────────────────────────────────────────────────────────────────────
const INPUT_DIR = path.join(__dirname, "public", "vehicles");
const OUTPUT_DIR = path.join(__dirname, "public", "vehicles", "optimized");

const SIZES = {
  // key: [maxWidth, quality]  — WebP quality 1-100
  thumbnail: [320, 60],   // used in gallery grid thumbnails
  display:   [900, 75],   // used for the main large display slot
};

const SUPPORTED_EXTS = [".jpg", ".jpeg", ".png", ".webp"];
// ─────────────────────────────────────────────────────────────────────────────

async function run() {
  if (!fs.existsSync(INPUT_DIR)) {
    console.error(`❌  Input directory not found: ${INPUT_DIR}`);
    process.exit(1);
  }

  fs.mkdirSync(OUTPUT_DIR, { recursive: true });

  const files = fs
    .readdirSync(INPUT_DIR)
    .filter((f) => SUPPORTED_EXTS.includes(path.extname(f).toLowerCase()));

  if (files.length === 0) {
    console.warn("⚠️  No supported image files found in", INPUT_DIR);
    return;
  }

  console.log(`\n🔍  Found ${files.length} images — optimizing...\n`);

  const manifest = {};

  for (const file of files) {
    const inputPath = path.join(INPUT_DIR, file);
    const baseName = path.basename(file, path.extname(file));
    manifest[file] = {};

    for (const [sizeName, [maxWidth, quality]] of Object.entries(SIZES)) {
      const outputFile = `${baseName}__${sizeName}.webp`;
      const outputPath = path.join(OUTPUT_DIR, outputFile);

      try {
        const info = await sharp(inputPath)
          .resize({ width: maxWidth, withoutEnlargement: true })
          .webp({ quality })
          .toFile(outputPath);

        const originalSize = fs.statSync(inputPath).size;
        const saving = (((originalSize - info.size) / originalSize) * 100).toFixed(1);

        console.log(
          `  ✅  ${file}  →  ${outputFile}  ` +
          `(${(originalSize / 1024).toFixed(0)} KB → ${(info.size / 1024).toFixed(0)} KB, -${saving}%)`
        );

        manifest[file][sizeName] = `/vehicles/optimized/${outputFile}`;
      } catch (err) {
        console.error(`  ❌  Failed: ${file} [${sizeName}]`, err.message);
      }
    }
  }

  // Write manifest so the app can import it
  const manifestPath = path.join(__dirname, "src", "data", "vehicleImageManifest.json");
  fs.mkdirSync(path.dirname(manifestPath), { recursive: true });
  fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2));
  console.log(`\n📄  Manifest written to: ${manifestPath}`);
  console.log("\n🎉  Done!\n");
}

run();
