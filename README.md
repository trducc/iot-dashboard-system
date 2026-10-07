# 🚀 Hệ thống Giám sát và Điều khiển thiết bị IoT

Chào mừng bạn đến với **Hệ thống Giám sát và Điều khiển thiết bị IoT** – Giải pháp công nghệ hiện đại, giao diện tinh gọn giúp theo dõi và quản lý các thiết bị thông minh.

## 📖 Giới thiệu
Dự án cung cấp một nền tảng Dashboard trực quan để quản lý theo thời gian thực (Real-time) các thông số cảm biến môi trường như:
- 🌡️ **Nhiệt độ** (Temperature)
- 💧 **Độ ẩm** (Humidity)
- ☀️ **Ánh sáng** (Light)

Đồng thời, hệ thống cho phép người dùng **điều khiển trực tiếp** các thiết bị phần cứng (như Bật/Tắt Đèn LED) từ xa với độ trễ cực thấp.

---

## 🛠 Công nghệ sử dụng
Dự án được xây dựng trên nền tảng Web hiện đại, đảm bảo hiệu năng cao và UX/UI chuẩn mực:
- **Framework:** Next.js (App Router), React 18
- **Styling:** Vanilla CSS (kết hợp các biến CSS chuẩn Design System), thiết kế Responsive & cố định layout 100vh.
- **Iconography:** Lucide-React
- **HTTP Client:** Axios
- **Notifications:** React Hot Toast

---

## ✨ Tính năng cốt lõi

Hệ thống được thiết kế với 4 phân hệ màn hình chính bám sát nhu cầu sử dụng thực tế:

1. **📊 Dashboard Tổng quan:**
   - Layout cố định chuẩn 100vh, chống cuộn tràn trang.
   - Thống kê biểu đồ trực quan, hiển thị các mốc thời gian chẵn (cách nhau 2 tiếng) mang lại không gian thông thoáng, sang trọng.
   - Các khối Action Card hỗ trợ thao tác Bật/Tắt đèn nhanh chóng.

2. **📈 Lịch sử Cảm biến (Sensor History):**
   - Bảng dữ liệu tự động dàn đều 100% diện tích không gian thừa.
   - Chức năng tìm kiếm linh hoạt kết hợp với bộ lọc (Filter) đa dạng (Thời gian, Trạng thái cảnh báo, Loại cảm biến).
   - Thanh phân trang (Pagination) cố định dưới cùng cực mượt mà.

3. **⚡ Lịch sử Bật/Tắt thiết bị (Device History):**
   - Lưu trữ toàn bộ log thao tác người dùng theo thời gian thực (VD: Admin / Trần Văn Đức).
   - Truy xuất nhanh chóng lịch sử điều khiển để phục vụ kiểm toán hoặc giám sát an toàn.

4. **👤 Hồ sơ Cá nhân (Profile):**
   - Giao diện tối giản, tập trung hiển thị Danh sách liên kết dự án (Figma, GitHub, Postman, Báo cáo PDF).
   - Hỗ trợ nút Sao chép (Copy) nhanh đường dẫn, tăng tối đa sự tiện dụng.

---

## 🚀 Hướng dẫn cài đặt

Bạn có thể dễ dàng thiết lập và chạy dự án ở môi trường Local chỉ với vài lệnh cơ bản:

### 1. Clone Source Code
```bash
git clone https://github.com/trducc/iot-dashboard-system.git
cd iot-dashboard-system/iot-frontend
```

### 2. Cài đặt các gói phụ thuộc (Dependencies)
```bash
npm install
# Hoặc yarn install / pnpm install
```

### 3. Khởi chạy Server Development
```bash
npm run dev
```

Sau khi terminal báo thành công, mở trình duyệt và truy cập: **`http://localhost:3000`** để trải nghiệm!

---
*Phát triển bởi Trần Văn Đức.*
