function buildCharacterPrompt(mode = "keep") {
  if (mode === "creative") {
    return `
# CHARACTER

AI được phép sáng tạo:

- Có thể thay đổi biểu cảm.
- Có thể thay đổi tư thế.
- Có thể thay đổi góc chụp.
- Có thể thay đổi kiểu tóc.
- Có thể thay đổi makeup.

Nhưng vẫn phải giữ đúng người trong ảnh.
`;
  }

  return `
# CHARACTER

Giữ nguyên 100%.

- Không đổi khuôn mặt.
- Không đổi vóc dáng.
- Không đổi màu da.
- Không đổi kiểu tóc.
- Không đổi biểu cảm nếu không cần.
- Không đổi giới tính.
- Không tạo người mới.
`;
}

module.exports = buildCharacterPrompt;