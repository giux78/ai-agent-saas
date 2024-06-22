import { getServerSession } from "next-auth/next"
import { z } from "zod"

import { authOptions } from "@/lib/auth"
import { absoluteUrl } from "@/lib/utils"
import { getCurrentUser } from "@/lib/session"
import { kv } from "@vercel/kv"


export async function GET(request: Request) {
  //const res = await request.json();
  
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user || !session?.user.email) {
      return new Response(null, { status: 403 })
    }

    //const subscriptionPlan = await getUserSubscriptionPlan(session.user.id)

    const user = await getCurrentUser()

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
    
    return new Response(JSON.stringify(threadsInfo))
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(JSON.stringify(error.issues), { status: 422 })
    }

    return new Response(null, { status: 500 })
  }
}