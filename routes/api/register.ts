import { FreshContext, Handlers } from "$fresh/server.ts";
import { OpenAIController } from "../../shared/openai.ts";

export const handler: Handlers<unknown> = {
  async POST(_req: Request, _ctx: FreshContext) {
    const threadId = await OpenAIController.createThread();

    return new Response(JSON.stringify({
      id: threadId
    }), {
      status: 200
    });
  }
};
