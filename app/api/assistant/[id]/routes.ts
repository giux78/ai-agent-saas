import { getServerSession } from "next-auth/next"
import { z } from "zod"
import { kv } from '@vercel/kv'

import { authOptions } from "@/lib/auth"
import OpenAI from "openai"

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(
    request: Request, 
    { params }: { params: { id: string, thread_id : string } }) {
  
  const res = await request.json();
  const { prompt } = res;
  console.log(params.id);
  console.log(params.thread_id);
  console.log(prompt);

  // thread_scYI1OoDkYCedC83ouBoVFGU
  // asst_YxvBcmhcuMPEHdyh8Vesdj4I
  
  try {
  const session = await getServerSession(authOptions)

  if (!session?.user || !session?.user.email) {
      return new Response(null, { status: 403 })
  }

    const thread = await openai.beta.threads.create(); 
    console.log(thread);
  
    await kv.hset(`thread:${thread.id}`, JSON.parse(JSON.stringify(thread)));
    await kv.zadd(`user:thread:${session?.user.email}`, {
      score: thread.created_at,
      member: `thread:${thread.id}`
    });          
    return new Response(JSON.stringify(thread))
  
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(JSON.stringify(error.issues), { status: 422 })
    }

    return new Response(null, { status: 500 })
  }
}
