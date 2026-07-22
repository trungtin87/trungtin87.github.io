---
tieu_de: "Âm — Dương trong kiến trúc phần mềm"
danh_muc: "Kỹ thuật"
chuyen_muc: "ky-thuat"
slug: "am-duong-trong-lap-trinh"
tags: [am-duong, kien-truc, he-thong]
mo_ta: "Đối lập nhưng bổ sung — đồng bộ và bất đồng bộ, trạng thái và bất biến, đơn giản và đầy đủ."
ngay: "2026-06-15"
anh_bia: "/tainguyen/hinhanh/ink-circle.svg"
nhap: false
---
Âm và Dương không phải hai thế lực đối đầu để phân thắng bại. Chúng là hai nửa của cùng một vòng tròn, tồn tại nhờ vào nhau, chuyển hóa lẫn nhau. Nhìn kỹ vào bất kỳ hệ thống phần mềm nào đang hoạt động tốt, ta cũng thấy những cặp đối lập tương tự — không cặp nào "thắng" cặp nào, chúng cân bằng nhau.

## Đồng bộ và bất đồng bộ

Đồng bộ (Dương) cho ta sự chắc chắn: gọi hàm, chờ kết quả, biết ngay điều gì xảy ra. Bất đồng bộ (Âm) cho ta khả năng chịu tải: không chặn, không giữ tài nguyên chờ đợi vô ích. Một hệ thống chỉ dùng đồng bộ sẽ nghẽn cổ chai dưới tải cao. Một hệ thống chỉ dùng bất đồng bộ sẽ khó suy luận, khó gỡ lỗi. Sự cân bằng nằm ở việc biết dùng cái nào, ở đâu.

## Trạng thái và bất biến

Trạng thái thay đổi (Dương) phản ánh thế giới thực — mọi thứ đều biến chuyển theo thời gian. Nhưng dữ liệu bất biến (Âm) cho ta sự an toàn: một giá trị đã tạo ra sẽ không âm thầm đổi khác dưới chân ta. Những hệ thống đáng tin cậy nhất thường giới hạn phần trạng thái thay đổi vào một vùng rất nhỏ, bao quanh bởi một đại dương dữ liệu bất biến.

> Không phải kỹ thuật nào cũng đúng trong mọi hoàn cảnh — cái đúng là biết khi nào dùng Âm, khi nào dùng Dương.

## Đơn giản và đầy đủ

Một giao diện đơn giản (Âm) dễ học, dễ dùng sai đúng cách. Một hệ thống đầy đủ tính năng (Dương) đáp ứng được nhiều nhu cầu. Kéo quá về một phía đều có giá phải trả: quá đơn giản thì thiếu sức mạnh, quá đầy đủ thì trở nên khó dùng. Thiết kế API tốt luôn là một sự cân bằng động giữa hai điều này — thường bằng cách để phần lõi đơn giản, và mở rộng ra bằng các lớp tùy chọn.

## Kết luận

Khi tranh luận kiến trúc, ta hay rơi vào việc chọn phe: "nên dùng microservices hay monolith", "nên dùng REST hay GraphQL". Nhìn qua lăng kính Âm — Dương, câu hỏi đúng hơn không phải "cái nào tốt hơn", mà là "hai thái cực này cần được cân bằng ở đâu, trong bối cảnh cụ thể này".
