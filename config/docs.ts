import { DocsConfig } from "types"

export const docsConfig: DocsConfig = {
  mainNav: [
    {
      title: "Documentation",
      href: "/docs",
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
          href: "/docs",
        },
      ],
    },
    {
      title: "Documentation",
      items: [
        {
          title: "Introduction",
          href: "/docs/documentation",
          disabled: true,
        },
        {
          title: "Agents",
          href: "/docs/agents",
          disabled: true,
        },
        {
          title: "Memory",
          href: "/docs/memory",
          disabled: true,
        }

      ],
    },
    {
      title: "API",
      items: [
        {
          title: "Introduction",
          href: "/docs/api",
          disabled: true,
        },
      ],
    },
  ],
}
