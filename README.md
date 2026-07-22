# Huyền Không Thư Quán

Website cá nhân, xây dựng bằng [Astro](https://astro.build) với theme [Astrofy](https://github.com/manuelernestog/astrofy).

## Chạy thử ở máy local

```bash
npm install
npm run dev
```

Mở trình duyệt tại `http://localhost:4321`.

## Build tĩnh

```bash
npm run build
```

Kết quả nằm trong thư mục `dist/`.

## Triển khai lên GitHub Pages (trungtin87.github.io)

Repo này đã có sẵn workflow tại `.github/workflows/deploy.yml`, tự động build và
deploy mỗi khi push vào nhánh `main`. Các bước cần làm **một lần duy nhất**:

1. Tạo repo tên đúng là `trungtin87.github.io` trên GitHub (đây là kiểu repo
   "user site" nên tên repo bắt buộc phải trùng với tên tài khoản).
2. Đẩy code này lên repo đó:

   ```bash
   git init
   git add .
   git commit -m "Khoi tao website Huyen Khong Thu Quan (Astrofy)"
   git branch -M main
   git remote add origin https://github.com/trungtin87/trungtin87.github.io.git
   git push -u origin main
   ```
3. Vào repo trên GitHub → **Settings → Pages** → mục **Build and deployment**
   → chọn **Source: GitHub Actions** (không chọn "Deploy from a branch").
4. Push xong, vào tab **Actions** để xem workflow chạy. Khoảng 1–2 phút sau,
   trang sẽ có tại: `https://trungtin87.github.io`

Từ lần sau, chỉ cần `git push` lên nhánh `main` là site tự build và cập nhật.

## Đổi logo / thông tin cá nhân

- Logo, favicon, ảnh đại diện: nằm trong thư mục `public/`
  (`favicon.svg`, `favicon-16.png`, `favicon-32.png`, `apple-touch-icon.png`,
  `profile.webp`, `social_img.webp`).
- Tên site, mô tả: `src/config.ts`
- Tên hiển thị, mạng xã hội, email liên hệ: `src/components/Header.astro`,
  `src/components/SideBarFooter.astro`, `src/components/SideBarMenu.astro`,
  `src/components/Footer.astro`
- Địa chỉ site (dùng để tạo sitemap/RSS đúng): `astro.config.mjs` (`site: ...`)
  và `public/robots.txt`

## Bài viết blog

Bài viết mẫu (tiếng Anh) của theme Astrofy nằm trong `src/content/blog/`.
Thêm bài viết mới bằng cách tạo file `.md` hoặc `.mdx` mới trong thư mục đó,
theo đúng khuôn mẫu (front-matter) của các bài có sẵn.

## Ghi công

Theme gốc: [Astrofy](https://github.com/manuelernestog/astrofy) của Manuel Ernesto,
giấy phép MIT (xem file `LICENSE`).
