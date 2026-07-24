export default function PlatformCard({
  platform,
  prompt,
}) {
  const openWebsite = () => {
    if (platform.url) {
      window.open(platform.url, "_blank");
    }
  };

  const copyPrompt = async () => {
    if (!prompt) return;

    await navigator.clipboard.writeText(prompt);

    alert("Đã copy Prompt.");
  };

  return (
    <div
      style={{
        border: "1px solid #333",
        borderRadius: 12,
        padding: 16,
        background: "#181818",
        marginTop: 16,
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 12,
        }}
      >
        <div>
          <div
            style={{
              color: platform.color,
              fontWeight: 700,
              fontSize: 18,
            }}
          >
            {platform.name}
          </div>

          <div
            style={{
              color: "#888",
              marginTop: 4,
            }}
          >
            {platform.type.toUpperCase()}
          </div>
        </div>

        <div
          style={{
            color:
              platform.status === "ready"
                ? "#65ff98"
                : "#ffd966",
            fontWeight: 700,
          }}
        >
          {platform.status}
        </div>
      </div>

      <div
        style={{
          display: "flex",
          gap: 12,
          flexWrap: "wrap",
        }}
      >
        <button
          onClick={copyPrompt}
          style={{
            padding: "10px 18px",
            border: "none",
            borderRadius: 8,
            cursor: "pointer",
            background: "#ffb000",
            fontWeight: 700,
          }}
        >
          📋 Copy Prompt
        </button>

        <button
          onClick={openWebsite}
          disabled={!platform.url}
          style={{
            padding: "10px 18px",
            border: "none",
            borderRadius: 8,
            cursor: platform.url ? "pointer" : "default",
            background: platform.url
              ? "#00d084"
              : "#555",
            color: "#fff",
            fontWeight: 700,
          }}
        >
          🌐 Open Website
        </button>
      </div>
    </div>
  );
}