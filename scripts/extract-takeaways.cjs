/**
 * One-time extraction script: pulls window._*Md content from the original
 * HTML source file and writes each book's takeaway markdown to
 * src/content/takeaways/<slug>.md
 *
 * Run from the Bookshelf project root:
 *   node scripts/extract-takeaways.cjs
 */

const fs = require('fs');
const path = require('path');

const SRC_HTML = 'C:\\Users\\alexw\\Downloads\\45 Book Summaries.html';
const OUT_DIR = path.join(__dirname, '..', 'src', 'content', 'takeaways');

// Map from JS variable suffix to MDX slug
const SLUG_MAP = {
  _howToCookEverythingMd:          'how-to-cook-everything',
  _everythingFatLossMd:            'everything-fat-loss',
  _wholeFoodsDietMd:               'the-whole-foods-diet',
  _sparkMd:                        'spark',
  _playingWithMovementMd:          'playing-with-movement',
  _barbellPrescriptionMd:          'the-barbell-prescription',
  _emotionalFirstAidMd:            'emotional-first-aid',
  _untanglingEmotionsMd:           'untangling-emotions',
  _ifYoureSoSmartMd:               'if-youre-so-smart',
  _everyGoodEndeavorMd:            'every-good-endeavor',
  _leadershipChallengeMd:          'the-leadership-challenge',
  _crucialConversationsMd:         'crucial-conversations',
  _brrrrMd:                        'buy-rehab-rent-refinance-repeat',
  _personalMBAMd:                  'the-personal-mba',
  _testingBusinessIdeasMd:         'testing-business-ideas',
  _retireBeforeMomAndDadMd:        'retire-before-mom-and-dad',
  _taxFreeWealthMd:                'tax-free-wealth',
  _managingGodsMoneyMd:            'managing-gods-money',
  _atomicHabitsMd:                 'atomic-habits',
  _gritMd:                         'grit',
  _walkingWithGodPainMd:           'walking-with-god-through-pain-and-suffering',
  _masterPlanEvangelismMd:         'master-plan-of-evangelism',
  _evidenceForJesusMd:             'evidence-for-jesus',
  _instrumentsRedeemersHandsMd:    'instruments-in-the-redeemers-hands',
  _improvingYourServeMd:           'improving-your-serve',
  _loveYourChurchMd:               'love-your-church',
  _sacredPathwaysMd:               'sacred-pathways',
  _calledToWorshipMd:              'called-to-worship',
  _battlePlanPrayerMd:             'the-battle-plan-for-prayer',
  _inHisImageMd:                   'in-his-image',
  _purposeDrivenLifeMd:            'the-purpose-driven-life',
  _powerOfAHumbleLifeMd:           'the-power-of-a-humble-life',
  _happinessOfPursuitMd:           'the-happiness-of-pursuit',
  _microadventuresMd:              'microadventures',
  _wildAtHeartMd:                  'wild-at-heart',
};

// ─── Read source ─────────────────────────────────────────────────────────────
console.log(`Reading ${SRC_HTML}…`);
const html = fs.readFileSync(SRC_HTML, 'utf8');
fs.mkdirSync(OUT_DIR, { recursive: true });

const extracted = {};

// ─── 1. String.raw template literals (multi-line) ────────────────────────────
// Pattern: window._varName=String.raw`…content…`;
// The backtick content may span thousands of lines.
const rawRe = /window\.(_\w+Md)=String\.raw`([\s\S]*?)`\s*[;\n]/g;
let m;
while ((m = rawRe.exec(html)) !== null) {
  const key = m[1];
  if (SLUG_MAP[key]) {
    extracted[key] = m[2];
    console.log(`  [raw] found ${key}`);
  }
}

// ─── 2. Regular double-quoted strings ────────────────────────────────────────
// Pattern: window._varName="…escaped content…"
// We capture everything up to an unescaped closing quote.
const dqRe = /window\.(_\w+Md)="((?:[^"\\]|\\[\s\S])*)"/g;
while ((m = dqRe.exec(html)) !== null) {
  const key = m[1];
  if (SLUG_MAP[key] && !extracted[key]) {
    try {
      // JSON.parse unescapes \n, \t, \uXXXX, etc.
      extracted[key] = JSON.parse('"' + m[2] + '"');
      console.log(`  [dq]  found ${key}`);
    } catch (e) {
      console.error(`  [dq]  FAILED to parse ${key}: ${e.message}`);
    }
  }
}

// ─── 3. Write files ───────────────────────────────────────────────────────────
let ok = 0, miss = 0;

for (const [key, slug] of Object.entries(SLUG_MAP)) {
  if (!extracted[key]) {
    console.warn(`  ✗  MISSING: ${key} → ${slug}.md`);
    miss++;
    continue;
  }

  const content = extracted[key].trim();
  const outPath = path.join(OUT_DIR, `${slug}.md`);
  fs.writeFileSync(outPath, content + '\n', 'utf8');
  console.log(`  ✓  ${slug}.md  (${content.length} chars)`);
  ok++;
}

console.log(`\nDone: ${ok} written, ${miss} missing.`);
