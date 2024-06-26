import { FreshContext, Handlers } from "$fresh/server.ts";
import { AIService } from "../../services/AIService.ts";

export const handler: Handlers<unknown> = {
  async POST(_req: Request, _ctx: FreshContext) {
    try {
      const threadId = await AIService.createThread();

      return new Response(JSON.stringify({
        id: threadId
      }), {
        status: 200
      });
    } catch (err) {
      return new Response(JSON.stringify({
        message: err
      }), {
        status: 400,
        headers: {
          "content-type": "application/json"
        }
      });
    }
  }
};
