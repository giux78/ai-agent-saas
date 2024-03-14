import { DashboardConfig } from "types"

export const dashboardConfig: DashboardConfig = {
  mainNav: [
    {
      title: "Api",
      href: "/api",
    },
    {
      title: "Support",
      href: "/support",
      disabled: true,
    },
  ],
  sidebarNav: [
    {
      title: "Agents",
      href: "/agents",
      icon: "post",
    },
    {
      title: "Billing",
      href: "/agents/billing",
      icon: "billing",
    },
    {
      title: "Settings",
      href: "/agents/settings",
      icon: "settings",
    },
    {
      title: "API coming soon",
      href: "#",
      icon: "waypoints",
    },
  ],
}
