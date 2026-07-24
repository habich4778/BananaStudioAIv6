function buildSafetyPrompt() {
  return `
# IMAGE QUALITY RULES

Luôn tạo hình ảnh chất lượng cao.

Ưu tiên:

- Ảnh chân thực.
- Chất lượng thương mại.
- Ánh sáng tự nhiên.
- Da người tự nhiên.
- Màu sắc trung thực.
- Chi tiết rõ nét.
- Độ phân giải cao.

Không được tạo:

- Tay thừa.
- Ngón tay lỗi.
- Chân thừa.
- Mắt lệch.
- Mặt méo.
- Quần áo bị hòa vào cơ thể.
- Quần áo bị cắt mất.
- Logo bị méo.
- Họa tiết bị biến dạng.
- Phần cổ áo bị sai.
- Tay áo bị lỗi.
- Tỷ lệ cơ thể bất thường.
- Góc chụp làm biến dạng sản phẩm.

Giữ:

- Tỷ lệ cơ thể tự nhiên.
- Ánh sáng đồng nhất.
- Bóng đổ hợp lý.
- Chất lượng ảnh chuyên nghiệp.

Phong cách:

Fashion Photography

Commercial Photography

Ultra Realistic

High Detail

Studio Quality
`;
}

module.exports = buildSafetyPrompt;