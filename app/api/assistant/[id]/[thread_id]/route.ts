import { getServerSession } from "next-auth/next"
import { z } from "zod"

import { authOptions } from "@/lib/auth"
import { MessageContentText } from "openai/resources/beta/threads/messages/messages"
import { openaiClient } from "@/lib/openaiClient"
import { kv } from "@vercel/kv"

export const maxDuration = 300; 

interface ToTweetCampaign {
  tweet: string,
  origin_url?: string
}

const tweet_campaigns = async ({tweet, origin_url=""} :ToTweetCampaign) => {
  const response = await fetch("https://hoodie-creator.vercel.app/openapi/tweet_campaigns", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      'X-Auth': 'asdf1234567890',
    },
    body: JSON.stringify({
        tweet : tweet
    })
  })
  return response.json()
}

interface ToGenerateImage {
  prompt: string
}

const generate_image = async ({prompt}: ToGenerateImage) => {
  const response = await fetch("https://hoodie-creator.vercel.app/openapi/generate_image", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      'X-Auth': 'asdf1234567890',
    },
    body: JSON.stringify({
        prompt : prompt
    })
  })
  return response.json()
}

interface ToCreateProduct {prompt: string, 
  image_url: string,
  size: string,
  color: string
  }

const create_product = async ({prompt, 
  image_url,
  size,
  color
  }: ToCreateProduct) => {
  const response = await fetch("https://hoodie-creator.vercel.app/openapi/product", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      'X-Auth': 'asdf1234567890',
    },
    body: JSON.stringify({
        prompt : prompt,
        image_url: image_url,
        size: size,
        color: color
    })
  })
  return response.json()
}

const availableFunctions = {
  tweet_campaigns,
  generate_image,
  create_product
};


export async function POST(
    request: Request, 
    { params }: { params: { id: string, thread_id : string } }) {
  
  const res = await request.json();
  console.log(params.id);
  console.log(params.thread_id);
  const threadId = params.thread_id
  const prompt = res['question'];

  
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user || !session?.user.email) {
      return new Response(null, { status: 403 })
    }

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
      } else if(keepRetrievingRun.status === "requires_action"){
        console.log(keepRetrievingRun)
        const toolCall = keepRetrievingRun
                .required_action?.submit_tool_outputs?.tool_calls[0];

      const name = toolCall?.function.name;
      console.log(name);

      const args = JSON.parse(toolCall?.function?.arguments || "{}");
      console.log(args);

      const functionName  = toolCall?.function.name;
      const functionToCall  = availableFunctions[functionName! as keyof typeof availableFunctions];
      const functionArgs = JSON.parse(toolCall?.function?.arguments || "{}");
      const functionArgsArr :any = Object.values(functionArgs);
      const functionResponse = await functionToCall.apply(
        null,
        //functionArgsArr
        [functionArgs]
      );

     //const functionResponse =  await tweet_campaigns(args.tweet)

      await openaiClient.beta.threads.runs.submitToolOutputs(
        threadId,
        myRun.id,
        {
          tool_outputs: [
            {
              tool_call_id: toolCall?.id,
              output: JSON.stringify(functionResponse),
            },
          ],
        },
      );

      //const questions = args.questions;
      }
      await new Promise(f => setTimeout(f, 2000));
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
    const messagesA = allMessages.data.map((mess) => { 
      const t = {"id": mess.id, "content": (mess.content[0] as MessageContentText).text.value, "role": mess.role};
      return t;
    })
    await kv.set(`thread:${threadId}:messages`, JSON.stringify(messagesA));

    return new Response(JSON.stringify( messagesA.reverse()))

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
