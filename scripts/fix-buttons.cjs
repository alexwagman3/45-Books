const fs = require('fs');

// ── love-your-neighbors-takeaways.astro ──────────────────────────────────
const LN_FILE = 'C:/Users/alexw/Downloads/Bookshelf/src/pages/love-your-neighbors-takeaways.astro';
let ln = fs.readFileSync(LN_FILE, 'utf-8');

const lnReplacements = [
  ['See All Acts of Service &rarr;',                      '/love-your-neighbors-deep-dive/#dd-acts'],
  ['See De-Escalation Phrases &amp; Techniques &rarr;',   '/love-your-neighbors-deep-dive/#dd-difficult'],
  ['See My Five Fives &rarr;',                            '/love-your-neighbors-deep-dive/#dd-fivefives'],
  ['See Full Calendar &amp; Ideas &rarr;',                '/love-your-neighbors-deep-dive/#dd-gatherings'],
  ['See All Questions &rarr;',                            '/love-your-neighbors-deep-dive/#dd-questions'],
  ['See Loud Listening Techniques &rarr;',                '/love-your-neighbors-deep-dive/#dd-loudlistening'],
  ['See Gift Ideas &amp; Principles &rarr;',              '/love-your-neighbors-deep-dive/#dd-gifts'],
];

// The two "See Examples & Templates" buttons need to be matched by context
// They appear in order: compliments first, then texts/words
// Replace using index-based approach

// Do the straightforward replacements first
for (const [label, href] of lnReplacements) {
  const btn = `<button class="go-deeper-btn" title="Deep dive coming soon" style="opacity:0.4;cursor:default;pointer-events:none">${label}</button>`;
  const link = `<a class="go-deeper-btn" href="${href}">${label}</a>`;
  if (ln.includes(btn)) {
    ln = ln.replace(btn, link);
    console.log('Replaced:', label.substring(0, 30));
  } else {
    console.log('NOT FOUND:', label.substring(0, 30));
  }
}

// Handle "See Examples & Templates" — appears twice, first in tk-compliments, then in tk-words
const examplesBtn = `<button class="go-deeper-btn" title="Deep dive coming soon" style="opacity:0.4;cursor:default;pointer-events:none">See Examples &amp; Templates &rarr;</button>`;
const examplesLink1 = `<a class="go-deeper-btn" href="/love-your-neighbors-deep-dive/#dd-compliments">See Examples &amp; Templates &rarr;</a>`;
const examplesLink2 = `<a class="go-deeper-btn" href="/love-your-neighbors-deep-dive/#dd-texts">See Examples &amp; Templates &rarr;</a>`;

// Replace first occurrence = compliments, second = texts
const firstIdx = ln.indexOf(examplesBtn);
if (firstIdx >= 0) {
  ln = ln.slice(0, firstIdx) + examplesLink1 + ln.slice(firstIdx + examplesBtn.length);
  console.log('Replaced: Examples #1 (compliments)');
  const secondIdx = ln.indexOf(examplesBtn);
  if (secondIdx >= 0) {
    ln = ln.slice(0, secondIdx) + examplesLink2 + ln.slice(secondIdx + examplesBtn.length);
    console.log('Replaced: Examples #2 (texts)');
  }
}

fs.writeFileSync(LN_FILE, ln, 'utf-8');
console.log('✓ love-your-neighbors-takeaways.astro updated');

// ── disciple-takeaways.astro ─────────────────────────────────────────────
const D_FILE = 'C:/Users/alexw/Downloads/Bookshelf/src/pages/disciple-takeaways.astro';
let d = fs.readFileSync(D_FILE, 'utf-8');
d = d.replace(
  `<button class="go-deeper-btn" title="Deep dive coming soon" style="opacity:0.4;cursor:default;pointer-events:none">See Framework &rarr;</button>`,
  `<a class="go-deeper-btn" href="/disciple-deep-dive/">See Full Framework &rarr;</a>`
);
fs.writeFileSync(D_FILE, d, 'utf-8');
console.log('✓ disciple-takeaways.astro updated');

// ── feed-your-body-takeaways.astro ───────────────────────────────────────
const FYB_FILE = 'C:/Users/alexw/Downloads/Bookshelf/src/pages/feed-your-body-takeaways.astro';
let fyb = fs.readFileSync(FYB_FILE, 'utf-8');
fyb = fyb.replace(
  `<button class="go-deeper-btn" title="Deep dive coming soon" style="opacity:0.4;cursor:default;pointer-events:none">View Weekly Dinner Plan &rarr;</button>`,
  `<a class="go-deeper-btn" href="/feed-your-body-deep-dive/">View Weekly Dinner Plan &rarr;</a>`
);
fs.writeFileSync(FYB_FILE, fyb, 'utf-8');
console.log('✓ feed-your-body-takeaways.astro updated');
