function buildScenePrompt(mode = "keep") {
  if (mode === "creative") {
    return `
# SCENE

AI được phép sáng tạo bối cảnh.

Có thể thay đổi:

- Địa điểm
- Ánh sáng
- Góc máy
- Background
- Đạo cụ
- Màu sắc tổng thể
- Thời tiết
- Phong cách chụp

Ưu tiên tạo bối cảnh chuyên nghiệp,
phù hợp với sản phẩm thời trang.
`;
  }

  return `
# SCENE

Giữ nguyên bối cảnh.

- Không thay đổi background.
- Không thay đổi góc chụp.
- Không thay đổi ánh sáng.
- Không thêm đạo cụ.
- Không thay đổi môi trường.
`;
}

module.exports = buildScenePrompt;