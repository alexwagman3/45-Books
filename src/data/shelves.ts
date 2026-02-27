export interface ShelfDef {
  id: string;
  label: string;
  books: string[]; // MDX slugs, left to right
}

export interface PillarDef {
  pillar: string;
  pillarLabel: string;
  pillarId: string;
  shelves: ShelfDef[];
}

export const SHELVES: PillarDef[] = [
  {
    pillar: 'money',
    pillarLabel: 'Money',
    pillarId: 'pillar-money',
    shelves: [
      {
        id: 'build-a-career',
        label: 'Build a Career',
        books: [
          'crucial-conversations',
          'the-leadership-challenge',
          'every-good-endeavor',
        ],
      },
      {
        id: 'run-a-side-hustle',
        label: 'Run a Side-Hustle',
        books: [
          'buy-rehab-rent-refinance-repeat',
          'the-personal-mba',
          'testing-business-ideas',
        ],
      },
      {
        id: 'manage-your-finances',
        label: 'Manage Your Finances',
        books: [
          'retire-before-mom-and-dad',
          'tax-free-wealth',
          'managing-gods-money',
        ],
      },
    ],
  },
  {
    pillar: 'health',
    pillarLabel: 'Health',
    pillarId: 'pillar-health',
    shelves: [
      {
        id: 'feed-your-body',
        label: 'Feed Your Body',
        books: [
          'the-whole-foods-diet',
          'everything-fat-loss',
          'how-to-cook-everything',
        ],
      },
      {
        id: 'exercise-your-muscles',
        label: 'Exercise Your Muscles',
        books: [
          'spark',
          'playing-with-movement',
          'the-barbell-prescription',
        ],
      },
      {
        id: 'manage-your-emotions',
        label: 'Manage Your Emotions',
        books: [
          'emotional-first-aid',
          'untangling-emotions',
          'if-youre-so-smart',
        ],
      },
    ],
  },
  {
    pillar: 'character',
    pillarLabel: 'Character',
    pillarId: 'pillar-character',
    shelves: [
      {
        id: 'develop-resilience',
        label: 'Develop Resilience',
        books: [
          'atomic-habits',
          'grit',
          'walking-with-god-through-pain-and-suffering',
        ],
      },
      {
        id: 'grow-in-wisdom',
        label: 'Grow in Wisdom',
        books: [
          'in-his-image',
          'the-purpose-driven-life',
          'the-power-of-a-humble-life',
        ],
      },
      {
        id: 'be-adventurous',
        label: 'Be Adventurous',
        books: [
          'microadventures',
          'wild-at-heart',
          'the-happiness-of-pursuit',
        ],
      },
    ],
  },
  {
    pillar: 'relationships',
    pillarLabel: 'Relationships',
    pillarId: 'pillar-relationships',
    shelves: [
      {
        id: 'love-your-family',
        label: 'Love Your Family',
        books: [
          'cribsheet',
          'good-inside',
          'the-5-love-languages-of-teenagers',
        ],
      },
      {
        id: 'love-your-neighbors',
        label: 'Love Your Neighbors',
        books: [
          'how-to-win-friends-and-influence-people',
          'the-art-of-neighboring',
          'find-your-people',
        ],
      },
      {
        id: 'love-your-spouse',
        label: 'Love Your Spouse',
        books: [
          'the-meaning-of-marriage',
          '7-principles-for-making-marriage-work',
          'intended-for-pleasure',
        ],
      },
    ],
  },
  {
    pillar: 'faith',
    pillarLabel: 'Faith',
    pillarId: 'pillar-faith',
    shelves: [
      {
        id: 'worship',
        label: 'Worship',
        books: [
          'sacred-pathways',
          'called-to-worship',
          'the-battle-plan-for-prayer',
        ],
      },
      {
        id: 'serve',
        label: 'Serve',
        books: [
          'alongside',
          'love-your-church',
          'improving-your-serve',
        ],
      },
      {
        id: 'disciple',
        label: 'Disciple',
        books: [
          'master-plan-of-evangelism',
          'evidence-for-jesus',
          'instruments-in-the-redeemers-hands',
        ],
      },
    ],
  },
];
