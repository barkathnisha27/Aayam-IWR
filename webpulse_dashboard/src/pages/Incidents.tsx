import { useState } from "react";
import { Panel } from "@/components/widgets/Panel";
import { incidents } from "@/data/mock";
import { SeverityBadge, StatusBadge } from "@/components/widgets/SeverityBadge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Filter } from "lucide-react";
import { Link } from "react-router-dom";

export default function Incidents() {
  const [filter, setFilter] = useState<string>("all");
  const filtered = filter === "all" ? incidents : incidents.filter((i) => i.severity === filter || i.status === filter);

  return (
    <div className="p-6 space-y-6 animate-fade-in">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <div className="text-xs text-muted-foreground mb-1">Operations / Incidents</div>
          <h1 className="text-3xl font-bold tracking-tight">Incident Inbox</h1>
          <p className="text-sm text-muted-foreground mt-1">{filtered.length} incidents · sorted by severity & recency</p>
        </div>
        <div className="flex gap-2">
          <div className="relative">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search incidents..." className="pl-8 w-64" />
          </div>
          <Button variant="outline" size="icon"><Filter className="h-4 w-4" /></Button>
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        {["all", "critical", "high", "medium", "low", "active", "resolved"].map((f) => (
          <Button
            key={f}
            size="sm"
            variant={filter === f ? "default" : "outline"}
            onClick={() => setFilter(f)}
            className={filter === f ? "bg-gradient-primary" : ""}
          >
            {f.charAt(0).toUpperCase() + f.slice(1)}
          </Button>
        ))}
      </div>

      <Panel noPadding>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-muted/30 border-b border-border">
              <tr className="text-xs text-muted-foreground uppercase tracking-wider">
                <th className="text-left p-3 font-medium">ID</th>
                <th className="text-left p-3 font-medium">Severity</th>
                <th className="text-left p-3 font-medium">Title</th>
                <th className="text-left p-3 font-medium">Service</th>
                <th className="text-left p-3 font-medium">Status</th>
                <th className="text-left p-3 font-medium">Confidence</th>
                <th className="text-left p-3 font-medium">Duration</th>
                <th className="text-left p-3 font-medium">Assignee</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((inc) => (
                <tr key={inc.id} className="border-b border-border hover:bg-muted/30 transition-colors">
                  <td className="p-3"><code className="text-xs font-mono text-primary">{inc.id}</code></td>
                  <td className="p-3"><SeverityBadge severity={inc.severity} /></td>
                  <td className="p-3 max-w-md">
                    <Link to="/war-room" className="font-medium hover:text-primary truncate block">{inc.title}</Link>
                    <div className="text-xs text-muted-foreground truncate">{inc.impact}</div>
                  </td>
                  <td className="p-3"><code className="text-xs font-mono text-muted-foreground">{inc.service}</code></td>
                  <td className="p-3"><StatusBadge status={inc.status} /></td>
                  <td className="p-3">
                    {inc.confidence ? (
                      <div className="flex items-center gap-2">
                        <div className="w-12 h-1.5 rounded-full bg-muted overflow-hidden">
                          <div className="h-full bg-gradient-primary" style={{ width: `${inc.confidence}%` }} />
                        </div>
                        <span className="text-xs font-mono">{inc.confidence}%</span>
                      </div>
                    ) : "—"}
                  </td>
                  <td className="p-3 font-mono text-xs">{inc.duration}</td>
                  <td className="p-3 text-xs text-muted-foreground">{inc.assignee}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Panel>
    </div>
  );
}
