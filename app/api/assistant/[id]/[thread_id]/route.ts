import { getServerSession } from "next-auth/next"
import { z } from "zod"

import { authOptions } from "@/lib/auth"
import { MessageContentText } from "openai/resources/beta/threads/messages/messages"
import { openaiClient } from "@/lib/openaiClient"
import { kv } from "@vercel/kv"
import * as fs from 'fs';
import { writeFile } from 'fs/promises'
import { s3 } from "@/lib/s3"
import { PutObjectCommand } from "@aws-sdk/client-s3"
import Replicate from "replicate";
import { env } from "@/env.mjs"


const replicate = new Replicate({
  auth: env.REPLICATE_API_KEY
});


export const maxDuration = 300; 

interface ToTweetCampaign {
  tweet: string,
  origin_url?: string
}

const tweet_campaigns = async ({tweet, origin_url=""} :ToTweetCampaign) => {
  //const response = await fetch("https://hoodie-creator.vercel.app/openapi/tweet_campaigns", {
  const response = await fetch("https://qod.io/openapi/tweet_campaigns", {  
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
 // const response = await fetch("https://hoodie-creator.vercel.app/openapi/generate_image", {
 // const response = await fetch("http://localhost:8000/openapi/generate_image", {   
  const response = await fetch("https://qod.io/openapi/generate_image", {   
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
  /*
  const response = await openaiClient.images.generate( {
    model:"dall-e-3",
    prompt: prompt,
    size: "1024x1024",
    quality:"standard",
    n:1}
  )
  const imageUrl = response.data[0].url
  return {"image_url" : imageUrl }
  */
}

interface ToGenerateVideo {
  image_url: string
}

const generate_video_old = async ({image_url}: ToGenerateVideo) => {
 // const response = await fetch("https://hoodie-creator.vercel.app/openapi/generate_video", {
 //const response = await fetch("http://localhost:8000/openapi/generate_video", {
  const response = await fetch("https://qod.io/openapi/generate_video", {
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

import { v4 as uuidv4 } from 'uuid';

const generate_video = async({image_url}: ToGenerateVideo) => {
  const name = uuidv4().substring(0, 8);

  // Download the image
  const response = await fetch(image_url);
  const buffer = Buffer.from(await response.arrayBuffer());

  //fs.writeFileSync(`/tmp/${cont.image_file.file_id}.png`, image_data_buffer);
  const uploadParams = {
    Bucket: "hoodie-creator",
    Key: `${name}.png`, // the name of the file in the bucket
    Body: buffer,
    ContentType: "image/png" // or the appropriate content type
  };
  const data = await s3.send(new PutObjectCommand(uploadParams));
  const imageToVideo = `https://hoodie-creator.s3.eu-west-1.amazonaws.com/${name}.png`;


  const output = await replicate.run(
    "stability-ai/stable-video-diffusion:3f0457e4619daac51203dedb472816fd4af51f3149fa7a9e0b5ffcf1b8172438",
    {
      input: {
        cond_aug: 0.02,
        decoding_t: 7,
        input_image: imageToVideo,
        video_length: "25_frames_with_svd_xt",
        sizing_strategy: "maintain_aspect_ratio",
        motion_bucket_id: 127,
        frames_per_second: 6
      }
    }
  );
  console.log(output);
  return { video_url : output } 
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
  //const response = await fetch("https://hoodie-creator.vercel.app/openapi/product", {
  const response = await fetch("https://qod.io/openapi/product", {
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

    while ((myRun.status !== "completed") && (myRun.status !== "expired")) {
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

    await kv.set(`thread:${threadId}:messages`, JSON.stringify(messagesA.reverse()));
    return new Response(JSON.stringify( messagesA))

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
