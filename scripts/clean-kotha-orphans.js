require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@sanity/client');

// Initialize Sanity Client
const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  useCdn: false,
  token: process.env.SANITY_API_WRITE_TOKEN,
  apiVersion: '2024-03-12',
});

// Fields to unset
const ORPHANED_FIELDS = [
  'titleBn',
  'titleEn',
  'contentBn',
  'contentEn',
  'title.bn',
  'title.en',
  'content.bn',
  'content.en',
];

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function cleanKothaOrphans() {
  if (!process.env.SANITY_API_WRITE_TOKEN) {
    console.error('❌ ERROR: SANITY_API_WRITE_TOKEN is missing in .env.local');
    process.exit(1);
  }

  console.log('🔍 Fetching all "Kotha o Gatha" documents (both published and drafts)...');

  try {
    // Query both kothaOGatha and any legacy literature documents
    const query = '*[_type in ["kothaOGatha", "literature"]]';
    const documents = await client.fetch(query);

    console.log(`ℹ Found ${documents.length} document(s) in total.\n`);

    if (documents.length === 0) {
      console.log('✅ No documents found to clean.');
      return;
    }

    let updatedCount = 0;

    for (const doc of documents) {
      const fieldsToUnset = [];

      // Check for top-level orphaned fields
      for (const field of ['titleBn', 'titleEn', 'contentBn', 'contentEn']) {
        if (doc[field] !== undefined) {
          fieldsToUnset.push(field);
        }
      }

      // Check if title or content are localized objects { bn: '...', en: '...' }
      let titleFallback = null;
      let contentFallback = null;

      if (typeof doc.title === 'object' && doc.title !== null) {
        titleFallback = doc.title.bn || doc.title.en || '';
      } else if (!doc.title && doc.titleBn) {
        titleFallback = doc.titleBn;
      }

      if (typeof doc.content === 'object' && doc.content !== null) {
        contentFallback = doc.content.bn || doc.content.en || '';
      } else if (!doc.content && doc.contentBn) {
        contentFallback = doc.contentBn;
      }

      // If title or content were objects, also add their nested paths to unset
      if (typeof doc.title === 'object' && doc.title !== null) {
        fieldsToUnset.push('title.bn', 'title.en');
      }
      if (typeof doc.content === 'object' && doc.content !== null) {
        fieldsToUnset.push('content.bn', 'content.en');
      }

      if (fieldsToUnset.length === 0 && !titleFallback && !contentFallback) {
        console.log(`✔ Document [${doc._id}] is already clean.`);
        continue;
      }

      console.log(`⏳ Patching document: ${doc._id} (${doc.nameBn || doc.name || 'Untitled'})`);
      if (fieldsToUnset.length > 0) {
        console.log(`   Removing orphaned fields: ${fieldsToUnset.join(', ')}`);
      }

      let patch = client.patch(doc._id);

      // Preserve content if title or content was empty but Bengali version existed
      if (titleFallback && typeof doc.title !== 'string') {
        console.log(`   Migrating title to single field: "${titleFallback.slice(0, 30)}..."`);
        patch = patch.set({ title: titleFallback });
      }
      if (contentFallback && typeof doc.content !== 'string') {
        console.log(`   Migrating content to single field: "${contentFallback.slice(0, 30)}..."`);
        patch = patch.set({ content: contentFallback });
      }

      if (fieldsToUnset.length > 0) {
        patch = patch.unset(fieldsToUnset);
      }

      await patch.commit();
      updatedCount++;
      console.log(`   ✔ Successfully cleaned [${doc._id}]\n`);

      // Gentle pause to avoid hitting API rate limits
      await sleep(250);
    }

    console.log(`\n🎉 Cleanup complete! Successfully processed and cleaned ${updatedCount} document(s).`);
  } catch (error) {
    console.error('❌ An error occurred during cleanup:', error.message);
  }
}

cleanKothaOrphans();
