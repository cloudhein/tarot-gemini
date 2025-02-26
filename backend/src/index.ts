import { Hono } from 'hono'
import { cors } from 'hono/cors'
import OpenAI from "openai";

const app = new Hono()

app.use('/chat', cors())

app.get('/', (c) => {
  return c.text('Hello!')
})

app.post('/chat', async (c) => {
  const body = await c.req.json();
  console.log(body);
  const apiKey: string = body['apiKey'] as string;
  const message = body['message'] as string;
  const instruction = "";
  if (apiKey == null || message == null) {
    return c.json({ 'message': 'apiKey and message are required' })
  }
  if(apiKey.length < 39 || apiKey.length > 42) {
    return c.json({'message': 'invalid api key'});
  }

  try {
  const openai = new OpenAI({
    "apiKey": apiKey,
    "baseURL": "https://generativelanguage.googleapis.com/v1beta/openai/"
  });

  const response = await openai.chat.completions.create({
    model: "gemini-2.0-flash",
    messages: [
      { role: "system", content: instruction },
      {
        role: "user",
        content: message,
      },
    ],
  });


  return c.json({ 'message': response.choices[0].message.content })
  } catch (error) {
    return c.json({ 'message': error })
  }
})

export default { 
  port: 5674, 
  fetch: app.fetch, 
} 
