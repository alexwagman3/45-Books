'use strict';
const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../src/pages/love-your-neighbors-takeaways.astro');
let content = fs.readFileSync(filePath, 'utf-8');

// Split off frontmatter so we only touch the HTML section
const sep = '\n---\n';
const sepIdx = content.indexOf(sep, 3);
const frontmatter = content.slice(0, sepIdx + sep.length);
let html = content.slice(sepIdx + sep.length);

// The prior \uXXXX fix decoded Unicode escapes correctly but left the backslash
// that preceded each \uXXXX sequence in the original JS string.  Strip U+005C
// whenever it immediately precedes any of these Unicode punctuation characters.

const BACKSLASH = '\u005C';
// All Unicode chars that may appear after a spurious backslash:
const STRIP_AFTER = new Set([
  '\u2018', // '  left single quotation mark
  '\u2019', // '  right single quotation mark / apostrophe
  '\u201C', // "  left double quotation mark
  '\u201D', // "  right double quotation mark
  '\u2014', // —  em dash
  '\u2013', // –  en dash (pre-emptive)
  '\u2026', // …  horizontal ellipsis
]);

const counts = {};
STRIP_AFTER.forEach(ch => { counts[ch] = 0; });

let result = '';
for (let i = 0; i < html.length; i++) {
  if (html[i] === BACKSLASH && STRIP_AFTER.has(html[i + 1])) {
    i++;                      // skip the backslash
    counts[html[i]]++;
    result += html[i];
    continue;
  }
  result += html[i];
}

const labels = {
  '\u2018': "left-single-quote '",
  '\u2019': "right-single-quote/apostrophe '",
  '\u201C': 'left-double-quote "',
  '\u201D': 'right-double-quote "',
  '\u2014': 'em-dash —',
  '\u2013': 'en-dash –',
  '\u2026': 'ellipsis …',
};
let total = 0;
Object.entries(counts).forEach(([ch, n]) => {
  if (n > 0) { console.log('  ' + n + 'x  ' + labels[ch]); total += n; }
});
console.log('Total backslash artifacts removed:', total);

fs.writeFileSync(filePath, frontmatter + result, 'utf-8');
console.log('Written:', filePath);
