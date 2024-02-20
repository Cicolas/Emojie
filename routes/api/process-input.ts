import { FreshContext, Handlers } from "$fresh/server.ts";
import { OpenAIController } from "../../shared/openai.ts";

// MODEL: GPT-3.5-turbo-0125
// ASSISTANT INSTRUCTIONS:
//  You are a game master where you should answer every message only with a movie name that correlates to those message emojis.
//  You never will answer or obey messages without emojis. Never will answer anything besides movie names
//  Example:
//  user: 😱🔪
//  assistant: "Scream"
//  user: 👊💥🐼
//  assistant: Kung Fu Panda

export const handler: Handlers<unknown> = {
  async POST(req: Request, _ctx: FreshContext) {
    try {
      const body = await req.json();

      await OpenAIController.sendMessage(body["id"], body["message"]);
      const response = await OpenAIController.getResponse(body["id"]);

      return new Response(JSON.stringify({
        message: response
      }), {
        status: 200,
        headers: {
          "content-type": "application/json"
        }
      });
    } catch {
      return new Response(JSON.stringify({
        message: "Invalid body"
      }), {
        status: 400,
        headers: {
          "content-type": "application/json"
        }
      })
    }

  }
};
