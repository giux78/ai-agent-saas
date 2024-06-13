import { env } from "@/env.mjs";
import { SiteConfig } from "types"

const site_url = env.NEXT_PUBLIC_APP_URL;

export const siteConfig: SiteConfig = {
  name: "MII-LLM",
  description:
    "MII-LLM, the community of open source Italian LLM",
  url: site_url,
  ogImage: `${site_url}/og.jpg`,
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
    title: "Maestrale series",
    description:
      "A series of open source LLMs a fine tuned versions of mistral 7 Billion for producing Italian ",
    link: "https://huggingface.co/datasets/mii-llm",
    icon: "hf",
  },

];
