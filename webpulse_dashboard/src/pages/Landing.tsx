import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Sparkles,
  Activity,
  Brain,
  Radio,
  Shield,
  Zap,
  ArrowRight,
  Check,
  TrendingDown,
  Cpu,
  GitBranch,
  Bell,
  FileText,
  Workflow,
  ChevronRight,
} from "lucide-react";
import { ServiceMap } from "@/components/widgets/ServiceMap";
import { MiniArea } from "@/components/widgets/Charts";
import { generateTimeSeries } from "@/data/mock";

const features = [
  { icon: Brain, title: "AI Root Cause Analysis", desc: "Hypotheses ranked by confidence in seconds, not hours.", grad: "from-primary to-accent" },
  { icon: Workflow, title: "Cross-Service Correlation", desc: "Map fault propagation across thousands of microservices.", grad: "from-secondary to-primary" },
  { icon: Zap, title: "Auto-Remediation", desc: "Trusted runbooks executed safely with rollback guardrails.", grad: "from-accent to-secondary" },
  { icon: Radio, title: "Live War Room", desc: "Real-time collaboration with timeline, signals & assistant.", grad: "from-primary to-secondary" },
  { icon: FileText, title: "Executive Reports", desc: "Auto-generated incident reports with revenue & SLA impact.", grad: "from-accent to-primary" },
  { icon: Shield, title: "Enterprise Security", desc: "SOC 2, GDPR, RBAC and audit trails out of the box.", grad: "from-secondary to-accent" },
];

const stats = [
  { v: "98%", l: "Faster MTTR" },
  { v: "94%", l: "RCA Accuracy" },
  { v: "247+", l: "Integrations" },
  { v: "$48M", l: "Downtime saved" },
];

const logos = ["NORTHWIND", "ACME CORP", "VERTEX", "STELLAR", "QUANTUM", "HYPERION", "AXIOM", "MERIDIAN"];

export default function Landing() {
  const series = generateTimeSeries(30, 80, 25);

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      {/* NAV */}
      <nav className="fixed top-0 inset-x-0 z-50 backdrop-blur-xl bg-background/70 border-b border-border/60">
        <div className="container mx-auto h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2.5">
            <div className="h-9 w-9 rounded-xl bg-gradient-primary grid place-items-center shadow-glow">
              <Sparkles className="h-5 w-5 text-primary-foreground" />
            </div>
            <div className="flex flex-col leading-tight">
              <span className="font-bold text-base">WebPulse</span>
              <span className="text-[10px] text-muted-foreground uppercase tracking-wider">Command Center</span>
            </div>
          </Link>
          <div className="hidden md:flex items-center gap-8 text-sm">
            <a href="#features" className="text-muted-foreground hover:text-foreground transition-colors">Platform</a>
            <a href="#demo" className="text-muted-foreground hover:text-foreground transition-colors">Live Demo</a>
            <a href="#metrics" className="text-muted-foreground hover:text-foreground transition-colors">Customers</a>
            <a href="#pricing" className="text-muted-foreground hover:text-foreground transition-colors">Pricing</a>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" className="hidden sm:inline-flex">Sign in</Button>
            <Button asChild size="sm" className="bg-gradient-primary hover:opacity-90 shadow-glow">
              <Link to="/dashboard">
                Launch Dashboard <ArrowRight className="h-3.5 w-3.5 ml-1" />
              </Link>
            </Button>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section className="relative pt-32 pb-24 mesh-bg">
        <div className="absolute inset-0 grid-bg opacity-30 pointer-events-none" />
        <div className="container mx-auto relative">
          <div className="max-w-4xl mx-auto text-center space-y-8 animate-fade-in-up">
            <Badge variant="outline" className="gap-2 px-3 py-1.5 bg-card border-primary/30">
              <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
              <span className="text-xs font-semibold">New · Autonomous Incident Response v4.0</span>
              <ChevronRight className="h-3 w-3" />
            </Badge>

            <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-balance leading-[1.05]">
              The AI Command Center
              <br />
              for{" "}
              <span className="gradient-text">incident response</span>
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto text-balance leading-relaxed">
              WebPulse autonomously detects, correlates, and resolves incidents across distributed systems —
              giving on-call teams superhuman observability at the speed of thought.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-3 pt-4">
              <Button asChild size="lg" className="bg-gradient-primary hover:opacity-90 shadow-elegant h-12 px-6">
                <Link to="/dashboard">
                  Launch Dashboard <ArrowRight className="h-4 w-4 ml-1" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="h-12 px-6">
                <Link to="/war-room">View Live Demo</Link>
              </Button>
              <Button size="lg" variant="ghost" className="h-12 px-6">
                Book Enterprise Demo
              </Button>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-muted-foreground pt-4">
              <span className="inline-flex items-center gap-1.5"><Check className="h-3.5 w-3.5 text-success" /> SOC 2 Type II</span>
              <span className="inline-flex items-center gap-1.5"><Check className="h-3.5 w-3.5 text-success" /> 99.99% SLA</span>
              <span className="inline-flex items-center gap-1.5"><Check className="h-3.5 w-3.5 text-success" /> No credit card required</span>
              <span className="inline-flex items-center gap-1.5"><Check className="h-3.5 w-3.5 text-success" /> Deploy in 5 min</span>
            </div>
          </div>

          {/* Hero product viz */}
          <div className="mt-16 relative max-w-6xl mx-auto animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
            <div className="absolute -inset-px bg-gradient-cyber rounded-3xl blur-2xl opacity-40" />
            <div className="relative rounded-3xl border border-border bg-card overflow-hidden shadow-elegant">
              <div className="flex items-center gap-2 px-4 h-9 border-b border-border bg-muted/30">
                <div className="flex gap-1.5">
                  <div className="h-2.5 w-2.5 rounded-full bg-destructive/60" />
                  <div className="h-2.5 w-2.5 rounded-full bg-warning/60" />
                  <div className="h-2.5 w-2.5 rounded-full bg-success/60" />
                </div>
                <div className="flex-1 text-center text-xs text-muted-foreground font-mono">
                  webpulse.ai/war-room/INC-2451
                </div>
              </div>
              <div className="p-6 md:p-8 space-y-4">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {[
                    { l: "Active", v: "4", c: "text-destructive" },
                    { l: "MTTR", v: "18m", c: "text-success" },
                    { l: "Health", v: "97.8%", c: "text-primary" },
                    { l: "AI Conf.", v: "94%", c: "text-accent" },
                  ].map((k) => (
                    <div key={k.l} className="rounded-xl border border-border bg-background p-3">
                      <div className="text-[10px] uppercase tracking-wider text-muted-foreground">{k.l}</div>
                      <div className={`text-xl font-bold ${k.c}`}>{k.v}</div>
                      <MiniArea data={series} height={28} color={`hsl(var(--primary))`} />
                    </div>
                  ))}
                </div>
                <div className="rounded-xl border border-border overflow-hidden">
                  <div className="h-72">
                    <ServiceMap />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Logos */}
          <div className="mt-20 text-center">
            <p className="text-xs uppercase tracking-widest text-muted-foreground mb-6">
              Trusted by the world's most reliable engineering teams
            </p>
            <div className="overflow-hidden">
              <div className="flex gap-12 animate-marquee whitespace-nowrap">
                {[...logos, ...logos].map((l, i) => (
                  <span key={i} className="text-lg font-bold tracking-widest text-muted-foreground/50">
                    {l}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section id="metrics" className="py-20 border-y border-border bg-muted/20">
        <div className="container mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((s) => (
              <div key={s.l} className="text-center">
                <div className="text-4xl md:text-5xl font-bold gradient-text">{s.v}</div>
                <div className="text-xs uppercase tracking-wider text-muted-foreground mt-2">{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section id="features" className="py-24">
        <div className="container mx-auto">
          <div className="max-w-2xl mx-auto text-center mb-16 space-y-4">
            <Badge variant="outline" className="px-3 py-1">PLATFORM</Badge>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-balance">
              Everything an SRE team needs.
              <br /> <span className="gradient-text">Nothing they don't.</span>
            </h2>
            <p className="text-muted-foreground text-balance">
              From the first anomaly to the post-mortem, WebPulse orchestrates your entire incident lifecycle.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {features.map((f) => (
              <div
                key={f.title}
                className="group relative overflow-hidden rounded-2xl border border-border bg-card p-6 transition-all hover:shadow-elegant hover:-translate-y-1"
              >
                <div className={`absolute -right-8 -top-8 h-32 w-32 rounded-full bg-gradient-to-br ${f.grad} opacity-10 blur-2xl group-hover:opacity-30 transition-opacity`} />
                <div className={`relative h-12 w-12 rounded-xl bg-gradient-to-br ${f.grad} grid place-items-center shadow-md mb-4`}>
                  <f.icon className="h-5 w-5 text-primary-foreground" />
                </div>
                <h3 className="font-semibold text-lg">{f.title}</h3>
                <p className="text-sm text-muted-foreground mt-1.5 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ARCHITECTURE FLOW */}
      <section id="demo" className="py-24 bg-muted/20 border-y border-border">
        <div className="container mx-auto">
          <div className="max-w-2xl mx-auto text-center mb-12 space-y-4">
            <Badge variant="outline" className="px-3 py-1">ARCHITECTURE</Badge>
            <h2 className="text-4xl font-bold tracking-tight text-balance">
              From signal to <span className="gradient-text">resolution</span>, autonomously.
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-3 max-w-5xl mx-auto">
            {[
              { i: Activity, t: "Ingest", d: "Logs, metrics, traces" },
              { i: Cpu, t: "Detect", d: "ML anomaly engine" },
              { i: GitBranch, t: "Correlate", d: "Cross-service graph" },
              { i: Brain, t: "Diagnose", d: "AI root cause" },
              { i: Bell, t: "Resolve", d: "Auto-remediate" },
            ].map((s, i, arr) => (
              <div key={s.t} className="relative">
                <div className="rounded-2xl border border-border bg-card p-5 text-center hover:shadow-lg transition-all hover:-translate-y-1">
                  <div className="h-12 w-12 rounded-xl bg-gradient-primary grid place-items-center mx-auto shadow-glow mb-3">
                    <s.i className="h-5 w-5 text-primary-foreground" />
                  </div>
                  <div className="font-semibold">{s.t}</div>
                  <div className="text-xs text-muted-foreground mt-1">{s.d}</div>
                </div>
                {i < arr.length - 1 && (
                  <ArrowRight className="hidden md:block absolute top-1/2 -right-2.5 -translate-y-1/2 h-5 w-5 text-primary/50" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIAL */}
      <section className="py-24">
        <div className="container mx-auto max-w-5xl">
          <div className="rounded-3xl bg-gradient-cyber p-px shadow-elegant">
            <div className="rounded-3xl bg-card p-10 md:p-14">
              <TrendingDown className="h-8 w-8 text-success mb-6" />
              <blockquote className="text-2xl md:text-3xl font-medium leading-snug text-balance">
                "WebPulse cut our MTTR from 47 minutes to under 4. Our SREs sleep again. Our CFO loves the
                quarterly downtime savings. It's the most consequential platform decision we've made this decade."
              </blockquote>
              <div className="mt-8 flex items-center gap-4">
                <div className="h-12 w-12 rounded-full bg-gradient-primary grid place-items-center text-primary-foreground font-bold">
                  EW
                </div>
                <div>
                  <div className="font-semibold">Elena Watanabe</div>
                  <div className="text-sm text-muted-foreground">VP Infrastructure · Northwind Financial</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section id="pricing" className="py-24 mesh-bg">
        <div className="container mx-auto max-w-4xl text-center space-y-6">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-balance">
            Ready for <span className="gradient-text">five-nines</span> reliability?
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            Deploy WebPulse in 5 minutes. Free tier includes 50 services, AI RCA and unlimited incidents.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Button asChild size="lg" className="bg-gradient-primary shadow-elegant h-12 px-6">
              <Link to="/dashboard">Launch Dashboard <ArrowRight className="h-4 w-4 ml-1" /></Link>
            </Button>
            <Button size="lg" variant="outline" className="h-12 px-6">Talk to engineering</Button>
          </div>
        </div>
      </section>

      <footer className="border-t border-border py-10">
        <div className="container mx-auto flex flex-wrap items-center justify-between gap-4 text-xs text-muted-foreground">
          <div className="flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-primary" />
            <span>© 2026 WebPulse · AI Incident Command Center</span>
          </div>
          <div className="flex gap-6">
            <a href="#" className="hover:text-foreground">Privacy</a>
            <a href="#" className="hover:text-foreground">Security</a>
            <a href="#" className="hover:text-foreground">Status</a>
            <a href="#" className="hover:text-foreground">Docs</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
