#!/usr/bin/env node

/**
 * ╔══════════════════════════════════════════════════════════════════════╗
 * ║        BULK UPLOAD 90s PHOTOS TO SANITY CMS — PPMP Website          ║
 * ║  Uploads all image files from ./bulk-photos to Sanity and assigns   ║
 * ║  them to the "90s Photos" (90s_photos) gallery category.           ║
 * ║                                                                      ║
 * ║  USAGE:                                                              ║
 * ║    node scripts/bulk-upload-90s.js                                  ║
 * ║                                                                      ║
 * ║  REQUIRES in .env.local (or exported in shell):                     ║
 * ║    NEXT_PUBLIC_SANITY_PROJECT_ID  — from sanity.io/manage           ║
 * ║    NEXT_PUBLIC_SANITY_DATASET     — e.g. "production"               ║
 * ║    SANITY_API_WRITE_TOKEN         — Editor or Admin token           ║
 * ╚══════════════════════════════════════════════════════════════════════╝
 */

const fs = require("fs");
const path = require("path");
const { createClient } = require("@sanity/client");

// ── 1. Load environment variables from .env.local / .env ──────────────────────
function loadEnv() {
  const envFiles = [".env.local", ".env"];
  for (const envFile of envFiles) {
    const envPath = path.resolve(process.cwd(), envFile);
    if (fs.existsSync(envPath)) {
      const lines = fs.readFileSync(envPath, "utf-8").split("\n");
      for (const line of lines) {
        const trimmed = line.trim();
        if (!trimmed || trimmed.startsWith("#")) continue;
        const eqIdx = trimmed.indexOf("=");
        if (eqIdx === -1) continue;
        const key = trimmed.slice(0, eqIdx).trim();
        const value = trimmed.slice(eqIdx + 1).trim().replace(/^["']|["']$/g, "");
        if (!process.env[key]) {
          process.env[key] = value;
        }
      }
    }
  }
}

loadEnv();

// ── 2. Environment Validation ────────────────────────────────────────────────
const PROJECT_ID = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const DATASET = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const TOKEN = process.env.SANITY_API_WRITE_TOKEN || process.env.SANITY_API_TOKEN;

const c = {
  reset: "\x1b[0m",
  bold: "\x1b[1m",
  red: "\x1b[31m",
  green: "\x1b[32m",
  yellow: "\x1b[33m",
  cyan: "\x1b[36m",
  dim: "\x1b[2m",
};

if (!PROJECT_ID || PROJECT_ID === "your_sanity_project_id" || PROJECT_ID === "placeholder") {
  console.error(`\n${c.red}${c.bold}❌ Error:${c.reset} NEXT_PUBLIC_SANITY_PROJECT_ID is missing or not configured.`);
  console.error("   Please set NEXT_PUBLIC_SANITY_PROJECT_ID in your .env.local file.\n");
  process.exit(1);
}

if (!TOKEN || TOKEN === "your_sanity_api_token" || TOKEN === "placeholder") {
  console.error(`\n${c.red}${c.bold}❌ Error: Sanity Write Token not found!${c.reset}`);
  console.error("   A write token with Editor or Admin permissions is required to upload assets and create documents.");
  console.error("\n   Follow these steps to configure your token:");
  console.error(`   1. Visit ${c.cyan}https://sanity.io/manage${c.reset}`);
  console.error("   2. Select your project -> Go to 'API' tab -> 'Tokens'");
  console.error("   3. Click 'Add API Token' -> Name: 'Bulk Upload' -> Permissions: 'Editor' or 'Admin'");
  console.error("   4. Copy the token and add this line to your .env.local file:");
  console.error(`      ${c.yellow}SANITY_API_WRITE_TOKEN=skYourActualTokenHere...${c.reset}`);
  console.error("   5. Re-run this script: node scripts/bulk-upload-90s.js\n");
  process.exit(1);
}

// ── 3. Initialize Sanity Client ──────────────────────────────────────────────
const client = createClient({
  projectId: PROJECT_ID,
  dataset: DATASET,
  apiVersion: "2024-01-01",
  token: TOKEN,
  useCdn: false,
});

// ── 4. Main Upload Function ──────────────────────────────────────────────────
async function bulkUpload() {
  const photosDir = path.resolve(process.cwd(), "bulk-photos");

  if (!fs.existsSync(photosDir)) {
    console.error(`\n${c.red}❌ Folder not found:${c.reset} ${photosDir}\n`);
    process.exit(1);
  }

  const validExts = new Set([".jpg", ".jpeg", ".png", ".webp"]);
  const files = fs
    .readdirSync(photosDir)
    .filter((file) => validExts.has(path.extname(file).toLowerCase()))
    .sort((a, b) => a.localeCompare(b, undefined, { numeric: true, sensitivity: "base" }));

  if (files.length === 0) {
    console.log(`\n${c.yellow}ℹ No supported image files (.jpg, .jpeg, .png, .webp) found in ./bulk-photos${c.reset}\n`);
    process.exit(0);
  }

  console.log(`\n${c.bold}${c.cyan}═════════════════════════════════════════════════════════════════${c.reset}`);
  console.log(`${c.bold}   BULK UPLOADER — 90s Photos to Sanity Gallery${c.reset}`);
  console.log(`${c.bold}${c.cyan}═════════════════════════════════════════════════════════════════${c.reset}`);
  console.log(`• Project ID    : ${c.bold}${PROJECT_ID}${c.reset}`);
  console.log(`• Dataset       : ${c.bold}${DATASET}${c.reset}`);
  console.log(`• Photos Folder : ${c.dim}${photosDir}${c.reset}`);
  console.log(`• Total Images  : ${c.bold}${c.green}${files.length}${c.reset}`);
  console.log(`• Category      : ${c.bold}90s_photos (৯০-এর স্মৃতি অ্যালবাম)${c.reset}\n`);

  let successCount = 0;
  let failCount = 0;

  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    const filePath = path.join(photosDir, file);
    const progress = `[${i + 1}/${files.length}]`;

    try {
      process.stdout.write(`${c.dim}${progress} Uploading asset: ${file} ...${c.reset}\r`);

      // 1. Upload image asset to Sanity
      const stream = fs.createReadStream(filePath);
      const imageAsset = await client.assets.upload("image", stream, {
        filename: file,
      });

      // Derive human-friendly caption fallback
      const baseName = path.parse(file).name;
      const cleanTitle = baseName.replace(/[-_]/g, " ");

      // 2. Create Gallery document
      const doc = {
        _type: "galleryImage",
        category: "90s_photos",
        title: "১৯৯০ ব্যাচের স্মৃতিপট",
        caption: "1990 Batch Memory",
        captionBn: "১৯৯০ ব্যাচের স্মৃতিপট",
        year: "1990",
        order: i + 1,
        image: {
          _type: "image",
          asset: {
            _type: "reference",
            _ref: imageAsset._id,
          },
        },
      };

      const createdDoc = await client.create(doc);
      successCount++;

      console.log(
        `${c.green}✔${c.reset} ${progress} Uploaded: ${c.bold}${file}${c.reset} -> Document Created (${createdDoc._id})`
      );
    } catch (err) {
      failCount++;
      console.log(
        `\n${c.red}✘${c.reset} ${progress} Failed to upload ${file}: ${err.message || err}`
      );
    }
  }

  console.log(`\n${c.bold}${c.cyan}═════════════════════════════════════════════════════════════════${c.reset}`);
  console.log(`${c.bold}${c.green}✔ Bulk Upload Finished!${c.reset}`);
  console.log(`• Successfully created : ${c.bold}${c.green}${successCount}${c.reset} documents`);
  if (failCount > 0) {
    console.log(`• Failed               : ${c.bold}${c.red}${failCount}${c.reset} documents`);
  }
  console.log(`${c.bold}${c.cyan}═════════════════════════════════════════════════════════════════${c.reset}\n`);
}

// ── 5. Run Script ────────────────────────────────────────────────────────────
bulkUpload().catch((err) => {
  console.error(`\n${c.red}❌ Unexpected error:${c.reset}`, err.message || err);
  process.exit(1);
});
