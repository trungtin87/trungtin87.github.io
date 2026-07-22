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
├── cau_hinh/logo_base64.ts    Logo/favicon âm dương nhúng thẳng base64 —
│                              xem mục "Đổi logo" bên dưới nếu muốn thay.
├── styles/toan_cuc.css        CSS toàn cục: nạp Tailwind + biến màu Âm/Dương
│                              (chế độ sáng/tối).
├── content/
│   ├── config.ts               Khai báo "khuôn dữ liệu" (schema) cho bài viết,
│   │                            dự án, sách, sản phẩm — Astro tự kiểm tra khi build.
│   ├── bai_viet/*.md           Từng bài viết blog, 1 file = 1 bài.
│   ├── du_an/*.md               Từng dự án, 1 file = 1 dự án.
│   ├── sach/*.md                 Từng cuốn sách trong tủ sách, 1 file = 1 cuốn.
│   └── cua_hang/*.md             Từng sản phẩm trong Cửa hàng, 1 file = 1 sản phẩm.
├── thanh_phan/                 Các mảnh giao diện dùng lại nhiều nơi
│   ├── DauTrang.astro            (header: logo, menu, nút tìm kiếm/đổi theme)
│   ├── ChanTrang.astro           (footer)
│   ├── BangTimKiem.astro         (ô tìm kiếm nổi + nút "về đầu trang")
│   ├── TheBaiViet.astro          (1 "thẻ" bài viết trong lưới)
│   ├── TheDuAn.astro             (1 "thẻ" dự án trong lưới)
│   ├── TheSach.astro             (1 "thẻ" sách trong lưới)
│   ├── TheSanPham.astro          (1 "thẻ" sản phẩm trong lưới)
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
    ├── sach/index.astro             Danh sách sách        → /sach
    ├── sach/[slug].astro            Chi tiết 1 cuốn sách  → /sach/ten-file
    ├── cua-hang/index.astro         Danh sách sản phẩm    → /cua-hang
    ├── cua-hang/[slug].astro        Chi tiết 1 sản phẩm   → /cua-hang/ten-file
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

## 4b. Cách thêm một cuốn sách mới

Tạo file trong `src/content/sach/`:

```markdown
---
tieu_de: "Tên sách"
tac_gia: "Tên tác giả"
mo_ta_ngan: "Mô tả ngắn 1-2 câu."
anh_bia: "/tainguyen/hinhanh/ink-mountain.svg"
the_loai: [Triết học, Đạo giáo]
nam_xuat_ban: 2020
dinh_dang: [PDF, EPUB]
gia: "Miễn phí"        # để trống "" nếu muốn hiện "Miễn phí" mặc định
link_mua: "https://..."
noi_bat: false           # true = ưu tiên hiện đầu danh sách
---

Nội dung giới thiệu sách ở đây.
```

## 4c. Cách thêm một sản phẩm mới vào Cửa hàng

Tạo file trong `src/content/cua_hang/`:

```markdown
---
ten_san_pham: "Tên sản phẩm"
mo_ta_ngan: "Mô tả ngắn 1-2 câu."
anh_san_pham: "/tainguyen/hinhanh/ink-circle.svg"
danh_muc: [Ebook]
gia: "99.000₫"
gia_goc: ""              # điền giá cũ nếu đang giảm giá, để trống nếu không
con_hang: true            # false = hiện nhãn "Hết hàng", nút mua bị khoá
link_mua: "https://..."
---

Nội dung mô tả chi tiết sản phẩm ở đây.
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

## 8. Đổi logo (favicon, header, footer, trang chủ...)

Toàn bộ logo/favicon của trang KHÔNG dùng file ảnh trong `public/` nữa —
được nhúng thẳng dạng base64 trong `src/cau_hinh/logo_base64.ts`, để thay
1 lần là đổi hết mọi nơi (tab trình duyệt, header, footer, trang chủ,
trang giới thiệu, icon khi "Thêm vào màn hình chính").

Muốn đổi logo khác, chạy đoạn script sau (cần Python + thư viện Pillow:
`pip install pillow`), rồi dán các chuỗi in ra đè vào file
`src/cau_hinh/logo_base64.ts`:

```python
from PIL import Image
import base64

im = Image.open("logo-moi.png").convert("RGBA")
nen_trang = Image.new("RGBA", im.size, (255, 255, 255, 255))
nen_trang.paste(im, (0, 0), im)
anh_vuong = nen_trang.convert("RGB")

for kich_thuoc, ten in [(32, "favicon-32"), (180, "apple-touch-icon"), (192, "logo-192"), (512, "logo-512"), (26, "logo-header")]:
    a = anh_vuong.resize((kich_thuoc, kich_thuoc), Image.LANCZOS)
    a.save(f"{ten}.png", optimize=True)
    with open(f"{ten}.png", "rb") as f:
        print(ten, "=", base64.b64encode(f.read()).decode())
```

Cũng nhớ cập nhật `public/manifest.webmanifest` (2 icon 192/512) theo cùng
cách — file này không phải code Astro nên không import được từ
`logo_base64.ts`, phải dán base64 trực tiếp vào JSON.

## 9. Triển khai lên GitHub Pages (trungtin87.github.io)

Repo này đã có sẵn `.github/workflows/deploy.yml` — tự động `npm run build`
và đẩy kết quả lên GitHub Pages mỗi khi bạn `git push` lên nhánh `main`.
Chỉ cần làm 1 lần:

1. Đẩy toàn bộ thư mục này lên repo GitHub tên **`trungtin87.github.io`**
   (repo trùng tên user thì Pages tự phục vụ ở gốc domain, không cần cấu
   hình `base` trong `astro.config.mjs`).
2. Vào repo trên GitHub → **Settings → Pages → Build and deployment →
   Source**, chọn **"GitHub Actions"** (chỉ cần chọn 1 lần).
3. Từ lần `push` tiếp theo, trang sẽ tự build và lên tại
   `https://trungtin87.github.io` sau khoảng 1–2 phút — xem tiến trình ở
   tab **Actions** của repo.

Muốn build thủ công để xem trước kết quả (không cần đẩy lên GitHub):

```bash
npm run build      # kết quả tĩnh nằm trong dist/
npm run preview     # xem thử y hệt bản thật tại http://localhost:4321
```
