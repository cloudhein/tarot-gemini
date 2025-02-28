import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { stream, streamText, streamSSE } from 'hono/streaming'
import OpenAI from "openai";

const app = new Hono()

app.use('/chat', cors())

app.get('/', (c) => {
  return c.text('Hello!')
})

app.post('/chat', async (c) => {
  const body = await c.req.json();

  if (!body.hasOwnProperty('card') || !body.hasOwnProperty('question') || !body.hasOwnProperty('reverse')) {
    return c.json({ 'message': 'data are missing' }, 400);
  }

  var apiKey: string = "";
  var baseURL = "https://generativelanguage.googleapis.com/v1beta/openai/";
  var model = "gemini-2.0-pro-exp-02-05";
  var withAPIKey = true;

  if (body.hasOwnProperty('apiKey') && body['apiKey'] != "") {
    apiKey = body['apiKey'] as string;
  }
  else {
    apiKey = process.env.API_KEY as string;
    baseURL = process.env.API_URL as string;
    model = process.env.MODEL as string;
    withAPIKey = false;
  }
  
  if(apiKey == "" || baseURL == "" || model == ""){
    return c.json({ 'message': 'missing environment variables' });
  }

  if (withAPIKey == true  && (apiKey.length < 39 || apiKey.length > 42)) {
    return c.json({ 'message': 'invalid api key' });
  }

  const question = body['question'] as string;
  const card = body['card'] as string;
  const reverse = body['reverse'] as boolean;
  const cardPosition = reverse ? "Reversed" : "Upright";

  const message = `Question: ${question}\nCard: ${card}\nPosition: ${cardPosition}`;

  const instruction = "You are professional tarot card reader. Be honest with your answer. Direct answer and you answer is like that. Reply back to the user base on the user language.";
  
  try {
    const openai = new OpenAI({
      "apiKey": apiKey,
      "baseURL": baseURL
    });

    const chatStream = await openai.chat.completions.create({
      model: model,
      stream: true,
      messages: [
        { role: "system", content: instruction },
        {
          role: "user",
          content: message,
        },
      ],
    });

    return streamText(c, async (stream) => {
      for await (const chunk of chatStream) {
        const text = chunk.choices[0].delta.content;
        if (text) {
          stream.write(text);
        }
      }
    });


  } catch (error) {
    return c.json({ 'message': error })
  }
})

export default {
  port: 5674,
  fetch: app.fetch,
} 
