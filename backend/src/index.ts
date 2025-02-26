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
  const apiKey: string = body['apiKey'] as string;
  const message = body['message'] as string;
  const instruction = "";
  if (apiKey == null || message == null) {
    return c.json({ 'message': 'apiKey and message are required' })
  }
  if (apiKey.length < 39 || apiKey.length > 42) {
    return c.json({ 'message': 'invalid api key' });
  }

  try {
    const openai = new OpenAI({
      "apiKey": apiKey,
      "baseURL": "https://generativelanguage.googleapis.com/v1beta/openai/"
    });

    const chatStream = await openai.chat.completions.create({
      model: "gemini-2.0-flash",
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
