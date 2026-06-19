"use client";

function SkeletonBlock({
  height,
  width = "100%",
  borderRadius = "8px",
  delay = "0s",
}: {
  height: string;
  width?: string;
  borderRadius?: string;
  delay?: string;
}) {
  return (
    <div
      style={{
        height,
        width,
        backgroundColor: "#E8E3DB",
        borderRadius,
        opacity: 1,
        animation: "var(--animate-pulse-soft)",
        animationDelay: delay,
      }}
    />
  );
}

function SkeletonCard({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        backgroundColor: "var(--color-surface)",
        border: "1px solid var(--color-border)",
        borderRadius: "16px",
        padding: "28px",
        display: "flex",
        flexDirection: "column",
        gap: "16px",
      }}
    >
      {children}
    </div>
  );
}

export default function LoadingState() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
      {/* Score banner skeleton */}
      <div
        style={{
          backgroundColor: "#D5E8DC",
          borderRadius: "16px",
          padding: "32px",
          display: "flex",
          alignItems: "center",
          gap: "24px",
        }}
      >
        <SkeletonBlock height="80px" width="80px" borderRadius="9999px" />
        <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "10px" }}>
          <SkeletonBlock height="28px" width="200px" />
          <SkeletonBlock height="16px" width="300px" delay="0.1s" />
        </div>
      </div>

      {/* Cover letter skeleton */}
      <SkeletonCard>
        <SkeletonBlock height="24px" width="220px" />
        <SkeletonBlock height="16px" delay="0.05s" />
        <SkeletonBlock height="16px" width="90%" delay="0.1s" />
        <SkeletonBlock height="16px" delay="0.15s" />
        <SkeletonBlock height="16px" width="85%" delay="0.2s" />
        <SkeletonBlock height="16px" delay="0.25s" />
        <SkeletonBlock height="16px" width="75%" delay="0.3s" />
      </SkeletonCard>

      {/* Keywords skeleton */}
      <SkeletonCard>
        <SkeletonBlock height="24px" width="240px" />
        <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
          {[80, 110, 95, 130, 70, 100].map((w, i) => (
            <SkeletonBlock
              key={i}
              height="32px"
              width={`${w}px`}
              borderRadius="9999px"
              delay={`${i * 0.05}s`}
            />
          ))}
        </div>
      </SkeletonCard>

      {/* Tips skeleton */}
      <SkeletonCard>
        <SkeletonBlock height="24px" width="280px" />
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            style={{ display: "flex", gap: "12px", alignItems: "flex-start" }}
          >
            <SkeletonBlock
              height="28px"
              width="28px"
              borderRadius="9999px"
              delay={`${i * 0.1}s`}
            />
            <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "8px" }}>
              <SkeletonBlock height="16px" delay={`${i * 0.1}s`} />
              <SkeletonBlock height="16px" width="80%" delay={`${i * 0.1 + 0.05}s`} />
            </div>
          </div>
        ))}
      </SkeletonCard>
    </div>
  );
}
