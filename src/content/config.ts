// src/content/config.ts
// Khai báo 2 "bộ sưu tập nội dung" (content collections) của trang:
//   - bai_viet: các bài viết blog (tương đương _cacbaiviet/*.md bản gốc)
//   - du_an:    các dự án (tương đương _duan/*.md bản gốc)
// Astro sẽ tự kiểm tra (validate) mỗi file Markdown theo "schema" khai báo
// bên dưới — nếu quên điền một trường bắt buộc, Astro sẽ báo lỗi ngay khi
// build, giúp tránh việc quên "tiêu_đề" hay gõ sai kiểu dữ liệu.

import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const boSuuTapBaiViet = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/bai_viet" }),
  schema: z.object({
    tieu_de: z.string(),
    danh_muc: z.string(),
    chuyen_muc: z.string(),
    tags: z.array(z.string()).default([]),
    mo_ta: z.string(),
    ngay: z.coerce.date(),
    anh_bia: z.string(),
    nhap: z.boolean().default(false), // true = bài nháp, chưa xuất bản
  }),
});

const boSuuTapDuAn = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/du_an" }),
  schema: z.object({
    tieu_de: z.string(),
    mo_ta_ngan: z.string(),
    anh_dai_dien: z.string(),
    cong_nghe: z.array(z.string()).default([]),
    link_demo: z.string().optional().default(""),
    link_github: z.string().optional().default(""),
  }),
});

export const collections = {
  bai_viet: boSuuTapBaiViet,
  du_an: boSuuTapDuAn,
};
