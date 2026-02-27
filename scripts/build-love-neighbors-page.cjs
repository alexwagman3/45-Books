/**
 * Builds the Love Neighbors takeaways Astro page by:
 *   1. Extracting getLoveNeighborsTakeaways() HTML from the source file
 *   2. Transforming onclick scroll handlers → href="#id" anchor links
 *   3. Making openDeepDive() buttons inert (Phase 4 deep-dive content)
 *   4. Writing the cleaned HTML to src/pages/love-your-neighbors-takeaways.astro
 *
 * Run from the Bookshelf project root:
 *   node scripts/build-love-neighbors-page.cjs
 */

const fs   = require('fs');
const path = require('path');

const SRC_HTML = 'C:\\Users\\alexw\\Downloads\\45 Book Summaries.html';
const OUT_PAGE = path.join(__dirname, '..', 'src', 'pages', 'love-your-neighbors-takeaways.astro');

// ─── 1. Extract raw HTML from getLoveNeighborsTakeaways() ────────────────────
console.log('Reading source HTML…');
const html = fs.readFileSync(SRC_HTML, 'utf8');

const startMarker = 'function getLoveNeighborsTakeaways(){';
const idx = html.indexOf(startMarker);
if (idx === -1) { console.error('ERROR: getLoveNeighborsTakeaways not found'); process.exit(1); }

const returnIdx = html.indexOf('return `', idx);
if (returnIdx === -1) { console.error('ERROR: return backtick not found'); process.exit(1); }

const contentStart = returnIdx + 8; // skip 'return `'

// Find matching closing backtick
let depth = 1;
let pos = contentStart;
while (pos < html.length && depth > 0) {
  if (html[pos] === '`') depth--;
  else pos++;
}
let raw = html.substring(contentStart, pos - 1).trim();
console.log(`  Extracted ${raw.length} chars`);

// ─── 2. Strip the duplicate header (tag + h1) that Astro template provides ──
raw = raw
  .replace(/^<span class="takeaways-tag">[^<]*<\/span>\s*/i, '')
  .replace(/^<h1 class="takeaways-title">[^<]*<\/h1>\s*/i, '');

// ─── 3. Transform onclick scroll handlers → href anchor links ───────────────
// Pattern: onclick="var el=document.getElementById('tk-XXX');...scrollTo..."
raw = raw.replace(
  /onclick="var el=document\.getElementById\('(tk-[^']+)'\);[^"]+"/g,
  'href="#$1"'
);

// ─── 4. Make openDeepDive() buttons inert (Phase 4) ─────────────────────────
// Keep the button visible but non-functional; add a title so users know it's coming
raw = raw.replace(
  /onclick="openDeepDive\('[^']+'\)"/g,
  'title="Deep dive coming soon" style="opacity:0.4;cursor:default;pointer-events:none"'
);

// ─── 5. Build the full Astro page ───────────────────────────────────────────
const astroPreamble = `---
import BaseLayout from '../layouts/BaseLayout.astro';

const books = [
  { slug: 'how-to-win-friends-and-influence-people', title: 'How to Win Friends and Influence People' },
  { slug: 'the-art-of-neighboring',                  title: 'The Art of Neighboring' },
  { slug: 'find-your-people',                        title: 'Find Your People' },
];
---

<BaseLayout
  title="Love Your Neighbors — Personal Takeaways"
  description="Personal takeaways from the Love Your Neighbors shelf: How to Win Friends, The Art of Neighboring, and Find Your People."
>
  <a class="overlay-back" href="/">&#8592; Back to Bookshelf</a>
  <a class="overlay-close" href="/" aria-label="Close">&times;</a>

  <div class="takeaways-content">
    <span class="takeaways-tag">Love Your Neighbors</span>
    <h1 class="takeaways-title">Loving Your Neighbors Well</h1>
    <p class="takeaways-author" style="margin-bottom: 0.5rem;">Personal Takeaways</p>

    <div style="display:flex; gap:0.5rem; flex-wrap:wrap; margin-bottom:2rem;">
      {books.map((b) => (
        <a href={\`/books/\${b.slug}/\`} class="overlay-takeaways-btn" style="font-size:0.78rem; padding:0.35rem 0.9rem;">
          {b.title}
        </a>
      ))}
    </div>

`;

const astroPostamble = `
  </div>
</BaseLayout>

<style>
  /* Smooth scroll on anchor jumps within this page */
  html { scroll-behavior: smooth; }
</style>
`;

// Indent the raw HTML block inside the div
const indentedContent = raw
  .split('\n')
  .map(line => '    ' + line)
  .join('\n');

const pageContent = astroPreamble + indentedContent + astroPostamble;

fs.writeFileSync(OUT_PAGE, pageContent, 'utf8');
console.log(`  ✓  Written to ${OUT_PAGE}`);
console.log(`  Total page size: ${pageContent.length} chars`);
console.log('\nDone.');
