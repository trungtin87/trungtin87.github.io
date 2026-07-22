// src/cau_hinh/trang_web.ts
// Nơi tập trung MỌI thông tin cấu hình chung của trang web — tương đương
// file _cauhinhtrangweb.yml trong bản gốc. Muốn đổi tên trang, khẩu hiệu,
// mạng xã hội, menu điều hướng... chỉ cần sửa ở đây, không phải lục từng
// trang một.

export interface MucDieuHuong {
  ten: string;
  duong_dan: string;
}

export interface CauHinhTrangWeb {
  ten_trangweb: string;
  bi_danh: string;
  khau_hieu: string;
  mo_ta: string;
  url: string;
  ngon_ngu: string;
  tac_gia: string;
  email: string;
  mau_giao_dien: string;
  anh_mac_dinh: string;
  mang_xa_hoi: {
    github: string;
    facebook: string;
    twitter: string;
    linkedin: string;
  };
  dieu_huong: MucDieuHuong[];
  so_tu_moi_phut_doc: number;
}

export const cauHinh: CauHinhTrangWeb = {
  ten_trangweb: "Huyền Không Thư Quán",
  bi_danh: "Bùi Gia Trang",
  khau_hieu: "Đạo pháp tự nhiên.",
  mo_ta:
    "Blog cá nhân theo tinh thần Đạo giáo hiện đại: đơn giản, tự nhiên, không dư thừa. Ghi chép kỹ thuật, triết học và các dự án của Bùi Trung Tín.",
  url: "https://trungtin87.github.io",
  ngon_ngu: "vi",
  tac_gia: "Bùi Trung Tín",
  email: "lienhe@example.com",
  mau_giao_dien: "#111111",
  anh_mac_dinh: "/tainguyen/hinhanh/og-default.png",
  mang_xa_hoi: {
    github: "https://github.com/trungtin87",
    facebook: "https://facebook.com/",
    twitter: "https://x.com/",
    linkedin: "https://linkedin.com/",
  },
  dieu_huong: [
    { ten: "Trang chủ", duong_dan: "/" },
    { ten: "Bài viết", duong_dan: "/bai-viet" },
    { ten: "Dự án", duong_dan: "/du-an" },
    { ten: "Sách", duong_dan: "/sach" },
    { ten: "Cửa hàng", duong_dan: "/cua-hang" },
    { ten: "Thư viện", duong_dan: "/thu-vien" },
    { ten: "Giới thiệu", duong_dan: "/gioi-thieu" },
    { ten: "Liên hệ", duong_dan: "/lien-he" },
  ],
  so_tu_moi_phut_doc: 200,
};
