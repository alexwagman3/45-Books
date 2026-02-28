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

// The prior \uXXXX fix decoded \u2019 → ' and \u2014 → — correctly,
// but left the backslash that preceded each \uXXXX escape sequence in the
// original JS string.  So now the file literally contains:
//   U+005C (backslash) + U+2019 (smart apostrophe)
//   U+005C (backslash) + U+2014 (em dash)
// We just strip the leading backslash.

const BACKSLASH   = '\u005C';
const SMART_APOS  = '\u2019'; // '
const EM_DASH     = '\u2014'; // —
const SMART_LQUOT = '\u2018'; // ' (left single, in case any exist)

const counts = {
  apos:   0,
  dash:   0,
  lquot:  0,
};

let result = '';
for (let i = 0; i < html.length; i++) {
  if (html[i] === BACKSLASH) {
    const next = html[i + 1];
    if (next === SMART_APOS) { counts.apos++;  i++; result += SMART_APOS;  continue; }
    if (next === EM_DASH)    { counts.dash++;  i++; result += EM_DASH;     continue; }
    if (next === SMART_LQUOT){ counts.lquot++; i++; result += SMART_LQUOT; continue; }
  }
  result += html[i];
}

console.log('Backslash+smart-apostrophe fixed:', counts.apos);
console.log('Backslash+em-dash fixed:         ', counts.dash);
console.log('Backslash+left-smartquote fixed: ', counts.lquot);

fs.writeFileSync(filePath, frontmatter + result, 'utf-8');
console.log('Written:', filePath);
