#!/usr/bin/env python3
"""
generate.py — lắp ráp các trang tĩnh từ phần đầu trang / chân trang dùng chung.
Đây là công cụ hỗ trợ khi PHÁT TRIỂN, không phải một backend: kết quả xuất ra
là các tệp .html thuần túy, độc lập, có thể triển khai trực tiếp mà không cần
chạy lại tập lệnh này.
"""
import os
import json

ROOT = os.path.dirname(os.path.abspath(__file__))

LOGO_IMG = '<img class="brand-icon" src="/assets/images/logo.png" alt="" width="40" height="40">'

BRAND_NAME = "Huyền Không Thư Quán"
SITE_TITLE = "Huyền Không Thư Quán - Bùi Gia Trang"
SITE_URL = "https://trungtin87.github.io"

MENU = [
    ("Trang chủ", "/"),
    ("Blog", "/blog/"),
    ("Dự án", "/projects/"),
    ("Thư viện", "/library/"),
    ("Giới thiệu", "/about/"),
    ("Liên hệ", "/contact/"),
]


def theme_init_script():
    return '''<script>
      (function () {
        var t = localStorage.getItem("hktq-theme");
        if (t) document.documentElement.setAttribute("data-theme", t);
      })();
    </script>'''


def head(title, description, canonical, og_image, extra=""):
    return f'''<!DOCTYPE html>
<html lang="vi">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>{title}</title>
<meta name="description" content="{description}">
<meta name="keywords" content="Huyền Không Thư Quán, Bùi Gia Trang, Đạo giáo, Vô vi, Âm Dương, Tự nhiên, blog kỹ thuật, thư phòng số, Bùi Trung Tín">
<meta name="author" content="Bùi Trung Tín">
<link rel="canonical" href="{canonical}">
<link rel="icon" type="image/svg+xml" href="/favicon.svg">
<link rel="icon" type="image/png" sizes="32x32" href="/assets/icons/favicon-32.png">
<link rel="apple-touch-icon" href="/assets/icons/apple-touch-icon.png">
<link rel="manifest" href="/manifest.webmanifest">
<meta name="theme-color" content="#111111">

<meta property="og:type" content="website">
<meta property="og:site_name" content="{BRAND_NAME}">
<meta property="og:title" content="{title}">
<meta property="og:description" content="{description}">
<meta property="og:url" content="{canonical}">
<meta property="og:image" content="{og_image}">
<meta property="og:locale" content="vi_VN">

<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="{title}">
<meta name="twitter:description" content="{description}">
<meta name="twitter:image" content="{og_image}">

<link rel="alternate" type="application/rss+xml" title="{BRAND_NAME} — RSS" href="/rss.xml">
<link rel="stylesheet" href="/assets/css/style.css">
{theme_init_script()}
{extra}
</head>'''


def header(active):
    links = []
    for label, href in MENU:
        cur = ' aria-current="page"' if href == active else ""
        links.append(f'<li><a href="{href}"{cur}>{label}</a></li>')
    nav_list = "\n        ".join(links)
    return f'''<a class="skip-link" href="#main">Bỏ qua đến nội dung</a>
<header class="site-header">
  <div class="container">
    <a class="brand" href="/">
      {LOGO_IMG}
      <span class="brand-name">{BRAND_NAME}</span>
    </a>
    <nav class="nav" data-nav aria-label="Menu chính">
      <ul class="nav-list">
        {nav_list}
      </ul>
    </nav>
    <div class="header-actions">
      <button class="icon-btn" data-search-open type="button" aria-haspopup="dialog" aria-label="Tìm kiếm bài viết">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="11" cy="11" r="7"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
      </button>
      <button class="icon-btn" data-theme-toggle type="button" aria-label="Chuyển giao diện sáng/tối">
        <svg class="icon-sun" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"/></svg>
        <svg class="icon-moon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M20 14.5A8.5 8.5 0 1 1 9.5 4a7 7 0 0 0 10.5 10.5z"/></svg>
      </button>
      <button class="icon-btn menu-toggle" data-menu-toggle type="button" aria-label="Mở menu" aria-expanded="false">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
      </button>
    </div>
  </div>
</header>

<div class="search-panel" data-search-panel role="dialog" aria-modal="true" aria-label="Tìm kiếm">
  <div class="search-box">
    <button class="btn" data-search-close type="button" style="float:right">Đóng ✕</button>
    <label class="sr-only" for="search-input">Tìm kiếm bài viết</label>
    <input id="search-input" data-search-input type="text" placeholder="Tìm bài viết…" autocomplete="off">
    <ul class="search-results" data-search-results></ul>
  </div>
</div>'''


def footer():
    return f'''<footer class="site-footer">
  <div class="container footer-grid">
    <div class="footer-mark">
      {LOGO_IMG}
      <span>Bùi Trung Tín · © 2026 {BRAND_NAME}</span>
    </div>
    <p class="footer-tagline">"Đạo pháp tự nhiên."</p>
    <ul class="footer-links">
      <li><a href="/rss.xml">RSS</a></li>
      <li><a href="/sitemap.xml">Sitemap</a></li>
      <li><a href="/contact/">Liên hệ</a></li>
    </ul>
  </div>
</footer>'''


def page(title, description, canonical, og_image, active, body, extra_head=""):
    return (
        head(title, description, canonical, og_image, extra_head)
        + "\n<body>\n<div class=\"site\">\n"
        + header(active)
        + "\n<main id=\"main\">\n"
        + body
        + "\n</main>\n"
        + footer()
        + '\n</div>\n<button class="back-to-top" data-back-to-top type="button" aria-label="Về đầu trang">\n'
        + '  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="12" y1="19" x2="12" y2="5"/><polyline points="5 12 12 5 19 12"/></svg>\n'
        + "</button>\n"
        + '<script type="module" src="/assets/js/main.js"></script>\n'
        + "</body>\n</html>"
    )


def write(path, content):
    full = os.path.join(ROOT, path)
    os.makedirs(os.path.dirname(full), exist_ok=True)
    with open(full, "w", encoding="utf-8") as f:
        f.write(content)
    print("Đã ghi:", path)



# ==========================================================================
# ĐỘNG CƠ MARKDOWN — nhẹ, thuần Python, không phụ thuộc thư viện ngoài.
# Hỗ trợ: front matter (key: value), đoạn văn, ## / ###, > trích dẫn,
# ![alt](src) ảnh, **đậm**, *nghiêng*, [chữ](link).
# ==========================================================================
import html as _html
import re as _re
from datetime import datetime as _dt

POSTS_DIR = os.path.join(ROOT, "content", "posts")


def parse_front_matter(raw_text):
    m = _re.match(r"^---\s*\n(.*?)\n---\s*\n(.*)$", raw_text, _re.S)
    if not m:
        raise ValueError("Thiếu front matter (--- ... ---) ở đầu tệp Markdown.")
    fm_text, body = m.group(1), m.group(2)
    fm = {}
    for line in fm_text.split("\n"):
        if not line.strip() or ":" not in line:
            continue
        key, _, val = line.partition(":")
        key = key.strip()
        val = val.strip().strip('"').strip("'")
        if val.lower() == "true":
            val = True
        elif val.lower() == "false":
            val = False
        fm[key] = val
    return fm, body.strip()


def _inline_md(text):
    text = _html.escape(text, quote=False)
    text = _re.sub(r"\*\*(.+?)\*\*", r"<strong>\1</strong>", text)
    text = _re.sub(r"(?<!\*)\*([^*]+)\*(?!\*)", r"<em>\1</em>", text)
    text = _re.sub(r"\[(.+?)\]\((.+?)\)", r'<a href="\2">\1</a>', text)
    return text


def markdown_to_html(md_text):
    blocks = _re.split(r"\n\s*\n", md_text.strip())
    out = []
    for block in blocks:
        block = block.strip()
        if not block:
            continue
        if block.startswith("### "):
            out.append(f"<h3>{_inline_md(block[4:].strip())}</h3>")
        elif block.startswith("## "):
            out.append(f"<h2>{_inline_md(block[3:].strip())}</h2>")
        elif block.startswith("> "):
            lines = [l[2:] if l.startswith("> ") else l for l in block.split("\n")]
            out.append(f"<blockquote>{_inline_md(' '.join(lines))}</blockquote>")
        elif block.startswith("!["):
            m = _re.match(r"!\[(.*?)\]\((.*?)\)", block)
            if m:
                alt, src = m.group(1), m.group(2)
                out.append(
                    f'<figure class="post-cover"><img src="{src}" alt="{_html.escape(alt)}" loading="lazy"></figure>'
                )
        else:
            text = " ".join(l.strip() for l in block.split("\n"))
            out.append(f"<p>{_inline_md(text)}</p>")
    return "\n".join(out)


def load_posts():
    """Đọc toàn bộ content/posts/*.md, trả về danh sách bài viết đã sắp xếp
    theo ngày đăng giảm dần. Đây là NGUỒN DUY NHẤT của dữ liệu bài viết —
    mọi nơi khác (blog, trang chủ, tìm kiếm, sitemap, rss) đều suy ra từ đây."""
    posts = []
    if not os.path.isdir(POSTS_DIR):
        return posts
    for fname in sorted(os.listdir(POSTS_DIR)):
        if not fname.endswith(".md"):
            continue
        slug = fname[:-3]
        raw = open(os.path.join(POSTS_DIR, fname), encoding="utf-8").read()
        fm, body_md = parse_front_matter(raw)
        required = ["title", "description", "category", "date"]
        missing = [k for k in required if k not in fm]
        if missing:
            raise ValueError(f"Bài viết '{fname}' thiếu trường bắt buộc: {missing}")
        date_obj = _dt.strptime(fm["date"], "%Y-%m-%d")
        body_html = markdown_to_html(body_md)
        word_count = len(_re.findall(r"\w+", body_md))
        reading_minutes = max(1, round(word_count / 200))
        posts.append({
            "slug": slug,
            "title": fm["title"],
            "description": fm["description"],
            "category": fm["category"],
            "date": fm["date"],
            "date_obj": date_obj,
            "date_display": date_obj.strftime("%d/%m/%Y"),
            "cover": fm.get("cover", "/assets/images/ink-circle.svg"),
            "cover_alt": fm.get("cover_alt", ""),
            "featured": bool(fm.get("featured", False)),
            "body_html": body_html,
            "reading_minutes": reading_minutes,
            "url": f"/blog/posts/{slug}.html",
        })
    posts.sort(key=lambda p: p["date_obj"], reverse=True)
    return posts


def post_card_html(p):
    return f'''<a class="post-card" href="{p['url']}">
  <div class="post-thumb"><img src="{p['cover']}" alt="" width="400" height="300" loading="lazy"></div>
  <div class="post-meta"><span class="post-cat">{p['category']}</span><span>{p['date_display']}</span></div>
  <h3>{p['title']}</h3>
  <p class="post-desc">{p['description']}</p>
</a>'''


def post_row_html(p):
    return f'''<a class="post-list-row" href="{p['url']}">
  <div class="post-thumb"><img src="{p['cover']}" alt="" width="400" height="300" loading="lazy"></div>
  <div>
    <div class="post-meta"><span class="post-cat">{p['category']}</span><span>{p['date_display']}</span><span>· {p['reading_minutes']} phút đọc</span></div>
    <h3>{p['title']}</h3>
    <p class="post-desc">{p['description']}</p>
  </div>
</a>'''


def related_posts(all_posts, current):
    same_cat = [p for p in all_posts if p["slug"] != current["slug"] and p["category"] == current["category"]]
    others = [p for p in all_posts if p["slug"] != current["slug"] and p not in same_cat]
    return (same_cat + others)[:2]


def build_post_page(p, all_posts):
    related = related_posts(all_posts, p)
    related_html = "\n".join(post_card_html(r) for r in related) or (
        '<p class="post-desc">Chưa có bài viết liên quan.</p>'
    )
    body = f'''
<header class="post-header">
  <div class="container prose">
    <div class="post-meta">
      <span class="post-cat">{p['category']}</span>
      <span>{p['date_display']}</span>
      <span>· {p['reading_minutes']} phút đọc</span>
    </div>
    <h1>{p['title']}</h1>
    <div class="post-toolbar">
      <button class="btn" data-copy-link type="button">
        <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M10 13a5 5 0 0 0 7 0l3-3a5 5 0 0 0-7-7l-1 1"/><path d="M14 11a5 5 0 0 0-7 0l-3 3a5 5 0 0 0 7 7l1-1"/></svg>
        <span data-copy-label>Sao chép liên kết</span>
      </button>
    </div>
  </div>
</header>

<div class="container post-body-layout">
  <article class="prose" data-post-body>
    <figure class="post-cover">
      <img src="{p['cover']}" alt="{p['cover_alt']}" width="800" height="450" loading="lazy">
    </figure>
    {p['body_html']}
  </article>

  <aside class="toc" data-toc aria-label="Mục lục bài viết">
    <h2>Mục lục</h2>
    <div data-toc-list></div>
  </aside>
</div>

<section class="section related">
  <div class="container">
    <div class="section-head"><h2>Bài liên quan</h2></div>
    <div class="post-grid">
      {related_html}
    </div>
  </div>
</section>
'''
    write(f"blog/posts/{p['slug']}.html", page(
        title=f"{p['title']} | {BRAND_NAME}",
        description=p["description"],
        canonical=f"{SITE_URL}{p['url']}",
        og_image=f"{SITE_URL}{p['cover']}",
        active="/blog/",
        body=body,
        extra_head=f'''<script type="application/ld+json">
{{
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  "headline": {json.dumps(p['title'], ensure_ascii=False)},
  "datePublished": "{p['date']}",
  "author": {{ "@type": "Person", "name": "Bùi Trung Tín" }},
  "publisher": {{ "@type": "Person", "name": "Bùi Trung Tín" }},
  "mainEntityOfPage": "{SITE_URL}{p['url']}",
  "image": "{SITE_URL}{p['cover']}",
  "description": {json.dumps(p['description'], ensure_ascii=False)}
}}
</script>'''
    ))


def build_blog_index(posts):
    rows = "\n".join(post_row_html(p) for p in posts) or '<p class="post-desc">Chưa có bài viết nào.</p>'
    body = f'''
<section class="hero">
  <div class="container">
    <p class="hero-eyebrow">Blog</p>
    <h1>Ghi chép</h1>
    <p class="hero-lede">Kỹ thuật, triết học và những quan sát đời thường — viết chậm, viết thật, và cố gắng ngắn gọn hết mức có thể.</p>
  </div>
</section>
<section class="section">
  <div class="container">
    {rows}
  </div>
</section>
'''
    write("blog/index.html", page(
        title=f"Blog — {BRAND_NAME}",
        description="Danh sách bài viết về kỹ thuật, triết học và đời sống, viết theo tinh thần Đạo giáo hiện đại.",
        canonical=f"{SITE_URL}/blog/",
        og_image=f"{SITE_URL}/assets/images/og-default.png",
        active="/blog/",
        body=body,
    ))


def build_homepage(posts):
    newest = posts[:3]
    featured = [p for p in posts if p["featured"]][:1] or posts[:1]
    categories = sorted({p["category"] for p in posts})
    new_cards = "\n".join(post_card_html(p) for p in newest) or '<p class="post-desc">Chưa có bài viết nào.</p>'
    featured_rows = "\n".join(post_row_html(p) for p in featured)
    tag_links = "\n      ".join(f'<a href="/blog/">{c}</a>' for c in categories)

    body = f'''
<section class="hero">
  <div class="container hero-grid">
    <img class="hero-mark" src="/assets/images/logo-512.png" alt="Biểu tượng Lưỡng Nghi (Thái Cực) của Huyền Không Thư Quán" width="96" height="96">
    <div>
      <p class="hero-eyebrow">Thư phòng số của Bùi Trung Tín</p>
      <h1>{BRAND_NAME}</h1>
      <p class="hero-subtitle">Bùi Gia Trang</p>
      <p class="hero-lede">Một nơi lưu giữ tri thức, kinh nghiệm và các dự án cá nhân — viết theo tinh thần Đạo giáo hiện đại: đơn giản, tự nhiên, không dư thừa. Kỹ thuật được nhìn qua lăng kính của Âm — Dương và Vô vi.</p>
    </div>
  </div>
</section>

<section class="section">
  <div class="container">
    <div class="section-head">
      <h2>Bài viết mới</h2>
      <a class="see-all" href="/blog/">Xem tất cả bài viết →</a>
    </div>
    <div class="post-grid">
      {new_cards}
    </div>
  </div>
</section>

<section class="section">
  <div class="container">
    <div class="section-head"><h2>Bài viết nổi bật</h2></div>
    {featured_rows}
  </div>
</section>

<section class="section">
  <div class="container">
    <div class="section-head"><h2>Danh mục</h2></div>
    <div class="tag-cloud">
      {tag_links}
    </div>
  </div>
</section>

<section class="section">
  <div class="container">
    <div class="section-head">
      <h2>Dự án mới</h2>
      <a class="see-all" href="/projects/">Xem tất cả dự án →</a>
    </div>
    <div class="project-grid">
      <div class="project-card">
        <div class="project-thumb"><img src="/assets/images/ink-code.svg" alt="" loading="lazy"></div>
        <div class="project-body">
          <h3>Tĩnh Am</h3>
          <p class="post-desc">Bộ công cụ dòng lệnh sinh trang tĩnh tối giản, không phụ thuộc framework.</p>
          <ul class="stack-list"><li>JavaScript</li><li>Node.js</li><li>ES Modules</li></ul>
          <div class="project-links"><a class="btn" href="/projects/">Chi tiết</a></div>
        </div>
      </div>
      <div class="project-card">
        <div class="project-thumb"><img src="/assets/images/ink-gate.svg" alt="" loading="lazy"></div>
        <div class="project-body">
          <h3>Vô Vi CLI</h3>
          <p class="post-desc">Trình quản lý tác vụ dòng lệnh theo nguyên tắc "làm ít, đúng việc".</p>
          <ul class="stack-list"><li>Rust</li><li>CLI</li></ul>
          <div class="project-links"><a class="btn" href="/projects/">Chi tiết</a></div>
        </div>
      </div>
    </div>
  </div>
</section>
'''
    write("index.html", page(
        title=SITE_TITLE,
        description="Blog cá nhân theo tinh thần Đạo giáo hiện đại: đơn giản, tự nhiên, không dư thừa. Ghi chép kỹ thuật, triết học và các dự án của Bùi Trung Tín.",
        canonical=f"{SITE_URL}/",
        og_image=f"{SITE_URL}/assets/images/og-default.png",
        active="/",
        body=body,
        extra_head=f'''<script type="application/ld+json">
{{
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "{BRAND_NAME}",
  "alternateName": "Bùi Gia Trang",
  "url": "{SITE_URL}/",
  "author": {{ "@type": "Person", "name": "Bùi Trung Tín" }},
  "description": "Thư phòng số theo tinh thần Đạo giáo hiện đại — Âm Dương, Vô vi, Tự nhiên.",
  "potentialAction": {{
    "@type": "SearchAction",
    "target": "{SITE_URL}/blog/?q={{search_term_string}}",
    "query-input": "required name=search_term_string"
  }}
}}
</script>'''
    ))


def build_search_index(posts):
    entries = ",\n  ".join(
        "{\n"
        f'    title: {json.dumps(p["title"], ensure_ascii=False)},\n'
        f'    url: {json.dumps(p["url"], ensure_ascii=False)},\n'
        f'    category: {json.dumps(p["category"], ensure_ascii=False)},\n'
        f'    desc: {json.dumps(p["description"], ensure_ascii=False)},\n'
        "  }"
        for p in posts
    )
    content = f'''// Chỉ mục tìm kiếm — được SINH TỰ ĐỘNG bởi generate.py từ content/posts/*.md
// Không chỉnh sửa tay tệp này; sửa front matter của bài viết rồi chạy lại generate.py.
export const searchIndex = [
  {entries}
];
'''
    write("assets/js/search-data.js", content)


def build_sitemap(posts):
    static_urls = [
        (f"{SITE_URL}/", "weekly", "1.0"),
        (f"{SITE_URL}/blog/", "weekly", "0.9"),
        (f"{SITE_URL}/projects/", "monthly", "0.7"),
        (f"{SITE_URL}/library/", "monthly", "0.6"),
        (f"{SITE_URL}/about/", "yearly", "0.5"),
        (f"{SITE_URL}/contact/", "yearly", "0.4"),
    ]
    lines = ['<?xml version="1.0" encoding="UTF-8"?>', '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">']
    for loc, freq, prio in static_urls:
        lines.append(f"  <url><loc>{loc}</loc><changefreq>{freq}</changefreq><priority>{prio}</priority></url>")
    for p in posts:
        lines.append(
            f"  <url><loc>{SITE_URL}{p['url']}</loc><lastmod>{p['date']}</lastmod><priority>0.8</priority></url>"
        )
    lines.append("</urlset>")
    write("sitemap.xml", "\n".join(lines) + "\n")


def build_rss(posts):
    items = []
    for p in posts:
        pub = p["date_obj"].strftime("%a, %d %b %Y 00:00:00 +0700")
        items.append(f'''  <item>
    <title>{_html.escape(p['title'])}</title>
    <link>{SITE_URL}{p['url']}</link>
    <guid>{SITE_URL}{p['url']}</guid>
    <pubDate>{pub}</pubDate>
    <description>{_html.escape(p['description'])}</description>
  </item>''')
    content = f'''<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
<channel>
  <title>{BRAND_NAME}</title>
  <link>{SITE_URL}/</link>
  <description>Thư phòng số của Bùi Trung Tín — Đạo pháp tự nhiên.</description>
  <language>vi</language>
{chr(10).join(items)}
</channel>
</rss>
'''
    write("rss.xml", content)


# ==========================================================================
# CÁC TRANG TĨNH KHÁC — chưa chuyển sang Markdown, sửa trực tiếp tại đây.
# ==========================================================================
def build_projects():
    github_icon = '<svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor"><path d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.7c-2.78.6-3.37-1.34-3.37-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.89 1.53 2.34 1.09 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.56-1.11-4.56-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.02a9.5 9.5 0 0 1 5 0c1.91-1.3 2.75-1.02 2.75-1.02.55 1.38.2 2.4.1 2.65.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.68-4.57 4.93.36.31.68.92.68 1.85v2.74c0 .27.18.58.69.48A10 10 0 0 0 12 2z"/></svg>'
    body = f'''
<section class="hero">
  <div class="container">
    <p class="hero-eyebrow">Dự án</p>
    <h1>Dự án</h1>
    <p class="hero-lede">Những công cụ nhỏ, làm đúng một việc, và làm việc đó tốt.</p>
  </div>
</section>
<section class="section">
  <div class="container project-grid">

    <div class="project-card">
      <div class="project-thumb"><img src="/assets/images/ink-code.svg" alt="" loading="lazy"></div>
      <div class="project-body">
        <h3>Tĩnh Am</h3>
        <p class="post-desc">Bộ công cụ dòng lệnh sinh trang tĩnh tối giản. Không cấu hình rườm rà, không phụ thuộc framework — chỉ Markdown vào, HTML sạch ra.</p>
        <ul class="stack-list"><li>JavaScript</li><li>Node.js</li><li>ES Modules</li></ul>
        <div class="project-links">
          <a class="btn" href="https://github.com/" target="_blank" rel="noopener">{github_icon} GitHub</a>
          <a class="btn" href="#" target="_blank" rel="noopener">Xem demo</a>
        </div>
      </div>
    </div>

    <div class="project-card">
      <div class="project-thumb"><img src="/assets/images/ink-gate.svg" alt="" loading="lazy"></div>
      <div class="project-body">
        <h3>Vô Vi CLI</h3>
        <p class="post-desc">Trình quản lý tác vụ dòng lệnh theo nguyên tắc "làm ít, đúng việc". Không đồng bộ hóa đám mây, không tài khoản, chỉ một tệp văn bản.</p>
        <ul class="stack-list"><li>Rust</li><li>CLI</li></ul>
        <div class="project-links">
          <a class="btn" href="https://github.com/" target="_blank" rel="noopener">{github_icon} GitHub</a>
        </div>
      </div>
    </div>

    <div class="project-card">
      <div class="project-thumb"><img src="/assets/images/ink-bamboo.svg" alt="" loading="lazy"></div>
      <div class="project-body">
        <h3>Trúc Chỉ</h3>
        <p class="post-desc">Thư viện định dạng văn bản tiếng Việt cho công cụ dòng lệnh — căn dấu, ngắt dòng, đếm âm tiết chính xác theo chữ Quốc ngữ.</p>
        <ul class="stack-list"><li>TypeScript</li><li>NPM package</li></ul>
        <div class="project-links">
          <a class="btn" href="https://github.com/" target="_blank" rel="noopener">{github_icon} GitHub</a>
        </div>
      </div>
    </div>

    <div class="project-card">
      <div class="project-thumb"><img src="/assets/images/ink-wave.svg" alt="" loading="lazy"></div>
      <div class="project-body">
        <h3>Lưu Thủy</h3>
        <p class="post-desc">Hàng đợi tác vụ nhẹ, chạy trong tiến trình, thay thế cho các hệ thống hàng đợi nặng nề khi quy mô dự án chưa cần đến chúng.</p>
        <ul class="stack-list"><li>Go</li><li>Library</li></ul>
        <div class="project-links">
          <a class="btn" href="https://github.com/" target="_blank" rel="noopener">{github_icon} GitHub</a>
        </div>
      </div>
    </div>

  </div>
</section>
'''
    write("projects/index.html", page(
        title=f"Dự án — {BRAND_NAME}",
        description="Danh sách các dự án cá nhân của Bùi Trung Tín: công cụ dòng lệnh, thư viện, phần mềm mã nguồn mở.",
        canonical=f"{SITE_URL}/projects/",
        og_image=f"{SITE_URL}/assets/images/og-default.png",
        active="/projects/",
        body=body,
    ))


def build_library():
    body = '''
<section class="hero">
  <div class="container">
    <p class="hero-eyebrow">Thư viện</p>
    <h1>Thư viện</h1>
    <p class="hero-lede">Nơi lưu trữ tài liệu, sách, mã nguồn và ghi chú — những thứ đáng giữ lại lâu dài.</p>
  </div>
</section>
<section class="section">
  <div class="container">
    <div class="library-tabs" role="tablist" aria-label="Lọc theo loại tài liệu">
      <button data-lib-tab="all" aria-pressed="true" type="button">Tất cả</button>
      <button data-lib-tab="doc" aria-pressed="false" type="button">Tài liệu</button>
      <button data-lib-tab="pdf" aria-pressed="false" type="button">PDF</button>
      <button data-lib-tab="book" aria-pressed="false" type="button">Sách</button>
      <button data-lib-tab="code" aria-pressed="false" type="button">Mã nguồn</button>
      <button data-lib-tab="note" aria-pressed="false" type="button">Ghi chú</button>
    </div>

    <div class="library-grid">
      <div class="library-item" data-lib-item="doc">
        <span class="kind">Tài liệu</span>
        <h3>Sổ tay quy ước viết mã cá nhân</h3>
        <p>Tập hợp các quy ước đặt tên, cấu trúc thư mục và nguyên tắc review mà tôi tự áp dụng cho các dự án riêng.</p>
        <a class="lib-link" href="#">Xem tài liệu →</a>
      </div>
      <div class="library-item" data-lib-item="pdf">
        <span class="kind">PDF</span>
        <h3>Ghi chú đọc "Đạo Đức Kinh"</h3>
        <p>Bản tóm lược 81 chương kèm chú giải cá nhân, đối chiếu với các ứng dụng trong công việc kỹ thuật.</p>
        <a class="lib-link" href="#">Tải PDF →</a>
      </div>
      <div class="library-item" data-lib-item="book">
        <span class="kind">Sách</span>
        <h3>Trang Tử — Nam Hoa Kinh (bản dịch tham khảo)</h3>
        <p>Danh sách các bản dịch tiếng Việt tôi khuyên đọc, kèm nhận xét ngắn về từng bản.</p>
        <a class="lib-link" href="#">Xem chi tiết →</a>
      </div>
      <div class="library-item" data-lib-item="code">
        <span class="kind">Mã nguồn</span>
        <h3>Bộ khung trang tĩnh tối giản</h3>
        <p>Mã nguồn khung sườn dùng để dựng nhanh các trang tĩnh cá nhân — HTML/CSS/JS thuần, không phụ thuộc.</p>
        <a class="lib-link" href="#">Xem trên GitHub →</a>
      </div>
      <div class="library-item" data-lib-item="note">
        <span class="kind">Ghi chú</span>
        <h3>Ghi chú vận hành hệ thống nhỏ gọn</h3>
        <p>Những điều rút ra khi tự vận hành hạ tầng cho các dự án cá nhân, không cần đội DevOps.</p>
        <a class="lib-link" href="#">Đọc ghi chú →</a>
      </div>
      <div class="library-item" data-lib-item="doc">
        <span class="kind">Tài liệu</span>
        <h3>Bản đồ tri thức cá nhân 2026</h3>
        <p>Sơ đồ các chủ đề tôi đang theo đuổi trong năm nay, từ hệ thống phân tán đến triết học phương Đông.</p>
        <a class="lib-link" href="#">Xem sơ đồ →</a>
      </div>
    </div>
  </div>
</section>
'''
    write("library/index.html", page(
        title=f"Thư viện — {BRAND_NAME}",
        description="Kho lưu trữ tài liệu, PDF, sách, mã nguồn và ghi chú của Bùi Trung Tín.",
        canonical=f"{SITE_URL}/library/",
        og_image=f"{SITE_URL}/assets/images/og-default.png",
        active="/library/",
        body=body,
    ))


def build_about():
    body = f'''
<section class="hero">
  <div class="container">
    <p class="hero-eyebrow">Giới thiệu</p>
    <h1>Về {BRAND_NAME}</h1>
    <p class="hero-lede">Đây là thư phòng số của Bùi Trung Tín — một không gian riêng để ghi lại quá trình học tập, làm việc, và suy nghĩ chậm lại giữa nhịp sống nhanh của ngành công nghệ.</p>
  </div>
</section>

<section class="section">
  <div class="container about-grid">
    <figure class="about-figure">
      <img src="/assets/images/logo-512.png" alt="Biểu tượng Lưỡng Nghi (Thái Cực)" loading="lazy">
    </figure>
    <div class="prose">
      <h2>Bùi Trung Tín</h2>
      <p>Tôi làm việc trong lĩnh vực phần mềm, quan tâm đến hệ thống phân tán, hiệu năng, và những công cụ đơn giản làm đúng một việc. Bên cạnh công việc kỹ thuật, tôi dành thời gian đọc và suy ngẫm về triết học phương Đông — đặc biệt là tư tưởng Đạo giáo — và cố gắng mang những nguyên lý ấy vào cách tôi thiết kế hệ thống cũng như cách tôi sống.</p>
      <p>{BRAND_NAME} (Bùi Gia Trang) ra đời từ nhu cầu có một nơi chậm rãi hơn mạng xã hội, riêng tư hơn một nền tảng viết chung, và bền hơn một tài khoản có thể biến mất bất cứ lúc nào. Đây là một trang tĩnh, không quảng cáo, không theo dõi người dùng — chỉ có nội dung, và thời gian.</p>
    </div>
  </div>
</section>

<section class="section">
  <div class="container prose">
    <h2>Định hướng phát triển</h2>
    <p>Về lâu dài, {BRAND_NAME} sẽ tiếp tục là nơi lưu giữ các bài viết kỹ thuật chuyên sâu, ghi chú đọc sách, và tài liệu cho các dự án mã nguồn mở. Mục tiêu không phải là tăng trưởng lượng truy cập, mà là giữ được chất lượng và sự chân thật của nội dung theo thời gian.</p>
  </div>
</section>

<section class="section">
  <div class="container">
    <h2>Lĩnh vực nghiên cứu</h2>
    <ul class="field-list">
      <li>Hệ thống phân tán &amp; kiến trúc phần mềm</li>
      <li>Hiệu năng &amp; tối ưu hệ thống</li>
      <li>Triết học Đạo giáo &amp; ứng dụng vào kỹ thuật</li>
      <li>Thiết kế tối giản &amp; trải nghiệm đọc</li>
      <li>Công cụ dòng lệnh &amp; phần mềm mã nguồn mở</li>
      <li>Ngôn ngữ &amp; chữ Quốc ngữ trong xử lý văn bản</li>
    </ul>
  </div>
</section>
'''
    write("about/index.html", page(
        title=f"Giới thiệu — {BRAND_NAME}",
        description=f"Thông tin về tác giả Bùi Trung Tín, định hướng phát triển và các lĩnh vực nghiên cứu của {BRAND_NAME}.",
        canonical=f"{SITE_URL}/about/",
        og_image=f"{SITE_URL}/assets/images/og-default.png",
        active="/about/",
        body=body,
        extra_head=f'''<script type="application/ld+json">
{{
  "@context": "https://schema.org",
  "@type": "ProfilePage",
  "mainEntity": {{
    "@type": "Person",
    "name": "Bùi Trung Tín",
    "url": "{SITE_URL}/about/",
    "description": "Người viết phần mềm quan tâm đến hệ thống phân tán, hiệu năng và triết học Đạo giáo."
  }}
}}
</script>'''
    ))


def build_contact():
    body = '''
<section class="hero">
  <div class="container">
    <p class="hero-eyebrow">Liên hệ</p>
    <h1>Liên hệ</h1>
    <p class="hero-lede">Có góp ý, câu hỏi, hay chỉ muốn trò chuyện về Đạo giáo và kỹ thuật — cứ nhắn cho tôi.</p>
  </div>
</section>

<section class="section">
  <div class="container contact-grid">
    <div>
      <h2>Kênh liên lạc</h2>
      <ul class="social-list">
        <li><a href="mailto:lienhe@example.com">Email <span aria-hidden="true">↗</span></a></li>
        <li><a href="https://github.com/trungtin87" target="_blank" rel="noopener">GitHub <span aria-hidden="true">↗</span></a></li>
        <li><a href="https://facebook.com/" target="_blank" rel="noopener">Facebook <span aria-hidden="true">↗</span></a></li>
        <li><a href="https://x.com/" target="_blank" rel="noopener">X (Twitter) <span aria-hidden="true">↗</span></a></li>
        <li><a href="https://linkedin.com/" target="_blank" rel="noopener">LinkedIn <span aria-hidden="true">↗</span></a></li>
      </ul>
    </div>
    <div>
      <h2>Gửi tin nhắn</h2>
      <p class="post-desc">Đây là biểu mẫu tĩnh minh họa — trang không có backend, vui lòng dùng email để liên hệ trực tiếp.</p>
      <form action="mailto:lienhe@example.com" method="post" enctype="text/plain">
        <div class="field">
          <label for="name">Họ tên</label>
          <input id="name" name="name" type="text" autocomplete="name">
        </div>
        <div class="field">
          <label for="email">Email</label>
          <input id="email" name="email" type="email" autocomplete="email">
        </div>
        <div class="field">
          <label for="message">Nội dung</label>
          <textarea id="message" name="message" rows="5"></textarea>
        </div>
        <button class="btn" type="submit">Gửi qua email</button>
      </form>
    </div>
  </div>
</section>
'''
    write("contact/index.html", page(
        title=f"Liên hệ — {BRAND_NAME}",
        description="Thông tin liên hệ của Bùi Trung Tín: email, GitHub, Facebook và các mạng xã hội khác.",
        canonical=f"{SITE_URL}/contact/",
        og_image=f"{SITE_URL}/assets/images/og-default.png",
        active="/contact/",
        body=body,
    ))


if __name__ == "__main__":
    posts = load_posts()
    if not posts:
        print("⚠️  Không tìm thấy bài viết nào trong content/posts/.")
    for p in posts:
        build_post_page(p, posts)
    build_blog_index(posts)
    build_homepage(posts)
    build_search_index(posts)
    build_sitemap(posts)
    build_rss(posts)
    build_projects()
    build_library()
    build_about()
    build_contact()
    print(f"\nHoàn tất: đã sinh {len(posts)} bài viết + toàn bộ trang tĩnh liên quan.")
