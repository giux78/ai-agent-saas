import Link from "next/link";
import { ArrowUpRight, Database, GitBranch, Microscope, Share2 } from "lucide-react";

const priorities = [
  {
    title: "Specialized language models",
    description:
      "Purpose-built, efficient models for specific capabilities, languages, cultures, and domains. Specialization matters more than parameter count.",
    icon: Microscope,
  },
  {
    title: "Cooperation between models",
    description:
      "Model-to-model communication, orchestration, shared context, and multi-agent learning to bring complementary capabilities together.",
    icon: Share2,
  },
  {
    title: "Better data and evaluations",
    description:
      "Datasets and benchmarks that look beyond reasoning and coding to linguistic quality, cultural understanding, creativity, and cooperation.",
    icon: Database,
  },
  {
    title: "Open and reproducible research",
    description:
      "Models, training recipes, evaluations, and tools that let the community reproduce results, experiment independently, and build on shared work.",
    icon: GitBranch,
  },
];

export function ResearchPriorities() {
  return (
    <section
      aria-labelledby="priorities-heading"
      className="border-y bg-muted/30 py-16 md:py-20"
    >
      <div className="container">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.4fr] lg:gap-16">
          <div className="space-y-5">
            <p className="text-sm font-semibold uppercase tracking-widest text-indigo-600 dark:text-indigo-400">
              Our research direction
            </p>
            <h2
              id="priorities-heading"
              className="font-urban text-3xl font-bold tracking-normal sm:text-4xl"
            >
              Specialized intelligence.
              <br />
              Collective progress.
            </h2>
            <p className="max-w-xl leading-relaxed text-muted-foreground">
              Specialization is a research direction, not simply a way to reduce
              inference costs. We explore forms of intelligence that current
              frontier training objectives may not adequately prioritize.
            </p>
            <Link
              href="/manifesto"
              className="inline-flex items-center gap-2 rounded-sm font-semibold text-indigo-600 underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4 dark:text-indigo-400"
            >
              Read our manifesto
              <ArrowUpRight className="size-4" aria-hidden="true" />
            </Link>
          </div>
          <div className="grid gap-8 sm:grid-cols-2">
            {priorities.map((priority) => (
              <div key={priority.title} className="min-w-0 border-t pt-5">
                <priority.icon className="mb-4 size-5 text-muted-foreground" aria-hidden="true" />
                <h3 className="font-urban text-xl font-bold tracking-normal">
                  {priority.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {priority.description}
                </p>
              </div>
            ))}
          </div>
        </div>
        <blockquote className="mt-12 max-w-4xl border-l-2 border-indigo-400 pl-6 font-urban text-xl font-medium leading-relaxed sm:text-2xl">
          We believe the future of AI lies in specialized models, each developing
          distinct capabilities and contributing to a broader intelligence through
          cooperation.
        </blockquote>
      </div>
    </section>
  );
}