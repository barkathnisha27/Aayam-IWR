import { useNavigate } from "react-router-dom";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import {
  LayoutDashboard,
  Activity,
  AlertTriangle,
  Radio,
  Brain,
  FileText,
  Plug,
  Settings,
  Search,
  Sparkles,
} from "lucide-react";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CommandPalette({ open, onOpenChange }: Props) {
  const navigate = useNavigate();
  const go = (p: string) => {
    onOpenChange(false);
    navigate(p);
  };

  return (
    <CommandDialog open={open} onOpenChange={onOpenChange}>
      <CommandInput placeholder="Type a command, search incidents, services..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Navigation">
          <CommandItem onSelect={() => go("/dashboard")}>
            <LayoutDashboard className="mr-2 h-4 w-4" /> Dashboard
          </CommandItem>
          <CommandItem onSelect={() => go("/monitoring")}>
            <Activity className="mr-2 h-4 w-4" /> Live Monitoring
          </CommandItem>
          <CommandItem onSelect={() => go("/incidents")}>
            <AlertTriangle className="mr-2 h-4 w-4" /> Incidents
          </CommandItem>
          <CommandItem onSelect={() => go("/war-room")}>
            <Radio className="mr-2 h-4 w-4" /> Incident War Room
          </CommandItem>
          <CommandItem onSelect={() => go("/rca")}>
            <Brain className="mr-2 h-4 w-4" /> AI Root Cause Analyzer
          </CommandItem>
          <CommandItem onSelect={() => go("/reports")}>
            <FileText className="mr-2 h-4 w-4" /> Reports
          </CommandItem>
          <CommandItem onSelect={() => go("/integrations")}>
            <Plug className="mr-2 h-4 w-4" /> Integrations
          </CommandItem>
          <CommandItem onSelect={() => go("/admin")}>
            <Settings className="mr-2 h-4 w-4" /> Admin
          </CommandItem>
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="Active Incidents">
          <CommandItem onSelect={() => go("/war-room")}>
            <AlertTriangle className="mr-2 h-4 w-4 text-destructive" />
            INC-2451 · Order Service 5xx spike
          </CommandItem>
          <CommandItem onSelect={() => go("/war-room")}>
            <AlertTriangle className="mr-2 h-4 w-4 text-high" />
            INC-2450 · Payment Service latency
          </CommandItem>
          <CommandItem onSelect={() => go("/war-room")}>
            <AlertTriangle className="mr-2 h-4 w-4 text-medium" />
            INC-2449 · DB Replica lag
          </CommandItem>
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="AI Actions">
          <CommandItem>
            <Sparkles className="mr-2 h-4 w-4 text-primary" /> Ask AI: Why is order-service failing?
          </CommandItem>
          <CommandItem>
            <Search className="mr-2 h-4 w-4" /> Search logs across all services
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
}
