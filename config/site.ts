import { env } from "@/env.mjs";
import { SiteConfig } from "types"

const site_url = env.NEXT_PUBLIC_APP_URL;

export const siteConfig: SiteConfig = {
  name: "MII-LLM",
  description:
    "MII-LLM, the community of open source Italian LLM",
  url: site_url,
  ogImage: `${site_url}/og.png`,
  links: {
    twitter: "https://twitter.com/businessos_",
    github: "https://github.com/giux78",
  },
  mailSupport: "ale.ercolani@gmail.com"
}

export const features = [
  {
    title: "lm-evaluation-harness",
    description:
      "We contribute to add mmlu and arc_c evaluation benchmark for Italian based tasks. Our bechmarks are now used by many LLMs groups for evaluating Italian based LLMs",
    link: "https://github.com/EleutherAI/lm-evaluation-harness",
    icon: "github"
  },
  {
    title: "Zefiro trilogy",
    description:
      "One of the first completely open source Italian model in three versions: continual pre-trained, SFT and DPO",
    link: "/blog/trilogy",
    icon: "hf"
  },
  {
    title: "Gazzetta Ufficiale",
    description:
      "The entire corpus of the current Italian laws as an open source dataset",
    link: "https://huggingface.co/datasets/mii-llm/gazzetta-ufficiale",
    icon: "hf"
  },
  {
    title: "Ultrafeedback ITA",
    description:
      "Translated version of the ultrafeedback dataset for SFT fine tuning",
    link: "https://huggingface.co/datasets/mii-community/ultrafeedback-translated-ita",
    icon: "hf",
  },
  {
    title: "Ultrafeedback binarized ITA",
    description:
      "Translated version eng to ita of the popular ultrafeedback binarized dataset for DPO fine tuning.",
    link: "https://huggingface.co/datasets/mii-community/ultrafeedback-preferences-translated-ita",
    icon: "hf",
    },
  {
    title: "Usenet conversations",
    description:
      "The biggest dataset of real conversations in the Italian language from usenet",
    link: "https://huggingface.co/datasets/mii-community/UsenetArchiveIT-conversations",
    icon: "hf",
  },
  {
    title: "mmlu-pro",
    description:
      "We tranlated the mmlu-pro dataset to Italian and contributed to integrate into the lm-eval command for evaluating Italian LLM on difficult tasks",
    link: "https://github.com/EleutherAI/lm-evaluation-harness/pull/1860",
    icon: "github"
  },
  {
    title: "Maestrale series",
    description:
      "A series of open source LLMs a fine tuned versions of mistral 7 Billion for producing Italian ",
    link: "https://huggingface.co/datasets/mii-llm",
    icon: "hf",
  },
  {
    title: "Pinocchio Eval dataset",
    description:
      "A multimodal and text dataset for evaluating LLMs on Italian tasks",
    link: "https://huggingface.co/datasets/mii-llm/pinocchio",
    icon: "hf",
  },
  {
    title: "lm-evaluation-harness fork",
    description:
      "A fork of lm-evaluation-harness with Italian specific tasks: mmlu arc-c hellaswag pinocchio-law, pinocchio-logic, pinocchio-math and reasoning like mmlu-pro-ita",
    link: "https://github.com/mii-llm/lm-evaluation-harness",
    icon: "github",
  },

];

export const footerLinks = [
  {
    title: "Company",
    items: [
      { title: "About", href: "#" },
      { title: "Enterprise", href: "#" },
      { title: "Terms", href: "/terms" },
      { title: "Privacy", href: "/privacy" },
    ],
  },
  {
    title: "Product",
    items: [
      { title: "Security", href: "#" },
      { title: "Customization", href: "#" },
      { title: "Customers", href: "#" },
      { title: "Changelog", href: "#" },
    ],
  },
  {
    title: "Docs",
    items: [
      { title: "Introduction", href: "#" },
      { title: "Installation", href: "#" },
      { title: "Components", href: "#" },
      { title: "Code Blocks", href: "#" },
    ],
  },
];
