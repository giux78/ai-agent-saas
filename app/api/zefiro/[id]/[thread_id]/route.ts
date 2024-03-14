import { getServerSession } from "next-auth/next"
import { z } from "zod"

import { authOptions } from "@/lib/auth"
import { kv } from "@vercel/kv";

export async function POST(request: Request,
   { params }: { params: { id: string, thread_id : string } }) {
  const messages  = await request.json();
  const threadId = params.thread_id;
  const assistantId = params.id;

  try {
    const session = await getServerSession(authOptions)

    if (!session?.user || !session?.user.email) {
      return new Response(null, { status: 403 })
    }

  const apiKey = await kv.get(`user:${session?.user.email}:api`) as string;

  //const zefiro = await fetch("http://localhost:8000/openapi/zefiro/v0.5/generate", {
  //  const zefiro = await fetch("https://52.5.233.79/openapi/zefiro/v0.5/generate", { 
  const zefiro = await fetch("https://qod.io/openapi/zefiro/v0.5/generate", { 
      method: "POST",
           headers: {
             "Content-Type": "application/json",
             'X-Auth': apiKey,
           },
           body: JSON.stringify(messages)
         })
    
    const messages_ = await zefiro.json()
    console.log(messages_)

    if(Array.isArray(messages_)){
      /*let tokenFromMess = 0 
      for (const idx in messages_){
        tokenFromMess = tokenFromMess + Math.round(messages_[idx]['content'].split(' ').length * 2 * 1.5)
      }
      const info = await  kv.hgetall(`api:${apiKey}`)
      let nToken = 100000
      if("n_token" in info!){
        nToken = info['n_token'] as number
      }
      let count = nToken - tokenFromMess
      await kv.hset(`api:${apiKey}`, {'n_token' : count})
      // remove system prompt
      messages_.shift()*/
      await kv.set(`thread:${threadId}:messages`, JSON.stringify(messages_));
    }

    return new Response(JSON.stringify(messages_))
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(JSON.stringify(error.issues), { status: 422 })
    }

    return new Response(null, { status: 500 })
  }
}
