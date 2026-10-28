import Link from "next/link"
import { ArrowUpRight, Cpu, GitBranch, Layers } from "lucide-react"

import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const works = [
  {
    title: "Nev",
    category: "Bilingual decision model",
    description:
      "Turn English and Italian requests into structured choices. Built on Nesso2, Nev selects among your supplied options for routing, function selection, and classification, returning typed decisions and option probabilities—not generated text or tool arguments.",
    highlights: ["~0.4B backbone", "English / Italian", "Apache 2.0"],
    links: [
      { href: "https://huggingface.co/mii-llm/nev", action: "Hugging Face" },
      { href: "https://github.com/mii-llm/nev", action: "GitHub" },
    ],
    icon: GitBranch,
    accent: "from-amber-500/10 via-orange-500/5 to-transparent",
  },
  {
    title: "Nesso3-0.4B-Agentic",
    category: "Small language model",
    description:
      "Our latest bilingual Italian / English model for function calling and structured output. Built on Zagreus, Nesso3 learns a compact tool contract across thousands of tool schemas, with a focus on Italian tool use.",
    highlights: ["~438M parameters", "32K context", "Apache 2.0"],
    links: [
      { href: "https://huggingface.co/mii-llm/nesso3-0.4B-agentic", action: "Explore the model" },
    ],
    icon: Cpu,
    accent: "from-indigo-500/10 via-purple-500/5 to-transparent",
  },
  {
    title: "Palingenesis",
    category: "Training framework",
    description:
      "Research-informed fine-tuning with practical defaults. Memory-efficient training, native support for agentic data, and one configuration that scales from a single GPU to multi-node clusters.",
    highlights: ["Memory-efficient", "Agentic training", "Multi-node ready"],
    links: [
      { href: "https://mii-llm.github.io/palingenesis/", action: "Read the documentation" },
    ],
    icon: Layers,
    accent: "from-teal-500/10 via-cyan-500/5 to-transparent",
  },
]

export function LatestWorks() {
  return (
    <section
      id="latest-work"
      aria-labelledby="latest-work-heading"
      className="container scroll-mt-24 py-12 md:py-16"
    >
      <div className="mb-8 max-w-2xl space-y-3">
        <p className="text-sm font-semibold uppercase tracking-widest text-indigo-600 dark:text-indigo-400">
          Latest work
        </p>
        <h2
          id="latest-work-heading"
          className="font-urban text-3xl font-bold tracking-tight sm:text-4xl"
        >
          Small models. New possibilities.
        </h2>
        <p className="text-lg text-muted-foreground">
          Discover our newest models and the tools to build what comes next.
          Open research, made to be explored.
        </p>
      </div>
      <div className="grid gap-6 lg:grid-cols-3">
        {works.map((work) => (
          <article
            key={work.title}
            className={cn(
              "flex min-w-0 flex-col rounded-2xl border bg-gradient-to-br p-6 shadow-sm transition-shadow hover:shadow-md sm:p-8",
              work.accent
            )}
          >
            <div className="mb-6 flex items-center gap-3">
              <span className="flex size-11 shrink-0 items-center justify-center rounded-xl border bg-background/80">
                <work.icon className="size-5" aria-hidden="true" />
              </span>
              <span className="text-sm font-medium text-muted-foreground">
                {work.category}
              </span>
            </div>
            <h3 className="break-words font-urban text-2xl font-bold tracking-tight sm:text-3xl">
              {work.title}
            </h3>
            <p className="mt-4 leading-relaxed text-muted-foreground">
              {work.description}
            </p>
            <ul className="my-6 flex flex-wrap gap-2" aria-label={`${work.title} highlights`}>
              {work.highlights.map((highlight) => (
                <li
                  key={highlight}
                  className="rounded-full border bg-background/70 px-3 py-1 text-xs font-medium"
                >
                  {highlight}
                </li>
              ))}
            </ul>
            <div className="mt-auto flex flex-wrap gap-3">
              {work.links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(buttonVariants({ variant: "outline" }), "w-fit max-w-full gap-2 bg-background")}
                >
                  {link.action}
                  <ArrowUpRight className="size-4 shrink-0" aria-hidden="true" />
                  <span className="sr-only"> (opens in a new tab)</span>
                </Link>
              ))}
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}