# Huyền Không Thư Quán — bản Astro + Tailwind CSS

Đây là bản chuyển đổi từ bộ máy Python tự chế (`vnsite_engine`) sang **Astro** +
**Tailwind CSS**, giữ nguyên 100% giao diện gốc. Toàn bộ code được đặt tên
tiếng Việt (không dấu, kiểu `snake_case`/`camelCase`) để bạn vừa đọc vừa học.

---

## 1. Cài đặt & chạy thử

Cần có [Node.js](https://nodejs.org) bản 18 trở lên.

```bash
# Cài các gói phụ thuộc (chỉ cần làm 1 lần)
npm install

# Chạy máy chủ phát triển — có tính năng "hot reload", sửa code là thấy ngay
npm run dev
# Mở trình duyệt vào: http://localhost:4321

# Dựng bản tĩnh để phát hành (kết quả nằm trong thư mục dist/)
npm run build

# Xem thử bản đã dựng, giống hệt lúc lên mạng thật
npm run preview
```

---

## 2. Cấu trúc thư mục — cái gì nằm ở đâu

```
src/
├── cau_hinh/trang_web.ts     Cấu hình chung: tên trang, khẩu hiệu, menu,
│                              mạng xã hội... Sửa 1 chỗ, áp dụng toàn trang.
├── styles/toan_cuc.css        CSS toàn cục: nạp Tailwind + biến màu Âm/Dương
│                              (chế độ sáng/tối).
├── content/
│   ├── config.ts               Khai báo "khuôn dữ liệu" (schema) cho bài viết
│   │                            và dự án — Astro tự kiểm tra khi build.
│   ├── bai_viet/*.md           Từng bài viết blog, 1 file = 1 bài.
│   └── du_an/*.md               Từng dự án, 1 file = 1 dự án.
├── thanh_phan/                 Các mảnh giao diện dùng lại nhiều nơi
│   ├── DauTrang.astro            (header: logo, menu, nút tìm kiếm/đổi theme)
│   ├── ChanTrang.astro           (footer)
│   ├── BangTimKiem.astro         (ô tìm kiếm nổi + nút "về đầu trang")
│   ├── TheBaiViet.astro          (1 "thẻ" bài viết trong lưới)
│   ├── TheDuAn.astro             (1 "thẻ" dự án trong lưới)
│   └── MucLuc.astro              (mục lục bên cạnh bài viết)
├── bo_cuc/                      Khung trang (layout)
│   ├── BoCucMacDinh.astro        khung HTML gốc, mọi trang đều dùng
│   └── BoCucBaiViet.astro        khung riêng cho trang chi tiết bài viết
├── scripts/tuong_tac_client.js  Toàn bộ JS chạy trên trình duyệt: đổi theme,
│                                  menu di động, tìm kiếm, mục lục, sao chép
│                                  liên kết, lọc thư viện.
└── pages/                       Mỗi file .astro ở đây = 1 trang thật trên web
    ├── index.astro                 Trang chủ            → /
    ├── bai-viet/index.astro        Danh sách bài viết    → /bai-viet
    ├── bai-viet/[slug].astro       Chi tiết 1 bài viết   → /bai-viet/ten-file
    ├── du-an/index.astro           Danh sách dự án       → /du-an
    ├── du-an/[slug].astro          Chi tiết 1 dự án      → /du-an/ten-file
    ├── tag/[tag].astro             Bài viết theo tag     → /tag/ten-tag
    ├── thu-vien.astro              Trang thư viện        → /thu-vien
    ├── gioi-thieu.astro            Trang giới thiệu      → /gioi-thieu
    ├── lien-he.astro                Trang liên hệ         → /lien-he
    ├── rss.xml.js                   Nguồn cấp RSS         → /rss.xml
    └── du-lieu-tim-kiem.json.ts     Dữ liệu cho ô tìm kiếm → /du-lieu-tim-kiem.json
```

**Quy tắc đặt tên trong dự án:** tên hàm/biến dùng tiếng Việt không dấu kiểu
`camelCase` (ví dụ `tieuDeTrang`, `khoiDongMenuDiDong`), tên trường dữ liệu
trong Markdown/schema giữ tiếng Việt có dấu dạng `snake_case` (ví dụ
`tieu_de`, `anh_bia`) cho gần với bản gốc và dễ đọc khi biên tập nội dung.

---

## 3. Cách thêm một bài viết mới

Tạo file mới trong `src/content/bai_viet/`, tên file chính là đường dẫn URL
(ví dụ `ten-bai-viet.md` → `/bai-viet/ten-bai-viet`):

```markdown
---
tieu_de: "Tiêu đề bài viết"
danh_muc: "Kỹ thuật"
chuyen_muc: "ky-thuat"
tags: [tag-mot, tag-hai]
mo_ta: "Mô tả ngắn hiện ở thẻ bài viết và thẻ SEO."
ngay: "2026-07-22"
anh_bia: "/tainguyen/hinhanh/ink-circle.svg"
nhap: false
---

Nội dung bài viết viết bằng Markdown bình thường ở đây.

## Tiêu đề phụ (sẽ tự động vào mục lục)

Đoạn văn tiếp theo...
```

Đặt `nhap: true` nếu muốn viết nháp mà chưa xuất bản — Astro sẽ tự ẩn bài
này khỏi mọi danh sách, RSS, và tìm kiếm.

## 4. Cách thêm một dự án mới

Tương tự, tạo file trong `src/content/du_an/`:

```markdown
---
tieu_de: "Tên dự án"
mo_ta_ngan: "Mô tả ngắn 1-2 câu."
anh_dai_dien: "/tainguyen/hinhanh/ink-wave.svg"
cong_nghe: [Go, CLI]
link_demo: ""
link_github: "https://github.com/ban/du-an"
---

Nội dung mô tả chi tiết dự án ở đây.
```

---

## 5. Ảnh và tệp tĩnh khác

Mọi thứ trong `public/` được phục vụ y nguyên ở gốc website. Ví dụ:
`public/tainguyen/hinhanh/logo.png` → truy cập qua `/tainguyen/hinhanh/logo.png`.

---

## 6. Vì sao chọn Astro + Tailwind cho dự án này

- **Astro**: mặc định không gửi JavaScript cho trình duyệt trừ khi bạn yêu
  cầu — trang tải cực nhanh, rất hợp cho blog/thư viện đọc như trang này.
  Astro cũng có sẵn Content Collections để quản lý bài viết/dự án dạng
  Markdown có kiểm tra dữ liệu, giống hệt tinh thần bộ máy Python gốc
  nhưng không cần tự viết trình dựng trang (build engine) nữa.
- **Tailwind CSS v4**: viết class ngay trong file `.astro`, không cần nhảy
  qua lại giữa HTML và CSS. Bố cục responsive (mobile ⇄ desktop) được xử lý
  bằng tiền tố như `sm:`, `md:` — không lo lỗi vỡ giao diện khi đổi kích
  thước màn hình.
- **CSS biến (custom properties)** cho màu sắc vẫn được giữ lại (không thay
  bằng `dark:` của Tailwind), vì cơ chế đổi giao diện sáng/tối của bản gốc
  dùng thuộc tính `data-theme` lưu trong `localStorage` — giữ nguyên cách
  này để không phải viết lại toàn bộ logic đổi theme.

---

## 7. Việc còn có thể làm thêm

- Trang **thư viện** hiện đang viết cứng dữ liệu ngay trong
  `src/pages/thu-vien.astro`. Nếu muốn quản lý dễ hơn, tạo thêm collection
  `src/content/thu_vien/*.md` giống hệt cách làm với `bai_viet`.
- Bật bình luận qua **giscus** (đã tắt trong bản gốc) — thêm component mới
  trong `thanh_phan/` và nhúng vào `BoCucBaiViet.astro`.
- Triển khai lên GitHub Pages / Vercel / Netlify: chạy `npm run build`, rồi
  đẩy thư mục `dist/` lên dịch vụ hosting tĩnh bạn chọn.
