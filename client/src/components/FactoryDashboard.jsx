export default function FactoryDashboard({
  result,
  status,
}) {
  if (!result && !status) return null;

  const statistics =
    status?.statistics || {};

  const jobs =
    status?.jobs ||
    result?.jobs ||
    [];

  const total =
    statistics.total ??
    jobs.length;

  const completed =
    statistics.completed ??
    jobs.filter(
      (j) => j.status === "completed"
    ).length;

  const running =
    statistics.running ??
    jobs.filter(
      (j) => j.status === "running"
    ).length;

  const waiting =
    statistics.waiting ??
    jobs.filter(
      (j) => j.status === "waiting"
    ).length;

  const failed =
    statistics.failed ??
    jobs.filter(
      (j) => j.status === "failed"
    ).length;

  const percent =
    total === 0
      ? 0
      : Math.round(
          (completed / total) * 100
        );

  const currentJob =
    jobs.find(
      (j) => j.status === "running"
    ) || null;

  return (
    <div
      style={{
        background: "#1b1b1b",
        border: "1px solid #333",
        borderRadius: 14,
        padding: 24,
        marginBottom: 25,
      }}
    >
      <h2
        style={{
          color: "#fff",
          marginTop: 0,
          marginBottom: 20,
        }}
      >
        🏭 Banana Factory
      </h2>

      <div
        style={{
          background: "#2d2d2d",
          height: 18,
          borderRadius: 20,
          overflow: "hidden",
        }}
      >
        <div
          style={{
            width: `${percent}%`,
            height: "100%",
            background: "#52d273",
            transition: "width .4s",
          }}
        />
      </div>

      <div
        style={{
          color: "#ddd",
          marginTop: 10,
          marginBottom: 25,
        }}
      >
        {completed} / {total} Completed ({percent}%)
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(4,1fr)",
          gap: 15,
        }}
      >
        <Card
          title="Completed"
          value={completed}
          color="#66ff99"
        />

        <Card
          title="Running"
          value={running}
          color="#ffd966"
        />

        <Card
          title="Waiting"
          value={waiting}
          color="#7ec8ff"
        />

        <Card
          title="Failed"
          value={failed}
          color="#ff7777"
        />
      </div>

      <div
        style={{
          marginTop: 25,
          padding: 18,
          background: "#111",
          borderRadius: 10,
          border: "1px solid #333",
        }}
      >
        <div
          style={{
            color: "#bbb",
            marginBottom: 12,
          }}
        >
          Factory Status
        </div>

        <div
          style={{
            color:
              statistics.status ===
              "running"
                ? "#ffd966"
                : statistics.status ===
                  "completed"
                ? "#66ff99"
                : "#aaa",
            fontWeight: 700,
            fontSize: 18,
          }}
        >
          {statistics.status ||
            "idle"}
        </div>

        <div
          style={{
            marginTop: 12,
            color: "#888",
          }}
        >
          Current Job ID:
          {" "}
          {statistics.currentJobId ??
            "-"}
        </div>
      </div>

      <div
        style={{
          marginTop: 25,
          padding: 18,
          borderRadius: 10,
          background: "#111",
          border: "1px solid #333",
        }}
      >
        <div
          style={{
            color: "#bbb",
            marginBottom: 10,
          }}
        >
          Current Running Job
        </div>

        {currentJob ? (
          <>
            <div
              style={{
                color: "#fff",
                fontWeight: 700,
                fontSize: 18,
              }}
            >
              {currentJob.productName}
            </div>

            <div
              style={{
                marginTop: 8,
                color: "#ffd966",
              }}
            >
              Progress:
              {" "}
              {currentJob.progress}%
            </div>

            <div
              style={{
                marginTop: 12,
                color: "#aaa",
                fontSize: 14,
              }}
            >
              🧠 {currentJob.brainStatus}
              {" | "}
              🖼 {currentJob.imageStatus}
              {" | "}
              🎬 {currentJob.videoStatus}
            </div>
          </>
        ) : (
          <div
            style={{
              color: "#888",
            }}
          >
            Không có Job đang chạy.
          </div>
        )}
      </div>
    </div>
  );
}

function Card({
  title,
  value,
  color,
}) {
  return (
    <div
      style={{
        background: "#111",
        border: "1px solid #333",
        borderRadius: 10,
        padding: 18,
        textAlign: "center",
      }}
    >
      <div
        style={{
          color: "#999",
          marginBottom: 8,
        }}
      >
        {title}
      </div>

      <div
        style={{
          color,
          fontSize: 28,
          fontWeight: 700,
        }}
      >
        {value}
      </div>
    </div>
  );
}