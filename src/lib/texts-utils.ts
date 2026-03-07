import { readFileSync } from 'node:fs';
import { join } from 'node:path';

// Strip UTF-8 BOM if present
export const raw = readFileSync(join(process.cwd(), 'src/data/texts-content.txt'), 'utf-8').replace(/^\uFEFF/, '');

/* ── Utilities ──────────────────────────────────────────────── */
export function esc(s: string): string {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

export function slugify(s: string): string {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

/* ── Types ───────────────────────────────────────────────────── */
export interface Section {
  title: string;
  id: string;
  slug: string;
  content: string;
}

export interface RenderResult {
  html: string;
  hasMore: boolean;
}

/* ── Parse file into top-level sections ─────────────────────── */
export function parseSections(text: string): Section[] {
  const sections: Section[] = [];
  const lines = text.split('\n');
  let currentTitle: string | null = null;
  let currentStart = 0;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (/^[A-Za-z].*:\s*$/.test(line) && !/^- /.test(line)) {
      if (currentTitle !== null) {
        const content = lines.slice(currentStart, i).join('\n').trim();
        const slug = slugify(currentTitle);
        sections.push({ title: currentTitle, id: 'section-' + slug, slug, content });
      }
      currentTitle = line.replace(/:\s*$/, '').trim();
      currentStart = i + 1;
    }
  }
  if (currentTitle !== null) {
    const content = lines.slice(currentStart).join('\n').trim();
    const slug = slugify(currentTitle);
    sections.push({ title: currentTitle, id: 'section-' + slug, slug, content });
  }
  return sections;
}

/* ── Render sub-category blocks (e.g. Follow-Up section) ─────── */
function renderSubCategories(lines: string[], limit?: number): RenderResult {
  // Collect all subcategory groups first
  const groups: { title: string; items: string[] }[] = [];
  let currentGroup: { title: string; items: string[] } | null = null;
  let currentItem: string[] = [];

  const flushItem = () => {
    const t = currentItem.join('\n').trim();
    if (t && currentGroup) currentGroup.items.push(t);
    currentItem = [];
  };

  for (const line of lines) {
    const lineTrimmed = line.trim();
    if (/^- [A-Za-z].*:\s*$/.test(line)) {
      flushItem();
      currentGroup = { title: line.replace(/^- /, '').replace(/:\s*$/, '').trim(), items: [] };
      groups.push(currentGroup);
      continue;
    }
    if (!lineTrimmed) {
      flushItem();
      continue;
    }
    if (currentGroup) {
      const t = line.replace(/^\s+- /, '').trimStart();
      currentItem.push(t);
    }
  }
  flushItem();

  const hasMore = limit !== undefined && groups.length > limit;
  const visible = hasMore ? groups.slice(0, limit) : groups;

  const html = visible.map(g => {
    const itemsHtml = g.items
      .map(t => `<div class="dd-item texts-message">${esc(t).replace(/\n/g, '<br>')}</div>`)
      .join('');
    return `<div class="texts-subcategory">
      <div class="texts-subcategory-title">${esc(g.title)}</div>
      ${itemsHtml}
    </div>`;
  }).join('');

  return { html, hasMore };
}

/* ── Render section content to HTML ─────────────────────────── */
export function renderContent(content: string, limit?: number): RenderResult {
  const lines = content.split('\n');
  const subCatLines = lines.filter(l => /^- [A-Z].*:\s*$/.test(l));
  if (subCatLines.length >= 2) {
    return renderSubCategories(lines, limit);
  }

  // Collect rendered items, tracking which are subheaders (don't count toward limit)
  type Item = { isSubheader: boolean; html: string };
  const items: Item[] = [];
  const blocks = content.split(/\n{2,}/);

  for (const block of blocks) {
    const trimmed = block.trim();
    if (!trimmed) continue;

    const blockLines = trimmed.split('\n');
    const firstTrimmed = blockLines[0].trim();
    const nonEmptyLines = blockLines.filter(l => l.trim());

    // Standalone subheader: single non-empty line ending with ":", short enough to be a label
    if (
      nonEmptyLines.length === 1 &&
      /^[A-Za-z].*:\s*$/.test(firstTrimmed) &&
      firstTrimmed.length < 70
    ) {
      items.push({ isSubheader: true, html: `<div class="texts-subheader">${esc(firstTrimmed.replace(/:\s*$/, ''))}</div>` });
      continue;
    }

    // Block starts with sub-header (first line ends with ":", remaining has content)
    if (
      /^[A-Za-z].*:\s*$/.test(firstTrimmed) &&
      firstTrimmed.length < 70 &&
      blockLines.length > 1
    ) {
      const subheaderHtml = `<div class="texts-subheader">${esc(firstTrimmed.replace(/:\s*$/, ''))}</div>`;
      const rest = blockLines.slice(1).join('\n').trim();
      const inner = rest ? renderContent(rest).html : '';
      items.push({ isSubheader: false, html: subheaderHtml + inner });
      continue;
    }

    // Bullet list block
    const bulletLines = blockLines.filter(l => /^\s*- /.test(l));
    if (bulletLines.length > 0 && bulletLines.length >= nonEmptyLines.length * 0.5) {
      let html = '';
      const firstBulletIdx = blockLines.findIndex(l => /^\s*- /.test(l));
      if (firstBulletIdx > 0) {
        const intro = blockLines.slice(0, firstBulletIdx).join('\n').trim();
        if (intro) html += `<div class="dd-item texts-message">${esc(intro).replace(/\n/g, '<br>')}</div>`;
      }
      const bullets = bulletLines.map(l => l.replace(/^\s*- /, '').trim());
      html += `<ul class="texts-bullet-list">${bullets.map(b => `<li>${esc(b)}</li>`).join('')}</ul>`;
      const lastBulletIdx = blockLines.reduce((max, l, i) => /^\s*- /.test(l) ? i : max, -1);
      if (lastBulletIdx >= 0 && lastBulletIdx < blockLines.length - 1) {
        const outro = blockLines.slice(lastBulletIdx + 1).join('\n').trim();
        if (outro) html += `<div class="dd-item texts-message">${esc(outro).replace(/\n/g, '<br>')}</div>`;
      }
      items.push({ isSubheader: false, html });
      continue;
    }

    // Numbered list block
    if (blockLines.some(l => /^\s*\d+\. /.test(l))) {
      let html = '';
      const firstNumIdx = blockLines.findIndex(l => /^\s*\d+\. /.test(l));
      if (firstNumIdx > 0) {
        const intro = blockLines.slice(0, firstNumIdx).join('\n').trim();
        if (intro) html += `<div class="dd-item texts-message">${esc(intro).replace(/\n/g, '<br>')}</div>`;
      }
      const numItems = blockLines.filter(l => /^\s*\d+\. /.test(l)).map(l => l.replace(/^\s*\d+\. /, '').trim());
      html += `<ol class="texts-numbered-list">${numItems.map(i => `<li>${esc(i)}</li>`).join('')}</ol>`;
      const lastNumIdx = blockLines.reduce((max, l, i) => /^\s*\d+\. /.test(l) ? i : max, -1);
      if (lastNumIdx >= 0 && lastNumIdx < blockLines.length - 1) {
        const outro = blockLines.slice(lastNumIdx + 1).join('\n').trim();
        if (outro) html += `<div class="dd-item texts-message">${esc(outro).replace(/\n/g, '<br>')}</div>`;
      }
      items.push({ isSubheader: false, html });
      continue;
    }

    // URL-only block
    if (nonEmptyLines.every(l => /^https?:\/\//.test(l.trim()))) {
      const urls = nonEmptyLines.map(l => l.trim());
      const links = urls.map(u => `<a href="${esc(u)}" class="texts-url" target="_blank" rel="noopener">${esc(u)}</a>`).join('');
      items.push({ isSubheader: false, html: `<div class="texts-urls">${links}</div>` });
      continue;
    }

    // Regular message
    items.push({ isSubheader: false, html: `<div class="dd-item texts-message">${esc(trimmed).replace(/\n/g, '<br>')}</div>` });
  }

  // Apply limit: count only non-subheader items
  let contentCount = 0;
  let hasMore = false;
  const htmlParts: string[] = [];

  for (const item of items) {
    if (item.isSubheader) {
      htmlParts.push(item.html);
    } else {
      if (limit !== undefined && contentCount >= limit) {
        hasMore = true;
        break;
      }
      htmlParts.push(item.html);
      contentCount++;
    }
  }

  return { html: htmlParts.join(''), hasMore };
}

/* ── Section icons ───────────────────────────────────────────── */
export const ICONS: Record<string, string> = {
  'Birthdays': '&#127874;',
  "Birthday Thank-You's": '&#128591;',
  'Just Announced Pregnancy': '&#128116;',
  'Newborn Baby': '&#128118;',
  'Professional/Work': '&#128188;',
  'College': '&#127891;',
  'For My Wedding': '&#128141;',
  "For Someone Else's Wedding": '&#127867;',
  'Anniversary Wishes': '&#128145;',
  'Baby Shower Thank-Yous': '&#127873;',
  'Random Compliment': '&#11088;',
  'Mourning/Loss': '&#128153;',
  'Follow Up Check-In Texts for Tough Stressful Situations': '&#129309;',
  'Well Wishes': '&#128140;',
  "Simple Thank You's": '&#128591;',
  "Veteran's Day": '&#127988;',
};
