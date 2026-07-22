---
tieu_de: "Vô vi trong tối ưu hệ thống"
danh_muc: "Kỹ thuật"
chuyen_muc: "ky-thuat"
slug: "vo-vi-va-toi-uu"
tags: [vo-vi, toi-uu, hieu-nang]
mo_ta: "Tối ưu bằng cách bớt đi, không phải thêm vào — ghi chú từ việc dọn dẹp một hệ thống chạy quá nhiều tiến trình không cần thiết."
ngay: "2026-06-28"
anh_bia: "/tainguyen/hinhanh/ink-wave.svg"
nhap: false
---
Tuần trước tôi được nhờ xem lại một hệ thống đang chạy chậm dần theo thời gian. Bản năng đầu tiên của hầu hết mọi người khi thấy hệ thống chậm là: thêm cache, thêm worker, thêm một tầng xử lý mới. Nhưng lần này tôi thử làm ngược lại — bớt đi trước khi thêm vào.

## Quan sát trước khi hành động

Tinh thần "vô vi" trong Đạo giáo không phải là không hành động, mà là hành động tối thiểu cần thiết, đúng thời điểm. Áp vào kỹ thuật: trước khi thêm bất kỳ thành phần mới nào để giải quyết một vấn đề hiệu năng, hãy dành thời gian đo đạc và quan sát xem hệ thống đang thực sự làm gì.

Trong trường hợp này, việc đo đạc cho thấy hệ thống đang chạy ba tiến trình định kỳ trùng lặp chức năng — di sản của ba lần "sửa nhanh" trong quá khứ, không ai từng dọn lại.

## Tối ưu bằng cách bỏ bớt

Gỡ bỏ hai trong ba tiến trình đó, hợp nhất logic còn lại vào một nơi duy nhất, hệ thống giảm ngay 40% tải CPU nền — không cần thêm bất kỳ dòng code tối ưu hóa phức tạp nào.

> Có những vấn đề hiệu năng không cần một giải pháp thông minh hơn, chỉ cần ít việc phải làm hơn.

Đây là một mẫu hình lặp lại nhiều lần trong sự nghiệp của bất kỳ ai làm hệ thống lâu năm: phần lớn "nợ hiệu năng" không đến từ thuật toán tồi, mà từ việc làm những việc không cần làm — tính toán lại thứ đã biết, gọi mạng khi có thể dùng bộ nhớ cache cục bộ, giữ tiến trình sống khi nó có thể ngủ.

## Một vài câu hỏi tự đặt ra

Trước khi tối ưu bất cứ điều gì, tôi giờ tự hỏi: việc này có thực sự cần làm không? Nếu cần, nó có cần làm thường xuyên như vậy không? Nếu cần làm thường xuyên, kết quả có cần chính xác tuyệt đối, hay một giá trị gần đúng là đủ?

Phần lớn thời gian, câu trả lời cho ít nhất một trong ba câu hỏi trên là "không" — và đó chính là chỗ để bớt việc, thay vì thêm việc.

## Kết

Vô vi trong kỹ thuật không phải là lười biếng. Nó là kỷ luật của việc chỉ giữ lại những gì thực sự cần thiết, và tin rằng một hệ thống được dọn sạch những phần thừa sẽ tự nhiên chảy trơn tru hơn — giống như một dòng sông không bị chặn bởi rác trôi dạt.
