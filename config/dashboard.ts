import { DashboardConfig } from "types"

export const dashboardConfig: DashboardConfig = {
  mainNav: [
    {
      title: "Documentation",
      href: "/docs",
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
  ],
}
