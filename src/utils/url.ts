export function withBase(path = '/'): string {
  if (!path) return import.meta.env.BASE_URL || '/';
  if (/^(https?:|mailto:|tel:|data:|#)/i.test(path)) return path;
  const rawBase = import.meta.env.BASE_URL || '/';
  const cleanBase = rawBase === '/' ? '' : rawBase.replace(/\/+$/, '');
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  return `${cleanBase}${cleanPath}` || '/';
}

export function slugifyVi(raw = ''): string {
  const s = String(raw || '')
    .replace(/[đĐ]/g, 'd')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
  return s || 'muc';
}

export function getPostSlug(entry: { id: string; data?: Record<string, any> }): string {
  const raw = entry.data?.slug || entry.id || 'bai-viet';
  return String(raw).replace(/\.mdx?$/i, '').split('/').pop() || 'bai-viet';
}

export function getPostTitle(entry: { id: string; data?: Record<string, any> }): string {
  return String(
    entry.data?.tieu_de ||
      entry.data?.title ||
      entry.id ||
      'Chưa đặt tiêu đề'
  );
}

export function getPostCategory(entry: { data?: Record<string, any> }): string {
  const raw = entry.data?.danh_muc;
  if (Array.isArray(raw) && raw.length > 0) return String(raw[0]).trim() || 'Bài viết';
  if (typeof raw === 'string' && raw.trim()) return raw.trim();
  const cat = entry.data?.category;
  if (typeof cat === 'string' && cat.trim()) return cat.trim();
  return 'Bài viết';
}

export function getPostCategorySlug(entry: { data?: Record<string, any> }): string {
  const explicit = typeof entry.data?.chuyen_muc === 'string' ? entry.data.chuyen_muc.trim() : '';
  return slugifyVi(explicit || getPostCategory(entry));
}

export function getPostTags(entry: { data?: Record<string, any> }): string[] {
  const raw = entry.data?.tags;
  if (!Array.isArray(raw)) return [];
  return raw.map((t) => String(t).trim()).filter(Boolean);
}

export function getPostDate(entry: { data?: Record<string, any> }): string {
  const raw = entry.data?.ngay || entry.data?.date || entry.data?.pubDate || '';
  const match = String(raw).match(/^(\d{4}-\d{2}-\d{2})/);
  return match ? match[1] : new Date().toISOString().slice(0, 10);
}

export function getPostExcerpt(entry: { body?: string; data?: Record<string, any> }): string {
  const raw =
    entry.data?.mo_ta ||
    entry.data?.excerpt ||
    entry.data?.description ||
    '';
  if (raw) return String(raw);
  const plain = String(entry.body || '')
    .replace(/```[\s\S]*?```/g, '')
    .replace(/[#>*`!\[\]\(\)]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
  return plain.slice(0, 160) + (plain.length > 160 ? '...' : '');
}

export function getPostCover(entry: { data?: Record<string, any> }): string | undefined {
  const raw =
    entry.data?.anh_bia ||
    entry.data?.cover ||
    entry.data?.heroImage ||
    entry.data?.image;
  if (!raw) return undefined;
  return withBase(String(raw).trim());
}

export function formatVietnameseDate(dateStr?: string): string {
  if (!dateStr) return '';
  const m = String(dateStr).match(/^(\d{4})-(\d{2})-(\d{2})/);
  if (!m) return String(dateStr);
  return `${m[3]}/${m[2]}/${m[1]}`;
}

export function estimateReadingTime(body = ''): number {
  const words = String(body).trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 220));
}
