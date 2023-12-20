import { redirect } from "next/navigation"

import { authOptions } from "@/lib/auth"
import { getCurrentUser } from "@/lib/session"
import { EmptyPlaceholder } from "@/components/shared/empty-placeholder"
import { DashboardHeader } from "@/components/dashboard/header"
import { DashboardShell } from "@/components/dashboard/shell"
import { Button } from "@/components/ui/button"
import { openaiClient } from "@/lib/openaiClient"
import { tr } from "date-fns/locale"
import { ChatAgent } from "@/components/chat-agent"
import { kv } from "@vercel/kv"

export const metadata = {
  title: "Dashboard",
}

export default async function DashboardPage() {
  const user = await getCurrentUser()

  if (!user) {
    redirect(authOptions?.pages?.signIn || "/login")
  }

  const thread = await openaiClient.beta.threads.create(); 
  const id = thread.id
  const assistantId = {assistant_id : "asst_YxvBcmhcuMPEHdyh8Vesdj4I"}
  const newThread = {...thread, assistantId}
  await kv.hset(`thread:${thread.id}`, JSON.parse(JSON.stringify(newThread)));
  await kv.zadd(`user:thread:${user.email}`, {
    score: thread.created_at,
    member: `thread:${thread.id}`
  });  

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
      <ChatAgent 
        id="asst_YxvBcmhcuMPEHdyh8Vesdj4I" 
        name="Hoodie Creator" 
        logo="hoodie_creator_logo_small.png" 
        threadId={id}
        description="I can help you creating a wonderful hoodie"/>
    </DashboardShell>
  )
}
