import { NavLink, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Activity,
  AlertTriangle,
  Radio,
  Brain,
  FileText,
  Plug,
  Settings,
  Sparkles,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
  useSidebar,
} from "@/components/ui/sidebar";
import { Badge } from "@/components/ui/badge";

const mainNav = [
  { title: "Dashboard", url: "/dashboard", icon: LayoutDashboard },
  { title: "Live Monitoring", url: "/monitoring", icon: Activity },
  { title: "Incidents", url: "/incidents", icon: AlertTriangle },
  { title: "War Room", url: "/war-room", icon: Radio, badge: "LIVE" },
  { title: "AI RCA", url: "/rca", icon: Brain, badge: "NEW" },
  { title: "Reports", url: "/reports", icon: FileText },
];

const systemNav = [
  { title: "Integrations", url: "/integrations", icon: Plug },
  { title: "Admin", url: "/admin", icon: Settings },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path || location.pathname.startsWith(path + "/");

  return (
    <Sidebar collapsible="icon" className="border-r border-sidebar-border">
      <SidebarHeader className="border-b border-sidebar-border h-16 flex items-center justify-center px-3">
        <NavLink to="/" className="flex items-center gap-2.5 w-full">
          <div className="relative h-9 w-9 rounded-xl bg-gradient-primary grid place-items-center shadow-glow shrink-0">
            <Sparkles className="h-5 w-5 text-primary-foreground" />
            <span className="absolute -top-0.5 -right-0.5 h-2.5 w-2.5 rounded-full bg-success border-2 border-sidebar animate-pulse" />
          </div>
          {!collapsed && (
            <div className="flex flex-col leading-tight">
              <span className="font-bold text-base tracking-tight">WebPulse</span>
              <span className="text-[10px] text-muted-foreground font-medium uppercase tracking-wider">
                Command Center
              </span>
            </div>
          )}
        </NavLink>
      </SidebarHeader>

      <SidebarContent className="px-2 py-3">
        <SidebarGroup>
          <SidebarGroupLabel className="text-[10px] uppercase tracking-wider font-semibold text-muted-foreground/70">
            Operations
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {mainNav.map((item) => (
                <SidebarMenuItem key={item.url}>
                  <SidebarMenuButton asChild isActive={isActive(item.url)} tooltip={item.title}>
                    <NavLink
                      to={item.url}
                      className={({ isActive }) =>
                        `group relative flex items-center gap-3 rounded-lg transition-all ${
                          isActive
                            ? "bg-sidebar-accent text-sidebar-accent-foreground font-semibold"
                            : "hover:bg-sidebar-accent/50"
                        }`
                      }
                    >
                      <item.icon className="h-4 w-4 shrink-0" />
                      {!collapsed && (
                        <>
                          <span className="flex-1 text-sm">{item.title}</span>
                          {item.badge && (
                            <Badge
                              variant="outline"
                              className={`text-[9px] h-4 px-1.5 font-bold ${
                                item.badge === "LIVE"
                                  ? "bg-destructive/10 text-destructive border-destructive/30"
                                  : "bg-accent/10 text-accent border-accent/30"
                              }`}
                            >
                              {item.badge}
                            </Badge>
                          )}
                        </>
                      )}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup className="mt-4">
          <SidebarGroupLabel className="text-[10px] uppercase tracking-wider font-semibold text-muted-foreground/70">
            System
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {systemNav.map((item) => (
                <SidebarMenuItem key={item.url}>
                  <SidebarMenuButton asChild isActive={isActive(item.url)} tooltip={item.title}>
                    <NavLink
                      to={item.url}
                      className={({ isActive }) =>
                        `flex items-center gap-3 rounded-lg transition-all ${
                          isActive
                            ? "bg-sidebar-accent text-sidebar-accent-foreground font-semibold"
                            : "hover:bg-sidebar-accent/50"
                        }`
                      }
                    >
                      <item.icon className="h-4 w-4 shrink-0" />
                      {!collapsed && <span className="text-sm">{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t border-sidebar-border p-3">
        {!collapsed ? (
          <div className="rounded-xl bg-gradient-glow border border-primary/20 p-3 space-y-2">
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-success animate-pulse" />
              <span className="text-xs font-semibold">All systems operational</span>
            </div>
            <p className="text-[10px] text-muted-foreground leading-relaxed">
              247 services · 99.982% uptime · 4 active incidents
            </p>
          </div>
        ) : (
          <div className="h-2 w-2 rounded-full bg-success mx-auto animate-pulse" />
        )}
      </SidebarFooter>
    </Sidebar>
  );
}
