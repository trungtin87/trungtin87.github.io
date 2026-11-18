import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { SITE_CONFIG } from '../cau_hinh/trang_web';
import { getPostDate, getPostExcerpt, getPostSlug, getPostTitle, withBase } from '../utils/url';

function escXml(str: string): string {
  return String(str || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

export const GET: APIRoute = async ({ site }) => {
  const origin = site ? site.toString().replace(/\/+$/, '') : SITE_CONFIG.pagesUrl.replace(/\/+$/, '');
  const posts = (await getCollection('bai_viet'))
    .filter((e) => !e.data.nhap && !e.data.draft && !e.data.noindex)
    .sort((a, b) => getPostDate(b).localeCompare(getPostDate(a)))
    .slice(0, 40);

  const items = posts
    .map((entry) => {
      const slug = getPostSlug(entry);
      const link = `${origin}${withBase(`/bai-viet/${slug}/`)}`;
      const rawDate = getPostDate(entry);
      const parsedMs = Date.parse(rawDate);
      const pubDate = Number.isNaN(parsedMs) ? new Date().toUTCString() : new Date(parsedMs).toUTCString();
      return [
        '    <item>',
        `      <title>${escXml(getPostTitle(entry))}</title>`,
        `      <link>${escXml(link)}</link>`,
        `      <guid isPermaLink="true">${escXml(link)}</guid>`,
        `      <pubDate>${escXml(pubDate)}</pubDate>`,
        `      <description>${escXml(getPostExcerpt(entry))}</description>`,
        '    </item>',
      ].join('\n');
    })
    .join('\n');

  const homeUrl = `${origin}${withBase('/')}`;
  const xml = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<rss version="2.0">',
    '  <channel>',
    `    <title>${escXml(SITE_CONFIG.siteTitle)}</title>`,
    `    <link>${escXml(homeUrl)}</link>`,
    `    <description>${escXml(SITE_CONFIG.tagline)}</description>`,
    '    <language>vi</language>',
    items,
    '  </channel>',
    '</rss>',
    '',
  ].join('\n');

  return new Response(xml, {
    headers: { 'Content-Type': 'application/xml; charset=utf-8' },
  });
};
