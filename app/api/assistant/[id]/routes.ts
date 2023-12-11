import { getServerSession } from "next-auth/next"
import { z } from "zod"

import { authOptions } from "@/lib/auth"
import { absoluteUrl } from "@/lib/utils"
import OpenAI from "openai"
import { MessageContentText } from "openai/resources/beta/threads/messages/messages"
import { openaiClient } from "@/lib/openaiClient";


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
  //  const session = await getServerSession(authOptions)

  //  if (!session?.user || !session?.user.email) {
  //    return new Response(null, { status: 403 })
  //  }

    const thread = await openai.beta.threads.create(); 
    console.log(thread);             
    return new Response(JSON.stringify(thread))
  
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(JSON.stringify(error.issues), { status: 422 })
    }

    return new Response(null, { status: 500 })
  }
}
