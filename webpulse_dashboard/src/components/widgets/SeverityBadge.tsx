import { cn } from "@/lib/utils";

interface SeverityBadgeProps {
  severity: "critical" | "high" | "medium" | "low";
  className?: string;
}

const config = {
  critical: { bg: "bg-critical/10", text: "text-critical", border: "border-critical/30", label: "Critical" },
  high: { bg: "bg-high/10", text: "text-high", border: "border-high/30", label: "High" },
  medium: { bg: "bg-medium/10", text: "text-medium", border: "border-medium/30", label: "Medium" },
  low: { bg: "bg-low/10", text: "text-low", border: "border-low/30", label: "Low" },
};

export function SeverityBadge({ severity, className }: SeverityBadgeProps) {
  const c = config[severity];
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md border text-[10px] font-bold uppercase tracking-wider",
        c.bg,
        c.text,
        c.border,
        className,
      )}
    >
      <span className={cn("h-1.5 w-1.5 rounded-full", c.bg.replace("/10", ""))} style={{ background: `hsl(var(--${severity}))` }} />
      {c.label}
    </span>
  );
}

export function StatusBadge({ status }: { status: string }) {
  const map: Record<string, { color: string; bg: string }> = {
    active: { color: "text-destructive", bg: "bg-destructive/10 border-destructive/30" },
    investigating: { color: "text-high", bg: "bg-high/10 border-high/30" },
    mitigating: { color: "text-warning", bg: "bg-warning/10 border-warning/30" },
    resolved: { color: "text-success", bg: "bg-success/10 border-success/30" },
    healthy: { color: "text-success", bg: "bg-success/10 border-success/30" },
    degraded: { color: "text-warning", bg: "bg-warning/10 border-warning/30" },
    warning: { color: "text-warning", bg: "bg-warning/10 border-warning/30" },
    critical: { color: "text-destructive", bg: "bg-destructive/10 border-destructive/30" },
  };
  const c = map[status] ?? map.active;
  return (
    <span className={cn("inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md border text-[10px] font-semibold uppercase tracking-wider", c.color, c.bg)}>
      <span className={cn("h-1.5 w-1.5 rounded-full", c.color.replace("text-", "bg-"))} />
      {status}
    </span>
  );
}
