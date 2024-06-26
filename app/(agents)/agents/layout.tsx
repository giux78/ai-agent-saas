import { notFound } from "next/navigation"

import { DashboardNav } from "@/components/layout/nav"
import { NavBar } from "@/components/layout/navbar"
import { SiteFooter } from "@/components/layout/site-footer"
import { dashboardConfig } from "@/config/dashboard"
import { getCurrentUser } from "@/lib/session"
import { kv } from "@vercel/kv"
import { addWeeks } from "date-fns"

interface DashboardLayoutProps {
  children?: React.ReactNode
}

export default async function DashboardLayout({
  children,
}: DashboardLayoutProps) {
  const user = await getCurrentUser()

/*
  const threads =  ( await kv.zrange(`user:thread:${user?.email}`, -100, -1)).reverse()
  let threadsInfo :any[] = []
  for (const idx in threads){
    const thread = threads[idx] as string;
    if (await kv.exists(`${thread}:messages`)){
       let threadInfo = await kv.hgetall(thread);
       const threadMessages = await kv.get(`${thread}:messages`);
       threadInfo!['messages'] = threadMessages
       //console.log(threadInfo)
       threadsInfo.push(threadInfo)
    }
    //threads.push(a)
  }
  */ 

  let threadsInfo :any[] = []
  
  if (!user) {
    return notFound()
  }

  return (
    <div className="flex min-h-screen flex-col space-y-6">
      <NavBar user={user} items={dashboardConfig.mainNav} scroll={false} />

      <div className="container grid flex-1 gap-12 md:grid-cols-[200px_1fr]">
        <aside className="hidden w-[200px] flex-col md:flex">
          <DashboardNav items={dashboardConfig.sidebarNav} user={user} threads={threadsInfo.slice(0,20)} />
        </aside>
        <main className="flex w-full flex-1 flex-col overflow-hidden">
          {children}
        </main>
      </div>
      {/*
      <SiteFooter className="border-t" />
    */}
    </div>
  )
}
