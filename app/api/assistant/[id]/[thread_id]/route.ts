import { getServerSession } from "next-auth/next"
import { z } from "zod"

import { authOptions } from "@/lib/auth"
import { MessageContentText } from "openai/resources/beta/threads/messages/messages"
import { openaiClient } from "@/lib/openaiClient"
import { kv } from "@vercel/kv"
import * as fs from 'fs';
import { writeFile } from 'fs/promises'
import { FileObject } from "openai/resources"
import { s3 } from "@/lib/s3"
import { PutObjectCommand } from "@aws-sdk/client-s3"


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

interface ToGenerateVideo {
  image_url: string
}

const generate_video = async ({image_url}: ToGenerateVideo) => {
  const response = await fetch("https://hoodie-creator.vercel.app/openapi/generate_video", {
 // const response = await fetch("http://localhost:8000/openapi/generate_video", {
   method: "POST",
    headers: {
      "Content-Type": "application/json",
      'X-Auth': 'asdf1234567890',
    },
    body: JSON.stringify({
      image_url : image_url
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
  create_product,
  generate_video,
};


export async function POST(
    request: Request, 
    { params }: { params: { id: string, thread_id : string } }) {
  
  //const res = await request.json();
  const formData = await request.formData();

  const file = formData.get("file")
  const prompt = formData.get('question') as string

  let fileId = "";
  if (file !== 'undefined') {
    const realFile = file as File;
    const bytes = await realFile.arrayBuffer()
    const buffer = Buffer.from(bytes)
    const path = `/tmp/${realFile.name}`
    await writeFile(path, buffer)

    const fileOpenai = await openaiClient.files.create({
      file: fs.createReadStream(path),
      purpose: "assistants",
    });
    fileId = fileOpenai.id;
  }

  const threadId = params.thread_id;
  const assistantId = params.id;
  //const prompt = res['question'];

  try {
    const session = await getServerSession(authOptions)

    if (!session?.user || !session?.user.email) {
      return new Response(null, { status: 403 })
    }


    let message;
    if (fileId !== ''){
       message = await openaiClient.beta.threads.messages.create(
        threadId,
        {
          role: "user",
          content: prompt,
          file_ids : [fileId]
        }
      );
    } else {
       message = await openaiClient.beta.threads.messages.create(
        threadId,
        {
          role: "user",
          content: prompt
        }
      );
    }

    console.log("This is the message object: ", message, "\n");

  // Step 4: Run the Assistant
  const myRun = await openaiClient.beta.threads.runs.create(
    threadId,
    {
      assistant_id: assistantId,
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
    //console.log("Assistant: ", ( allMessages.data[0].content[0] as MessageContentText).text.value);
    console.log("Assistant: ", allMessages.data[0].content[0]) //.text.value);
    
    const messagesA = await Promise.all(allMessages.data.map(async (mess) => { 
      let out = ""
      for (let i = 0; mess.content.length > i; i++){
        const cont = mess.content[i]
        if(cont.type === 'text'){
          out = out + cont.text.value
        } else if(cont.type === 'image_file'){
          const openFile = await openaiClient.files.content(cont.image_file.file_id);
          const image_data = await openFile.arrayBuffer();
          const image_data_buffer = Buffer.from(image_data);

          //fs.writeFileSync(`/tmp/${cont.image_file.file_id}.png`, image_data_buffer);
          const uploadParams = {
            Bucket: "hoodie-creator",
            Key: `${cont.image_file.file_id}.png`, // the name of the file in the bucket
            Body: image_data_buffer,
            ContentType: "image/png" // or the appropriate content type
          };
          const data = await s3.send(new PutObjectCommand(uploadParams));
          console.log("Success", data);
          out = out + " "  + `![image](https://hoodie-creator.s3.eu-west-1.amazonaws.com/${cont.image_file.file_id}.png)`
        }
      
      const t = {"id": mess.id, "content": out, "role": mess.role};
      return t;
      }
    }))

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
