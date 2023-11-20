import { Message, OpenAIStream, StreamingTextResponse } from 'ai'
import { Configuration, OpenAIApi } from 'openai-edge'
import OpenAI from 'openai';

import { toNamespacedPath } from 'path'
import { ChatCompletionMessageParam } from 'openai/resources/chat/completions';
import { NextResponse } from 'next/server';
import { getCurrentUser } from '@/lib/session';
import { authOptions } from '@/lib/auth';
import { redirect } from 'next/navigation';

export const runtime = 'nodejs'

async function getLocation() {
  const response = await fetch("https://ipapi.co/json/");
  const locationData = await response.json();
  return locationData;
}
 
async function getCurrentWeather(latitude :string, longitude :string) {
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=apparent_temperature`;
  const response = await fetch(url);
  const weatherData = await response.json();
  return weatherData;
}
 
const functionDefinitions = [
  {
    name: "getCurrentWeather",
    description:
      "Get the current weather in a given location given in latitude and longitude",
    parameters: {
      type: "object",
      properties: {
        latitude: {
          type: "string",
        },
        longitude: {
          type: "string",
        },
      },
      required: ["longitude", "latitude"],
    },
  },
  {
    name: "getLocation",
    description: "Get the user's location based on their IP address",
    parameters: {
      type: "object",
      properties: {},
    },
  },
];
 
const availableFunctions = {
  getCurrentWeather,
  getLocation,
};
 
const messages :Array<ChatCompletionMessageParam> = [
  {
    role: "system",
    content: "You are a helpful assistant. Only use the functions you have been provided with.",
  },
] 

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY
})

const openai = new OpenAIApi(configuration)
 
const openaiOriginal = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  dangerouslyAllowBrowser: true,
});

async function agent(userInput:string) {
  messages.push({
    role: "user",
    content: userInput,
  });
 
  for (let i = 0; i < 5; i++) {
    const response = await openaiOriginal.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: messages,
      functions: functionDefinitions,
    });
 
    const { finish_reason, message } = response.choices[0];
 
    if (finish_reason === "function_call") {
      const functionName  = message.function_call?.name;
      const functionToCall  = availableFunctions[functionName! as keyof typeof availableFunctions];
      const functionArgs = JSON.parse(message.function_call?.arguments!);
      const functionArgsArr :any = Object.values(functionArgs);
      const functionResponse = await functionToCall.apply(
        null,
        functionArgsArr
      );
 
      messages.push({
        role: "function",
        name: functionName!,
        content: `
                The result of the last function was this: ${JSON.stringify(
                  functionResponse
                )}
                `,
      });
    } else if (finish_reason === "stop") {
      messages.push(message);
      // try to return the last response
      return message.content;
    }
  }
  return "The maximum number of iterations has been met without a suitable answer. Please try again with a more specific input.";
}

export async function POST(req: Request) {
  const json = await req.json()
  const { messages, previewToken, name } = json
  
  const user = await getCurrentUser()

  if (!user) {
    redirect(authOptions?.pages?.signIn || "/login")
  }
  //Github
  //const userId = user.id
  const userId = user.email
  console.log("USER");
  console.log(user);
  
  console.log("USERID");
  console.log(userId);

  if (!userId) {
    return new Response('Unauthorized', {
      status: 401
    })
  }
  
  if (previewToken) {
    configuration.apiKey = previewToken
  }

  // Get the last message​
  const response = await agent(
    "Please suggest some activities based on my location and the weather."
  );

  //const stream = OpenAIStream(response);
  //return new StreamingTextResponse(stream);
  const encoder = new TextEncoder();
// This is the stream object, which clients can read from
// when you send it as a Function response
const readableStream = new ReadableStream({
  // The start method is where you'll add the stream's content
  start(controller) {
    const text = response;
    // Queue the encoded content into the stream
    controller.enqueue(encoder.encode(text!));
    // Prevent more content from being
    // added to the stream
    controller.close();
  },
});
// TextDecoders can decode streams of
// encoded content. You'll use this to
// transform the streamed content before
// it's read by the client
const decoder = new TextDecoder();
// TransformStreams can transform a stream's chunks
// before they're read in the client
const transformStream = new TransformStream({
  transform(chunk, controller) {
    // Decode the content, so it can be transformed
    const text = decoder.decode(chunk);
    // Make the text uppercase, then encode it and
    // add it back to the stream
    controller.enqueue(encoder.encode(text.toUpperCase()));
  },
});

return new Response(readableStream, {
  headers: {
    'Content-Type': 'text/html; charset=utf-8',
  },
});
  //return Response.json(response);

}