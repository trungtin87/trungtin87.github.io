// src/pages/rss.xml.js
// Sinh /rss.xml lúc build, dùng gói chính thức @astrojs/rss. Tự động cập
// nhật mỗi khi có bài viết mới, không cần tự tay chỉnh sửa như bản gốc.
import rss from "@astrojs/rss";
import { getCollection } from "astro:content";
import { cauHinh } from "../cau_hinh/trang_web";

export async function GET(context) {
  const tatCaBaiViet = await getCollection("bai_viet", ({ data }) => !data.nhap);
  const baiVietDaSapXep = tatCaBaiViet.sort(
    (a, b) => b.data.ngay.valueOf() - a.data.ngay.valueOf()
  );

  return rss({
    title: cauHinh.ten_trangweb,
    description: cauHinh.mo_ta,
    site: context.site,
    items: baiVietDaSapXep.map((bai) => ({
      title: bai.data.tieu_de,
      description: bai.data.mo_ta,
      pubDate: bai.data.ngay,
      link: `/bai-viet/${bai.id}`,
      categories: [bai.data.danh_muc, ...bai.data.tags],
    })),
    customData: `<language>vi</language>`,
  });
}
