import { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { ArrowDown, ArrowUp } from "lucide-react";

interface KPICardProps {
  label: string;
  value: string | number;
  hint?: string;
  icon?: ReactNode;
  trend?: number;
  variant?: "default" | "success" | "warning" | "destructive" | "primary";
  className?: string;
}

const variantStyles = {
  default: "from-muted/40 to-muted/10 text-foreground",
  primary: "from-primary/15 to-primary/5 text-primary",
  success: "from-success/15 to-success/5 text-success",
  warning: "from-warning/15 to-warning/5 text-warning",
  destructive: "from-destructive/15 to-destructive/5 text-destructive",
};

export function KPICard({
  label,
  value,
  hint,
  icon,
  trend,
  variant = "default",
  className,
}: KPICardProps) {
  return (
    <div
      className={cn(
        "group relative overflow-hidden rounded-xl border border-border bg-card p-5 transition-all hover:shadow-lg hover:-translate-y-0.5",
        className,
      )}
    >
      <div
        className={cn(
          "absolute inset-0 bg-gradient-to-br opacity-60 group-hover:opacity-100 transition-opacity",
          variantStyles[variant],
        )}
      />
      <div className="relative">
        <div className="flex items-start justify-between mb-3">
          <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
            {label}
          </span>
          {icon && (
            <div
              className={cn(
                "h-8 w-8 rounded-lg grid place-items-center bg-background/60 border border-border/60",
                variantStyles[variant].split(" ").pop(),
              )}
            >
              {icon}
            </div>
          )}
        </div>
        <div className="flex items-baseline gap-2">
          <span className="text-3xl font-bold tracking-tight text-foreground">{value}</span>
          {trend !== undefined && (
            <span
              className={cn(
                "text-xs font-semibold inline-flex items-center gap-0.5",
                trend > 0 ? "text-success" : "text-destructive",
              )}
            >
              {trend > 0 ? <ArrowUp className="h-3 w-3" /> : <ArrowDown className="h-3 w-3" />}
              {Math.abs(trend)}%
            </span>
          )}
        </div>
        {hint && <p className="mt-1 text-xs text-muted-foreground">{hint}</p>}
      </div>
    </div>
  );
}
