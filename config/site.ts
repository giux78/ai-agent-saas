import { env } from "@/env.mjs";
import { SiteConfig } from "types"

const site_url = env.NEXT_PUBLIC_APP_URL;

export const siteConfig: SiteConfig = {
  name: "Zefiro",
  description:
    "Zefiro, one of the best open source Italian LLM",
  url: site_url,
  ogImage: `${site_url}/og.jpg`,
  links: {
    twitter: "https://twitter.com/businessos_",
    github: "https://github.com/giux78",
  },
  mailSupport: "ale.ercolani@gmail.com"
}
