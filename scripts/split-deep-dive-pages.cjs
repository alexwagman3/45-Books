'use strict';
/**
 * split-deep-dive-pages.cjs
 *
 * Splits the monolithic love-your-neighbors-deep-dive.astro into individual
 * pages under src/pages/love-your-neighbors-deep-dive/:
 *   index.astro     — TOC linking to each section
 *   acts.astro
 *   difficult.astro
 *   five-fives.astro
 *   gatherings.astro
 *   compliments.astro
 *   texts.astro
 *   questions.astro
 *   loud-listening.astro
 *   gifts.astro
 *
 * Also patches the Go Deeper button URLs in love-your-neighbors-takeaways.astro.
 */
const fs   = require('fs');
const path = require('path');

const ROOT     = path.join(__dirname, '..');
const SRC      = path.join(ROOT, 'src', 'pages');
const OLD_FILE = path.join(SRC, 'love-your-neighbors-deep-dive.astro');
const OUT_DIR  = path.join(SRC, 'love-your-neighbors-deep-dive');

// ── Section metadata ─────────────────────────────────────────────────────────
const SECTIONS = [
  {
    id:    'acts',
    slug:  'acts',
    label: 'Acts of Service',
    title: 'Love Your Neighbors — Acts of Service',
    desc:  '90+ specific ways to serve the people around you: when to call, when to text, practical ways to serve, and how to get someone to accept help.',
  },
  {
    id:    'difficult',
    slug:  'difficult',
    label: 'Dealing with Difficult People',
    title: 'Love Your Neighbors — Dealing with Difficult People',
    desc:  'De-escalation phrases, correction techniques, conflict frameworks, and scripts for initiating healthy conflict.',
  },
  {
    id:    'fivefives',
    slug:  'five-fives',
    label: 'The Five Fives',
    title: 'Love Your Neighbors — The Five Fives',
    desc:  'Five friends, five trails, five dinners to host, five conversation starters, and five alternative hangout formats — all within five miles of home.',
  },
  {
    id:    'gatherings',
    slug:  'gatherings',
    label: 'Cul-de-Sac Gatherings',
    title: 'Love Your Neighbors — Cul-de-Sac Gatherings',
    desc:  'Year-round event-themed gatherings, TV season finale watch parties, and neighborhood initiatives for building real community.',
  },
  {
    id:    'compliments',
    slug:  'compliments',
    label: 'Compliment Library',
    title: 'Love Your Neighbors — Compliment Library',
    desc:  'A library of specific, sincere compliments organized by category — character, effort, creativity, parenting, and more.',
  },
  {
    id:    'texts',
    slug:  'texts',
    label: 'Showing Up with Words',
    title: 'Love Your Neighbors — Showing Up with Words',
    desc:  'Real message templates for every life event: loss, celebration, hard news, encouragement, and everyday check-ins.',
    isTexts: true,
  },
  {
    id:    'questions',
    slug:  'questions',
    label: 'Asking Good Questions',
    title: 'Love Your Neighbors — Asking Good Questions',
    desc:  '200+ fun and sincere questions for deepening relationships — organized by category.',
  },
  {
    id:    'loudlistening',
    slug:  'loud-listening',
    label: 'Loud Listening',
    title: 'Love Your Neighbors — Loud Listening',
    desc:  'Four categories of loud listening techniques: body language, verbal affirmation, asking follow-up questions, and remembering details.',
  },
  {
    id:    'gifts',
    slug:  'gifts',
    label: 'The Art of Giving Gifts',
    title: 'Love Your Neighbors — The Art of Giving Gifts',
    desc:  'Gift-giving principles and specific ideas organized by occasion, relationship, and budget.',
  },
];

// ── Read the old monolithic file ─────────────────────────────────────────────
const raw   = fs.readFileSync(OLD_FILE, 'utf-8');
const lines = raw.split('\n');

// ── Extract inner content for each section ───────────────────────────────────
// The section wrapper div sits at exactly 4-space indentation in the source file.
// Its matching closing </div> is also at 4 spaces.  We stop there rather than
// trying to count div depths — counting doesn't work because Fragment lines
// contain many <div>/<\/div> inside their JSON string payload.
function extractSection(sectionId) {
  const openTag = `id="dd-${sectionId}"`;
  const startIdx = lines.findIndex(l => l.includes('dd-section') && l.includes(openTag));
  if (startIdx === -1) throw new Error(`Section not found: dd-${sectionId}`);

  // The wrapper's closing tag sits at exactly 4 spaces of leading whitespace
  const CLOSING = '    </div>';
  const body = [];
  for (let i = startIdx + 1; i < lines.length; i++) {
    if (lines[i].trimEnd() === CLOSING) break;
    // Strip 2 leading spaces so content goes from 6-space indent → 4-space indent
    body.push(lines[i].replace(/^  /, ''));
  }
  return body.join('\n').trimEnd();
}

// ── Build each section page ───────────────────────────────────────────────────
function buildSectionPage(sec, idx) {
  const prev = SECTIONS[idx - 1];
  const next = SECTIONS[idx + 1];

  const backLink = `<a class="overlay-back" href="/love-your-neighbors-deep-dive/">&#8592; Back to Reference Library</a>`;
  const closeLink = `<a class="overlay-close" href="/" aria-label="Close">&times;</a>`;

  // Prev / Next nav
  const navParts = [];
  if (prev) navParts.push(`<a class="dd-nav-btn dd-nav-prev" href="/love-your-neighbors-deep-dive/${prev.slug}/">&#8592; ${prev.label}</a>`);
  if (next) navParts.push(`<a class="dd-nav-btn dd-nav-next" href="/love-your-neighbors-deep-dive/${next.slug}/">${next.label} &#8594;</a>`);
  const nav = navParts.length
    ? `\n\n  <div class="dd-page-nav">\n    ${navParts.join('\n    ')}\n  </div>`
    : '';

  const content = extractSection(sec.id);

  if (sec.isTexts) {
    // Texts section: needs readFileSync frontmatter
    return `---
import { readFileSync } from 'node:fs';
import { join }         from 'node:path';
import BaseLayout       from '../../layouts/BaseLayout.astro';

const textsRaw  = readFileSync(join(process.cwd(), 'src/data/texts-content.txt'), 'utf-8');
const textsHtml = textsRaw
  .replace(/&/g, '&amp;')
  .replace(/</g, '&lt;')
  .replace(/>/g, '&gt;')
  .replace(/\\n/g, '<br>');
---

<BaseLayout
  title="${sec.title}"
  description="${sec.desc}"
  canonicalPath="/love-your-neighbors-deep-dive/${sec.slug}/"
>
  ${backLink}
  ${closeLink}

  <div class="takeaways-content">
${content}
  </div>${nav}
</BaseLayout>
`;
  }

  // Standard section: Fragment with embedded HTML string
  return `---
import BaseLayout from '../../layouts/BaseLayout.astro';
---

<BaseLayout
  title="${sec.title}"
  description="${sec.desc}"
  canonicalPath="/love-your-neighbors-deep-dive/${sec.slug}/"
>
  ${backLink}
  ${closeLink}

  <div class="takeaways-content">
${content}
  </div>${nav}
</BaseLayout>
`;
}

// ── Build the index / TOC page ────────────────────────────────────────────────
function buildIndexPage() {
  const links = SECTIONS.map(s =>
    `      <a class="dd-topic-link" href="/love-your-neighbors-deep-dive/${s.slug}/">${s.label}</a>`
  ).join('\n');

  return `---
import BaseLayout from '../../layouts/BaseLayout.astro';
---

<BaseLayout
  title="Love Your Neighbors — Go Deeper"
  description="Full actionable reference library from the Love Your Neighbors shelf: acts of service, de-escalation phrases, Five Fives, gatherings, compliments, questions, listening, texts, and gifts."
  canonicalPath="/love-your-neighbors-deep-dive/"
>
  <a class="overlay-back" href="/love-your-neighbors-takeaways/">&#8592; Back to Takeaways</a>
  <a class="overlay-close" href="/" aria-label="Close">&times;</a>

  <div class="takeaways-content">
    <span class="takeaways-tag">Love Your Neighbors</span>
    <h1 class="takeaways-title">Go Deeper — Reference Library</h1>
    <p class="takeaways-author" style="margin-bottom:1.5rem">Full actionable content from the Love Your Neighbors shelf</p>

    <div class="dd-topic-list" style="margin-bottom:2.5rem">
${links}
    </div>
  </div>
</BaseLayout>
`;
}

// ── Write files ───────────────────────────────────────────────────────────────
if (!fs.existsSync(OUT_DIR)) {
  fs.mkdirSync(OUT_DIR, { recursive: true });
  console.log('Created directory:', OUT_DIR);
}

// Index
const indexPath = path.join(OUT_DIR, 'index.astro');
fs.writeFileSync(indexPath, buildIndexPage(), 'utf-8');
console.log('✓ Written:', path.relative(ROOT, indexPath));

// Section pages
SECTIONS.forEach((sec, idx) => {
  const filename = `${sec.slug}.astro`;
  const outPath  = path.join(OUT_DIR, filename);
  fs.writeFileSync(outPath, buildSectionPage(sec, idx), 'utf-8');
  console.log('✓ Written:', path.relative(ROOT, outPath));
});

// Delete old flat file
fs.unlinkSync(OLD_FILE);
console.log('✓ Deleted:', path.relative(ROOT, OLD_FILE));

// ── Patch takeaways page buttons ─────────────────────────────────────────────
const takeawaysPath = path.join(SRC, 'love-your-neighbors-takeaways.astro');
let takeaways = fs.readFileSync(takeawaysPath, 'utf-8');

const replacements = [
  ['/love-your-neighbors-deep-dive/#dd-acts',          '/love-your-neighbors-deep-dive/acts/'],
  ['/love-your-neighbors-deep-dive/#dd-difficult',     '/love-your-neighbors-deep-dive/difficult/'],
  ['/love-your-neighbors-deep-dive/#dd-fivefives',     '/love-your-neighbors-deep-dive/five-fives/'],
  ['/love-your-neighbors-deep-dive/#dd-gatherings',    '/love-your-neighbors-deep-dive/gatherings/'],
  ['/love-your-neighbors-deep-dive/#dd-compliments',   '/love-your-neighbors-deep-dive/compliments/'],
  ['/love-your-neighbors-deep-dive/#dd-texts',         '/love-your-neighbors-deep-dive/texts/'],
  ['/love-your-neighbors-deep-dive/#dd-questions',     '/love-your-neighbors-deep-dive/questions/'],
  ['/love-your-neighbors-deep-dive/#dd-loudlistening', '/love-your-neighbors-deep-dive/loud-listening/'],
  ['/love-your-neighbors-deep-dive/#dd-gifts',         '/love-your-neighbors-deep-dive/gifts/'],
];

let patchCount = 0;
for (const [from, to] of replacements) {
  if (takeaways.includes(from)) {
    takeaways = takeaways.split(from).join(to);
    console.log('✓ Button patched:', from, '→', to);
    patchCount++;
  } else {
    console.warn('⚠ Not found in takeaways:', from);
  }
}

fs.writeFileSync(takeawaysPath, takeaways, 'utf-8');
console.log(`✓ Takeaways page updated (${patchCount} buttons)`);

console.log('\nDone. Run npm run build to verify.');
