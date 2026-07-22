// src/scripts/tuong_tac_client.js
// Toàn bộ JavaScript chạy phía trình duyệt cho cả trang web — thuần
// JavaScript, không thư viện ngoài, y hệt tinh thần bản gốc tainguyen/js/main.js.
// File này được nạp một lần duy nhất trong BoCucMacDinh.astro nên chạy trên
// mọi trang.

const KHOA_THEME = "hktq-theme";

/* ---------------- Âm / Dương — chuyển giao diện sáng-tối ---------------- */
function khoiDongDoiGiaoDien() {
  const goc = document.documentElement;
  const nutBam = document.querySelector("[data-doi-giao-dien]");
  if (!nutBam) return;

  nutBam.addEventListener("click", () => {
    const hienTai =
      goc.getAttribute("data-theme") ||
      (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
    const tiepTheo = hienTai === "dark" ? "light" : "dark";
    goc.setAttribute("data-theme", tiepTheo);
    localStorage.setItem(KHOA_THEME, tiepTheo);
  });
}

/* ---------------- Menu di động ---------------- */
function khoiDongMenuDiDong() {
  const nutBam = document.querySelector("[data-mo-menu]");
  const menu = document.querySelector("[data-menu]");
  if (!nutBam || !menu) return;

  const dongMenu = () => {
    menu.classList.remove("dang-mo");
    nutBam.setAttribute("aria-expanded", "false");
  };

  nutBam.addEventListener("click", (su_kien) => {
    su_kien.stopPropagation();
    const dangMo = menu.classList.toggle("dang-mo");
    nutBam.setAttribute("aria-expanded", String(dangMo));
  });

  menu.querySelectorAll("a").forEach((a) => a.addEventListener("click", dongMenu));

  document.addEventListener("click", (su_kien) => {
    if (!menu.classList.contains("dang-mo")) return;
    if (menu.contains(su_kien.target) || nutBam.contains(su_kien.target)) return;
    dongMenu();
  });

  document.addEventListener("keydown", (su_kien) => {
    if (su_kien.key === "Escape" && menu.classList.contains("dang-mo")) {
      dongMenu();
      nutBam.focus();
    }
  });
}

/* ---------------- Về đầu trang ---------------- */
function khoiDongVeDauTrang() {
  const nutBam = document.querySelector("[data-ve-dau-trang]");
  if (!nutBam) return;
  const khiCuon = () => {
    nutBam.classList.toggle("hien-thi", window.scrollY > 640);
  };
  window.addEventListener("scroll", khiCuon, { passive: true });
  khiCuon();
  nutBam.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

/* ---------------- Tìm kiếm bài viết ---------------- */
function khoiDongTimKiem() {
  const nutMo = document.querySelector("[data-mo-tim-kiem]");
  const bang = document.querySelector("[data-bang-tim-kiem]");
  if (!nutMo || !bang) return;
  const oNhap = bang.querySelector("[data-o-nhap-tim-kiem]");
  const ketQua = bang.querySelector("[data-ket-qua-tim-kiem]");

  let duLieu = null;
  async function layDuLieuTimKiem() {
    if (duLieu) return duLieu;
    try {
      const res = await fetch("/du-lieu-tim-kiem.json");
      duLieu = await res.json();
    } catch {
      duLieu = [];
    }
    return duLieu;
  }

  const ve = async (tuKhoa) => {
    const q = tuKhoa.trim().toLowerCase();
    if (!q) {
      ketQua.innerHTML = "";
      return;
    }
    const ds = await layDuLieuTimKiem();
    const ketQuaKhopList = ds.filter((muc) =>
      [muc.tieu_de, muc.mo_ta, muc.danh_muc].join(" ").toLowerCase().includes(q)
    );
    if (ketQuaKhopList.length === 0) {
      ketQua.innerHTML = `<li class="p-2.5 text-[0.9rem]" style="color:var(--text-mo)">Không tìm thấy bài viết phù hợp.</li>`;
      return;
    }
    ketQua.innerHTML = ketQuaKhopList
      .map(
        (muc) => `
        <li><a class="block px-2.5 py-2.5 rounded-sm no-underline" style="color:var(--text)" href="${muc.url}">
          <span class="text-[0.82rem]" style="color:var(--text-mo)">${muc.danh_muc}</span><br>
          ${muc.tieu_de}
        </a></li>`
      )
      .join("");
  };

  const mo = () => {
    bang.classList.add("dang-mo");
    oNhap.value = "";
    ketQua.innerHTML = "";
    oNhap.focus();
    document.addEventListener("keydown", khiNhanPhim);
  };
  const dong = () => {
    bang.classList.remove("dang-mo");
    document.removeEventListener("keydown", khiNhanPhim);
    nutMo.focus();
  };
  const khiNhanPhim = (su_kien) => {
    if (su_kien.key === "Escape") dong();
  };

  nutMo.addEventListener("click", mo);
  bang.addEventListener("click", (su_kien) => {
    if (su_kien.target === bang) dong();
  });
  bang.querySelector("[data-dong-tim-kiem]")?.addEventListener("click", dong);
  oNhap?.addEventListener("input", (su_kien) => ve(su_kien.target.value));

  document.addEventListener("keydown", (su_kien) => {
    if ((su_kien.key === "k" || su_kien.key === "K") && (su_kien.metaKey || su_kien.ctrlKey)) {
      su_kien.preventDefault();
      mo();
    }
  });
}

/* ---------------- Tô đậm mục lục đang đọc khi cuộn trang ---------------- */
function khoiDongMucLuc() {
  const noiDungBaiViet = document.querySelector("[data-noi-dung-bai-viet]");
  const mucLuc = document.querySelector("[data-muc-luc]");
  if (!noiDungBaiViet || !mucLuc) return;

  const cacTieuDe = Array.from(noiDungBaiViet.querySelectorAll("h2, h3"));
  if (cacTieuDe.length === 0) return;

  const cacLienKet = mucLuc.querySelectorAll("[data-lien-ket-muc-luc]");
  const quanSat = new IntersectionObserver(
    (danhSach) => {
      danhSach.forEach((muc) => {
        if (!muc.isIntersecting) return;
        cacLienKet.forEach((a) => a.classList.remove("dang-active"));
        const lienKetTuongUng = mucLuc.querySelector(
          `[data-lien-ket-muc-luc="${muc.target.id}"]`
        );
        lienKetTuongUng?.classList.add("dang-active");
      });
    },
    { rootMargin: "-20% 0px -70% 0px" }
  );
  cacTieuDe.forEach((h) => quanSat.observe(h));
}

/* ---------------- Sao chép liên kết bài viết ---------------- */
function khoiDongSaoChepLienKet() {
  const nutBam = document.querySelector("[data-sao-chep-lien-ket]");
  if (!nutBam) return;
  const nhan = nutBam.querySelector("[data-nhan-sao-chep]");
  const chuMacDinh = nhan ? nhan.textContent : nutBam.textContent;
  nutBam.addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
    } catch {
      const oTam = document.createElement("textarea");
      oTam.value = window.location.href;
      document.body.appendChild(oTam);
      oTam.select();
      document.execCommand("copy");
      oTam.remove();
    }
    if (nhan) {
      nhan.textContent = "Đã sao chép";
      setTimeout(() => (nhan.textContent = chuMacDinh), 1800);
    }
  });
}

/* ---------------- Bộ lọc thư viện ---------------- */
function khoiDongLocThuVien() {
  const cacTab = document.querySelectorAll("[data-tab-thu-vien]");
  const cacMuc = document.querySelectorAll("[data-muc-thu-vien]");
  if (cacTab.length === 0) return;
  cacTab.forEach((tab) => {
    tab.addEventListener("click", () => {
      const loai = tab.getAttribute("data-tab-thu-vien");
      cacTab.forEach((t) => t.setAttribute("aria-pressed", "false"));
      tab.setAttribute("aria-pressed", "true");
      cacMuc.forEach((muc) => {
        const hienThi = loai === "all" || muc.getAttribute("data-muc-thu-vien") === loai;
        muc.hidden = !hienThi;
      });
    });
  });
}

document.addEventListener("DOMContentLoaded", () => {
  khoiDongDoiGiaoDien();
  khoiDongMenuDiDong();
  khoiDongVeDauTrang();
  khoiDongTimKiem();
  khoiDongMucLuc();
  khoiDongSaoChepLienKet();
  khoiDongLocThuVien();
});
