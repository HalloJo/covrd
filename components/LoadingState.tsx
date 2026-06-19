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
      className="bg-[#E8E3DB] animate-pulse-soft"
      style={{ height, width, borderRadius, animationDelay: delay }}
    />
  );
}

function SkeletonCard({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-surface border border-border rounded-2xl p-7 flex flex-col gap-4">
      {children}
    </div>
  );
}

export default function LoadingState() {
  return (
    <div className="flex flex-col gap-6">
      {/* Score banner skeleton */}
      <div className="bg-[#D5E8DC] rounded-2xl p-8 flex items-center gap-6">
        <SkeletonBlock height="80px" width="80px" borderRadius="9999px" />
        <div className="flex-1 flex flex-col gap-2.5">
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
        <div className="flex flex-wrap gap-2">
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
          <div key={i} className="flex gap-3 items-start">
            <SkeletonBlock
              height="28px"
              width="28px"
              borderRadius="9999px"
              delay={`${i * 0.1}s`}
            />
            <div className="flex-1 flex flex-col gap-2">
              <SkeletonBlock height="16px" delay={`${i * 0.1}s`} />
              <SkeletonBlock
                height="16px"
                width="80%"
                delay={`${i * 0.1 + 0.05}s`}
              />
            </div>
          </div>
        ))}
      </SkeletonCard>
    </div>
  );
}
