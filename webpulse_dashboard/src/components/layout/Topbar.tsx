import { useState, useEffect } from "react";
import { Search, Bell, Moon, Sun, Command, Sparkles, MessageSquare } from "lucide-react";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { CommandPalette } from "./CommandPalette";

export function Topbar({ onOpenAssistant }: { onOpenAssistant: () => void }) {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [paletteOpen, setPaletteOpen] = useState(false);

  useEffect(() => {
    const root = document.documentElement;
    if (theme === "dark") root.classList.add("dark");
    else root.classList.remove("dark");
  }, [theme]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setPaletteOpen((p) => !p);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      <header className="h-16 border-b border-border bg-background/80 backdrop-blur-xl sticky top-0 z-40 flex items-center px-4 gap-3">
        <SidebarTrigger className="shrink-0" />

        <button
          onClick={() => setPaletteOpen(true)}
          className="flex-1 max-w-md flex items-center gap-2 px-3 h-9 rounded-lg border border-border bg-muted/40 hover:bg-muted/70 transition-colors text-sm text-muted-foreground"
        >
          <Search className="h-4 w-4" />
          <span className="flex-1 text-left">Search incidents, services, traces…</span>
          <kbd className="hidden sm:inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-background border border-border text-[10px] font-mono">
            <Command className="h-3 w-3" />K
          </kbd>
        </button>

        <div className="flex-1" />

        <div className="hidden lg:flex items-center gap-2 px-3 h-9 rounded-lg bg-success/10 border border-success/20 text-success">
          <div className="h-2 w-2 rounded-full bg-success animate-pulse" />
          <span className="text-xs font-semibold">All Systems Operational</span>
        </div>

        <Button variant="ghost" size="icon" onClick={onOpenAssistant} className="relative">
          <Sparkles className="h-4 w-4 text-primary" />
          <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-accent animate-pulse" />
        </Button>

        <Button variant="ghost" size="icon" onClick={() => setTheme(theme === "light" ? "dark" : "light")}>
          {theme === "light" ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-4 w-4" />
              <Badge className="absolute -top-1 -right-1 h-4 w-4 p-0 grid place-items-center bg-destructive text-destructive-foreground text-[10px]">
                4
              </Badge>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-80">
            <DropdownMenuLabel className="flex items-center justify-between">
              <span>Notifications</span>
              <Badge variant="outline" className="text-[10px]">4 new</Badge>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            {[
              { title: "INC-2451 escalated to Critical", time: "2m ago", color: "critical" },
              { title: "Auto-remediation succeeded on db-replica", time: "8m ago", color: "success" },
              { title: "AI detected anomaly in payment-service", time: "14m ago", color: "high" },
              { title: "Weekly SLA report ready", time: "1h ago", color: "info" },
            ].map((n, i) => (
              <DropdownMenuItem key={i} className="flex items-start gap-2 py-2.5">
                <div
                  className="h-2 w-2 rounded-full mt-1.5 shrink-0"
                  style={{ background: `hsl(var(--${n.color}))` }}
                />
                <div className="flex-1">
                  <div className="text-sm">{n.title}</div>
                  <div className="text-xs text-muted-foreground">{n.time}</div>
                </div>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="gap-2 h-9 px-2">
              <Avatar className="h-7 w-7">
                <AvatarFallback className="bg-gradient-primary text-primary-foreground text-xs font-bold">
                  MC
                </AvatarFallback>
              </Avatar>
              <div className="hidden md:flex flex-col items-start leading-tight">
                <span className="text-xs font-semibold">Maya Chen</span>
                <span className="text-[10px] text-muted-foreground">SRE Lead</span>
              </div>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Preferences</DropdownMenuItem>
            <DropdownMenuItem>Switch role</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Sign out</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </header>

      <CommandPalette open={paletteOpen} onOpenChange={setPaletteOpen} />
    </>
  );
}
