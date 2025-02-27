import Link from "next/link";

import { features } from "@/config/site";
import { Button } from "@/components/ui/button";
import { HeaderSection } from "@/components/shared/header-section";
import { Icons } from "@/components/shared/icons";
import MaxWidthWrapper from "@/components/shared/max-width-wrapper";

export default function Features() {
  return (
    <section>
      <div className="pb-6 pt-28">
        <MaxWidthWrapper>
          <HeaderSection
            label="Open source"
            title="Open source contributions"
            subtitle="We have many thousands of downloads. Here a list of our most important contributions to the ML/AI open source community"
          />

          <div className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => (
              <div
                className="group relative overflow-hidden rounded-2xl border bg-background p-5 md:p-8"
                key={feature.title}
              >
                <div
                  aria-hidden="true"
                  className="absolute inset-0 aspect-video -translate-y-1/2 rounded-full border bg-gradient-to-b from-purple-500/80 to-white opacity-25 blur-2xl duration-300 group-hover:-translate-y-1/4 dark:from-white dark:to-white dark:opacity-5 dark:group-hover:opacity-10"
                />
                <div className="relative">
                  <h3>{feature.title}</h3>

                  <p className="mt-6 pb-6 text-muted-foreground">
                    {feature.description}
                  </p>

                  <div className="-mb-5 flex gap-3 border-t border-muted py-4 md:-mb-7">
                    <Button
                      variant="secondary"
                      size="sm"
                      className="px-4"
                    >
                    { (feature.icon == 'hf') && (
                      <Link href={feature.link} className="flex items-center gap-2">
                        <img
                            alt="hugging face"
                            className="object-cover object-center"
                            height="40"
                            src="/images/hf-logo.png"
                            width="40"
                            />
                      </Link>
                      )
                    }
                     { 
                     (feature.icon == 'github') && (
                      <Link href={feature.link} className="flex items-center gap-2">
                        <span> </span>
                        <Icons.gitHub className="size-7" />
                      </Link>
                      )
                     }

                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </MaxWidthWrapper>
      </div>
    </section>
  );
}