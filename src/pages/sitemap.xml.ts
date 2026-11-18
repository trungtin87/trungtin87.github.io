import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { SITE_CONFIG } from '../cau_hinh/trang_web';
import { getPostDate, getPostSlug, withBase } from '../utils/url';

function escXml(str: string): string {
  return String(str || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

export const GET: APIRoute = async ({ site }) => {
  const origin = site ? site.toString().replace(/\/+$/, '') : SITE_CONFIG.pagesUrl.replace(/\/+$/, '');
  const posts = (await getCollection('bai_viet')).filter(
    (e) => !e.data.nhap && !e.data.draft && !e.data.noindex
  );

  const staticRoutes = ['/', '/bai-viet/'];
  const urls = [
    ...staticRoutes.map((r) => ({
      loc: `${origin}${withBase(r)}`,
      lastmod: new Date().toISOString().slice(0, 10),
    })),
    ...posts.map((p) => ({
      loc: `${origin}${withBase(`/bai-viet/${getPostSlug(p)}/`)}`,
      lastmod: getPostDate(p),
    })),
  ];

  const xml = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ...urls.map(
      (u) => `  <url><loc>${escXml(u.loc)}</loc><lastmod>${escXml(u.lastmod)}</lastmod></url>`
    ),
    '</urlset>',
    '',
  ].join('\n');

  return new Response(xml, {
    headers: { 'Content-Type': 'application/xml; charset=utf-8' },
  });
};
