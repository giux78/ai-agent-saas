import Link from "next/link";
import { ArrowUpRight, BookOpen } from "lucide-react";

import { features } from "@/config/site";
import { cn } from "@/lib/utils";
import { Icons } from "@/components/shared/icons";
import MaxWidthWrapper from "@/components/shared/max-width-wrapper";

export default function Features() {
  return (
    <section
      id="open-source"
      aria-labelledby="open-source-heading"
      className="scroll-mt-24 border-t bg-muted/30 py-16 md:py-24"
    >
      <MaxWidthWrapper>
        <div className="mb-10 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl space-y-3">
            <p className="text-sm font-semibold uppercase tracking-widest text-indigo-600 dark:text-indigo-400">
              Built in the open
            </p>
            <h2
              id="open-source-heading"
              className="font-urban text-3xl font-bold tracking-tight sm:text-4xl"
            >
              Open source contributions
            </h2>
            <p className="text-lg leading-relaxed text-muted-foreground">
              Models, datasets, training tools, and benchmarks. Explore the
              research we share with the ML and AI community.
            </p>
          </div>
          <span className="w-fit shrink-0 rounded-full border bg-background px-4 py-2 text-sm text-muted-foreground">
            {features.length} open contributions
          </span>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => {
            const external = feature.link.startsWith("https://");
            const destination =
              feature.icon === "github"
                ? "View on GitHub"
                : feature.icon === "docs"
                  ? "Read the documentation"
                  : external
                    ? "Explore on Hugging Face"
                    : "Read the release";

            return (
              <Link
                key={feature.title}
                href={feature.link}
                target={external ? "_blank" : undefined}
                rel={external ? "noopener noreferrer" : undefined}
                className={cn(
                  "group flex min-w-0 flex-col rounded-2xl border bg-background p-6 shadow-sm transition-colors hover:border-indigo-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 sm:p-7",
                  feature.featured &&
                    "border-indigo-200 bg-gradient-to-br from-indigo-500/10 via-background to-background dark:border-indigo-500/30"
                )}
              >
                <div className="mb-6 flex items-center justify-between gap-3">
                  <span className="flex size-11 items-center justify-center rounded-xl border bg-background">
                    {feature.icon === "github" ? (
                      <Icons.gitHub className="size-5" aria-hidden="true" />
                    ) : feature.icon === "docs" ? (
                      <BookOpen className="size-5" aria-hidden="true" />
                    ) : (
                      <img
                        alt=""
                        height="28"
                        src="/images/hf-logo.png"
                        width="28"
                        loading="lazy"
                      />
                    )}
                  </span>
                  {feature.featured && (
                    <span className="rounded-full bg-indigo-500/10 px-3 py-1 text-xs font-semibold text-indigo-700 dark:text-indigo-300">
                      Latest release
                    </span>
                  )}
                </div>
                <p className="mb-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  {feature.category ||
                    (feature.icon === "github" ? "Code & research" : "Models & datasets")}
                </p>
                <h3 className="break-words font-urban text-xl font-bold tracking-tight">
                  {feature.title}
                </h3>
                <p className="mb-6 mt-3 text-sm leading-relaxed text-muted-foreground">
                  {feature.description}
                </p>
                <div className="mt-auto flex items-center justify-between gap-3 border-t pt-4 text-sm font-medium">
                  <span>{destination}</span>
                  <ArrowUpRight
                    className="size-4 shrink-0 text-muted-foreground transition-colors group-hover:text-indigo-500"
                    aria-hidden="true"
                  />
                </div>
                {external && (
                  <span className="sr-only"> (opens in a new tab)</span>
                )}
              </Link>
            );
          })}
        </div>
      </MaxWidthWrapper>
    </section>
  );
}