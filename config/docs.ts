import { DocsConfig } from "types"

export const docsConfig: DocsConfig = {
  mainNav: [
    {
      title: "Api",
      href: "/api",
    },
    {
      title: "Guides",
      href: "/guides",
    },
  ],
  sidebarNav: [
    {
      title: "Getting Started",
      items: [
        {
          title: "Introduction",
          href: "/api",
        },
      ],
    },
    {
      title: "Documentation",
      items: [
        {
          title: "Introduction",
          href: "/api/documentation",
          disabled: true,
        },
        {
          title: "Agents",
          href: "/api/agents",
          disabled: true,
        },
        {
          title: "Memory",
          href: "/api/memory",
          disabled: true,
        }

      ],
    },
    {
      title: "API",
      items: [
        {
          title: "Introduction",
          href: "/api/api",
          disabled: true,
        },
      ],
    },
  ],
}
