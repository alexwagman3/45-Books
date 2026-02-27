/**
 * One-time extraction script: pulls window._*Excerpts HTML content from the
 * original HTML source and appends it to the matching MDX book files under
 * src/content/books/<slug>.mdx
 *
 * Run from the Bookshelf project root:
 *   node scripts/extract-excerpts.cjs
 */

const fs = require('fs');
const path = require('path');

const SRC_HTML = 'C:\\Users\\alexw\\Downloads\\45 Book Summaries.html';
const BOOKS_DIR = path.join(__dirname, '..', 'src', 'content', 'books');

// Map from JS variable name to book slug
const EXCERPT_MAP = {
  _htwExcerpts:          'how-to-win-friends-and-influence-people',
  _7principlesExcerpts:  '7-principles-for-making-marriage-work',
  _momExcerpts:          'the-meaning-of-marriage',
  _ifpExcerpts:          'intended-for-pleasure',
  _fypExcerpts:          'find-your-people',
  _aonExcerpts:          'the-art-of-neighboring',
};

console.log(`Reading ${SRC_HTML}…`);
const html = fs.readFileSync(SRC_HTML, 'utf8');

const extracted = {};

// These are single-quoted JS strings: window._varName='…html…'
// Capture everything between the first ' and the last ' before \n
// They span a single (very long) line each.
const sqRe = /window\.(_\w+Excerpts)='((?:[^'\\]|\\.)*)'/g;
let m;
while ((m = sqRe.exec(html)) !== null) {
  const key = m[1];
  if (EXCERPT_MAP[key]) {
    try {
      // Unescape JS string escapes
      extracted[key] = m[2]
        .replace(/\\'/g, "'")
        .replace(/\\n/g, '\n')
        .replace(/\\r/g, '')
        .replace(/\\t/g, '\t')
        .replace(/\\\\/g, '\\');
      console.log(`  ✓ found ${key}  (${extracted[key].length} chars)`);
    } catch (e) {
      console.error(`  ✗ FAILED ${key}: ${e.message}`);
    }
  }
}

// Append to MDX files
for (const [key, slug] of Object.entries(EXCERPT_MAP)) {
  const content = extracted[key];
  if (!content) {
    console.warn(`  ✗ MISSING ${key} → ${slug}.mdx`);
    continue;
  }

  const mdxPath = path.join(BOOKS_DIR, `${slug}.mdx`);
  if (!fs.existsSync(mdxPath)) {
    console.warn(`  ✗ MDX not found: ${mdxPath}`);
    continue;
  }

  const existing = fs.readFileSync(mdxPath, 'utf8');

  // Don't append twice if already migrated
  if (existing.includes('## Excerpts')) {
    console.log(`  ~ already has excerpts: ${slug}.mdx`);
    continue;
  }

  const addition = `\n## Excerpts\n\n${content.trim()}\n`;
  fs.writeFileSync(mdxPath, existing + addition, 'utf8');
  console.log(`  ✓ appended to ${slug}.mdx`);
}

console.log('\nDone.');
