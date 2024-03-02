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

  //  const zefiro = await fetch("http://localhost:8000/openapi/zefiro/v0.5/generate", {
  //  const zefiro = await fetch("https://52.5.233.79/openapi/zefiro/v0.5/generate", { 
  const zefiro = await fetch("https://qod.io/openapi/zefiro/v0.5/generate", { 
      method: "POST",
           headers: {
             "Content-Type": "application/json",
             'X-Auth': 'asdf1234567890',
           },
           body: JSON.stringify(messages)
         })
    
    const messages_ = await zefiro.json()
    console.log(messages_)
    await kv.set(`thread:${threadId}:messages`, JSON.stringify(messages_));

    return new Response(JSON.stringify(messages_))
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(JSON.stringify(error.issues), { status: 422 })
    }

    return new Response(null, { status: 500 })
  }
}
