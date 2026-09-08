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

// Map of all locally defined Sanity Document Types and their valid root-level fields
const SCHEMA_MAP = {
  book: [
    'title', 'titleBn', 'slug', 'coverImage', 'description', 'descriptionBn',
    'price', 'isFree', 'pdfFile', 'externalLink', 'author', 'publishYear',
    'pageCount', 'order'
  ],
  foundingMember: [
    'name', 'nameBn', 'designation', 'designationBn', 'image', 'bio', 'bioBn',
    'isSuperAdmin', 'order'
  ],
  galleryImage: [
    'image', 'category', 'caption', 'captionBn', 'year', 'order'
  ],
  globalSettings: [
    'siteTitle', 'siteTitleBn', 'siteDescription', 'logo', 'favicon', 'ogImage',
    'navLinks', 'footerText', 'footerTextBn', 'contactEmail', 'contactPhone',
    'address', 'addressBn', 'facebookUrl', 'youtubeUrl', 'footerAdminName',
    'footerAdminNameBn', 'footerAdminTitle', 'footerAdminTitleBn',
    'footerAdminImage', 'footerAdminBio', 'footerAdminBioBn'
  ],
  hero: [
    'title', 'titleBn', 'subtitle', 'subtitleBn', 'backgroundImage', 'bgImages',
    'badgeImage', 'ctaText', 'ctaTextBn', 'ctaLink'
  ],
  history: [
    'title', 'titleBn', 'excerpt', 'excerptBn', 'body', 'coverImage', 'timeline'
  ],
  kothaOGatha: [
    'name', 'nameBn', 'designation', 'designationBn', 'category', 'title',
    'titleBn', 'content', 'contentBn', 'photo', 'email', 'isApproved',
    'submittedAt', 'order'
  ],
  video: [
    'title', 'titleBn', 'youtubeUrl', 'thumbnail', 'description',
    'descriptionBn', 'publishedAt', 'order'
  ],
  welfareFund: [
    'totalCollection', 'totalExpense'
  ],
};

// System fields that are always allowed
const SYSTEM_FIELDS = ['_id', '_type', '_createdAt', '_updatedAt', '_rev', '_key'];

async function runCleanup() {
  if (!process.env.SANITY_API_WRITE_TOKEN) {
    console.error('❌ ERROR: SANITY_API_WRITE_TOKEN is missing in .env.local');
    process.exit(1);
  }

  console.log('🔍 Scanning Sanity dataset for orphaned fields...');

  try {
    // Fetch all non-system documents
    const query = '*[!(_id in path("_.**"))]';
    const documents = await client.fetch(query);
    
    console.log(`ℹ Found ${documents.length} documents in total.`);

    const patches = [];
    let totalOrphanedFields = 0;

    for (const doc of documents) {
      // Skip assets or unrecognized types
      if (!SCHEMA_MAP[doc._type]) {
        if (!doc._type.startsWith('sanity.')) {
           console.log(`⚠ Warning: Document ${doc._id} has unknown type "${doc._type}". Skipping.`);
        }
        continue;
      }

      const allowedFields = new Set([...SCHEMA_MAP[doc._type], ...SYSTEM_FIELDS]);
      const currentFields = Object.keys(doc);
      
      const orphanedFields = currentFields.filter((field) => !allowedFields.has(field));

      if (orphanedFields.length > 0) {
        console.log(`\n📄 Document ID: ${doc._id} (Type: ${doc._type})`);
        console.log(`   ❌ Orphaned fields found: ${orphanedFields.join(', ')}`);
        
        patches.push(
          client.patch(doc._id).unset(orphanedFields)
        );
        
        totalOrphanedFields += orphanedFields.length;
      }
    }

    if (patches.length === 0) {
      console.log('\n✅ Dataset is perfectly clean! No orphaned fields found.');
      return;
    }

    console.log(`\n⏳ Preparing to remove ${totalOrphanedFields} orphaned fields across ${patches.length} documents...`);

    // Execute patches using a transaction to ensure all-or-nothing and speed up the process
    let transaction = client.transaction();
    for (const patch of patches) {
      transaction.patch(patch);
    }

    await transaction.commit();
    console.log('\n✔ Cleanup complete! All orphaned fields have been permanently removed.');

  } catch (error) {
    console.error('❌ An error occurred during cleanup:', error.message);
  }
}

runCleanup();
