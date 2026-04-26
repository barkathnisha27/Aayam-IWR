import { services } from "@/data/mock";

const colors = {
  healthy: "hsl(var(--success))",
  warning: "hsl(var(--warning))",
  degraded: "hsl(var(--warning))",
  critical: "hsl(var(--destructive))",
};

// Simple force-positioned topology
const positions = [
  { id: "cdn-edge", x: 50, y: 50 },
  { id: "api-gateway", x: 200, y: 150 },
  { id: "auth-service", x: 80, y: 250 },
  { id: "user-service", x: 180, y: 320 },
  { id: "order-service", x: 360, y: 180 },
  { id: "payment-service", x: 520, y: 100 },
  { id: "inventory", x: 520, y: 260 },
  { id: "notifications", x: 680, y: 180 },
  { id: "search", x: 360, y: 340 },
  { id: "db-primary", x: 680, y: 340 },
  { id: "db-replica", x: 800, y: 280 },
  { id: "cache", x: 800, y: 80 },
];

const links: [string, string][] = [
  ["cdn-edge", "api-gateway"],
  ["api-gateway", "auth-service"],
  ["api-gateway", "user-service"],
  ["api-gateway", "order-service"],
  ["api-gateway", "search"],
  ["order-service", "payment-service"],
  ["order-service", "inventory"],
  ["order-service", "notifications"],
  ["order-service", "db-primary"],
  ["user-service", "db-primary"],
  ["payment-service", "cache"],
  ["db-primary", "db-replica"],
  ["inventory", "db-primary"],
  ["search", "cache"],
];

export function ServiceMap() {
  const byId = Object.fromEntries(positions.map((p) => [p.id, p]));
  const svc = Object.fromEntries(services.map((s) => [s.id, s]));

  return (
    <div className="relative w-full overflow-hidden rounded-lg bg-gradient-to-br from-muted/30 to-background grid-bg">
      <svg viewBox="0 0 880 400" className="w-full h-full" preserveAspectRatio="xMidYMid meet">
        <defs>
          <linearGradient id="link-grad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.3" />
            <stop offset="100%" stopColor="hsl(var(--accent))" stopOpacity="0.3" />
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="b" />
            <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
        </defs>

        {links.map(([a, b], i) => {
          const pa = byId[a], pb = byId[b];
          if (!pa || !pb) return null;
          const sa = svc[a], sb = svc[b];
          const isProblem = sa?.status === "critical" || sb?.status === "critical";
          return (
            <g key={i}>
              <line
                x1={pa.x} y1={pa.y} x2={pb.x} y2={pb.y}
                stroke={isProblem ? "hsl(var(--destructive))" : "url(#link-grad)"}
                strokeWidth={isProblem ? 2 : 1.5}
                strokeDasharray={isProblem ? "4 3" : undefined}
                opacity={isProblem ? 0.8 : 0.5}
              >
                {isProblem && (
                  <animate attributeName="stroke-dashoffset" from="0" to="-14" dur="0.6s" repeatCount="indefinite" />
                )}
              </line>
              {/* animated packet */}
              {!isProblem && (
                <circle r="2" fill="hsl(var(--primary))">
                  <animateMotion dur={`${3 + (i % 3)}s`} repeatCount="indefinite"
                    path={`M${pa.x},${pa.y} L${pb.x},${pb.y}`} />
                </circle>
              )}
            </g>
          );
        })}

        {positions.map((p) => {
          const s = svc[p.id];
          if (!s) return null;
          const color = colors[s.status as keyof typeof colors];
          const isCritical = s.status === "critical";
          return (
            <g key={p.id} className="cursor-pointer">
              {isCritical && (
                <circle cx={p.x} cy={p.y} r="22" fill={color} opacity="0.15">
                  <animate attributeName="r" from="18" to="32" dur="1.5s" repeatCount="indefinite" />
                  <animate attributeName="opacity" from="0.4" to="0" dur="1.5s" repeatCount="indefinite" />
                </circle>
              )}
              <circle
                cx={p.x} cy={p.y} r="14"
                fill="hsl(var(--card))"
                stroke={color}
                strokeWidth="2.5"
                filter={isCritical ? "url(#glow)" : undefined}
              />
              <circle cx={p.x} cy={p.y} r="5" fill={color} />
              <text x={p.x} y={p.y + 30} textAnchor="middle" className="fill-foreground" fontSize="10" fontWeight="600">
                {s.name}
              </text>
              <text x={p.x} y={p.y + 42} textAnchor="middle" className="fill-muted-foreground" fontSize="9">
                {s.latency}ms · {s.errorRate}%
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}
