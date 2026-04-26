import { Panel } from "@/components/widgets/Panel";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { SeverityBadge, StatusBadge } from "@/components/widgets/SeverityBadge";
import { LogStream } from "@/components/widgets/LogStream";
import { AreaChartWidget } from "@/components/widgets/Charts";
import { aiHypotheses, generateTimeSeries, incidents, teamMembers } from "@/data/mock";
import {
  AlertOctagon,
  Brain,
  Check,
  Clock,
  Download,
  FileText,
  MessageSquare,
  Play,
  Send,
  Sparkles,
  Zap,
  ChevronRight,
  Users,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";

const timeline = [
  { time: "14:32:18", type: "alert", title: "AI detected: 5xx spike on /checkout (severity: critical)", color: "destructive" },
  { time: "14:32:24", type: "page", title: "Auto-paged on-call: SRE Team via PagerDuty", color: "warning" },
  { time: "14:32:31", type: "ai", title: "AI generated 3 root cause hypotheses (top: 94%)", color: "primary" },
  { time: "14:33:02", type: "join", title: "Maya Chen joined War Room", color: "info" },
  { time: "14:33:14", type: "join", title: "Arjun Patel joined War Room", color: "info" },
  { time: "14:34:01", type: "action", title: "Auto-remediation: scaled order-service pool 50→200", color: "primary" },
  { time: "14:34:48", type: "signal", title: "Error rate dropped 87% — mitigation working", color: "success" },
];

export default function WarRoom() {
  const inc = incidents[0];
  const series = generateTimeSeries(30, 80, 40);

  return (
    <div className="p-6 space-y-5 animate-fade-in">
      {/* Incident header */}
      <div className="rounded-2xl border border-destructive/30 bg-gradient-to-r from-destructive/5 via-card to-card p-5 shadow-elegant">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Badge className="bg-destructive text-destructive-foreground gap-1">
                <span className="h-1.5 w-1.5 rounded-full bg-destructive-foreground animate-pulse" />
                LIVE WAR ROOM
              </Badge>
              <code className="text-xs font-mono text-muted-foreground">{inc.id}</code>
              <SeverityBadge severity={inc.severity} />
              <StatusBadge status={inc.status} />
            </div>
            <h1 className="text-2xl font-bold tracking-tight">{inc.title}</h1>
            <div className="flex flex-wrap gap-x-6 gap-y-1 text-xs text-muted-foreground">
              <span><Clock className="h-3 w-3 inline mr-1" /> Started {inc.startedAt} · {inc.duration}</span>
              <span>Service: <code className="text-foreground">{inc.service}</code></span>
              <span>Impact: {inc.impact}</span>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm"><Download className="h-3.5 w-3.5 mr-1.5" /> Export</Button>
            <Button variant="outline" size="sm"><FileText className="h-3.5 w-3.5 mr-1.5" /> Generate Report</Button>
            <Button size="sm" className="bg-gradient-primary"><Check className="h-3.5 w-3.5 mr-1.5" /> Mark Resolved</Button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-5">
        {/* Left column */}
        <div className="xl:col-span-2 space-y-5">
          {/* AI RCA Hero */}
          <Panel
            title={<span className="flex items-center gap-2"><Brain className="h-4 w-4 text-primary" /> AI Root Cause Analysis</span>}
            subtitle={`${inc.confidence}% confidence · synthesised from 4,820 signals in 14s`}
            actions={<Badge className="bg-gradient-primary text-primary-foreground">AI</Badge>}
          >
            <div className="space-y-3">
              {aiHypotheses.map((h) => (
                <div
                  key={h.rank}
                  className={`rounded-xl border p-4 ${
                    h.rank === 1 ? "border-primary/40 bg-gradient-glow shadow-glow" : "border-border"
                  }`}
                >
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <div className="flex items-start gap-3 min-w-0">
                      <div className={`h-7 w-7 rounded-lg grid place-items-center text-xs font-bold shrink-0 ${
                        h.rank === 1 ? "bg-gradient-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                      }`}>
                        #{h.rank}
                      </div>
                      <div className="min-w-0">
                        <div className="font-semibold text-sm">{h.title}</div>
                        <div className="text-xs text-muted-foreground mt-0.5">Suggested: {h.suggestedFix}</div>
                      </div>
                    </div>
                    <div className="text-right shrink-0">
                      <div className="text-xl font-bold gradient-text">{h.confidence}%</div>
                      <div className="text-[10px] text-muted-foreground uppercase tracking-wider">confidence</div>
                    </div>
                  </div>
                  <div className="mt-2 space-y-1">
                    {h.evidence.map((e, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs text-muted-foreground">
                        <ChevronRight className="h-3 w-3 mt-0.5 text-primary shrink-0" />
                        <span>{e}</span>
                      </div>
                    ))}
                  </div>
                  {h.rank === 1 && (
                    <div className="mt-3 flex gap-2">
                      <Button size="sm" className="bg-gradient-primary">
                        <Zap className="h-3.5 w-3.5 mr-1.5" /> Apply Auto-Remediation
                      </Button>
                      <Button size="sm" variant="outline">
                        <Play className="h-3.5 w-3.5 mr-1.5" /> Simulate Recovery
                      </Button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </Panel>

          {/* Timeline */}
          <Panel title="Incident Timeline" subtitle="Auto-captured events">
            <div className="relative pl-6 space-y-4">
              <div className="absolute left-2 top-2 bottom-2 w-px bg-border" />
              {timeline.map((t, i) => (
                <div key={i} className="relative">
                  <div
                    className="absolute -left-5 top-1.5 h-3 w-3 rounded-full border-2 border-background"
                    style={{ background: `hsl(var(--${t.color}))` }}
                  />
                  <div className="flex items-center justify-between gap-3">
                    <div className="text-sm font-medium">{t.title}</div>
                    <code className="text-[10px] font-mono text-muted-foreground shrink-0">{t.time}</code>
                  </div>
                </div>
              ))}
            </div>
          </Panel>

          {/* Signals */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            <Panel title="Correlated Metrics" subtitle="order-service · last 30m">
              <AreaChartWidget data={series} height={200} />
            </Panel>
            <Panel title="Resolution Checklist" subtitle="3 / 7 complete">
              <div className="space-y-2">
                {[
                  { d: "Acknowledge incident", done: true },
                  { d: "Identify affected services", done: true },
                  { d: "Run AI root cause analysis", done: true },
                  { d: "Apply mitigation (scale pool)", done: false, active: true },
                  { d: "Verify error rate normalised", done: false },
                  { d: "Notify stakeholders", done: false },
                  { d: "Post-mortem scheduled", done: false },
                ].map((c, i) => (
                  <div key={i} className={`flex items-center gap-2.5 p-2 rounded-md ${c.active ? "bg-primary/5 border border-primary/20" : ""}`}>
                    <div className={`h-4 w-4 rounded border-2 grid place-items-center shrink-0 ${
                      c.done ? "bg-success border-success" : c.active ? "border-primary" : "border-border"
                    }`}>
                      {c.done && <Check className="h-3 w-3 text-success-foreground" />}
                    </div>
                    <span className={`text-sm ${c.done ? "line-through text-muted-foreground" : ""}`}>{c.d}</span>
                  </div>
                ))}
              </div>
              <Progress value={43} className="mt-4 h-1.5" />
            </Panel>
          </div>

          <Panel title="Live Logs · order-service" subtitle="Filtered view">
            <LogStream />
          </Panel>
        </div>

        {/* Right column */}
        <div className="space-y-5">
          {/* Anomaly feed */}
          <Panel title="Live Anomaly Feed" subtitle="AI detector · streaming">
            <div className="space-y-2 max-h-72 overflow-y-auto scrollbar-thin">
              {[
                { t: "14:34:48", s: "Error rate ↓87%", level: "success", svc: "order-service" },
                { t: "14:34:01", s: "Pool scaled 50→200", level: "info", svc: "order-service" },
                { t: "14:33:14", s: "Latency spike p99 1.8s→2.4s", level: "high", svc: "payment" },
                { t: "14:32:51", s: "Circuit breaker OPEN", level: "critical", svc: "inventory" },
                { t: "14:32:18", s: "5xx burst detected (37/s)", level: "critical", svc: "order-service" },
                { t: "14:31:42", s: "Memory >85% threshold", level: "medium", svc: "db-replica" },
                { t: "14:30:11", s: "Deploy: order-service v4.2.1", level: "info", svc: "ci/cd" },
              ].map((a, i) => (
                <div key={i} className="flex items-start gap-2 p-2 rounded-md border border-border hover:bg-muted/30">
                  <AlertOctagon
                    className="h-4 w-4 mt-0.5 shrink-0"
                    style={{ color: `hsl(var(--${a.level}))` }}
                  />
                  <div className="flex-1 min-w-0">
                    <div className="text-xs font-medium truncate">{a.s}</div>
                    <div className="text-[10px] text-muted-foreground font-mono">{a.t} · {a.svc}</div>
                  </div>
                </div>
              ))}
            </div>
          </Panel>

          {/* Team */}
          <Panel
            title={<span className="flex items-center gap-2"><Users className="h-4 w-4" /> War Room ({teamMembers.length})</span>}
            subtitle="3 online · 1 away"
          >
            <div className="space-y-2">
              {teamMembers.map((m) => (
                <div key={m.name} className="flex items-center gap-3">
                  <div className="relative">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback className="bg-gradient-primary text-primary-foreground text-[10px] font-bold">
                        {m.avatar}
                      </AvatarFallback>
                    </Avatar>
                    <span
                      className={`absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full border-2 border-card ${
                        m.status === "online" ? "bg-success" : m.status === "away" ? "bg-warning" : "bg-muted-foreground"
                      }`}
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium truncate">{m.name}</div>
                    <div className="text-[10px] text-muted-foreground">{m.role}</div>
                  </div>
                  <Button size="icon" variant="ghost" className="h-7 w-7"><MessageSquare className="h-3.5 w-3.5" /></Button>
                </div>
              ))}
            </div>
          </Panel>

          {/* AI Chat */}
          <Panel
            title={<span className="flex items-center gap-2"><Sparkles className="h-4 w-4 text-primary" /> Incident Copilot</span>}
            subtitle="Ask anything about this incident"
          >
            <div className="space-y-3 max-h-60 overflow-y-auto scrollbar-thin">
              <div className="rounded-lg bg-muted/40 p-2.5 text-xs">
                <div className="font-semibold text-primary mb-1">AI</div>
                I've identified connection-pool exhaustion as the most likely cause (94%). The order-service deploy at 14:28 changed pool config. I can roll back automatically.
              </div>
              <div className="rounded-lg bg-gradient-primary text-primary-foreground p-2.5 text-xs ml-6">
                <div className="font-semibold mb-1">You</div>
                Why didn't the canary catch this?
              </div>
              <div className="rounded-lg bg-muted/40 p-2.5 text-xs">
                <div className="font-semibold text-primary mb-1">AI</div>
                Canary ran for 12 min at 5% traffic. The connection leak only manifests under sustained load &gt;500 RPS, which canary never reached. Recommend updating canary to include load-shadow tests.
              </div>
            </div>
            <form className="mt-3 flex gap-2" onSubmit={(e) => e.preventDefault()}>
              <Input placeholder="Ask copilot..." className="flex-1" />
              <Button size="icon" type="submit" className="bg-gradient-primary"><Send className="h-3.5 w-3.5" /></Button>
            </form>
          </Panel>
        </div>
      </div>
    </div>
  );
}
