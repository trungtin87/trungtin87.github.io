# Huyền Không Thư Quán — Bùi Gia Trang

> "Đạo pháp tự nhiên."

Website blog tĩnh mang phong cách Đạo giáo hiện đại — của tác giả **Bùi Trung Tín**.
Địa chỉ: **https://trungtin87.github.io**

Đây không chỉ là nơi đăng bài viết, mà là một **thư phòng số**: nơi lưu giữ tri thức,
kinh nghiệm và các dự án. Tinh thần xuyên suốt là sự cân bằng giữa truyền thống và
hiện đại, giữa kỹ thuật và tự nhiên — lấy cảm hứng từ Âm — Dương, Vô vi, Tự nhiên.

## Nguyên tắc kỹ thuật

- HTML5 chuẩn, CSS thuần, JavaScript ES Modules — **không framework**.
- Không jQuery, không Bootstrap/Tailwind, không React/Vue/Angular.
- Không backend, không cơ sở dữ liệu, không cookie, không theo dõi người dùng,
  không quảng cáo, không popup.
- Không phụ thuộc CDN ngoài, ngoại trừ font (Geist qua jsDelivr, dự phòng
  Inter / Arial / hệ thống).
- Triển khai được ngay trên GitHub Pages, Cloudflare Pages hoặc Netlify —
  chỉ cần trỏ vào thư mục gốc, không cần bước build nào ở phía máy chủ.

## Cấu trúc thư mục

```
/
├── index.html                 Trang chủ (sinh từ generate.py)
├── about/index.html           Giới thiệu
├── content/
│   └── posts/*.md             Nguồn nội dung bài viết (Markdown + front matter)
├── blog/
│   ├── index.html             Danh sách bài viết (sinh từ generate.py)
│   └── posts/*.html           Từng bài viết (sinh từ generate.py)
├── projects/index.html        Dự án
├── library/index.html         Thư viện
├── contact/index.html         Liên hệ
├── assets/
│   ├── css/style.css          Toàn bộ hệ thống thiết kế (1 tệp)
│   ├── js/main.js             Hành vi giao diện (ES Modules)
│   ├── js/search-data.js      Chỉ mục tìm kiếm tĩnh
│   └── images/                Minh họa SVG (mực, tối giản)
├── favicon.svg                Biểu tượng Lưỡng Nghi (Thái Cực)
├── manifest.webmanifest
├── robots.txt
├── sitemap.xml
├── rss.xml
├── generate.py                Công cụ lắp ráp trang (chỉ dùng khi phát triển)
└── README.md
```

## Chức năng đã cài đặt

- Dark / Light mode (nút Âm/Dương ở header, lưu lựa chọn trong `localStorage`)
- Responsive, menu di động
- Về đầu trang (Back to top)
- Tìm kiếm bài viết phía trình duyệt (không cần backend), phím tắt `⌘K` / `Ctrl K`
- Mục lục tự động cho từng bài viết + highlight mục đang đọc khi cuộn
- Đếm thời gian đọc tự động theo số từ
- Sao chép liên kết bài viết
- Highlight mục menu đang active
- Ảnh responsive + `loading="lazy"`
- Bộ lọc thư viện theo loại tài liệu

## SEO & chuẩn mở

Mỗi trang có đầy đủ: meta title/description/keywords, canonical, Open Graph,
Twitter Card, `robots.txt`, `sitemap.xml`, `rss.xml`, dữ liệu có cấu trúc
Schema.org/JSON-LD (`WebSite`, `BlogPosting`, `ProfilePage`), favicon SVG và
`manifest.webmanifest`.

## Thêm bài viết mới

1. Tạo một tệp `.md` mới trong `content/posts/`, ví dụ `content/posts/ten-bai-moi.md`.
2. Khai báo front matter ở đầu tệp (bắt buộc: `title`, `description`, `category`, `date`):

```markdown
---
title: Tên bài viết
description: Mô tả ngắn dùng cho thẻ meta / Open Graph / kết quả tìm kiếm
category: Kỹ thuật
date: 2026-07-02
cover: /assets/images/ink-wave.svg
cover_alt: Mô tả ảnh bìa
featured: false
---
Nội dung bài viết viết bằng Markdown: đoạn văn, `##`/`###` cho tiêu đề phụ,
`> ` cho trích dẫn, `![alt](src)` cho ảnh, `**đậm**`, `*nghiêng*`, `[chữ](link)`.
```

3. Chạy:

```bash
python3 generate.py
```

Script sẽ **tự động**:
- Sinh trang bài viết tại `blog/posts/ten-bai-moi.html` kèm đầy đủ meta title,
  description, keywords, canonical, Open Graph, Twitter Card, JSON-LD
  (`BlogPosting`) — không cần gõ tay bất kỳ thẻ SEO nào.
- Thêm bài vào danh sách `blog/index.html`, mục "Bài viết mới" trên trang chủ
  (3 bài mới nhất) và mục "Bài viết nổi bật" (nếu đặt `featured: true`).
- Tự tính thời gian đọc, tự sinh mục lục (ở phía trình duyệt) và gợi ý "Bài
  liên quan" theo cùng danh mục.
- Cập nhật lại `assets/js/search-data.js` (tìm kiếm), `sitemap.xml` và
  `rss.xml` cho toàn bộ danh sách bài viết hiện có.

Xoá một bài chỉ cần xoá tệp `.md` tương ứng rồi chạy lại `generate.py` — mọi
nơi liệt kê bài viết đó sẽ tự động biến mất theo (bạn có thể xoá thủ công
tệp `.html` cũ trong `blog/posts/` nếu không muốn nó còn sót lại trên đĩa).

> Các trang tĩnh khác (Trang chủ phần dự án, Dự án, Thư viện, Giới thiệu,
> Liên hệ) hiện vẫn được viết trực tiếp trong `generate.py` — chỉnh sửa trực
> tiếp phần thân hàm tương ứng rồi chạy lại script.

## Logo

Biểu tượng Lưỡng Nghi (Thái Cực) dùng trên toàn site (`assets/images/logo.png`,
`logo-512.png`, `favicon.svg`, `assets/icons/`) được xử lý từ ảnh gốc do tác
giả cung cấp: xoá nền, thêm viền xám nhạt để biểu tượng vẫn rõ trên cả nền
sáng lẫn nền tối.

## Triển khai lên GitHub Pages

Vì domain là **trungtin87.github.io** (dạng *user site*, không phải *project
site*), **repository trên GitHub phải được đặt tên chính xác là
`trungtin87.github.io`** — đây là yêu cầu bắt buộc của GitHub Pages cho loại
site này, không phải tuỳ chọn.

Các bước:

1. Tạo repo GitHub tên `trungtin87.github.io`.
2. Đẩy toàn bộ nội dung thư mục này (đã build bằng `generate.py`) lên nhánh
   `main`.
3. Vào **Settings → Pages**, chọn nguồn là nhánh `main`, thư mục `/ (root)`.
4. Sau vài phút, site sẽ chạy tại `https://trungtin87.github.io/`.

Không cần bước build phía GitHub — mọi tệp đã là HTML/CSS/JS tĩnh sẵn sàng
phục vụ trực tiếp.

---

Bùi Trung Tín · © 2026 Huyền Không Thư Quán
