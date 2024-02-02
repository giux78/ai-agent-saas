import { getServerSession } from "next-auth/next"
import { z } from "zod"

import { authOptions } from "@/lib/auth"

export async function POST(request: Request) {
  const messages  = await request.json();
  
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user || !session?.user.email) {
      return new Response(null, { status: 403 })
    }

    console.log("QUA CI SONO")

    const zefiro = await fetch("http://localhost:8000/openapi/zefiro/v0.5/generate", {
        //const response = await fetch("http://localhost:8000/openapi/generate_video", {
          method: "POST",
           headers: {
             "Content-Type": "application/json",
             'X-Auth': 'asdf1234567890',
           },
           body: JSON.stringify(messages)
         })
    
    const messages_ = await zefiro.json()
    console.log(messages_)
    return new Response(JSON.stringify(messages_))
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(JSON.stringify(error.issues), { status: 422 })
    }

    return new Response(null, { status: 500 })
  }
}
