import { KPICard } from "@/components/widgets/KPICard";
import { Panel } from "@/components/widgets/Panel";
import {
  AreaChartWidget,
  BarChartWidget,
  Heatmap,
  LineChartWidget,
  PieChartWidget,
} from "@/components/widgets/Charts";
import { ServiceMap } from "@/components/widgets/ServiceMap";
import { LogStream } from "@/components/widgets/LogStream";
import { SeverityBadge, StatusBadge } from "@/components/widgets/SeverityBadge";
import {
  Activity,
  AlertTriangle,
  Brain,
  CheckCircle2,
  Clock,
  Cpu,
  Server,
  Timer,
  Zap,
} from "lucide-react";
import {
  generateTimeSeries,
  heatmapData,
  incidentTrend,
  incidents,
  kpiData,
  services,
  severityDistribution,
  traces,
} from "@/data/mock";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Progress } from "@/components/ui/progress";

export default function Dashboard() {
  const series = generateTimeSeries(24, 100, 30);

  return (
    <div className="p-6 space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs text-muted-foreground mb-1">
            <span>Operations</span>
            <span>/</span>
            <span className="text-foreground font-medium">Dashboard</span>
          </div>
          <h1 className="text-3xl font-bold tracking-tight">Global Overview</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Real-time health across 247 services · Updated <span className="text-foreground font-medium">2s ago</span>
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">Last 24h</Button>
          <Button asChild size="sm" className="bg-gradient-primary">
            <Link to="/war-room">Open War Room</Link>
          </Button>
        </div>
      </div>

      {/* KPI Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3">
        <KPICard label="Active" value={kpiData.activeIncidents} hint="2 critical" icon={<AlertTriangle className="h-4 w-4" />} variant="destructive" />
        <KPICard label="Total YTD" value={kpiData.totalIncidents.toLocaleString()} trend={-12} icon={<Activity className="h-4 w-4" />} />
        <KPICard label="Services" value={kpiData.servicesMonitored} hint="247 healthy" icon={<Server className="h-4 w-4" />} variant="primary" />
        <KPICard label="MTTD" value={kpiData.mttd} trend={-23} icon={<Timer className="h-4 w-4" />} variant="success" />
        <KPICard label="MTTR" value={kpiData.mttr} trend={-41} icon={<Clock className="h-4 w-4" />} variant="success" />
        <KPICard label="AI Conf." value={`${kpiData.aiConfidence}%`} hint="last 7d" icon={<Brain className="h-4 w-4" />} variant="primary" />
        <KPICard label="Health" value={`${kpiData.systemHealth}%`} hint={kpiData.uptime} icon={<CheckCircle2 className="h-4 w-4" />} variant="success" />
      </div>

      {/* Service map + side panels */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <Panel
          title="Service Dependency Map"
          subtitle="Live topology · fault propagation visualised"
          actions={<><div className="text-xs text-muted-foreground">12 nodes · 14 links</div></>}
          className="xl:col-span-2"
          noPadding
        >
          <div className="h-[420px]">
            <ServiceMap />
          </div>
        </Panel>

        <Panel title="Severity Distribution" subtitle="Incidents · last 30 days">
          <PieChartWidget data={severityDistribution} height={260} />
          <div className="mt-3 space-y-2">
            {severityDistribution.map((s) => (
              <div key={s.name} className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full" style={{ background: s.color }} />
                  <span>{s.name}</span>
                </div>
                <span className="font-mono font-semibold">{s.value}</span>
              </div>
            ))}
          </div>
        </Panel>
      </div>

      {/* Charts row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Panel title="Request Volume & Latency" subtitle="Aggregate · 24h" className="lg:col-span-2">
          <AreaChartWidget data={series} height={260} />
        </Panel>
        <Panel title="Incident Frequency" subtitle="Trend · last 24h">
          <LineChartWidget data={incidentTrend} height={260} />
        </Panel>
      </div>

      {/* Heatmap + Errors + RCA */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Panel title="Anomaly Heatmap" subtitle="Day × Hour · last 7 days" className="lg:col-span-2">
          <Heatmap data={heatmapData} />
        </Panel>
        <Panel title="Error Rate" subtitle="By service · last hour">
          <BarChartWidget data={series} height={220} />
          <div className="mt-3 flex items-center justify-between text-xs text-muted-foreground">
            <span>Threshold: 5/min</span>
            <span className="text-warning font-semibold">⚠ 2 services breaching</span>
          </div>
        </Panel>
      </div>

      {/* Live ops row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Panel
          title={<span className="flex items-center gap-2">Live Log Stream <span className="h-1.5 w-1.5 rounded-full bg-success animate-pulse" /></span>}
          subtitle="Auto-tailed across all services"
          className="lg:col-span-2"
        >
          <LogStream />
        </Panel>

        <Panel title="Top Traces" subtitle="Slowest endpoints · last 5m">
          <div className="space-y-2.5">
            {traces.map((t) => (
              <div key={t.name} className="rounded-lg border border-border p-2.5 hover:bg-muted/30 transition-colors">
                <div className="flex items-center justify-between">
                  <code className="text-xs font-mono truncate">{t.name}</code>
                  <StatusBadge status={t.status === "ok" ? "healthy" : t.status === "warn" ? "warning" : "critical"} />
                </div>
                <div className="mt-2 flex items-center gap-2">
                  <Progress value={Math.min(100, (t.duration / 1500) * 100)} className="h-1.5 flex-1" />
                  <span className="text-[10px] font-mono text-muted-foreground w-16 text-right">{t.duration}ms</span>
                </div>
                <div className="text-[10px] text-muted-foreground mt-1">{t.spans} spans</div>
              </div>
            ))}
          </div>
        </Panel>
      </div>

      {/* Active incidents preview */}
      <Panel
        title="Active Incidents"
        subtitle="Requires attention"
        actions={<Button asChild variant="outline" size="sm"><Link to="/incidents">View all</Link></Button>}
      >
        <div className="space-y-2">
          {incidents.filter((i) => i.status !== "resolved").slice(0, 4).map((inc) => (
            <Link
              key={inc.id}
              to="/war-room"
              className="flex items-center gap-4 p-3 rounded-lg border border-border hover:border-primary/40 hover:bg-muted/30 transition-all group"
            >
              <SeverityBadge severity={inc.severity} />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <code className="text-xs font-mono text-muted-foreground">{inc.id}</code>
                  <span className="text-sm font-semibold truncate">{inc.title}</span>
                </div>
                <div className="text-xs text-muted-foreground mt-0.5 truncate">{inc.impact}</div>
              </div>
              <div className="hidden md:flex flex-col items-end text-xs">
                <StatusBadge status={inc.status} />
                <span className="text-muted-foreground mt-1">{inc.duration}</span>
              </div>
              <Brain className="h-4 w-4 text-primary opacity-0 group-hover:opacity-100 transition-opacity" />
            </Link>
          ))}
        </div>
      </Panel>

      {/* Footer cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { i: Cpu, t: "AI Engine", v: "Operational", d: "12.4M predictions/day", c: "text-success" },
          { i: Zap, t: "Auto-Remediation", v: "23 today", d: "94% success rate", c: "text-primary" },
          { i: CheckCircle2, t: "SLA Compliance", v: "99.982%", d: "Within 99.9% target", c: "text-success" },
        ].map((c) => (
          <Panel key={c.t}>
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-gradient-glow grid place-items-center">
                <c.i className={`h-5 w-5 ${c.c}`} />
              </div>
              <div className="flex-1">
                <div className="text-xs text-muted-foreground">{c.t}</div>
                <div className={`text-lg font-bold ${c.c}`}>{c.v}</div>
                <div className="text-[10px] text-muted-foreground">{c.d}</div>
              </div>
            </div>
          </Panel>
        ))}
      </div>
    </div>
  );
}
