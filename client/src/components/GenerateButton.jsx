export default function GenerateButton({
  loading = false,
  disabled = false,
  onClick,
}) {
  return (
    <button
      onClick={onClick}
      disabled={loading || disabled}
      style={{
        marginLeft: "auto",
        padding: "12px 32px",
        minWidth: 180,

        border: "none",
        borderRadius: 10,

        background: loading ? "#888" : "#f5b301",
        color: "#111",

        fontSize: 16,
        fontWeight: 700,

        cursor: loading || disabled ? "not-allowed" : "pointer",

        transition: "0.2s",
      }}
    >
      {loading ? "Generating..." : "🚀 Generate"}
    </button>
  );
}