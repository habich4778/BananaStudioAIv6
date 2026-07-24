export default function AIControlPanel({
  productLock = true,
  characterMode,
  sceneMode,
  onCharacterModeChange,
  onSceneModeChange,
}) {
  return (
    <div
      style={{
        padding: 24,
        display: "flex",
        flexDirection: "column",
        gap: 28,
        color: "#fff",
      }}
    >
      <h2
        style={{
          margin: 0,
        }}
      >
        AI Control
      </h2>

      {/* PRODUCT LOCK */}

      <div>
        <div
          style={{
            fontWeight: 700,
            color: "#f5b301",
            marginBottom: 10,
          }}
        >
          🔒 Product Lock
        </div>

        <div
          style={{
            fontSize: 14,
            lineHeight: 1.7,
            color: "#cfcfcf",
          }}
        >
          <div>
            {productLock ? "✅ Luôn bật" : "❌"}
          </div>

          <div>• Giữ nguyên màu sắc</div>
          <div>• Giữ nguyên form</div>
          <div>• Giữ nguyên logo</div>
          <div>• Giữ nguyên họa tiết</div>
          <div>• Giữ nguyên chất liệu</div>
        </div>
      </div>

      {/* CHARACTER */}

      <div>
        <div
          style={{
            fontWeight: 700,
            marginBottom: 10,
          }}
        >
          👤 Character
        </div>

        <label
          style={{
            display: "block",
            marginBottom: 8,
            cursor: "pointer",
          }}
        >
          <input
            type="radio"
            name="character-mode"
            checked={characterMode === "keep"}
            onChange={() => onCharacterModeChange("keep")}
          />

          {" "}Giữ nguyên 100%
        </label>

        <label
          style={{
            display: "block",
            cursor: "pointer",
          }}
        >
          <input
            type="radio"
            name="character-mode"
            checked={characterMode === "creative"}
            onChange={() => onCharacterModeChange("creative")}
          />

          {" "}AI sáng tạo
        </label>
      </div>

      {/* SCENE */}

      <div>
        <div
          style={{
            fontWeight: 700,
            marginBottom: 10,
          }}
        >
          🏞 Scene
        </div>

        <label
          style={{
            display: "block",
            marginBottom: 8,
            cursor: "pointer",
          }}
        >
          <input
            type="radio"
            name="scene-mode"
            checked={sceneMode === "keep"}
            onChange={() => onSceneModeChange("keep")}
          />

          {" "}Giữ nguyên
        </label>

        <label
          style={{
            display: "block",
            cursor: "pointer",
          }}
        >
          <input
            type="radio"
            name="scene-mode"
            checked={sceneMode === "creative"}
            onChange={() => onSceneModeChange("creative")}
          />

          {" "}AI sáng tạo
        </label>
      </div>
    </div>
  );
}