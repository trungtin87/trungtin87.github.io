import { defineConfig } from 'astro/config';

const repoOwner = process.env.GITHUB_REPOSITORY_OWNER || 'trungtin87';
const repoFull = process.env.GITHUB_REPOSITORY || 'trungtin87/trungtin87.github.io';
const repoName = repoFull.split('/')[1] || 'trungtin87.github.io';
const customDomain = '';
const isUserSite =
  Boolean(customDomain) ||
  (Boolean(repoName && repoOwner) &&
    repoName.toLowerCase() === `${repoOwner.toLowerCase()}.github.io`);

const site =
  process.env.SITE_URL ||
  (customDomain
    ? `https://${customDomain}`
    : repoOwner
    ? `https://${repoOwner}.github.io`
    : 'https://trungtin87.github.io');
const base =
  process.env.BASE_PATH ||
  (customDomain || isUserSite || !repoName ? '/' : `/${repoName}`);

const CALLOUT_LABELS = {
  note: 'Ghi chú',
  tip: 'Mẹo hay',
  important: 'Quan trọng',
  warning: 'Cảnh báo',
  caution: 'Lưu ý',
  info: 'Thông tin',
};

function escapeHtmlBasic(str) {
  return String(str || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function extractVideoEmbed(rawUrl) {
  const str = String(rawUrl || '').trim();
  const ytMatch = str.match(
    /(?:youtube\.com\/(?:watch\?v=|shorts\/|embed\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/i
  );
  if (ytMatch && ytMatch[1]) {
    return (
      '<div class="dk-video-embed"><iframe src="https://www.youtube.com/embed/' +
      ytMatch[1] +
      '" title="YouTube video" loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></div>'
    );
  }
  const vmMatch = str.match(/vimeo\.com\/(?:video\/)?(\d{5,12})/i);
  if (vmMatch && vmMatch[1]) {
    return (
      '<div class="dk-video-embed"><iframe src="https://player.vimeo.com/video/' +
      vmMatch[1] +
      '" title="Vimeo video" loading="lazy" allowfullscreen></iframe></div>'
    );
  }
  return null;
}

function remarkDaoKyEnhancements() {
  const cleanBase = base === '/' ? '' : base.replace(/\/+$/, '');
  const rewriteSrc = (val) => {
    if (typeof val !== 'string' || !cleanBase) return val;
    if (
      (val.startsWith('/tainguyen/') || val.startsWith('/images/')) &&
      !val.startsWith(cleanBase + '/')
    ) {
      return cleanBase + val;
    }
    return val;
  };
  const walk = (node) => {
    if (!node || typeof node !== 'object') return;
    if (node.type === 'image') {
      if (typeof node.url === 'string') {
        node.url = rewriteSrc(node.url);
      }
      node.data = node.data || {};
      node.data.hProperties = {
        ...(node.data.hProperties || {}),
        loading: 'lazy',
        decoding: 'async',
      };
    }
    if (node.type === 'code' && String(node.lang || '').toLowerCase() === 'mermaid') {
      node.type = 'html';
      node.value = '<div class="dk-mermaid-box"><pre class="mermaid">' + escapeHtmlBasic(node.value) + '</pre></div>';
      delete node.lang;
      return;
    }
    if (node.type === 'blockquote' && Array.isArray(node.children) && node.children.length > 0) {
      const firstPara = node.children[0];
      if (firstPara && firstPara.type === 'paragraph' && Array.isArray(firstPara.children) && firstPara.children.length > 0) {
        const firstText = firstPara.children[0];
        if (firstText && firstText.type === 'text' && typeof firstText.value === 'string') {
          const m = firstText.value.match(/^\[!(NOTE|TIP|IMPORTANT|WARNING|CAUTION|INFO)\]([^\n]*)(\n[\s\S]*)?$/i);
          if (m) {
            const cType = m[1].toLowerCase();
            const customTitle = (m[2] || '').trim() || CALLOUT_LABELS[cType] || cType.toUpperCase();
            const rest = (m[3] || '').replace(/^\n+/, '');
            node.data = node.data || {};
            node.data.hProperties = {
              ...(node.data.hProperties || {}),
              class: 'dk-callout dk-callout-' + cType,
              'data-callout': cType,
            };
            firstText.value = rest;
            firstPara.children.unshift({
              type: 'html',
              value: '<span class="dk-callout-title">' + escapeHtmlBasic(customTitle) + '</span>',
            });
          }
        }
      }
    }
    if (node.type === 'paragraph' && Array.isArray(node.children) && node.children.length === 1) {
      const only = node.children[0];
      let candidate = '';
      if (only.type === 'text' && typeof only.value === 'string') {
        const macro = only.value.trim().match(/^@\[(youtube|vimeo)\]\(([^)]+)\)$/i);
        if (macro) {
          const kind = macro[1].toLowerCase();
          const arg = macro[2].trim();
          candidate =
            kind === 'youtube' && !arg.includes('http')
              ? 'https://www.youtube.com/watch?v=' + arg
              : kind === 'vimeo' && !arg.includes('http')
              ? 'https://vimeo.com/' + arg
              : arg;
        } else if (/^https?:\/\/(?:www\.)?(?:youtube\.com|youtu\.be|vimeo\.com)\/\S+$/i.test(only.value.trim())) {
          candidate = only.value.trim();
        }
      } else if (only.type === 'link' && typeof only.url === 'string' && /^https?:\/\/(?:www\.)?(?:youtube\.com|youtu\.be|vimeo\.com)\/\S+$/i.test(only.url)) {
        candidate = only.url;
      }
      if (candidate) {
        const embedHtml = extractVideoEmbed(candidate);
        if (embedHtml) {
          node.type = 'html';
          node.value = embedHtml;
          delete node.children;
          return;
        }
      }
    }
    if (node.type === 'html' && typeof node.value === 'string' && cleanBase) {
      node.value = node.value.replace(
        /(src=["'])(\/(?:tainguyen|images)\/[^"']+)(["'])/gi,
        (_m, p, rel, s) => p + rewriteSrc(rel) + s
      );
    }
    if (Array.isArray(node.children)) {
      for (const child of node.children) walk(child);
    }
  };
  return (tree) => walk(tree);
}

export default defineConfig({
  site,
  base,
  output: 'static',
  markdown: {
    remarkPlugins: [remarkDaoKyEnhancements],
  },
});
