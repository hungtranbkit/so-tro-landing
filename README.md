# Sổ Trọ — landing công khai và hướng dẫn dùng thử

**Landing public:** https://sotro.mesflow.net/ (dự phòng https://hungtranbkit.github.io/so-tro-landing/)  
**Ứng dụng web demo mới:** https://sotro-moi.mesflow.net/  
**Liên hệ tư vấn và yêu cầu bổ sung tính năng:** Zalo **0942 591 888**, https://zalo.me/0942591888  
**Quyền riêng tư:** https://sotro.mesflow.net/quyen-rieng-tu.html

## Cập nhật 30/10/2026

Trang giới thiệu tĩnh responsive dành cho chủ trọ nhỏ, gồm:
- Tính năng và quy trình: phòng và người ở, điện nước, hóa đơn/phụ phí, VietQR/công nợ, Zalo thủ công, hợp đồng và lưu bản ký có mã hóa.
- **Clip hướng dẫn hoạt họa 60 giây** với 6 bước, điều khiển phát/tạm dừng, chuyển chương và phụ đề Việt. Đây là hoạt họa minh họa bằng dữ liệu mẫu, **chưa phải video quay màn hình thực tế**.
- Bộ tính phí minh họa tính ngay trên trình duyệt, không gửi dữ liệu lên server.
- Hỏi đáp về giá, Gemini, Zalo, hợp đồng, dữ liệu thật và yêu cầu phát triển riêng.
- Liên hệ Zalo/tel 0942591888. Form yêu cầu chỉ soạn thông điệp và **chỉ sao chép vào clipboard khi người dùng bấm**, không có API, không thu thập nội dung hay email.

## Giới hạn

Landing và bản web demo mới **không** phải bản thương mại được duyệt để lưu dữ liệu người thuê thật hoặc ảnh CCCD. Bản demo mới dùng dữ liệu hư cấu; đăng ký công khai đang khóa. Tính năng Gemini live tắt, Android offline chưa có nghiệm thu thiết bị thật. Zalo hiện là chia sẻ thủ công, không có Zalo OA tự nhắn hoặc xác nhận ngân hàng. Liên hệ admin có thể trao đổi về chi phí/phạm vi phát triển theo yêu cầu, không cam kết triển khai miễn phí.

Trang không sử dụng tracker/analytics cookie. Thông báo quyền riêng tư nêu rõ Zalo là dịch vụ bên ngoài.

## Xuất bản và đồng bộ nguồn

GitHub Pages dùng `main` của repo public này với custom domain `sotro.mesflow.net`. Nguồn được mirror từ `landing/` trong repo sản phẩm private `hungtranbkit/so-tro`. Không đưa database, API key, ảnh người thuê hay mã nguồn ứng dụng riêng tư vào landing public.

Các file: `index.html`, `styles.css`, `main.js` (calculator + menu), `guide.js` (clip minh họa và form soạn yêu cầu), `quyen-rieng-tu.html`, `CNAME`, favicon/OG images.

QA cần thiết khi thay đổi: HTML/CSS/JS không lỗi, phát/tạm dừng/chọn bước, clipboard fallback, liên kết Zalo, menu mobile, 320/390/430/1366 px, HTTPS/canonical, privacy page, và kiểm tra demo URL.
