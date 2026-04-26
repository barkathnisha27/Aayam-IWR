import { Panel } from "@/components/widgets/Panel";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { teamMembers } from "@/data/mock";
import { Plus, Shield } from "lucide-react";

export default function Admin() {
  return (
    <div className="p-6 space-y-6 animate-fade-in">
      <div>
        <div className="text-xs text-muted-foreground mb-1">System / Admin</div>
        <h1 className="text-3xl font-bold tracking-tight">Admin Panel</h1>
        <p className="text-sm text-muted-foreground mt-1">Workspace, team, security & deployment configuration</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Panel title="Team Members" subtitle={`${teamMembers.length} active`} actions={<Button size="sm" className="bg-gradient-primary"><Plus className="h-4 w-4 mr-1" /> Invite</Button>}>
          <div className="space-y-2">
            {teamMembers.map((m) => (
              <div key={m.name} className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted/30">
                <Avatar className="h-9 w-9">
                  <AvatarFallback className="bg-gradient-primary text-primary-foreground text-xs font-bold">
                    {m.avatar}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="text-sm font-medium">{m.name}</div>
                  <div className="text-xs text-muted-foreground">{m.role}</div>
                </div>
                <Badge variant="outline" className="text-[10px]">{m.status}</Badge>
              </div>
            ))}
          </div>
        </Panel>

        <Panel title="Roles & Access (RBAC)">
          <div className="space-y-3">
            {[
              { role: "CTO / Executive", desc: "Read-only · executive dashboards", count: 2 },
              { role: "SRE Lead", desc: "Full access · auto-remediation enabled", count: 4 },
              { role: "DevOps Engineer", desc: "Incident response · limited admin", count: 12 },
              { role: "Backend Engineer", desc: "Service-scoped read access", count: 28 },
              { role: "Auditor", desc: "Audit logs & compliance views", count: 1 },
            ].map((r) => (
              <div key={r.role} className="flex items-center justify-between p-3 rounded-lg border border-border">
                <div>
                  <div className="font-medium text-sm flex items-center gap-2"><Shield className="h-3.5 w-3.5 text-primary" />{r.role}</div>
                  <div className="text-xs text-muted-foreground">{r.desc}</div>
                </div>
                <Badge variant="outline">{r.count} members</Badge>
              </div>
            ))}
          </div>
        </Panel>
      </div>

      <Panel title="Alert Settings">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-3">
            <div className="flex items-center justify-between"><Label>Auto-page on Critical</Label><Switch defaultChecked /></div>
            <div className="flex items-center justify-between"><Label>AI auto-remediation</Label><Switch defaultChecked /></div>
            <div className="flex items-center justify-between"><Label>Slack notifications</Label><Switch defaultChecked /></div>
            <div className="flex items-center justify-between"><Label>SMS alerts (on-call)</Label><Switch defaultChecked /></div>
            <div className="flex items-center justify-between"><Label>Daily digest email</Label><Switch /></div>
          </div>
          <div className="space-y-3">
            <div>
              <Label className="text-xs">Critical threshold (errors/min)</Label>
              <Input defaultValue="20" className="mt-1.5" />
            </div>
            <div>
              <Label className="text-xs">High latency p99 (ms)</Label>
              <Input defaultValue="500" className="mt-1.5" />
            </div>
            <div>
              <Label className="text-xs">Auto-page delay (seconds)</Label>
              <Input defaultValue="30" className="mt-1.5" />
            </div>
          </div>
        </div>
      </Panel>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Panel title="Notification Channels">
          <div className="space-y-2">
            {[
              { ch: "Slack · #incidents", on: true },
              { ch: "Slack · #sre-alerts", on: true },
              { ch: "PagerDuty · Primary on-call", on: true },
              { ch: "Email · sre@webpulse.ai", on: true },
              { ch: "SMS · +1 (555) ••••", on: false },
            ].map((c) => (
              <div key={c.ch} className="flex items-center justify-between p-2 rounded">
                <span className="text-sm">{c.ch}</span>
                <Switch defaultChecked={c.on} />
              </div>
            ))}
          </div>
        </Panel>

        <Panel title="Deployment Settings">
          <div className="space-y-3">
            <div>
              <Label className="text-xs">Region</Label>
              <Input defaultValue="us-east-1, eu-west-1" className="mt-1.5" />
            </div>
            <div>
              <Label className="text-xs">Data retention</Label>
              <Input defaultValue="90 days · cold storage 2 years" className="mt-1.5" />
            </div>
            <div>
              <Label className="text-xs">Compliance frameworks</Label>
              <div className="flex flex-wrap gap-1.5 mt-1.5">
                {["SOC 2 Type II", "GDPR", "HIPAA", "ISO 27001"].map((c) => (
                  <Badge key={c} variant="outline" className="bg-success/5 text-success border-success/30">{c}</Badge>
                ))}
              </div>
            </div>
          </div>
        </Panel>
      </div>
    </div>
  );
}
