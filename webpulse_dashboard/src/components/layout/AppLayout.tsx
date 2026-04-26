import { useState } from "react";
import { Outlet } from "react-router-dom";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "./AppSidebar";
import { Topbar } from "./Topbar";
import { AIAssistant } from "./AIAssistant";

export default function AppLayout() {
  const [aiOpen, setAiOpen] = useState(false);

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <AppSidebar />
        <div className="flex-1 flex flex-col min-w-0">
          <Topbar onOpenAssistant={() => setAiOpen(true)} />
          <main className="flex-1 overflow-x-hidden">
            <Outlet />
          </main>
        </div>
        <AIAssistant open={aiOpen} onOpenChange={setAiOpen} />
      </div>
    </SidebarProvider>
  );
}
