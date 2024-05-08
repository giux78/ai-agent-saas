import { redirect } from "next/navigation"

import { authOptions } from "@/lib/auth"
import { getCurrentUser } from "@/lib/session"
import { DashboardShell } from "@/components/dashboard/shell"
import { openaiClient } from "@/lib/openaiClient"
import { ChatAgent } from "@/components/chat-agent"
import { kv } from "@vercel/kv"
import { getUserSubscriptionPlan } from "@/lib/subscription"

export const metadata = {
  title: "Dashboard",
}

export default async function DashboardPage() {
  const user = await getCurrentUser()

  if (!user) {
    redirect(authOptions?.pages?.signIn || "/login")
  }

    /* NO BILLING YET
  const subscriptionPlan = await getUserSubscriptionPlan(user.id)
  
  if(!subscriptionPlan.isPaid){
    redirect(
      "/agents/billing")
  } */ 

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
        description="I can help you creating a wonderful hoodie, ask me to create an image that will become the "/>
    </DashboardShell>
  )
}
