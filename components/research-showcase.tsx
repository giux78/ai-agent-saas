import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, FlaskConical, Trophy } from "lucide-react";

import { cn } from "@/lib/utils";

const projects = [
  {
    id: "nesso",
    title: "Nesso",
    category: "Small models, practical intelligence",
    description:
      "Bilingual English / Italian models designed to bring capable AI closer to the edge. Built on Zagreus, the Nesso family offers conversational instruction following, function calling, and structured output in a compact footprint.",
    tags: ["~400M parameters", "English / Italian", "Edge deployment"],
    image: "/images/nesso.png",
    alt: "Nesso artwork with interconnected glowing brains and a cosmic landscape",
    accent: "from-violet-500/15 via-purple-500/5 to-transparent",
    links: [
      { label: "Model collection", href: "https://huggingface.co/collections/mii-llm/nesso" },
      { label: "Nesso Agentic", href: "https://huggingface.co/mii-llm/nesso-0.4B-agentic" },
      { label: "Nesso Instruct", href: "https://huggingface.co/mii-llm/nesso-0.4B-instruct" },
      { label: "Open Zagreus", href: "https://huggingface.co/mii-llm/open-zagreus-0.4B" },
    ],
  },
  {
    id: "zagreus",
    title: "Zagreus",
    category: "Open foundations for what comes next",
    description:
      "Four bilingual foundation models, trained from scratch on around one trillion open-source tokens. Pairing English with Italian, Spanish, Portuguese, or French, Zagreus provides the foundation for Nesso—with open weights, configurations, and evaluations.",
    tags: ["4 bilingual models", "~1T training tokens", "Trained from scratch"],
    image: "/images/zagreus.png",
    alt: "Zagreus foundation model project artwork",
    accent: "from-teal-500/15 via-cyan-500/5 to-transparent",
    links: [
      { label: "Explore the models", href: "https://huggingface.co/collections/mii-llm/zagreus-04b" },
      { label: "Code & technical report", href: "https://github.com/mii-llm/zagreus-nesso-slm" },
    ],
  },
  {
    id: "maestrale",
    title: "Maestrale",
    category: "Italian language, at a larger scale",
    description:
      "A 7-billion-parameter open model fine-tuned for fluent Italian across a wide range of domains. Maestrale brings together language generation, tool integration, structured JSON output, and reasoning capabilities.",
    tags: ["7B parameters", "Italian generation", "Tool integration"],
    image: "/images/zefiro_small.png",
    alt: "Artwork associated with the Maestrale Italian language model",
    accent: "from-blue-500/15 via-indigo-500/5 to-transparent",
    links: [
      { label: "Explore Maestrale", href: "https://huggingface.co/mii-llm/maestrale-chat-v0.4-beta" },
      { label: "Italian LLM Arena", href: "https://indigo.ai/it/chatbot-arena-italia/" },
    ],
  },
  {
    id: "propaganda",
    title: "Propaganda",
    category: "Understanding political bias in AI",
    description:
      "An open research initiative exploring political bias in language models. Evaluation suites, datasets, and the Propaganda-dx and Propaganda-sx models help researchers study how political perspectives are represented and shaped.",
    tags: ["Bias evaluation", "Research datasets", "Open experiments"],
    image: "/images/propaganda.png",
    alt: "Propaganda research artwork showing a colorful robot beside a historical political gathering",
    accent: "from-rose-500/15 via-orange-500/5 to-transparent",
    links: [
      { label: "Explore the research", href: "https://github.com/mii-llm/propaganda" },
      { label: "Propaganda-dx", href: "https://huggingface.co/mii-llm/propaganda-dpo-dx-v0.1" },
      { label: "Propaganda-sx", href: "https://huggingface.co/mii-llm/propaganda-dpo-sx-v0.1" },
      { label: "Technical report", href: "https://github.com/mii-llm/propaganda/blob/main/eval/propaganda_evals/charts/Propaganda.pdf" },
    ],
  },
];

const leaderboards = [
  {
    title: "Italian LLMs leaderboard",
    description:
      "Compare open Italian language models on reproducible benchmarks, including MMLU IT, ARC IT, and HellaSwag IT.",
    image: "/images/leaderboard.png",
    href: "https://huggingface.co/spaces/FinancialSupport/open_ita_llm_leaderboard",
    label: "General language evaluation",
  },
  {
    title: "Pinocchio ITA leaderboard",
    description:
      "Go deeper with specialized Italian benchmarks in logic, mathematics, law, foreign languages, and culture.",
    image: "/images/pinocchio-leaderboard.png",
    href: "https://huggingface.co/spaces/mii-llm/pinocchio-ita-leaderboard",
    label: "Domain-specific evaluation",
  },
];

export function ResearchShowcase() {
  return (
    <section
      id="research"
      aria-labelledby="research-heading"
      className="container scroll-mt-24 py-16 md:py-24"
    >
      <div className="mb-12 flex flex-col gap-6 border-b pb-8 md:flex-row md:items-end md:justify-between">
        <div className="max-w-2xl space-y-3">
          <p className="text-sm font-semibold uppercase tracking-widest text-indigo-600 dark:text-indigo-400">
            Research in focus
          </p>
          <h2 id="research-heading" className="font-urban text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
            From foundations to discovery.
          </h2>
          <p className="text-lg leading-relaxed text-muted-foreground">
            Meet the models and experiments behind our community. Built to be
            studied, shared, and taken further.
          </p>
        </div>
        <FlaskConical className="hidden size-10 text-muted-foreground/40 md:block" aria-hidden="true" />
      </div>

      <div className="space-y-8 md:space-y-12">
        {projects.map((project, index) => (
          <article
            key={project.id}
            aria-labelledby={`${project.id}-heading`}
            className="grid overflow-hidden rounded-3xl border bg-background shadow-sm lg:grid-cols-2"
          >
            <div className={cn(
              "relative flex items-center justify-center bg-gradient-to-br p-4 sm:p-8",
              project.accent,
              index % 2 === 1 && "lg:order-2"
            )}>
              <div className={cn(
                "relative w-full max-w-lg overflow-hidden rounded-2xl bg-muted shadow-lg",
                project.id === "propaganda" ? "aspect-[16/10]" : "aspect-square"
              )}>
                <Image
                  src={project.image}
                  alt={project.alt}
                  fill
                  sizes="(min-width: 640px) 512px, 90vw"
                  className="object-contain"
                />
              </div>
            </div>

            <div className="flex min-w-0 flex-col justify-center p-6 sm:p-10 lg:p-12">
              <div className="mb-6 flex items-center gap-3">
                <span className="font-mono text-sm text-muted-foreground">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="h-px w-8 bg-border" aria-hidden="true" />
                <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  {project.category}
                </span>
              </div>
              <h3 id={`${project.id}-heading`} className="font-urban text-4xl font-bold tracking-tight sm:text-5xl">
                {project.title}
              </h3>
              <p className="mt-5 leading-relaxed text-muted-foreground sm:text-lg">
                {project.description}
              </p>
              <ul className="my-6 flex flex-wrap gap-2" aria-label={`${project.title} highlights`}>
                {project.tags.map((tag) => (
                  <li key={tag} className="rounded-full bg-muted px-3 py-1.5 text-xs font-medium">
                    {tag}
                  </li>
                ))}
              </ul>
              <div className="flex flex-wrap gap-x-5 gap-y-4 border-t pt-6">
                {project.links.map((link, linkIndex) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cn(
                      "inline-flex items-center gap-1.5 rounded-sm text-sm font-medium underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4",
                      linkIndex === 0 ? "text-indigo-600 dark:text-indigo-400" : "text-muted-foreground hover:text-foreground"
                    )}
                  >
                    {link.label}
                    <ArrowUpRight className="size-3.5 shrink-0" aria-hidden="true" />
                    <span className="sr-only"> (opens in a new tab)</span>
                  </Link>
                ))}
              </div>
            </div>
          </article>
        ))}
      </div>

      <div className="mt-16 rounded-3xl border bg-muted/30 p-5 sm:p-8 md:mt-24 lg:p-10">
        <div className="mb-8 flex items-start gap-4">
          <span className="flex size-11 shrink-0 items-center justify-center rounded-xl border bg-background">
            <Trophy className="size-5 text-indigo-600 dark:text-indigo-400" aria-hidden="true" />
          </span>
          <div className="space-y-2">
            <h3 className="font-urban text-2xl font-bold tracking-tight sm:text-3xl">
              Better models start with better benchmarks.
            </h3>
            <p className="text-muted-foreground">
              Transparent evaluation for the Italian AI community.
            </p>
          </div>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          {leaderboards.map((leaderboard) => (
            <Link
              key={leaderboard.title}
              href={leaderboard.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex min-w-0 flex-col overflow-hidden rounded-2xl border bg-background transition-colors hover:border-indigo-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              <div className="border-b bg-white p-3 sm:p-5">
                <div className="relative aspect-[16/10] overflow-hidden rounded-lg border">
                  <Image
                    src={leaderboard.image}
                    alt={`${leaderboard.title} interface preview`}
                    fill
                    sizes="(min-width: 1024px) 500px, (min-width: 768px) 42vw, 85vw"
                    className="object-cover object-top"
                  />
                </div>
              </div>
              <div className="flex flex-1 flex-col p-6">
                <p className="mb-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  {leaderboard.label}
                </p>
                <h4 className="font-urban text-xl font-bold tracking-tight sm:text-2xl">
                  {leaderboard.title}
                </h4>
                <p className="mb-6 mt-3 text-sm leading-relaxed text-muted-foreground">
                  {leaderboard.description}
                </p>
                <span className="mt-auto flex items-center justify-between gap-2 text-sm font-semibold text-indigo-600 dark:text-indigo-400">
                  Explore the leaderboard
                  <ArrowUpRight className="size-4" aria-hidden="true" />
                </span>
                <span className="sr-only"> (opens in a new tab)</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}