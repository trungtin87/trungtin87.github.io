// src/pages/du-lieu-tim-kiem.json.ts
// Sinh ra /du-lieu-tim-kiem.json lúc build — thay thế cho tainguyen/js/search-data.js
// (file JS tĩnh) của bản gốc. Astro tự chạy lại đoạn này mỗi khi có bài viết
// mới, nên KHÔNG cần tự tay cập nhật danh sách tìm kiếm nữa.
import type { APIRoute } from "astro";
import { getCollection } from "astro:content";

export const GET: APIRoute = async () => {
  const tatCaBaiViet = await getCollection("bai_viet", ({ data }) => !data.nhap);
  const duLieu = tatCaBaiViet.map((bai) => ({
    tieu_de: bai.data.tieu_de,
    mo_ta: bai.data.mo_ta,
    danh_muc: bai.data.danh_muc,
    url: `/bai-viet/${bai.id}`,
  }));
  return new Response(JSON.stringify(duLieu), {
    headers: { "Content-Type": "application/json" },
  });
};
