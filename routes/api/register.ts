import { FreshContext, Handlers } from "$fresh/server.ts";
import { AIService } from "../../services/AIService.ts";

export const handler: Handlers<unknown> = {
  async POST(_req: Request, _ctx: FreshContext) {
    const threadId = await AIService.createThread();

    return new Response(JSON.stringify({
      id: threadId
    }), {
      status: 200
    });
  }
};
