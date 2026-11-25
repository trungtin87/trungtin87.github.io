import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { SITE_CONFIG } from '../cau_hinh/trang_web';
import {
  getPostCategorySlug,
  getPostDate,
  getPostSlug,
  getPostTags,
  slugifyVi,
  withBase,
} from '../utils/url';

function escXml(str: string): string {
  return String(str || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

export const GET: APIRoute = async ({ site }) => {
  const origin = site ? site.toString().replace(/\/+$/, '') : SITE_CONFIG.pagesUrl.replace(/\/+$/, '');
  const posts = (await getCollection('bai_viet')).filter(
    (e) => !e.data.nhap && !e.data.draft && !e.data.noindex
  );

  let projects: any[] = [];
  let books: any[] = [];
  let shop: any[] = [];
  try {
    projects = (await getCollection('du_an')).filter((e) => !e.data.nhap && !e.data.draft);
  } catch {}
  try {
    books = (await getCollection('sach')).filter((e) => !e.data.nhap && !e.data.draft);
  } catch {}
  try {
    shop = (await getCollection('cua_hang')).filter((e) => !e.data.nhap && !e.data.draft);
  } catch {}

  const todayStr = new Date().toISOString().slice(0, 10);
  const staticRoutes = [
    '/',
    '/bai-viet/',
    '/chuyen-muc/',
    '/chu-de/',
    '/luu-tru/',
    '/gioi-thieu/',
    '/lien-he/',
    ...(projects.length > 0 ? ['/du-an/'] : []),
    ...(books.length > 0 ? ['/sach/'] : []),
    ...(shop.length > 0 ? ['/cua-hang/'] : []),
  ];
  const categorySlugs = Array.from(new Set(posts.map((p) => getPostCategorySlug(p))));
  const tagSlugs = Array.from(
    new Set(posts.flatMap((p) => getPostTags(p).map((t) => slugifyVi(t))))
  );

  const urls = [
    ...staticRoutes.map((r) => ({
      loc: `${origin}${withBase(r)}`,
      lastmod: todayStr,
    })),
    ...categorySlugs.map((slug) => ({
      loc: `${origin}${withBase(`/chuyen-muc/${slug}/`)}`,
      lastmod: todayStr,
    })),
    ...tagSlugs.map((slug) => ({
      loc: `${origin}${withBase(`/chu-de/${slug}/`)}`,
      lastmod: todayStr,
    })),
    ...posts.map((p) => ({
      loc: `${origin}${withBase(`/bai-viet/${getPostSlug(p)}/`)}`,
      lastmod: getPostDate(p),
    })),
    ...projects.map((p) => ({
      loc: `${origin}${withBase(`/du-an/${getPostSlug(p)}/`)}`,
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
