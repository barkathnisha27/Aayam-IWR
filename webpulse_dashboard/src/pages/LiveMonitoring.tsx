import { Panel } from "@/components/widgets/Panel";
import { LogStream } from "@/components/widgets/LogStream";
import { ServiceMap } from "@/components/widgets/ServiceMap";
import { AreaChartWidget, BarChartWidget, Heatmap, MiniArea } from "@/components/widgets/Charts";
import { generateTimeSeries, heatmapData, services } from "@/data/mock";
import { StatusBadge } from "@/components/widgets/SeverityBadge";
import { Activity, Cpu, HardDrive, Network } from "lucide-react";

export default function LiveMonitoring() {
  const data = generateTimeSeries(30, 100, 35);
  return (
    <div className="p-6 space-y-6 animate-fade-in">
      <div>
        <div className="text-xs text-muted-foreground mb-1">Operations / Live Monitoring</div>
        <h1 className="text-3xl font-bold tracking-tight flex items-center gap-3">
          Live Monitoring
          <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-success bg-success/10 border border-success/30 rounded-md px-2 py-0.5">
            <span className="h-1.5 w-1.5 rounded-full bg-success animate-pulse" /> STREAMING
          </span>
        </h1>
        <p className="text-sm text-muted-foreground mt-1">Real-time signals across infrastructure & application layers</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          { i: Activity, t: "Requests/sec", v: "48,294", trend: "+4.2%" },
          { i: Cpu, t: "Avg CPU", v: "62%", trend: "+1.1%" },
          { i: HardDrive, t: "Memory", v: "71%", trend: "-0.4%" },
          { i: Network, t: "Egress", v: "1.2 Gbps", trend: "+8.7%" },
        ].map((m) => (
          <div key={m.t} className="rounded-xl border border-border bg-card p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-muted-foreground">{m.t}</span>
              <m.i className="h-4 w-4 text-primary" />
            </div>
            <div className="text-2xl font-bold">{m.v}</div>
            <div className="text-xs text-success">{m.trend}</div>
            <MiniArea data={data} height={32} />
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Panel title="Throughput & Latency" subtitle="Real-time" className="lg:col-span-2">
          <AreaChartWidget data={data} height={280} />
        </Panel>
        <Panel title="Error Rate" subtitle="Last hour">
          <BarChartWidget data={data} height={280} />
        </Panel>
      </div>

      <Panel title="Service Topology" subtitle="Click a node for details" noPadding>
        <div className="h-[420px]"><ServiceMap /></div>
      </Panel>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Panel title="Live Log Stream" subtitle="Auto-tailed" className="lg:col-span-2">
          <LogStream />
        </Panel>
        <Panel title="Service Health">
          <div className="space-y-1.5 max-h-80 overflow-y-auto scrollbar-thin">
            {services.map((s) => (
              <div key={s.id} className="flex items-center justify-between p-2 rounded-md hover:bg-muted/40">
                <div>
                  <div className="text-sm font-medium">{s.name}</div>
                  <div className="text-[10px] text-muted-foreground font-mono">{s.latency}ms · err {s.errorRate}%</div>
                </div>
                <StatusBadge status={s.status} />
              </div>
            ))}
          </div>
        </Panel>
      </div>

      <Panel title="Anomaly Heatmap" subtitle="Last 7 days · day × hour">
        <Heatmap data={heatmapData} />
      </Panel>
    </div>
  );
}
