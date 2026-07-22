// astro.config.mjs
// Cấu hình gốc của dự án Astro. Trang được build tĩnh hoàn toàn (mặc định của Astro),
// giống hệt tinh thần "static site" của bản gốc bằng Python.
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import sitemap from "@astrojs/sitemap";

export default defineConfig({
  // Đổi lại đúng domain thật của bạn khi deploy (dùng để sinh sitemap.xml, rss.xml, thẻ SEO...)
  site: "https://trungtin87.github.io",
  integrations: [sitemap()],
  vite: {
    plugins: [tailwindcss()],
  },
});
