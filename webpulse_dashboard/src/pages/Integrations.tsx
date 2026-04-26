import { Panel } from "@/components/widgets/Panel";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { integrations, teamMembers } from "@/data/mock";
import { Plus, Settings as SettingsIcon, Trash2 } from "lucide-react";

export default function Integrations() {
  return (
    <div className="p-6 space-y-6 animate-fade-in">
      <div className="flex justify-between items-end">
        <div>
          <div className="text-xs text-muted-foreground mb-1">System / Integrations</div>
          <h1 className="text-3xl font-bold tracking-tight">Integrations</h1>
          <p className="text-sm text-muted-foreground mt-1">Connect WebPulse to your observability & collaboration stack</p>
        </div>
        <Button className="bg-gradient-primary"><Plus className="h-4 w-4 mr-2" /> Add Integration</Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {integrations.map((i) => (
          <div key={i.name} className="rounded-xl border border-border bg-card p-5 hover:shadow-lg transition-all">
            <div className="flex items-start justify-between mb-3">
              <div className="text-3xl">{i.icon}</div>
              <Badge
                variant="outline"
                className={i.status === "connected" ? "border-success/30 text-success bg-success/10" : "border-muted-foreground/30 text-muted-foreground"}
              >
                {i.status}
              </Badge>
            </div>
            <div className="font-semibold">{i.name}</div>
            <div className="text-xs text-muted-foreground mt-0.5">{i.events}</div>
            <div className="mt-4 flex gap-2">
              <Button size="sm" variant="outline" className="flex-1"><SettingsIcon className="h-3.5 w-3.5 mr-1" /> Config</Button>
            </div>
          </div>
        ))}
      </div>

      <Panel title="Webhook Endpoints">
        <div className="space-y-2">
          {[
            { url: "https://hooks.slack.com/services/T0X/B0X/...", trigger: "All incidents", active: true },
            { url: "https://api.pagerduty.com/incidents/webhook", trigger: "Critical only", active: true },
            { url: "https://example.com/api/webhooks/incidents", trigger: "High + Critical", active: false },
          ].map((w, i) => (
            <div key={i} className="flex items-center gap-3 p-3 rounded-lg border border-border">
              <code className="text-xs flex-1 truncate font-mono text-muted-foreground">{w.url}</code>
              <Badge variant="outline" className="text-[10px]">{w.trigger}</Badge>
              <Switch checked={w.active} />
              <Button size="icon" variant="ghost"><Trash2 className="h-3.5 w-3.5" /></Button>
            </div>
          ))}
          <Button variant="outline" className="w-full"><Plus className="h-4 w-4 mr-2" /> Add Webhook</Button>
        </div>
      </Panel>

      <Panel title="API Keys">
        <div className="space-y-2">
          {[
            { name: "Production · Datadog ingest", key: "wp_live_••••••••3a7f", created: "2025-11-14" },
            { name: "Staging · CI bot", key: "wp_test_••••••••9c12", created: "2025-12-02" },
          ].map((k, i) => (
            <div key={i} className="flex items-center gap-3 p-3 rounded-lg border border-border">
              <div className="flex-1">
                <div className="text-sm font-medium">{k.name}</div>
                <code className="text-xs font-mono text-muted-foreground">{k.key} · created {k.created}</code>
              </div>
              <Button size="sm" variant="outline">Rotate</Button>
              <Button size="icon" variant="ghost"><Trash2 className="h-3.5 w-3.5" /></Button>
            </div>
          ))}
        </div>
      </Panel>
    </div>
  );
}
