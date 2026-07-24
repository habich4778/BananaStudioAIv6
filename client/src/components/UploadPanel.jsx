export default function UploadPanel({
  model,
  products,
  onModelChange,
  onProductsChange,
}) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 20,
        padding: 20,
        borderTop: "1px solid #333",
        background: "#202020",
        flexWrap: "wrap",
      }}
    >
      {/* MODEL */}

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 8,
        }}
      >
        <div
          style={{
            fontWeight: 600,
          }}
        >
          👤 Người mẫu
        </div>

        <input
          type="file"
          accept="image/*"
          onChange={(e) => onModelChange(e.target.files[0])}
        />

        <small
          style={{
            color: "#999",
          }}
        >
          {model ? model.name : "Chưa chọn ảnh"}
        </small>
      </div>

      {/* PRODUCTS */}

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 8,
        }}
      >
        <div
          style={{
            fontWeight: 600,
          }}
        >
          👕 Sản phẩm
        </div>

        <input
          type="file"
          accept="image/*"
          multiple
          onChange={(e) => onProductsChange(Array.from(e.target.files))}
        />

        <small
          style={{
            color: "#999",
          }}
        >
          {products.length === 0
            ? "Chưa có sản phẩm"
            : `${products.length} sản phẩm đã chọn`}
        </small>
      </div>
    </div>
  );
}