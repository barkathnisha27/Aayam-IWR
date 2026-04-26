import { BrowserRouter, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";

import AppLayout from "./components/layout/AppLayout";
import Landing from "./pages/Landing";
import Dashboard from "./pages/Dashboard";
import LiveMonitoring from "./pages/LiveMonitoring";
import Incidents from "./pages/Incidents";
import WarRoom from "./pages/WarRoom";
import RCA from "./pages/RCA";
import Reports from "./pages/Reports";
import Integrations from "./pages/Integrations";
import Admin from "./pages/Admin";
import NotFound from "./pages/NotFound.tsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route element={<AppLayout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/monitoring" element={<LiveMonitoring />} />
            <Route path="/incidents" element={<Incidents />} />
            <Route path="/war-room" element={<WarRoom />} />
            <Route path="/rca" element={<RCA />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/integrations" element={<Integrations />} />
            <Route path="/admin" element={<Admin />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
