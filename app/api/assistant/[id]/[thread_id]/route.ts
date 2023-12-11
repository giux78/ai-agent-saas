import { getServerSession } from "next-auth/next"
import { z } from "zod"

import { authOptions } from "@/lib/auth"
import { absoluteUrl } from "@/lib/utils"
import OpenAI from "openai"
import { MessageContentText } from "openai/resources/beta/threads/messages/messages"
import { openaiClient } from "@/lib/openaiClient"



export async function POST(
    request: Request, 
    { params }: { params: { id: string, thread_id : string } }) {
  
  const res = await request.json();
  const prompt= "Hi"
  console.log(params.id);
  console.log(params.thread_id);
  console.log(prompt);
  const threadId = params.thread_id

  
  try {
  //  const session = await getServerSession(authOptions)

  //  if (!session?.user || !session?.user.email) {
  //    return new Response(null, { status: 403 })
  //  }

    const message = await openaiClient.beta.threads.messages.create(
      threadId,
      {
        role: "user",
        content: prompt
      }
    );

    console.log("This is the message object: ", message, "\n");

  // Step 4: Run the Assistant
  const myRun = await openaiClient.beta.threads.runs.create(
    threadId,
    {
      assistant_id: 'asst_YxvBcmhcuMPEHdyh8Vesdj4I',
    }
  );
  console.log("This is the run object: ", myRun, "\n");

  // Step 5: Periodically retrieve the Run to check on its status to see if it has moved to completed
  const retrieveRun = async () => {
    let keepRetrievingRun;

    while (myRun.status !== "completed") {
      keepRetrievingRun = await openaiClient.beta.threads.runs.retrieve(
        threadId,
        myRun.id
      );

      console.log(`Run status: ${keepRetrievingRun.status}`);

      if (keepRetrievingRun.status === "completed") {
        console.log("\n");
        break;
      }
      await new Promise(f => setTimeout(f, 1000));
    }
  };
  
  // Step 6: Retrieve the Messages added by the Assistant to the Thread
  const waitForAssistantMessage = async () => {
    await retrieveRun();

    const allMessages = await openaiClient.beta.threads.messages.list(
      threadId
    );

    console.log(
      "------------------------------------------------------------ \n"
    );

    console.log("User: ", (message.content[0] as MessageContentText).text.value);
    console.log("Assistant: ", ( allMessages.data[0].content[0] as MessageContentText).text.value);
    return new Response(JSON.stringify({ assistant: (allMessages.data[0].content[0] as MessageContentText).text.value }))
  };
  const res = await waitForAssistantMessage();
  return res     

  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(JSON.stringify(error.issues), { status: 422 })
    }

    return new Response(null, { status: 500 })
  }
}
