export default function GeneratePanel({
  loading = false,
  disabled = false,
  onGenerate,
}) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        padding: "24px 20px 40px",
      }}
    >
      <button
        onClick={onGenerate}
        disabled={loading || disabled}
        style={{
          minWidth: 260,
          height: 56,
          border: "none",
          borderRadius: 12,
          fontSize: 18,
          fontWeight: 700,
          cursor:
            loading || disabled
              ? "not-allowed"
              : "pointer",
          background:
            loading || disabled
              ? "#666"
              : "#f5b301",
          color: "#111",
          transition: "0.2s",
        }}
      >
        {loading
          ? "⏳ Đang tạo..."
          : "🚀 Generate"}
      </button>
    </div>
  );
}