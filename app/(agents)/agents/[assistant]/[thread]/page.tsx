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
import { getUserSubscriptionPlan } from "@/lib/subscription"
import { ChatAgentReadOnly } from "@/components/chat-agent-readonly"
import { Message } from "ai"
import { mapping } from "@/lib/utils"

export const metadata = {
  title: "Dashboard",
}

export default async function ReadOnlyPage({ params }: { params: { assistant: string, thread :string } }) {
  const user = await getCurrentUser()
  const threadId = params.thread
  const assistantId = params.assistant

  if (!user) {
    redirect(authOptions?.pages?.signIn || "/login")
  }

  const subscriptionPlan = await getUserSubscriptionPlan(user.id)

  const messages = await kv.get(`thread:${threadId}:messages`) as Message[]
  console.log("QUA PASSO")
  console.log(messages)
  
  if(!subscriptionPlan.isPaid){
    redirect(
      "/agents/billing")
  }


  const logo = mapping[assistantId].logo.split('/').pop();
 
  return (
    <DashboardShell>

      <ChatAgentReadOnly 
        id="Aurora_v0.1" 
        name={mapping[assistantId].name} 
        logo={logo} 
        threadId={threadId}
        initialMessages={messages}
        description={mapping[assistantId].description}/>
    </DashboardShell>
  )
}
