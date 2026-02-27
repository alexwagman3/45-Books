/**
 * Migration script: move the raw-HTML excerpt sections that were appended to
 * 6 MDX book files into a dedicated src/content/excerpts/<slug>.md collection.
 *
 * This is necessary because MDX parses content as JSX, which can mangle HTML
 * attributes like class="…" → Astro's .md files (via remark) pass raw HTML
 * through verbatim, so class="excerpt-section-title" survives intact.
 *
 * Run from the Bookshelf project root:
 *   node scripts/migrate-excerpts-to-collection.cjs
 */

const fs   = require('fs');
const path = require('path');

const BOOKS_DIR    = path.join(__dirname, '..', 'src', 'content', 'books');
const EXCERPTS_DIR = path.join(__dirname, '..', 'src', 'content', 'excerpts');

const EXCERPT_SLUGS = [
  'how-to-win-friends-and-influence-people',
  '7-principles-for-making-marriage-work',
  'the-meaning-of-marriage',
  'intended-for-pleasure',
  'find-your-people',
  'the-art-of-neighboring',
];

fs.mkdirSync(EXCERPTS_DIR, { recursive: true });

let ok = 0, skip = 0;

for (const slug of EXCERPT_SLUGS) {
  const mdxPath    = path.join(BOOKS_DIR, `${slug}.mdx`);
  const outPath    = path.join(EXCERPTS_DIR, `${slug}.md`);

  if (!fs.existsSync(mdxPath)) {
    console.warn(`  ✗  MDX not found: ${slug}.mdx`);
    skip++;
    continue;
  }

  const mdx     = fs.readFileSync(mdxPath, 'utf8');
  const marker  = '\n## Excerpts\n\n';
  const idx     = mdx.indexOf(marker);

  if (idx === -1) {
    console.warn(`  ~  No ## Excerpts section in ${slug}.mdx (already migrated?)`);
    skip++;
    continue;
  }

  // Extract the HTML excerpt content (everything after the marker)
  const excerptHtml = mdx.substring(idx + marker.length).trim();

  // Write to excerpts collection (.md so raw HTML is safe)
  fs.writeFileSync(outPath, excerptHtml + '\n', 'utf8');
  console.log(`  ✓  ${slug}.md  (${excerptHtml.length} chars)`);

  // Remove the ## Excerpts section from the MDX file
  const cleanedMdx = mdx.substring(0, idx).trimEnd() + '\n';
  fs.writeFileSync(mdxPath, cleanedMdx, 'utf8');
  console.log(`      cleaned ${slug}.mdx`);

  ok++;
}

console.log(`\nDone: ${ok} migrated, ${skip} skipped.`);
