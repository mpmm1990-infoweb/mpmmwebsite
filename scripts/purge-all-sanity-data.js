#!/usr/bin/env node

/**
 * ╔══════════════════════════════════════════════════════════════════════╗
 * ║          SANITY DATASET PURGE SCRIPT — PPMP Website                 ║
 * ║  Deletes ALL non-system documents from the Sanity dataset.          ║
 * ║  Schemas/types are NOT affected — only content documents.           ║
 * ║                                                                      ║
 * ║  USAGE:                                                              ║
 * ║    node scripts/purge-all-sanity-data.js                            ║
 * ║                                                                      ║
 * ║  REQUIRES in .env.local (or exported in shell):                     ║
 * ║    NEXT_PUBLIC_SANITY_PROJECT_ID  — from sanity.io/manage           ║
 * ║    NEXT_PUBLIC_SANITY_DATASET     — e.g. "production"               ║
 * ║    SANITY_API_WRITE_TOKEN         — Admin/Editor token (see below)  ║
 * ║                                                                      ║
 * ║  HOW TO GET A WRITE TOKEN:                                          ║
 * ║    1. Go to https://sanity.io/manage                                ║
 * ║    2. Select your project → "API" tab → "Tokens"                   ║
 * ║    3. Click "Add API Token"                                          ║
 * ║    4. Name it "Purge Script" → Permissions: "Editor" or "Admin"    ║
 * ║    5. Copy the token and add to .env.local as SANITY_API_WRITE_TOKEN║
 * ╚══════════════════════════════════════════════════════════════════════╝
 */

// ── Load environment variables from .env.local ──────────────────────────────
const fs   = require("fs");
const path = require("path");

function loadEnv() {
  const envPath = path.resolve(process.cwd(), ".env.local");
  if (!fs.existsSync(envPath)) {
    console.warn("⚠  No .env.local found — relying on shell environment variables.");
    return;
  }
  const lines = fs.readFileSync(envPath, "utf-8").split("\n");
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eqIdx = trimmed.indexOf("=");
    if (eqIdx === -1) continue;
    const key   = trimmed.slice(0, eqIdx).trim();
    const value = trimmed.slice(eqIdx + 1).trim().replace(/^["']|["']$/g, "");
    if (!process.env[key]) process.env[key] = value;
  }
}

loadEnv();

// ── Validate required env vars ───────────────────────────────────────────────
const PROJECT_ID  = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const DATASET     = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
// Accept both SANITY_API_WRITE_TOKEN (preferred for write) or fall back to SANITY_API_TOKEN
const TOKEN       =
  process.env.SANITY_API_WRITE_TOKEN || process.env.SANITY_API_TOKEN;

if (!PROJECT_ID || PROJECT_ID === "your_sanity_project_id" || PROJECT_ID === "placeholder") {
  console.error("❌  NEXT_PUBLIC_SANITY_PROJECT_ID is not set or is still a placeholder.");
  console.error("    Add it to .env.local  →  NEXT_PUBLIC_SANITY_PROJECT_ID=your_actual_id");
  process.exit(1);
}

if (!TOKEN || TOKEN === "your_sanity_api_token") {
  console.error("❌  Write token not found. Set SANITY_API_WRITE_TOKEN in .env.local");
  console.error("    How to get one:");
  console.error("      1. Go to https://sanity.io/manage");
  console.error("      2. Select project → API tab → Tokens → Add API Token");
  console.error("      3. Permissions: Editor or Admin");
  console.error("      4. Add to .env.local  →  SANITY_API_WRITE_TOKEN=skYourToken...");
  process.exit(1);
}

// ── Bootstrap Sanity client ──────────────────────────────────────────────────
// Use dynamic require so the script works with CommonJS without transpilation.
const { createClient } = require("@sanity/client");

const client = createClient({
  projectId : PROJECT_ID,
  dataset   : DATASET,
  apiVersion: "2024-01-01",
  token     : TOKEN,
  useCdn    : false,   // Must be false for mutations
});

// ── Colour helpers ───────────────────────────────────────────────────────────
const c = {
  reset  : "\x1b[0m",
  bold   : "\x1b[1m",
  red    : "\x1b[31m",
  green  : "\x1b[32m",
  yellow : "\x1b[33m",
  cyan   : "\x1b[36m",
  dim    : "\x1b[2m",
};
const log = {
  info  : (m) => console.log(`${c.cyan}ℹ${c.reset}  ${m}`),
  ok    : (m) => console.log(`${c.green}✔${c.reset}  ${m}`),
  warn  : (m) => console.log(`${c.yellow}⚠${c.reset}  ${m}`),
  error : (m) => console.error(`${c.red}✘${c.reset}  ${m}`),
  head  : (m) => console.log(`\n${c.bold}${c.cyan}${m}${c.reset}`),
  dim   : (m) => console.log(`${c.dim}${m}${c.reset}`),
};

// ── Batch-delete helper ──────────────────────────────────────────────────────
// Sanity transactions are limited to ~1000 mutations. Chunk large sets.
const CHUNK_SIZE = 100;

async function deleteInBatches(ids, label) {
  if (ids.length === 0) return 0;

  let deleted = 0;
  for (let i = 0; i < ids.length; i += CHUNK_SIZE) {
    const chunk = ids.slice(i, i + CHUNK_SIZE);
    const tx    = client.transaction();
    for (const id of chunk) tx.delete(id);
    await tx.commit({ visibility: "async" });
    deleted += chunk.length;
    log.dim(`   ${label}: deleted ${deleted}/${ids.length} …`);
  }
  return deleted;
}

// ── Main purge function ──────────────────────────────────────────────────────
async function purgeAll() {
  log.head("═══════════════════════════════════════════════════════");
  log.head("   SANITY DATASET PURGE — PPMP Website");
  log.head("═══════════════════════════════════════════════════════");
  log.info(`Project   : ${c.bold}${PROJECT_ID}${c.reset}`);
  log.info(`Dataset   : ${c.bold}${DATASET}${c.reset}`);
  log.info(`API Host  : https://${PROJECT_ID}.api.sanity.io`);
  console.log();

  // ── Safety confirmation prompt ─────────────────────────────────────────────
  const readline = require("readline");
  const rl = readline.createInterface({
    input : process.stdin,
    output: process.stdout,
  });

  await new Promise((resolve) => {
    rl.question(
      `${c.red}${c.bold}⚠  WARNING: This will permanently delete ALL content documents\n   in dataset "${DATASET}" on project "${PROJECT_ID}".\n   Schemas/types are NOT affected. Only document data.\n\n   Type "DELETE ALL" to confirm, or press Enter to abort: ${c.reset}`,
      (answer) => {
        rl.close();
        if (answer.trim() !== "DELETE ALL") {
          log.warn("Aborted. No documents were deleted.");
          process.exit(0);
        }
        resolve();
      }
    );
  });

  console.log();
  log.info("Fetching document inventory …");

  // ── Step 1: Fetch ALL published (non-system) documents ──────────────────
  // Exclude Sanity system docs (_.*)
  const publishedDocs = await client.fetch(
    `*[!(_id in path("_.**"))]{ _id, _type }`
  );

  log.info(`Found ${c.bold}${publishedDocs.length}${c.reset} published documents.`);

  // ── Step 2: Fetch ALL draft documents ────────────────────────────────────
  const draftDocs = await client.fetch(
    `*[_id in path("drafts.**")]{ _id, _type }`
  );

  log.info(`Found ${c.bold}${draftDocs.length}${c.reset} draft documents.`);

  const allDocs   = [...publishedDocs, ...draftDocs];
  const totalDocs = allDocs.length;

  if (totalDocs === 0) {
    log.ok("Dataset is already empty — nothing to delete.");
    return;
  }

  // ── Step 3: Show a breakdown by document type ─────────────────────────────
  const typeMap = {};
  for (const doc of allDocs) {
    const t = doc._type || "unknown";
    typeMap[t] = (typeMap[t] || 0) + 1;
  }

  log.head("Document type breakdown:");
  for (const [type, count] of Object.entries(typeMap).sort((a, b) => b[1] - a[1])) {
    log.dim(`   • ${type.padEnd(28)} ${count} doc(s)`);
  }
  console.log();

  log.info(`Starting deletion of ${c.bold}${c.red}${totalDocs}${c.reset} documents …`);
  console.log();

  // ── Step 4: Delete drafts first, then published ───────────────────────────
  const draftIds     = draftDocs.map((d) => d._id);
  const publishedIds = publishedDocs.map((d) => d._id);

  const deletedDrafts    = await deleteInBatches(draftIds,     "Drafts");
  const deletedPublished = await deleteInBatches(publishedIds, "Published");
  const totalDeleted     = deletedDrafts + deletedPublished;

  console.log();
  log.head("═══════════════════════════════════════════════════════");
  log.ok(`${c.bold}Purge complete!${c.reset}`);
  log.ok(`Drafts deleted    : ${c.bold}${deletedDrafts}${c.reset}`);
  log.ok(`Published deleted : ${c.bold}${deletedPublished}${c.reset}`);
  log.ok(`Total deleted     : ${c.bold}${c.green}${totalDeleted}${c.reset}`);
  log.head("═══════════════════════════════════════════════════════");
  console.log();
  log.info("All document data has been wiped.");
  log.info("Your Sanity schemas/types are completely intact.");
  log.info(`Re-open ${c.bold}https://ppmp.sanity.studio${c.reset} to start fresh.`);
  console.log();
}

// ── Run ───────────────────────────────────────────────────────────────────────
purgeAll().catch((err) => {
  console.error("\n❌  Fatal error during purge:\n");
  console.error(err.message || err);
  if (err.response?.body) {
    console.error("Sanity API response:", JSON.stringify(err.response.body, null, 2));
  }
  process.exit(1);
});
