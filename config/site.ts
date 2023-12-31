import { env } from "@/env.mjs";
import { SiteConfig } from "types"

const site_url = env.NEXT_PUBLIC_APP_URL;

export const siteConfig: SiteConfig = {
  name: "Business Operating System",
  description:
    "Your Business operating system, record your task and we will automatize for you beeing your interface of your digital life",
  url: site_url,
  ogImage: `${site_url}/og.jpg`,
  links: {
    twitter: "https://twitter.com/businessos_",
    github: "https://github.com/giux78",
  },
  mailSupport: "ale.ercolani@gmail.com"
}
