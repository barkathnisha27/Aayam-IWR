import { useEffect, useState } from "react";
import { logStream } from "@/data/mock";
import { cn } from "@/lib/utils";

const levelColor: Record<string, string> = {
  ERROR: "text-destructive bg-destructive/10",
  WARN: "text-warning bg-warning/10",
  INFO: "text-info bg-info/10",
  DEBUG: "text-muted-foreground bg-muted",
};

export function LogStream() {
  const [logs, setLogs] = useState(logStream);

  useEffect(() => {
    const id = setInterval(() => {
      const next = logStream[Math.floor(Math.random() * logStream.length)];
      const ts = new Date().toLocaleTimeString("en-US", { hour12: false }) + "." + String(Math.floor(Math.random() * 999)).padStart(3, "0");
      setLogs((prev) => [{ ...next, ts }, ...prev].slice(0, 30));
    }, 1800);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="font-mono text-[11px] max-h-80 overflow-y-auto scrollbar-thin space-y-0.5">
      {logs.map((log, i) => (
        <div
          key={`${log.ts}-${i}`}
          className={cn(
            "flex gap-2 py-1 px-2 rounded hover:bg-muted/40 transition-colors",
            i === 0 && "animate-fade-in",
          )}
        >
          <span className="text-muted-foreground/70 shrink-0">{log.ts}</span>
          <span className={cn("px-1.5 rounded text-[9px] font-bold shrink-0 self-center", levelColor[log.level])}>
            {log.level}
          </span>
          <span className="text-accent shrink-0">{log.service}</span>
          <span className="text-foreground/90 truncate">{log.msg}</span>
        </div>
      ))}
    </div>
  );
}
