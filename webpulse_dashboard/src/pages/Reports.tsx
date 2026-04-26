import { Panel } from "@/components/widgets/Panel";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Download, FileText, FileJson, FileType } from "lucide-react";
import { incidents } from "@/data/mock";
import { SeverityBadge } from "@/components/widgets/SeverityBadge";

export default function Reports() {
  return (
    <div className="p-6 space-y-6 animate-fade-in">
      <div>
        <div className="text-xs text-muted-foreground mb-1">Operations / Reports</div>
        <h1 className="text-3xl font-bold tracking-tight">Incident Reporting Center</h1>
        <p className="text-sm text-muted-foreground mt-1">Auto-generated executive & engineering reports</p>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { t: "Reports YTD", v: "2,451", c: "text-primary" },
          { t: "SLA Compliance", v: "99.982%", c: "text-success" },
          { t: "Revenue Impact", v: "$1.2M", c: "text-warning", d: "saved vs 2024" },
          { t: "Customers Affected", v: "0.04%", c: "text-foreground", d: "of MAUs" },
        ].map((k) => (
          <div key={k.t} className="rounded-xl border border-border bg-card p-5">
            <div className="text-xs text-muted-foreground uppercase tracking-wider">{k.t}</div>
            <div className={`text-3xl font-bold ${k.c}`}>{k.v}</div>
            {k.d && <div className="text-xs text-muted-foreground mt-1">{k.d}</div>}
          </div>
        ))}
      </div>

      {/* Featured executive report */}
      <Panel title="Featured Executive Report" subtitle="Q1 2026 · Auto-generated">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-3">
            <h3 className="text-xl font-bold">Quarterly Reliability Review</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              In Q1, WebPulse autonomously detected and triaged 612 incidents across 247 services. AI auto-remediation
              resolved 38% without human intervention. MTTR improved 41% YoY (47m → 18m). Estimated downtime cost
              avoidance: <span className="text-foreground font-semibold">$1.2M</span>.
            </p>
            <ul className="text-sm space-y-1.5 pl-5 list-disc text-muted-foreground">
              <li>2 critical incidents · both resolved within SLA</li>
              <li>Top contributing service: payment-service (deploy regressions)</li>
              <li>AI RCA accuracy: 94% (up from 86% in Q4 2025)</li>
              <li>Customer-facing impact: 0.04% of monthly active users</li>
            </ul>
          </div>
          <div className="space-y-2">
            <div className="text-xs uppercase tracking-wider text-muted-foreground">Download</div>
            <Button variant="outline" className="w-full justify-start"><FileText className="h-4 w-4 mr-2 text-destructive" /> PDF Report</Button>
            <Button variant="outline" className="w-full justify-start"><FileType className="h-4 w-4 mr-2 text-primary" /> DOCX Editable</Button>
            <Button variant="outline" className="w-full justify-start"><FileJson className="h-4 w-4 mr-2 text-warning" /> JSON Data</Button>
            <Button className="w-full bg-gradient-primary"><Download className="h-4 w-4 mr-2" /> Download All</Button>
          </div>
        </div>
      </Panel>

      <Panel title="Recent Incident Reports">
        <div className="space-y-2">
          {incidents.map((inc) => (
            <div key={inc.id} className="flex flex-wrap items-center gap-3 p-3 rounded-lg border border-border hover:bg-muted/30">
              <SeverityBadge severity={inc.severity} />
              <div className="flex-1 min-w-0">
                <div className="font-medium text-sm truncate">{inc.title}</div>
                <div className="text-xs text-muted-foreground">{inc.id} · {inc.startedAt} · Duration {inc.duration}</div>
              </div>
              <div className="hidden md:block text-xs text-muted-foreground">{inc.impact}</div>
              <div className="flex gap-1">
                <Button size="sm" variant="ghost"><FileText className="h-3.5 w-3.5" /></Button>
                <Button size="sm" variant="ghost"><FileType className="h-3.5 w-3.5" /></Button>
                <Button size="sm" variant="ghost"><FileJson className="h-3.5 w-3.5" /></Button>
              </div>
            </div>
          ))}
        </div>
      </Panel>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Panel title="Engineering Reports">
          <div className="space-y-2 text-sm">
            <div className="flex justify-between p-2 rounded hover:bg-muted/30"><span>Postmortem · INC-2447</span><Badge variant="outline">Published</Badge></div>
            <div className="flex justify-between p-2 rounded hover:bg-muted/30"><span>RCA · INC-2446</span><Badge variant="outline">Published</Badge></div>
            <div className="flex justify-between p-2 rounded hover:bg-muted/30"><span>Capacity review · 2026-W14</span><Badge>Draft</Badge></div>
          </div>
        </Panel>
        <Panel title="SLA Tracking">
          <div className="space-y-3 text-sm">
            {[
              { name: "API Gateway", target: 99.99, actual: 99.997 },
              { name: "Auth Service", target: 99.95, actual: 99.991 },
              { name: "Payment Service", target: 99.99, actual: 99.84, breach: true },
            ].map((s) => (
              <div key={s.name}>
                <div className="flex justify-between text-xs mb-1">
                  <span>{s.name}</span>
                  <span className={s.breach ? "text-destructive font-semibold" : "text-success font-semibold"}>{s.actual}%</span>
                </div>
                <div className="h-1.5 rounded-full bg-muted overflow-hidden">
                  <div className={`h-full ${s.breach ? "bg-destructive" : "bg-success"}`} style={{ width: `${Math.min(100, s.actual)}%` }} />
                </div>
                <div className="text-[10px] text-muted-foreground mt-0.5">Target {s.target}%</div>
              </div>
            ))}
          </div>
        </Panel>
        <Panel title="Customer Impact Score">
          <div className="text-center py-6">
            <div className="text-6xl font-bold gradient-text">A+</div>
            <div className="text-sm text-muted-foreground mt-2">99.6% of users unaffected</div>
            <Button variant="outline" size="sm" className="mt-4"><Download className="h-3.5 w-3.5 mr-1.5" /> Detailed breakdown</Button>
          </div>
        </Panel>
      </div>
    </div>
  );
}
