import Link from "next/link"

import { buttonVariants } from "@/components/ui/button"
import { siteConfig } from "@/config/site"
import { cn, nFormatter } from "@/lib/utils"
import Balancer from "react-wrap-balancer"
import { Icons } from "@/components/shared/icons"
import { env } from "@/env.mjs"
import Features from "@/components/features"
import { HeaderSection } from "@/components/shared/header-section"

export default async function IndexPage() {
  return (
    <>
      <section className="space-y-6 pb-12 pt-16 lg:py-12">
        <div className="container flex max-w-5xl flex-col items-center gap-5 text-center">
          <div
          className="flex justify-center space-x-2 md:space-x-4"
          style={{ animationDelay: "0.4s", animationFillMode: "forwards" }}
        > 
          <Link
            href="https://huggingface.co/mii-llm"
            style={{ animationDelay: "0.15s", animationFillMode: "forwards" }}
            target="_blank"
          >
            <img
              alt="hugging face"
              className="object-cover object-center"
              height="60"
              src="/images/hf-logo.png"
              width="60"
            />
          </Link>
                    <Link
            href="https://discord.gg/dTUYfgmsAh"
            style={{ animationDelay: "0.15s", animationFillMode: "forwards" }}
            target="_blank"
          >
            <img
              alt="mii-llm discord"
              className="object-cover object-center"
              height="60"
              src="/images/discord-mark-blue.png"
              width="60"
            />
          </Link>
        </div>

          <h1
            className="animate-fade-up font-urban text-4xl font-extrabold tracking-tight opacity-0 sm:text-5xl md:text-6xl lg:text-7xl"
            style={{ animationDelay: "0.25s", animationFillMode: "forwards" }}
          >
            <Balancer>
              <span className="relative bg-gradient-to-r from-indigo-500 to-purple-500/80 bg-clip-text font-extrabold text-transparent">
                MII-LLM
              </span>
              {" "} an indipendent AI research community 
            </Balancer>
          </h1>
          <p
          className="max-w-2xl text-balance leading-normal text-muted-foreground sm:text-xl sm:leading-8"
          style={{ animationDelay: "0.35s", animationFillMode: "forwards" }}
        >
           We are specializing ourselves in training, evaluating, developing and deploying AI systems. 
           All our services are supported by <Link className="text-blue-600 underline visited:text-purple-600 hover:text-blue-800" 
                href="https://seeweb.it" target="_blank">Seeweb</Link> cloud provider.
           We &hearts; Italy and open source.
          </p>
         </div>
          <div
          className="flex justify-center space-x-2 md:space-x-4"
          style={{ animationDelay: "0.4s", animationFillMode: "forwards" }}
        >

          {/*
          <Link
            href="/api"
            prefetch={true}
            className={cn(
              buttonVariants({ size: "lg" }),
              "gap-2",
            )}
          >
            <span> API</span>
            <Icons.arrowRight className="size-4" />
          </Link> */}
          <Link
            href="https://chat.mii-llm.ai"
            target="_blank"
            className={cn(
              buttonVariants({
               // variant: "outline",
                size: "lg",
              }),
              "px-5",
            )}
          >
            <p>
              <span className="">MII-LLM CHAT</span>
            </p>
          </Link>
        </div>
        <section className="w-full py-12 md:py-24 lg:py-24 xl:py-24">
          <div className="container flex flex-col items-center justify-center space-y-4 px-4 md:flex-row md:space-y-0 md:px-6 lg:space-x-12 lg:px-12 xl:space-x-16">
            <div className="space-y-3">
              <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl/none">
                Maestrale
              </h1>
              <p className="mx-auto max-w-[600px] text-gray-500 dark:text-gray-400 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Is a 7 billion  <Link className="text-blue-600 underline visited:text-purple-600 hover:text-blue-800" 
                href="https://huggingface.co/mii-llm/maestrale-chat-v0.4-beta" target="_blank">open source</Link> model fine tuned for producing good Italian both semantically and syntatically.  It is one of the best model for Italian language as is shown in the <Link className="text-blue-600 underline visited:text-purple-600 hover:text-blue-800" 
                href="https://indigo.ai/it/chatbot-arena-italia/" target="_blank">LLM Arena leaderboard ITA from indigo.ai</Link> competing with the best closed model from Openai, Anthropic and Google and it is able to produce high quality text in a wide range of domains.
                Maestrale is able to integrate with tools via json and API calls and has reasoning capabilities. Discover more on the <Link className="text-blue-600 underline visited:text-purple-600 hover:text-blue-800" 
                href="/api" target="_blank">api documentation.</Link>
              </p>
              
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Link href="https://chat.mii-llm.ai" className={cn(buttonVariants({ variant: "outline", size: "lg" }))}>
                  Chat with MII-LLM
              </Link>
              <Link href="/api" className={cn(buttonVariants({ variant: "outline", size: "lg" }))}>
                  Maestrale API
              </Link>
              </div>
            </div>
            <img
              alt="Hero image"
              className="overflow-hidden rounded-xl object-cover object-center"
              height="310"
              src="/images/zefiro_small.png"
              width="500"
            />
          </div>
        </section>
        </section>
         <section className="w-full bg-gray-100 py-12 dark:bg-gray-800 md:py-24 lg:py-24 xl:py-24">
          <div className="container flex flex-col items-center justify-center space-y-4 px-4 md:flex-row md:space-y-0 md:px-6 lg:space-x-12 lg:px-12 xl:space-x-16">
            <div className="grid items-center gap-6 lg:grid-cols-[1fr_500px] lg:gap-12 xl:grid-cols-[1fr_550px]">
            <Link 
                href="https://github.com/mii-llm/propaganda" target="_blank">
              <img
                alt="Image"
                className="mx-auto overflow-hidden rounded-xl object-cover object-center sm:w-full lg:order-last"
                height="310"
                src="/images/propaganda.png"
                width="500"
              />
              </Link>
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                    Propaganda
                  </h2>
                  <p className="max-w-[600px] text-gray-500 dark:text-gray-400 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Propaganda is an open-source initiative dedicated to assessing and generating political bias in Large Language Models (LLMs). It offers comprehensive suites designed for evaluating political bias, developing datasets to introduce political bias into LLMs, and has also released two specific LLMs: Propaganda-dx, tailored for conservative bias, and Propaganda-sx, aimed at liberal bias.                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Link href="https://huggingface.co/mii-llm/propaganda-dpo-dx-v0.1" className="flex items-center gap-2">
                        <img
                            alt="hugging face"
                            className="object-cover object-center"
                            height="40"
                            src="/images/hf-logo.png"
                            width="40"
                            />
                              Propaganda-dx
                      </Link>
                      <Link href="https://huggingface.co/mii-llm/propaganda-dpo-sx-v0.1" className="flex items-center gap-2">
                        <img
                            alt="hugging face"
                            className="object-cover object-center"
                            height="40"
                            src="/images/hf-logo.png"
                            width="40"
                            />
                              Propaganda-sx
                      </Link>


                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Link href="https://github.com/mii-llm/propaganda" className="flex items-center gap-2">
                        <Icons.gitHub className="size-7" />
                        <span>Code </span>
                      </Link>
                      <Link href="https://github.com/mii-llm/propaganda/blob/main/eval/propaganda_evals/charts/Propaganda.pdf" className="flex items-center gap-2">
                        <Icons.gitHub className="size-7" />
                        <span>Technical report </span>
                      </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-24 xl:py-24">
        <div className="container flex flex-col items-center justify-center space-y-4 px-4 md:flex-row md:space-y-0 md:px-6 lg:space-x-12 lg:px-12 xl:space-x-16">
            <div className="grid items-center gap-6 lg:grid-cols-[1fr_500px] lg:gap-12 xl:grid-cols-[1fr_550px]">
            <Link 
                href="https://huggingface.co/spaces/FinancialSupport/open_ita_llm_leaderboard" target="_blank">
              <img
                alt="Image"
                className="mx-auto overflow-hidden rounded-xl object-cover object-center sm:w-full lg:order-last"
                height="310"
                src="/images/leaderboard.png"
                width="500"
              />
              </Link>
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                    Italian LLMs leaderboard
                  </h2>
                  <p className="max-w-[600px] text-gray-500 dark:text-gray-400 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                    The ranking of the open source Italian LLMs on reproducible evaluation benchmarks as mmlu_it, arc_c_it, hellaswag_it and others. 
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Link href="https://huggingface.co/spaces/FinancialSupport/open_ita_llm_leaderboard" 
                  className={cn(buttonVariants({ variant: "outline", size: "lg" }))}
                  target="_blank"
                  rel="noreferrer">
                  Go to the leaderboard
                </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full bg-gray-100 py-12 dark:bg-gray-800 md:py-24 lg:py-24 xl:py-24">
          <div className="container flex flex-col items-center justify-center space-y-4 px-4 md:flex-row md:space-y-0 md:px-6 lg:space-x-12 lg:px-12 xl:space-x-16">
            <div className="grid items-center gap-6 lg:grid-cols-[1fr_500px] lg:gap-12 xl:grid-cols-[1fr_550px]">
            <Link 
                href="https://huggingface.co/spaces/mii-llm/pinocchio-ita-leaderboard" target="_blank">
              <img
                alt="Image"
                className="mx-auto overflow-hidden rounded-xl object-cover object-center sm:w-full lg:order-last"
                height="310"
                src="/images/pinocchio-leaderboard.png"
                width="500"
              />
              </Link>
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                    Pinocchio ITA leaderboard
                  </h2>
                  <p className="max-w-[600px] text-gray-500 dark:text-gray-400 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                    Specialized benchmarks on specific topics as logic, math, law, foreign language and culture for Italian finetuned LLMs  
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Link href="https://huggingface.co/spaces/mii-llm/pinocchio-ita-leaderboard" 
                  className={cn(buttonVariants({ variant: "outline", size: "lg" }))}
                  target="_blank"
                  rel="noreferrer">
                  Go to the leaderboard
                </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        <Features></Features>
      
    </>
  )
}

const features = [
  {
    title: "Next.js 14",
    href: "https://nextjs.org/",
    icon: (
      <svg className="h-6 w-auto" xmlns="http://www.w3.org/2000/svg" width="512px" height="104px" viewBox="0 0 512 104" version="1.1" preserveAspectRatio="xMidYMid">
        <path d="M429.54331,0.0429770721 L429.54331,16.5035533 L394.165929,16.5035533 L394.165929,103.100426 L376.475939,103.100426 L376.475939,16.5035533 L340.361746,16.5035533 L340.361746,0.0429770721 L429.54331,0.0429770721 Z M433.519756,93.2825015 C434.76597,93.2825015 435.856244,93.7313462 436.778883,94.6289056 C437.714518,95.526465 438.181036,96.6012751 438.19403,97.8532061 C438.181036,98.703464 437.96532,99.4828995 437.533888,100.179687 C437.090761,100.88843 436.528081,101.443574 435.819858,101.845117 C435.124629,102.258485 434.357929,102.470952 433.519756,102.470952 C432.224162,102.470952 431.122193,102.022238 430.199553,101.124678 C429.276914,100.227119 428.820792,99.1404832 428.832487,97.8532061 C428.820792,96.6012751 429.276914,95.526465 430.199553,94.6289056 C431.122193,93.7313462 432.224162,93.2825015 433.519756,93.2825015 Z M82.9163208,103.100426 L17.6888203,22.0284751 L17.6888203,103.057413 L0,103.057413 L0,0 L22.1109929,0 L104.516873,102.328528 L104.518173,16.5035533 L104.510765,0.0429770721 L193.691939,0.0429770721 L193.691939,16.5035533 L122.206993,16.5035533 L122.206993,42.9835695 L179.695107,42.9835695 L179.695107,59.4441096 L122.206993,59.4441096 L122.206993,86.6398863 L193.691939,86.6398863 L193.691939,103.100426 L82.9163208,103.100426 Z M250.384893,59.2866112 L261.977665,73.7004508 L238.222944,103.222059 L215.007513,103.222059 L250.384893,59.2866112 Z M238.222944,0.085959602 L268.152853,37.2560569 L297.989198,0.200360934 L321.139655,0.164585909 L279.743025,51.6501442 L321.205929,103.14344 L297.989198,103.14344 L215.073787,0.085959602 L238.222944,0.085959602 Z M463.710863,59.0558213 L471.549401,59.0558213 L471.549401,89.2551147 C471.537706,92.0305706 470.93734,94.4044832 469.763898,96.4005036 C468.577462,98.3963939 466.934904,99.9197888 464.825827,100.994599 C462.728447,102.057454 460.271107,102.600902 457.478497,102.600902 C454.924995,102.600902 452.636589,102.140231 450.598985,101.242672 C448.561381,100.345113 446.943513,98.9987086 445.757076,97.2271107 C444.557645,95.4555127 443.970274,93.2470254 443.970274,90.6015188 L451.821807,90.6015188 C451.833503,91.7589766 452.097299,92.7627046 452.600203,93.601267 C453.103107,94.4398294 453.798335,95.0774904 454.685888,95.526335 C455.583838,95.9751797 456.615635,96.199602 457.777381,96.199602 C459.036589,96.199602 460.115168,95.9397036 460.989726,95.4082112 C461.864284,94.8885442 462.536122,94.1091086 463.003939,93.0697746 C463.458761,92.0423959 463.699168,90.7668142 463.710863,89.2551147 L463.710863,59.0558213 Z M503.801503,70.8662579 C503.610477,69.0356629 502.771005,67.6066112 501.309076,66.5909279 C499.834152,65.5634193 497.929096,65.0555777 495.59131,65.0555777 C493.950051,65.0555777 492.536203,65.3036508 491.361462,65.7878416 C490.186721,66.2838579 489.275777,66.9451695 488.65202,67.783732 C488.029563,68.6222944 487.717685,69.5789807 487.692995,70.6537909 C487.692995,71.5513503 487.908711,72.3307858 488.328447,72.980402 C488.748183,73.6417137 489.310863,74.1968569 490.042477,74.6457015 C490.761096,75.1062416 491.564183,75.484134 492.440041,75.7912041 C493.326294,76.0982741 494.213848,76.3581726 495.100102,76.5707695 L499.187005,77.5746274 C500.829563,77.9525198 502.424041,78.4604914 503.945746,79.1099777 C505.467452,79.7477685 506.846213,80.5626802 508.056041,81.5428873 C509.267168,82.5232244 510.226193,83.704203 510.933117,85.0860832 C511.640041,86.4678335 512,88.0858315 512,89.9519025 C512,92.4674599 511.352853,94.6760772 510.045563,96.5893198 C508.739574,98.4907371 506.857909,99.9789157 504.388873,101.053726 C501.931533,102.116711 498.959594,102.659898 495.460061,102.659898 C492.080081,102.659898 489.131533,102.140361 486.650802,101.101027 C484.158376,100.073519 482.215635,98.5616893 480.813482,96.5774944 C479.41133,94.5934294 478.656325,92.1722152 478.548467,89.3259371 L486.315533,89.3259371 C486.423391,90.8139858 486.902904,92.0542213 487.717685,93.0580792 C488.544162,94.0501117 489.622741,94.7823756 490.941726,95.2783919 C492.272406,95.7625827 493.757726,96.0106558 495.400284,96.0106558 C497.114315,96.0106558 498.624325,95.7507574 499.930315,95.2429157 C501.224609,94.7350741 502.243411,94.0265909 502.975025,93.1053807 C503.718335,92.195866 504.08999,91.1211858 504.101685,89.8929056 C504.08999,88.7709239 503.753421,87.8377584 503.106274,87.1054944 C502.447431,86.3733604 501.536487,85.7592203 500.373442,85.2632041 C499.2,84.7671878 497.832934,84.3183431 496.274843,83.9286254 L491.313381,82.6766944 C487.729381,81.7673096 484.88869,80.3855594 482.814701,78.5313137 C480.730315,76.677068 479.698518,74.2205076 479.698518,71.1379817 C479.698518,68.610599 480.393746,66.3902863 481.797198,64.4887391 C483.186355,62.5873218 485.092711,61.1109685 487.50197,60.0598091 C489.922924,58.9969543 492.655756,58.4771574 495.699168,58.4771574 C498.791959,58.4771574 501.500102,58.9969543 503.837888,60.0598091 C506.174376,61.1109685 508.009259,62.5754964 509.33864,64.4414376 C510.66932,66.3075086 511.364548,68.4451736 511.400934,70.8662579 L503.801503,70.8662579 Z" fill="currentColor" />
      </svg>
    ),
  },
  {
    title: "Prisma",
    href: "https://www.prisma.io/",
    icon: (
      <svg className="h-9 w-auto" viewBox="0 0 256 310" xmlns="http://www.w3.org/2000/svg">
        <path d="M254.313 235.519 148 9.749A17.063 17.063 0 0 0 133.473.037a16.87 16.87 0 0 0-15.533 8.052L2.633 194.848a17.465 17.465 0 0 0 .193 18.747L59.2 300.896a18.13 18.13 0 0 0 20.363 7.489l163.599-48.392a17.929 17.929 0 0 0 11.26-9.722 17.542 17.542 0 0 0-.101-14.76l-.008.008zm-23.802 9.683-138.823 41.05c-4.235 1.26-8.3-2.411-7.419-6.685l49.598-237.484c.927-4.443 7.063-5.147 9.003-1.035l91.814 194.973a6.63 6.63 0 0 1-4.18 9.18h.007z" fill="currentColor" />
      </svg>
    ),
  },
  {
    title: "PlanetScale",
    href: "https://planetscale.com/",
    icon: (
      <svg version="1.0" xmlns="http://www.w3.org/2000/svg" className="h-7 w-auto" width="5666.000000pt" height="908.000000pt" viewBox="0 0 5666.000000 908.000000" preserveAspectRatio="xMidYMid meet">
        <g transform="translate(0.000000,908.000000) scale(0.100000,-0.100000)" fill="currentColor" stroke="none">
          <path d="M4195 9073 c-217 -15 -534 -68 -775 -128 -1775 -446 -3127 -1953 -3379 -3766 -36 -259 -44 -411 -38 -731 7 -402 40 -658 132 -1028 186 -742 584 -1464 1102 -2000 l92 -95 1608 1608 1608 1607 560 0 560 0 -1864 -1864 -1864 -1864 74 -49 c138 -93 323 -200 495 -286 l171 -85 3006 3006 3006 3007 -79 159 c-591 1182 -1662 2049 -2934 2376 -402 103 -717 141 -1155 138 -152 -1 -298 -3 -326 -5z" />
          <path d="M11480 4595 l0 -3105 440 0 440 0 0 965 0 965 724 0 c786 0 845 3 1071 57 898 212 1539 929 1626 1819 14 144 6 416 -16 564 -72 477 -263 877 -570 1199 -277 288 -603 480 -984 575 -252 64 -159 60 -1503 63 l-1228 4 0 -3106z m2420 2308 c267 -66 471 -183 658 -378 247 -257 375 -561 388 -920 15 -388 -116 -728 -388 -1010 -194 -202 -414 -326 -686 -386 -94 -22 -122 -22 -804 -26 l-708 -4 0 1376 0 1376 728 -4 c697 -3 730 -4 812 -24z" />
          <path d="M16230 4595 l0 -3105 440 0 440 0 0 3105 0 3105 -440 0 -440 0 0 -3105z" />
          <path d="M33200 6920 l0 -780 -340 0 -340 0 0 -380 0 -380 340 0 340 0 0 -1414 c0 -892 4 -1452 10 -1517 54 -547 394 -914 962 -1040 120 -27 451 -37 595 -19 186 23 418 94 538 165 l45 26 -93 115 c-106 131 -198 273 -270 419 -28 55 -51 101 -52 102 0 1 -25 -5 -55 -13 -85 -24 -318 -29 -410 -10 -197 42 -311 157 -366 371 -17 65 -18 159 -21 1443 l-4 1372 491 0 490 0 0 380 0 380 -490 0 -490 0 0 780 0 780 -440 0 -440 0 0 -780z" />
          <path d="M37380 7694 c-331 -38 -564 -96 -817 -204 -224 -97 -406 -216 -575 -379 -330 -317 -498 -708 -498 -1161 0 -621 313 -1082 950 -1401 239 -119 395 -171 1045 -349 652 -178 832 -239 1020 -347 303 -174 445 -390 445 -676 0 -235 -83 -433 -254 -603 -101 -100 -177 -154 -311 -219 -437 -212 -1092 -218 -1534 -14 -245 114 -441 312 -527 537 l-28 72 -488 0 -489 0 7 -37 c68 -383 280 -750 575 -998 317 -265 712 -430 1222 -507 124 -19 185 -22 482 -22 357 -1 450 7 690 55 786 157 1332 608 1511 1249 49 174 58 252 58 480 0 232 -13 321 -70 496 -176 542 -699 956 -1492 1183 -76 22 -306 83 -512 136 -206 54 -433 116 -505 140 -404 133 -660 310 -788 545 -103 190 -109 444 -15 658 58 131 189 285 317 371 243 165 552 242 911 228 301 -12 552 -88 765 -230 85 -57 233 -211 281 -293 44 -74 104 -213 104 -238 0 -14 51 -16 490 -16 474 0 490 1 490 19 0 10 -11 56 -24 102 -112 386 -408 765 -806 1031 -204 136 -502 267 -747 328 -208 51 -306 62 -583 65 -146 2 -281 1 -300 -1z" />
          <path d="M50600 4595 l0 -3105 440 0 440 0 0 3105 0 3105 -440 0 -440 0 0 -3105z" />
          <path d="M19775 6264 c-16 -2 -73 -9 -125 -15 -192 -22 -410 -77 -594 -151 -795 -316 -1332 -1010 -1477 -1906 -26 -162 -37 -549 -20 -702 92 -811 573 -1486 1316 -1851 237 -116 450 -184 716 -230 157 -27 515 -37 670 -20 543 62 994 322 1276 738 l58 85 3 -361 2 -361 440 0 440 0 0 2330 0 2330 -440 0 -440 0 -2 -331 -3 -331 -43 62 c-63 89 -224 253 -327 333 -338 261 -761 390 -1264 386 -86 -1 -169 -4 -186 -5z m469 -815 c519 -67 969 -395 1201 -874 263 -546 224 -1182 -103 -1671 -244 -364 -613 -610 -1046 -696 -159 -32 -426 -31 -576 1 -319 68 -563 202 -801 440 -196 196 -315 385 -403 640 -66 191 -80 279 -81 521 0 186 3 230 23 328 33 163 73 279 152 437 85 171 188 312 331 450 125 121 235 200 383 275 288 145 580 193 920 149z" />
          <path d="M25165 6259 c-249 -26 -508 -111 -700 -229 -137 -84 -287 -214 -376 -325 l-44 -55 -5 247 -5 248 -437 3 -438 2 0 -2330 0 -2330 464 0 465 0 4 1373 c4 1483 2 1436 58 1664 115 471 413 791 835 898 241 62 535 51 774 -27 335 -109 559 -386 650 -804 54 -250 53 -212 57 -1711 l4 -1393 440 0 439 0 0 1418 c0 1456 -3 1597 -41 1820 -146 876 -763 1444 -1663 1531 -125 13 -363 12 -481 0z" />
          <path d="M29881 6259 c-792 -89 -1494 -596 -1847 -1334 -118 -249 -187 -478 -231 -770 -25 -172 -25 -557 0 -710 91 -544 334 -1007 733 -1395 355 -345 747 -549 1229 -641 139 -27 481 -37 636 -20 340 39 702 162 974 331 412 257 750 646 948 1095 24 55 47 110 51 123 l7 22 -439 0 -440 0 -36 -61 c-178 -300 -491 -543 -831 -648 -174 -53 -261 -65 -460 -65 -262 1 -425 39 -660 154 -310 153 -569 424 -730 763 -47 99 -115 281 -115 308 0 5 728 10 1918 11 l1917 3 8 45 c15 88 20 523 8 646 -59 578 -307 1099 -707 1484 -363 349 -807 566 -1324 645 -126 20 -488 28 -609 14z m504 -814 c516 -80 986 -454 1170 -930 37 -95 85 -271 85 -311 l0 -24 -1486 0 -1486 0 7 53 c9 67 48 202 86 297 127 318 405 612 733 777 160 80 379 141 566 157 69 5 225 -4 325 -19z" />
          <path d="M42307 6259 c-1075 -114 -1906 -921 -2087 -2029 -99 -606 5 -1192 298 -1687 376 -634 1011 -1052 1745 -1148 137 -18 442 -20 585 -4 798 86 1475 551 1851 1269 51 98 131 272 131 286 0 2 -223 4 -495 4 l-494 0 -41 -70 c-175 -299 -464 -533 -780 -630 -165 -51 -258 -64 -450 -64 -192 0 -282 12 -450 64 -507 156 -908 629 -1019 1201 -85 444 -17 921 183 1272 147 258 377 476 628 595 351 167 804 194 1158 70 295 -104 534 -307 723 -615 l50 -83 494 0 c291 0 493 4 493 9 0 23 -76 203 -130 311 -395 774 -1237 1266 -2155 1259 -88 -1 -195 -5 -238 -10z" />
          <path d="M47210 6263 c-444 -44 -807 -167 -1134 -383 -586 -387 -945 -971 -1063 -1730 -25 -163 -25 -630 0 -775 43 -248 107 -444 212 -660 336 -687 1001 -1168 1806 -1306 157 -27 515 -37 670 -20 551 63 1006 328 1285 750 l49 74 3 -361 2 -362 440 0 440 0 0 2330 0 2330 -440 0 -440 0 0 -331 0 -331 -69 89 c-37 48 -118 136 -178 194 -346 333 -822 503 -1392 497 -86 0 -172 -3 -191 -5z m366 -803 c506 -41 922 -279 1195 -684 286 -423 365 -983 208 -1469 -40 -126 -145 -332 -226 -447 -87 -122 -262 -296 -383 -382 -182 -129 -406 -225 -632 -270 -159 -31 -427 -32 -574 0 -151 33 -246 66 -389 137 -440 218 -764 643 -877 1151 -19 85 -22 129 -22 319 0 192 3 233 22 324 78 357 232 642 474 877 295 287 613 424 1054 453 12 0 79 -4 150 -9z" />
          <path d="M54011 6259 c-400 -45 -802 -206 -1131 -453 -123 -92 -311 -275 -413 -401 -379 -470 -575 -1073 -554 -1700 20 -595 264 -1154 697 -1598 366 -377 781 -602 1285 -698 139 -27 481 -37 636 -20 427 49 821 205 1169 465 136 101 367 336 475 483 131 178 286 462 329 601 l7 22 -439 0 -440 0 -41 -70 c-173 -290 -490 -535 -826 -639 -174 -53 -261 -65 -460 -65 -205 1 -306 17 -486 80 -378 131 -692 415 -884 799 -54 110 -135 316 -135 346 0 5 789 10 1918 11 l1917 3 13 95 c20 150 10 602 -17 755 -87 503 -292 914 -628 1266 -365 380 -835 620 -1383 704 -126 20 -488 28 -609 14z m384 -799 c215 -21 396 -73 574 -166 319 -165 566 -427 702 -744 40 -92 99 -299 99 -346 l0 -24 -1485 0 c-1283 0 -1485 2 -1485 14 0 8 7 48 15 88 36 174 112 351 216 509 85 128 281 322 414 411 215 144 463 234 707 257 121 12 123 12 243 1z" />
          <path d="M6805 2269 l-2270 -2271 200 5 c726 20 1487 247 2138 636 1095 657 1867 1747 2121 2997 53 261 90 608 84 797 l-3 107 -2270 -2271z" />
        </g>
      </svg>
    ),
  },
  {
    title: "Auth.js",
    href: "https://authjs.dev/",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="currentColor"
        stroke="currentColor"
        strokeWidth="1"
        className="size-9"
      >
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
      </svg>
    ),
  },
  {
    title: "Resend",
    href: "https://resend.com/",
    icon: (
      <svg
        width="60"
        viewBox="0 0 65 16"
        fill="none"
        className="h-6 w-auto"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M0.820068 15V1.00001H7.02007C7.88674 1.00001 8.6734 1.20001 9.38007 1.60001C10.0867 1.98668 10.6401 2.51334 11.0401 3.18001C11.4534 3.84668 11.6601 4.60668 11.6601 5.46001C11.6601 6.30001 11.4534 7.06668 11.0401 7.76001C10.6401 8.44001 10.0867 8.98001 9.38007 9.38001C8.6734 9.78001 7.88674 9.98001 7.02007 9.98001H3.72007V15H0.820068ZM8.76007 15L5.20007 8.68001L8.28007 8.18001L12.2401 15.02L8.76007 15ZM3.72007 7.54001H6.88007C7.24007 7.54001 7.5534 7.46001 7.82007 7.30001C8.10007 7.12668 8.3134 6.89334 8.46007 6.60001C8.60673 6.29335 8.68007 5.95335 8.68007 5.58001C8.68007 5.18001 8.5934 4.83335 8.42007 4.54001C8.24674 4.24668 7.9934 4.02001 7.66007 3.86001C7.32674 3.68668 6.94007 3.60001 6.50007 3.60001H3.72007V7.54001Z"
          fill="currentColor"
        />
        <path
          d="M18.0534 15.2C16.9067 15.2 15.9 14.9667 15.0333 14.5C14.18 14.0333 13.5134 13.3933 13.0333 12.58C12.5667 11.7667 12.3333 10.8333 12.3333 9.78001C12.3333 8.95335 12.4667 8.20001 12.7333 7.52001C13 6.84001 13.3733 6.25335 13.8533 5.76001C14.3333 5.25335 14.9 4.86668 15.5534 4.60001C16.22 4.32001 16.94 4.18001 17.7134 4.18001C18.4334 4.18001 19.1 4.31335 19.7134 4.58001C20.3267 4.84668 20.8534 5.22001 21.2934 5.70001C21.7467 6.16668 22.0934 6.72668 22.3334 7.38001C22.5734 8.02001 22.68 8.71335 22.6534 9.46001L22.6334 10.34H14.1334L13.6733 8.60001H20.2934L19.9734 8.96001V8.52001C19.9467 8.16001 19.8267 7.84001 19.6133 7.56001C19.4134 7.26668 19.1534 7.04001 18.8334 6.88001C18.5134 6.70668 18.1533 6.62001 17.7533 6.62001C17.1667 6.62001 16.6667 6.73335 16.2533 6.96001C15.8533 7.18668 15.5467 7.52001 15.3333 7.96001C15.12 8.40001 15.0133 8.93335 15.0133 9.56001C15.0133 10.2 15.1467 10.7533 15.4134 11.22C15.6934 11.6867 16.08 12.0533 16.5734 12.32C17.08 12.5733 17.6733 12.7 18.3533 12.7C18.82 12.7 19.2467 12.6267 19.6334 12.48C20.02 12.3333 20.4333 12.08 20.8734 11.72L22.2334 13.62C21.8467 13.9667 21.42 14.26 20.9534 14.5C20.4867 14.7267 20.0067 14.9 19.5133 15.02C19.02 15.14 18.5334 15.2 18.0534 15.2Z"
          fill="currentColor"
        />
        <path
          d="M27.3121 15.2C26.3254 15.2 25.4454 15.04 24.6721 14.72C23.9121 14.3867 23.2988 13.9333 22.8321 13.36L24.6121 11.84C25.0121 12.28 25.4654 12.6 25.9721 12.8C26.4788 12.9867 26.9854 13.08 27.4921 13.08C27.6921 13.08 27.8721 13.06 28.0321 13.02C28.2054 12.9667 28.3521 12.9 28.4721 12.82C28.5921 12.7267 28.6788 12.62 28.7321 12.5C28.7988 12.3667 28.8321 12.2267 28.8321 12.08C28.8321 11.7867 28.7121 11.56 28.4721 11.4C28.3388 11.32 28.1321 11.2333 27.8521 11.14C27.5721 11.0333 27.2121 10.92 26.7721 10.8C26.0921 10.6267 25.5121 10.4267 25.0321 10.2C24.5654 9.96001 24.1921 9.69335 23.9121 9.40001C23.6721 9.12001 23.4854 8.82001 23.3521 8.50001C23.2321 8.16668 23.1721 7.80001 23.1721 7.40001C23.1721 6.92001 23.2788 6.48668 23.4921 6.10001C23.7054 5.70001 23.9988 5.36001 24.3721 5.08001C24.7588 4.80001 25.1988 4.58668 25.6921 4.44001C26.1854 4.28001 26.7054 4.20001 27.2521 4.20001C27.7988 4.20001 28.3321 4.26668 28.8521 4.40001C29.3721 4.53335 29.8521 4.72668 30.2921 4.98001C30.7454 5.22001 31.1388 5.50668 31.4721 5.84001L29.9521 7.52001C29.7121 7.29334 29.4388 7.08668 29.1321 6.90001C28.8388 6.71335 28.5321 6.56668 28.2121 6.46001C27.8921 6.35335 27.6054 6.30001 27.3521 6.30001C27.1254 6.30001 26.9188 6.32001 26.7321 6.36001C26.5588 6.40001 26.4121 6.46668 26.2921 6.56001C26.1721 6.64001 26.0788 6.74001 26.0121 6.86001C25.9588 6.98001 25.9321 7.11334 25.9321 7.26001C25.9321 7.40668 25.9654 7.54668 26.0321 7.68001C26.1121 7.81335 26.2188 7.92668 26.3521 8.02001C26.4988 8.10001 26.7121 8.19335 26.9921 8.30001C27.2854 8.40668 27.6788 8.52668 28.1721 8.66001C28.8121 8.83335 29.3521 9.02668 29.7921 9.24001C30.2454 9.45335 30.6054 9.70001 30.8721 9.98001C31.0988 10.22 31.2654 10.4933 31.3721 10.8C31.4788 11.1067 31.5321 11.4467 31.5321 11.82C31.5321 12.4733 31.3454 13.0533 30.9721 13.56C30.6121 14.0667 30.1121 14.4667 29.4721 14.76C28.8321 15.0533 28.1121 15.2 27.3121 15.2Z"
          fill="currentColor"
        />
        <path
          d="M37.5768 15.2C36.4301 15.2 35.4235 14.9667 34.5568 14.5C33.7035 14.0333 33.0368 13.3933 32.5568 12.58C32.0901 11.7667 31.8568 10.8333 31.8568 9.78001C31.8568 8.95335 31.9901 8.20001 32.2568 7.52001C32.5235 6.84001 32.8968 6.25335 33.3768 5.76001C33.8568 5.25335 34.4235 4.86668 35.0768 4.60001C35.7435 4.32001 36.4635 4.18001 37.2368 4.18001C37.9568 4.18001 38.6235 4.31335 39.2368 4.58001C39.8501 4.84668 40.3768 5.22001 40.8168 5.70001C41.2701 6.16668 41.6168 6.72668 41.8568 7.38001C42.0968 8.02001 42.2035 8.71335 42.1768 9.46001L42.1568 10.34H33.6568L33.1968 8.60001H39.8168L39.4968 8.96001V8.52001C39.4701 8.16001 39.3501 7.84001 39.1368 7.56001C38.9368 7.26668 38.6768 7.04001 38.3568 6.88001C38.0368 6.70668 37.6768 6.62001 37.2768 6.62001C36.6901 6.62001 36.1901 6.73335 35.7768 6.96001C35.3768 7.18668 35.0701 7.52001 34.8568 7.96001C34.6435 8.40001 34.5368 8.93335 34.5368 9.56001C34.5368 10.2 34.6701 10.7533 34.9368 11.22C35.2168 11.6867 35.6035 12.0533 36.0968 12.32C36.6035 12.5733 37.1968 12.7 37.8768 12.7C38.3435 12.7 38.7701 12.6267 39.1568 12.48C39.5435 12.3333 39.9568 12.08 40.3968 11.72L41.7568 13.62C41.3701 13.9667 40.9435 14.26 40.4768 14.5C40.0101 14.7267 39.5301 14.9 39.0368 15.02C38.5435 15.14 38.0568 15.2 37.5768 15.2Z"
          fill="currentColor"
        />
        <path
          d="M43.2755 15V4.42001H45.9955L46.0755 6.58001L45.5155 6.82001C45.6622 6.34001 45.9222 5.90668 46.2955 5.52001C46.6822 5.12001 47.1422 4.80001 47.6755 4.56001C48.2089 4.32001 48.7689 4.20001 49.3555 4.20001C50.1555 4.20001 50.8222 4.36001 51.3555 4.68001C51.9022 5.00001 52.3089 5.48668 52.5755 6.14001C52.8555 6.78001 52.9955 7.57335 52.9955 8.52001V15H50.1555V8.74001C50.1555 8.26001 50.0889 7.86001 49.9555 7.54001C49.8222 7.22001 49.6155 6.98668 49.3355 6.84001C49.0689 6.69334 48.7355 6.62668 48.3355 6.64001C48.0155 6.64001 47.7155 6.69335 47.4355 6.80001C47.1689 6.89334 46.9355 7.03335 46.7355 7.22001C46.5489 7.40668 46.3955 7.62001 46.2755 7.86001C46.1689 8.10001 46.1155 8.36001 46.1155 8.64001V15H44.7155C44.4089 15 44.1355 15 43.8955 15C43.6555 15 43.4489 15 43.2755 15Z"
          fill="currentColor"
        />
        <path
          d="M58.8569 15.2C57.9236 15.2 57.0903 14.9667 56.3569 14.5C55.6369 14.02 55.0636 13.3733 54.6369 12.56C54.2236 11.7333 54.0169 10.78 54.0169 9.70001C54.0169 8.64668 54.2236 7.70668 54.6369 6.88001C55.0636 6.04001 55.6369 5.38668 56.3569 4.92001C57.0903 4.44001 57.9236 4.20001 58.8569 4.20001C59.3503 4.20001 59.8236 4.28001 60.2769 4.44001C60.7436 4.58668 61.1569 4.79335 61.5169 5.06001C61.8903 5.32668 62.1903 5.62668 62.4169 5.96001C62.6436 6.28001 62.7703 6.61335 62.7969 6.96001L62.0769 7.10001V0.200012H64.9369V15H62.2369L62.1169 12.56L62.6769 12.62C62.6503 12.9533 62.5303 13.2733 62.3169 13.58C62.1036 13.8867 61.8169 14.1667 61.4569 14.42C61.1103 14.66 60.7103 14.8533 60.2569 15C59.8169 15.1333 59.3503 15.2 58.8569 15.2ZM59.4969 12.84C60.0303 12.84 60.4969 12.7067 60.8969 12.44C61.2969 12.1733 61.6103 11.8067 61.8369 11.34C62.0636 10.8733 62.1769 10.3267 62.1769 9.70001C62.1769 9.08668 62.0636 8.54668 61.8369 8.08001C61.6103 7.61335 61.2969 7.24668 60.8969 6.98001C60.4969 6.71335 60.0303 6.58001 59.4969 6.58001C58.9636 6.58001 58.4969 6.71335 58.0969 6.98001C57.7103 7.24668 57.4036 7.61335 57.1769 8.08001C56.9636 8.54668 56.8569 9.08668 56.8569 9.70001C56.8569 10.3267 56.9636 10.8733 57.1769 11.34C57.4036 11.8067 57.7103 12.1733 58.0969 12.44C58.4969 12.7067 58.9636 12.84 59.4969 12.84Z"
          fill="currentColor"
        />
      </svg>
    )
  },
  {
    title: "shadcn/ui",
    href: "https://ui.shadcn.com/",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" className="size-10">
        <rect width="256" height="256" fill="none"></rect>
        <line x1="208" y1="128" x2="128" y2="208" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16"></line>
        <line x1="192" y1="40" x2="40" y2="192" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16"></line>
      </svg>
    ),
  },
  {
    title: "Stripe",
    href: "https://stripe.com/",
    icon: (
      <svg className="h-8 w-auto" viewBox="0 0 60 25" xmlns="http://www.w3.org/2000/svg" width="60" height="25">
        <path fill="currentColor" d="M59.64 14.28h-8.06c.19 1.93 1.6 2.55 3.2 2.55 1.64 0 2.96-.37 4.05-.95v3.32a8.33 8.33 0 0 1-4.56 1.1c-4.01 0-6.83-2.5-6.83-7.48 0-4.19 2.39-7.52 6.3-7.52 3.92 0 5.96 3.28 5.96 7.5 0 .4-.04 1.26-.06 1.48zm-5.92-5.62c-1.03 0-2.17.73-2.17 2.58h4.25c0-1.85-1.07-2.58-2.08-2.58zM40.95 20.3c-1.44 0-2.32-.6-2.9-1.04l-.02 4.63-4.12.87V5.57h3.76l.08 1.02a4.7 4.7 0 0 1 3.23-1.29c2.9 0 5.62 2.6 5.62 7.4 0 5.23-2.7 7.6-5.65 7.6zM40 8.95c-.95 0-1.54.34-1.97.81l.02 6.12c.4.44.98.78 1.95.78 1.52 0 2.54-1.65 2.54-3.87 0-2.15-1.04-3.84-2.54-3.84zM28.24 5.57h4.13v14.44h-4.13V5.57zm0-4.7L32.37 0v3.36l-4.13.88V.88zm-4.32 9.35v9.79H19.8V5.57h3.7l.12 1.22c1-1.77 3.07-1.41 3.62-1.22v3.79c-.52-.17-2.29-.43-3.32.86zm-8.55 4.72c0 2.43 2.6 1.68 3.12 1.46v3.36c-.55.3-1.54.54-2.89.54a4.15 4.15 0 0 1-4.27-4.24l.01-13.17 4.02-.86v3.54h3.14V9.1h-3.13v5.85zm-4.91.7c0 2.97-2.31 4.66-5.73 4.66a11.2 11.2 0 0 1-4.46-.93v-3.93c1.38.75 3.1 1.31 4.46 1.31.92 0 1.53-.24 1.53-1C6.26 13.77 0 14.51 0 9.95 0 7.04 2.28 5.3 5.62 5.3c1.36 0 2.72.2 4.09.75v3.88a9.23 9.23 0 0 0-4.1-1.06c-.86 0-1.44.25-1.44.9 0 1.85 6.29.97 6.29 5.88z" fillRule="evenodd"></path>
      </svg>
    ),
  },
]