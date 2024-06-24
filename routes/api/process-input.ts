import { FreshContext, Handlers } from "$fresh/server.ts";
import { AIService } from "../../services/AIService.ts";
import { MovieService } from "../../services/MovieService.ts";

export const handler: Handlers<unknown> = {
  async POST(req: Request, _ctx: FreshContext) {
    try {
      const {
        id,
        message,
        level = 0
      } = await req.json();

      const {response, cacheStatus} = await MovieService.searchMovie(id, message, level);

      return new Response(JSON.stringify({
        message: response
      }), {
        status: 200,
        headers: {
          "content-type": "application/json",
          "Emojie-Cache": cacheStatus
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
