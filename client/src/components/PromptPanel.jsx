import "./PromptPanel.css";

function PromptPanel({
  keepCharacter,
  setKeepCharacter,
  keepScene,
  setKeepScene,
}) {
  return (
    <div className="prompt-panel">

      <h2>⚙ Banana AI Control</h2>

      <div className="option">

        <label>

          <input
            type="checkbox"
            checked={keepCharacter}
            onChange={(e) =>
              setKeepCharacter(e.target.checked)
            }
          />

          👤 Giữ nguyên người mẫu

        </label>

      </div>

      <div className="option">

        <label>

          <input
            type="checkbox"
            checked={keepScene}
            onChange={(e) =>
              setKeepScene(e.target.checked)
            }
          />

          🏞 Giữ nguyên bối cảnh

        </label>

      </div>

      <div className="lock-box">

        🔒 Product Lock

        <br />

        <small>
          Luôn bật để giữ nguyên sản phẩm.
        </small>

      </div>

    </div>
  );
}

export default PromptPanel;