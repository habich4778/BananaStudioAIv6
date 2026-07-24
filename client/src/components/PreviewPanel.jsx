const THUMB_SIZE = 150;

function ImageCard({ title, image }) {
  return (
    <div className="preview-card">
      <div
        className="preview-thumb"
        style={{
          width: THUMB_SIZE,
          height: THUMB_SIZE,
        }}
      >
        {image ? (
          <img src={image.preview} alt={title} />
        ) : (
          <div className="preview-placeholder">
            Chưa có ảnh
          </div>
        )}
      </div>

      <div className="preview-info">
        <div className="preview-title">{title}</div>

        <div className="preview-file">
          {image ? image.name : "Chưa chọn file"}
        </div>
      </div>
    </div>
  );
}

export default function PreviewPanel({
  model,
  products = [],
}) {
  return (
    <div className="preview-panel">
      <h2 className="preview-heading">Preview</h2>

      {/* ================= MODEL ================= */}

      <ImageCard
        title="👤 Người mẫu"
        image={model}
      />

      {/* ================= PRODUCTS ================= */}

      <div className="preview-products">
        <div className="preview-section-title">
          👕 Sản phẩm
        </div>

        {products.length === 0 ? (
          <ImageCard
            title=""
            image={null}
          />
        ) : (
          <div className="preview-products-grid">
            {products.map((product) => (
              <div
                key={product.id}
                className="preview-product-item"
              >
                <div
                  className="preview-thumb"
                  style={{
                    width: THUMB_SIZE,
                    height: THUMB_SIZE,
                  }}
                >
                  <img
                    src={product.preview}
                    alt={product.name}
                  />
                </div>

                <div className="preview-file">
                  {product.name}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}