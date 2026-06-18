#!/usr/bin/env node
// convert-vehicle-images-to-webp.js
//
// getOptimizedImageUrl() in vehicleImages.ts already knows how to look up
// WebP variants from vehicleImageManifest.json — it just needs that manifest
// populated with real entries. This script:
//   1. Reads every image path actually referenced in vehicleImages.ts
//   2. Converts each one to "thumbnail" + "display" WebP variants
//   3. Writes vehicleImageManifest.json in the exact shape the lookup expects
//
// No changes to vehicleImages.ts or getOptimizedImageUrl() are needed —
// once the manifest has entries, the existing fallback logic picks them up.
//
// Requires: npm install sharp --save-dev

import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const CONFIG = {
  vehicleImagesFile: 'src/data/vehicleImages.ts',
  manifestPath:      'src/data/vehicleImageManifest.json',
  publicDir:         'public',
  outputDir:         'public/vehicles/optimized',
  sizes: {
    thumbnail: { width: 480,  quality: 75 },
    display:   { width: 1600, quality: 82 },
  },
};

function fmtBytes(b) {
  if (b < 1024) return `${b}B`;
  if (b < 1024 * 1024) return `${(b / 1024).toFixed(1)}KB`;
  return `${(b / (1024 * 1024)).toFixed(2)}MB`;
}

/** Pull every "/vehicles/....(jpg|jpeg|png)" string referenced in vehicleImages.ts */
function extractImagePaths(sourceFile) {
  const text  = fs.readFileSync(sourceFile, 'utf8');
  const regex = /["'](\/vehicles\/[^"']+\.(?:jpe?g|png))["']/gi;
  const found = new Set();
  let match;
  while ((match = regex.exec(text)) !== null) {
    found.add(match[1]);
  }
  return Array.from(found);
}

async function convertOne(originalPath, force) {
  const absSource = path.join(CONFIG.publicDir, originalPath);
  const fileName  = path.basename(originalPath);
  const baseName  = fileName.slice(0, fileName.length - path.extname(fileName).length);

  if (!fs.existsSync(absSource)) {
    return { fileName, missing: true };
  }

  const srcStat = fs.statSync(absSource);
  const srcSize = srcStat.size;
  const variants = {};
  let generated = 0, skipped = 0, savedBytes = 0;

  for (const [sizeName, opts] of Object.entries(CONFIG.sizes)) {
    const outFile = `${baseName}-${sizeName}.webp`;
    const outAbs  = path.join(CONFIG.outputDir, outFile);
    const outRel  = `/vehicles/optimized/${outFile}`;

    if (!force && fs.existsSync(outAbs) && fs.statSync(outAbs).mtimeMs > srcStat.mtimeMs) {
      variants[sizeName] = outRel;
      skipped++;
      continue;
    }

    await sharp(absSource)
      .resize({ width: opts.width, withoutEnlargement: true })
      .toFormat('webp', { quality: opts.quality })
      .toFile(outAbs);

    const outSize = fs.statSync(outAbs).size;
    savedBytes += Math.max(0, srcSize - outSize);
    variants[sizeName] = outRel;
    generated++;
  }

  return { fileName, variants, generated, skipped, savedBytes, srcSize };
}

async function run() {
  const dryRun = process.argv.includes('--dry-run');
  const force  = process.argv.includes('--force');

  fs.mkdirSync(CONFIG.outputDir, { recursive: true });

  const paths = extractImagePaths(CONFIG.vehicleImagesFile);
  console.log(`Found ${paths.length} unique image references in ${CONFIG.vehicleImagesFile}\n`);

  let manifest = {};
  if (fs.existsSync(CONFIG.manifestPath)) {
    manifest = JSON.parse(fs.readFileSync(CONFIG.manifestPath, 'utf8'));
  }

  let totalGenerated = 0, totalSkipped = 0, totalSaved = 0, totalOriginal = 0;
  const missing = [];

  for (const p of paths) {
    if (dryRun) {
      console.log(`[dry-run] Would process: ${p}`);
      continue;
    }

    const result = await convertOne(p, force);

    if (result.missing) {
      missing.push(p);
      console.log(`  ⚠ missing on disk, skipped : ${p}`);
      continue;
    }

    manifest[result.fileName] = result.variants;
    totalGenerated += result.generated;
    totalSkipped   += result.skipped;
    totalSaved     += result.savedBytes;
    totalOriginal  += result.srcSize;
    console.log(`  ✓ ${result.fileName}`);
  }

  if (!dryRun) {
    fs.mkdirSync(path.dirname(CONFIG.manifestPath), { recursive: true });
    fs.writeFileSync(CONFIG.manifestPath, JSON.stringify(manifest, null, 2));
  }

  console.log('\n──────────────────────────────────────');
  console.log(dryRun ? '  DRY RUN — no files written' : '  Conversion complete');
  console.log('──────────────────────────────────────');
  console.log(`  Images referenced  : ${paths.length}`);
  if (!dryRun) {
    console.log(`  Variants generated : ${totalGenerated}`);
    console.log(`  Variants up-to-date: ${totalSkipped}`);
    if (totalSaved > 0) {
      const pct = ((totalSaved / totalOriginal) * 100).toFixed(0);
      console.log(`  Size saved         : ${fmtBytes(totalSaved)} (~${pct}% smaller)`);
    }
    if (missing.length) {
      console.log(`  Broken references  : ${missing.length} (file in code, not on disk)`);
    }
  }
  console.log('──────────────────────────────────────\n');
}

run().catch(err => {
  console.error('\n✖ Error:', err.message);
  process.exit(1);
});
