import { redirect } from "next/navigation"

import { authOptions } from "@/lib/auth"
import { getCurrentUser } from "@/lib/session"
import { DashboardShell } from "@/components/dashboard/shell"
import { Button, buttonVariants } from "@/components/ui/button"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { Icons } from "@/components/shared/icons"

export const metadata = {
  title: "Dashboard",
}

export default async function DashboardPage() {
  const user = await getCurrentUser()

  if (!user) {
    redirect(authOptions?.pages?.signIn || "/login")
  }

  return (
    <DashboardShell>
      {/*
      <DashboardHeader heading="Panel" text="Create and manage content.">
        <Button>Fake button</Button>
      </DashboardHeader>

      <div>
        <EmptyPlaceholder>
          <EmptyPlaceholder.Icon name="post" />
          <EmptyPlaceholder.Title>No content created</EmptyPlaceholder.Title>
          <EmptyPlaceholder.Description>
            You don&apos;t have any content yet. Start creating content.
          </EmptyPlaceholder.Description>
          
          <Button variant="outline">Fake button</Button>
        </EmptyPlaceholder>
      </div>
      */}
       <h1 className="font-heading text-3xl leading-[1.1] md:text-5xl">
          Agents
        </h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-2">
      <div  className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 h-550"
        >
    <a href="/dashboard/agent">
        <img className="rounded-t-lg" src="/images/hoodie_creator_logo.png" alt="" />
    </a>
    <div className="p-5">
        <a href="/dashboard/agent">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Hoodie Creator</h5>
        </a>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Create a wonderful unique hoodie</p>
        <div className="grid grid-cols-2 gap-1">
        <Link href="/dashboard/agent" className={cn(buttonVariants({ variant: "outline", size: "sm" }))}>
        Hoodie Creator
            </Link>
            <Link
              href="https://chat.openai.com/g/g-QWziThdPK-hoodie-creator"
              target="_blank"
              rel="noreferrer"
              className={cn(buttonVariants({ variant: "outline", size: "sm" }), "px-4")}
            >
              <Icons.openai className="mr-2 h-4 w-4" />
                <span className="hidden sm:inline-block">GPTs </span>
            </Link>
        </div>
    </div>
</div>
<div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 h-550"
        >
    <a href="#">
        <img className="rounded-t-lg" src="/images/x-marketing-logo.png" alt="" />
    </a>
    <div className="p-5">
        <a href="#">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">X Marketing</h5>
        </a>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Create a tweet from your ideas or link or ...</p>
        <div className="grid grid-cols-2 gap-1">
            <Link
              href="https://chat.openai.com/g/g-y5mZf5t8C-x-marketing"
              target="_blank"
              rel="noreferrer"
              className={cn(buttonVariants({ variant: "outline", size: "sm" }), "px-4")}
            >
              <Icons.openai className="mr-2 h-4 w-4" />
                <span className="hidden sm:inline-block">GPTs </span>
            </Link>
        </div>
    </div>
</div>
<div  className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 h-550"
        >
    <a href="/dashboard/analyst">
        <img className="rounded-t-lg" src="/images/chart-creator-logo.png" alt="" />
    </a>
    <div className="p-5">
        <a href="/dashboard/analyst">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Chart Creator</h5>
        </a>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Create chart from your data</p>
        <div className="grid grid-cols-2 gap-1">
        <Link href="/dashboard/analyst" className={cn(buttonVariants({ variant: "outline", size: "sm" }))}>
        Analyst
            </Link>
            <Link
              href="https://chat.openai.com/g/g-urKpkuDUP-chart-creator"
              target="_blank"
              rel="noreferrer"
              className={cn(buttonVariants({ variant: "outline", size: "sm" }), "px-4")}
            >
              <Icons.openai className="mr-2 h-4 w-4" />
                <span className="hidden sm:inline-block">GPTs </span>
            </Link>
        </div>
    </div>
</div>
</div>
    </DashboardShell>
  )
}
