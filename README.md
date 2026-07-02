# Bùi Gia Trang

Website blog tĩnh mang tinh thần Đạo giáo hiện đại — của tác giả **Bùi Trung Tín**.

Không dùng framework. Không phụ thuộc backend. HTML5 + CSS thuần + JavaScript ES Modules.

## Cấu trúc thư mục

```
/
├── index.html              # Trang chủ
├── about/index.html        # Giới thiệu
├── blog/index.html         # Danh sách bài viết
├── contact/index.html      # Liên hệ
├── library/index.html      # Thư viện
├── projects/index.html     # Dự án
├── posts/<slug>/index.html # Từng bài viết
├── assets/
│   ├── css/                # variables.css, main.css
│   ├── js/                 # main.js (theme, menu, search, TOC, v.v.)
│   ├── images/              # Ảnh minh họa SVG
│   └── search-index.json   # Chỉ mục tìm kiếm phía client
├── favicon.svg
├── manifest.webmanifest
├── robots.txt
├── sitemap.xml
├── rss.xml
└── README.md
```

## Chạy thử cục bộ

Vì đây là website tĩnh thuần túy, chỉ cần một static server bất kỳ:

```bash
cd /đường-dẫn-đến-thư-mục-này
python3 -m http.server 8080
# mở http://localhost:8080
```

## Triển khai

Tương thích trực tiếp với **GitHub Pages**, **Cloudflare Pages** hoặc **Netlify** — chỉ cần trỏ vào thư mục gốc, không cần bước build.

Trước khi triển khai, cập nhật lại tên miền thật trong:
- `robots.txt` (dòng `Sitemap:`)
- `sitemap.xml`, `rss.xml`
- Thẻ `<link rel="canonical">`, Open Graph, Twitter Card, JSON-LD trong từng trang (biến `BASE_URL` trong `pages.py` nếu build lại bằng script)

## Nội dung mẫu

Ba bài viết, ba dự án và năm mục thư viện trong bản này là **nội dung mẫu** để minh họa bố cục — thay bằng nội dung thật của bạn.

## Thêm bài viết mới

Nếu muốn dùng lại script sinh trang tĩnh nội bộ (`build.py` + `pages.py`, viết bằng Python, chỉ dùng khi phát triển — không thuộc runtime của website):
1. Thêm mục mới vào danh sách `POSTS` trong `pages.py`.
2. Thêm nội dung HTML bài viết vào `POST_BODIES`.
3. Thêm ảnh minh họa SVG/PNG vào `assets/images/`.
4. Chạy `python3 pages.py` để sinh lại toàn bộ trang tĩnh.

Nếu không dùng script, có thể sao chép thủ công một thư mục trong `posts/` và chỉnh sửa trực tiếp.

## Chức năng đã tích hợp

- Dark / Light mode (Âm / Dương), ghi nhớ lựa chọn qua `localStorage`
- Responsive, menu di động
- Tìm kiếm bài viết phía client (`assets/search-index.json`)
- Mục lục tự động + highlight khi cuộn
- Đếm thời gian đọc
- Copy link bài viết
- Back to top
- Lazy loading ảnh
- SEO: meta tags, Open Graph, Twitter Card, canonical, JSON-LD (Schema.org), sitemap.xml, robots.txt, RSS feed

## Triết lý

> "Đạo pháp tự nhiên."

Trang không chỉ để đăng bài — đây là một thư phòng số lưu giữ tri thức, kinh nghiệm và các dự án, cân bằng giữa truyền thống và hiện đại, giữa kỹ thuật và tự nhiên.
