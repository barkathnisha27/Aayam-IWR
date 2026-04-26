// Mock data sources for WebPulse
export const services = [
  { id: "api-gateway", name: "API Gateway", status: "healthy", latency: 42, errorRate: 0.02 },
  { id: "auth-service", name: "Auth Service", status: "healthy", latency: 28, errorRate: 0.01 },
  { id: "payment-service", name: "Payment Service", status: "degraded", latency: 380, errorRate: 4.2 },
  { id: "user-service", name: "User Service", status: "healthy", latency: 55, errorRate: 0.05 },
  { id: "order-service", name: "Order Service", status: "critical", latency: 1240, errorRate: 18.6 },
  { id: "inventory", name: "Inventory", status: "healthy", latency: 65, errorRate: 0.1 },
  { id: "notifications", name: "Notifications", status: "warning", latency: 210, errorRate: 1.8 },
  { id: "search", name: "Search Engine", status: "healthy", latency: 90, errorRate: 0.3 },
  { id: "cdn-edge", name: "CDN Edge", status: "healthy", latency: 12, errorRate: 0.0 },
  { id: "db-primary", name: "DB Primary", status: "healthy", latency: 8, errorRate: 0.0 },
  { id: "db-replica", name: "DB Replica", status: "warning", latency: 145, errorRate: 0.5 },
  { id: "cache", name: "Redis Cache", status: "healthy", latency: 3, errorRate: 0.0 },
] as const;

export type IncidentSeverity = "critical" | "high" | "medium" | "low";
export type IncidentStatus = "active" | "investigating" | "mitigating" | "resolved";

export interface Incident {
  id: string;
  title: string;
  service: string;
  severity: IncidentSeverity;
  status: IncidentStatus;
  startedAt: string;
  duration: string;
  rootCause?: string;
  confidence?: number;
  impact: string;
  assignee?: string;
}

export const incidents: Incident[] = [
  {
    id: "INC-2451",
    title: "Order Service: 5xx spike on /checkout endpoint",
    service: "order-service",
    severity: "critical",
    status: "investigating",
    startedAt: "2 min ago",
    duration: "00:02:14",
    rootCause: "Database connection pool exhaustion in order-service v4.2.1",
    confidence: 94,
    impact: "12,400 users affected · $48k/hr revenue loss",
    assignee: "On-call: SRE Team",
  },
  {
    id: "INC-2450",
    title: "Payment Service: elevated latency p99 > 500ms",
    service: "payment-service",
    severity: "high",
    status: "mitigating",
    startedAt: "14 min ago",
    duration: "00:14:08",
    rootCause: "Stripe webhook retry storm overwhelming queue workers",
    confidence: 88,
    impact: "Payment success rate 92% (target 99.5%)",
    assignee: "Maya Chen",
  },
  {
    id: "INC-2449",
    title: "DB Replica lag exceeding 30s threshold",
    service: "db-replica",
    severity: "medium",
    status: "active",
    startedAt: "32 min ago",
    duration: "00:32:41",
    rootCause: "Long-running analytics query blocking replication",
    confidence: 76,
    impact: "Read consistency degraded for analytics dashboards",
    assignee: "Auto-Remediation",
  },
  {
    id: "INC-2448",
    title: "Notifications: SMS delivery delays via Twilio",
    service: "notifications",
    severity: "low",
    status: "investigating",
    startedAt: "1 hr ago",
    duration: "01:04:22",
    rootCause: "Upstream provider region us-west-2 throttling",
    confidence: 82,
    impact: "~3% of SMS notifications delayed >60s",
    assignee: "Platform Team",
  },
  {
    id: "INC-2447",
    title: "Search relevance regression after model deploy",
    service: "search",
    severity: "medium",
    status: "resolved",
    startedAt: "3 hr ago",
    duration: "00:48:11",
    rootCause: "Embedding index rebuild incomplete, served stale shards",
    confidence: 96,
    impact: "Search CTR dropped 22% during incident window",
    assignee: "ML Platform",
  },
  {
    id: "INC-2446",
    title: "Auth Service token refresh failing intermittently",
    service: "auth-service",
    severity: "high",
    status: "resolved",
    startedAt: "6 hr ago",
    duration: "00:18:55",
    rootCause: "JWT signing key rotation race condition",
    confidence: 99,
    impact: "0.4% of sessions logged out unexpectedly",
    assignee: "Security Team",
  },
];

export const kpiData = {
  totalIncidents: 2451,
  activeIncidents: 4,
  servicesMonitored: 247,
  mttd: "1m 12s",
  mttr: "18m 04s",
  aiConfidence: 94,
  systemHealth: 97.8,
  uptime: "99.982%",
};

// Time-series mock generators
export const generateTimeSeries = (points = 24, base = 100, variance = 30) =>
  Array.from({ length: points }, (_, i) => ({
    time: `${String(Math.floor(i / 1)).padStart(2, "0")}:00`,
    value: Math.round(base + Math.sin(i / 3) * variance + (Math.random() - 0.5) * variance * 0.7),
    errors: Math.round(Math.max(0, 5 + Math.sin(i / 2) * 4 + (Math.random() - 0.4) * 6)),
    latency: Math.round(80 + Math.cos(i / 4) * 30 + Math.random() * 20),
  }));

export const incidentTrend = generateTimeSeries(24, 12, 8).map((d, i) => ({
  hour: `${i}h`,
  incidents: Math.max(0, d.value - 90),
  resolved: Math.max(0, d.value - 95),
}));

export const severityDistribution = [
  { name: "Critical", value: 4, color: "hsl(var(--critical))" },
  { name: "High", value: 11, color: "hsl(var(--high))" },
  { name: "Medium", value: 28, color: "hsl(var(--medium))" },
  { name: "Low", value: 47, color: "hsl(var(--low))" },
];

export const heatmapData = Array.from({ length: 7 }, (_, day) =>
  Array.from({ length: 24 }, (_, hour) => ({
    day,
    hour,
    value: Math.round(Math.random() * 100),
  }))
).flat();

export const logStream = [
  { ts: "14:32:18.421", level: "ERROR", service: "order-service", msg: "ConnectionPoolTimeoutException: Timed out waiting for connection from pool" },
  { ts: "14:32:18.388", level: "ERROR", service: "order-service", msg: "Failed to acquire JDBC connection after 5000ms" },
  { ts: "14:32:18.201", level: "WARN", service: "payment-service", msg: "Stripe webhook retry attempt 4/5 for evt_1Q8x..." },
  { ts: "14:32:17.998", level: "INFO", service: "api-gateway", msg: "Routed POST /v2/checkout → order-service [503]" },
  { ts: "14:32:17.812", level: "ERROR", service: "order-service", msg: "Circuit breaker OPEN for downstream:inventory" },
  { ts: "14:32:17.654", level: "WARN", service: "db-replica", msg: "Replication lag: 32.4s (threshold: 30s)" },
  { ts: "14:32:17.401", level: "INFO", service: "auth-service", msg: "Token refresh succeeded user_id=u_8x2k1" },
  { ts: "14:32:17.288", level: "ERROR", service: "order-service", msg: "Saga rollback initiated for order_id=ord_a82kx" },
  { ts: "14:32:17.102", level: "WARN", service: "notifications", msg: "Twilio queue depth: 1,240 (alert threshold 1,000)" },
  { ts: "14:32:16.901", level: "INFO", service: "cdn-edge", msg: "Cache HIT ratio 98.4% (last 5m)" },
];

export const traces = [
  { name: "POST /v2/checkout", duration: 1240, status: "error", spans: 14 },
  { name: "GET /v2/products", duration: 84, status: "ok", spans: 6 },
  { name: "POST /v2/auth/refresh", duration: 28, status: "ok", spans: 3 },
  { name: "GET /v2/orders/:id", duration: 320, status: "warn", spans: 8 },
  { name: "POST /v2/payments/intent", duration: 410, status: "warn", spans: 11 },
];

export const teamMembers = [
  { name: "Maya Chen", role: "SRE Lead", status: "online", avatar: "MC" },
  { name: "Arjun Patel", role: "DevOps", status: "online", avatar: "AP" },
  { name: "Sofia Reyes", role: "Backend", status: "away", avatar: "SR" },
  { name: "Liam O'Brien", role: "Platform", status: "online", avatar: "LO" },
  { name: "Yuki Tanaka", role: "Security", status: "offline", avatar: "YT" },
];

export const aiHypotheses = [
  {
    rank: 1,
    title: "Database connection pool exhaustion",
    confidence: 94,
    evidence: [
      "37x increase in `ConnectionPoolTimeoutException` in last 4 min",
      "order-service pool max 50, currently saturated at 50/50",
      "Correlates with deploy of order-service v4.2.1 at 14:28 UTC",
      "Similar pattern observed in INC-2102 (resolved by pool size increase)",
    ],
    suggestedFix: "Scale order-service pool to 200 + investigate connection leak in OrderRepository.findByUser()",
  },
  {
    rank: 2,
    title: "Downstream inventory service circuit breaker open",
    confidence: 71,
    evidence: [
      "Circuit breaker opened at 14:31:42 UTC",
      "inventory.getStock() p99 spiked from 45ms to 2.1s",
      "Could be cascading failure rather than root cause",
    ],
    suggestedFix: "Verify inventory health; consider raising circuit breaker threshold temporarily",
  },
  {
    rank: 3,
    title: "Network partition between AZ us-east-1a and 1b",
    confidence: 34,
    evidence: [
      "Slight uptick in cross-AZ latency (avg 4ms → 11ms)",
      "Not consistent with error pattern",
    ],
    suggestedFix: "Check VPC flow logs and AWS health dashboard for region events",
  },
];

export const integrations = [
  { name: "Datadog", status: "connected", events: "2.4M/day", icon: "🐶" },
  { name: "PagerDuty", status: "connected", events: "Active", icon: "📟" },
  { name: "Slack", status: "connected", events: "#incidents", icon: "💬" },
  { name: "GitHub", status: "connected", events: "12 repos", icon: "🐙" },
  { name: "AWS CloudWatch", status: "connected", events: "47 streams", icon: "☁️" },
  { name: "Stripe", status: "connected", events: "Webhooks", icon: "💳" },
  { name: "Sentry", status: "connected", events: "8.1k errors", icon: "🛡️" },
  { name: "Jira", status: "disconnected", events: "—", icon: "📋" },
];
