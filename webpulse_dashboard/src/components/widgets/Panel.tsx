import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface PanelProps {
  title?: ReactNode;
  subtitle?: ReactNode;
  actions?: ReactNode;
  children: ReactNode;
  className?: string;
  noPadding?: boolean;
}

export function Panel({ title, subtitle, actions, children, className, noPadding }: PanelProps) {
  return (
    <div className={cn("rounded-xl border border-border bg-card shadow-soft overflow-hidden", className)}>
      {(title || actions) && (
        <div className="flex items-center justify-between gap-3 px-5 py-3.5 border-b border-border">
          <div className="min-w-0">
            {title && <h3 className="text-sm font-semibold text-foreground truncate">{title}</h3>}
            {subtitle && <p className="text-xs text-muted-foreground mt-0.5 truncate">{subtitle}</p>}
          </div>
          {actions && <div className="flex items-center gap-2 shrink-0">{actions}</div>}
        </div>
      )}
      <div className={cn(!noPadding && "p-5")}>{children}</div>
    </div>
  );
}
