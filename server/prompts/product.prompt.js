function buildProductPrompt() {
  return `
# PRODUCT LOCK

Đây là quy tắc quan trọng nhất.

Sản phẩm trong ảnh tham chiếu phải được giữ nguyên tuyệt đối.

Không được phép thay đổi:

- Màu sắc.
- Logo.
- Họa tiết.
- Chất liệu.
- Form dáng.
- Đường may.
- Kích thước tương đối.
- Cấu trúc thiết kế.
- Cổ áo.
- Tay áo.
- Chiều dài.
- Túi áo.
- Khóa kéo.
- Cúc áo.
- Hình in.
- Chữ in.
- Thương hiệu.
- Nhãn mác.

Không được:

- Tự thêm phụ kiện.
- Tự bỏ chi tiết.
- Tự thay đổi thiết kế.
- Tự đổi sang sản phẩm khác.
- Tự tạo họa tiết mới.
- Tự thay đổi chất liệu.

Mức độ ưu tiên cao nhất:

PRODUCT ACCURACY > VISUAL BEAUTY

Nếu có xung đột giữa việc làm đẹp hình ảnh và giữ đúng sản phẩm,
luôn ưu tiên giữ đúng sản phẩm.
`;
}

module.exports = buildProductPrompt;