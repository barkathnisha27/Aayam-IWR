import { useState } from "react";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sparkles, Send, Bot, User } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

type Msg = { role: "ai" | "user"; text: string };
const seedMessages: Msg[] = [
  {
    role: "ai",
    text: "Hi Maya 👋 I'm WebPulse Copilot. I'm watching INC-2451 right now — 94% confidence the root cause is connection-pool exhaustion in order-service v4.2.1. Want me to draft a remediation plan?",
  },
];

const suggestions = [
  "Why is order-service failing?",
  "Summarise the last hour of incidents",
  "Generate executive report for INC-2451",
  "Show me services with abnormal latency",
];

export function AIAssistant({ open, onOpenChange }: Props) {
  const [messages, setMessages] = useState(seedMessages);
  const [input, setInput] = useState("");

  const send = (text?: string) => {
    const content = (text ?? input).trim();
    if (!content) return;
    setMessages((m) => [
      ...m,
      { role: "user", text: content },
      {
        role: "ai",
        text: `Analyzing… Based on correlated signals across 4 services, the most likely cause involves a deployment regression. I can draft a Slack update, open a Jira ticket, and trigger a rollback. Confirm to proceed.`,
      },
    ]);
    setInput("");
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="w-full sm:max-w-md p-0 flex flex-col">
        <SheetHeader className="p-4 border-b border-border bg-gradient-glow">
          <SheetTitle className="flex items-center gap-2">
            <div className="h-9 w-9 rounded-xl bg-gradient-primary grid place-items-center shadow-glow">
              <Sparkles className="h-4 w-4 text-primary-foreground" />
            </div>
            <div className="flex flex-col leading-tight">
              <span className="text-base">WebPulse Copilot</span>
              <span className="text-[11px] font-normal text-muted-foreground flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-success animate-pulse" />
                Live · 247 services indexed
              </span>
            </div>
          </SheetTitle>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin">
          {messages.map((m, i) => (
            <div key={i} className={`flex gap-2 ${m.role === "user" ? "flex-row-reverse" : ""}`}>
              <div
                className={`h-7 w-7 rounded-lg grid place-items-center shrink-0 ${
                  m.role === "ai" ? "bg-gradient-primary" : "bg-muted"
                }`}
              >
                {m.role === "ai" ? (
                  <Bot className="h-4 w-4 text-primary-foreground" />
                ) : (
                  <User className="h-4 w-4" />
                )}
              </div>
              <div
                className={`rounded-2xl px-3.5 py-2.5 text-sm max-w-[85%] leading-relaxed ${
                  m.role === "ai"
                    ? "bg-muted/60 border border-border"
                    : "bg-gradient-primary text-primary-foreground"
                }`}
              >
                {m.text}
              </div>
            </div>
          ))}
        </div>

        <div className="border-t border-border p-3 space-y-2">
          <div className="flex flex-wrap gap-1.5">
            {suggestions.slice(0, 3).map((s) => (
              <Badge
                key={s}
                variant="outline"
                onClick={() => send(s)}
                className="cursor-pointer hover:bg-muted text-[11px] py-1"
              >
                {s}
              </Badge>
            ))}
          </div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              send();
            }}
            className="flex gap-2"
          >
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask anything about your systems..."
              className="flex-1"
            />
            <Button type="submit" size="icon" className="bg-gradient-primary">
              <Send className="h-4 w-4" />
            </Button>
          </form>
        </div>
      </SheetContent>
    </Sheet>
  );
}
