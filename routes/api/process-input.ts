import { FreshContext, Handlers } from "$fresh/server.ts";
import { MovieService } from "../../services/MovieService.ts";

export const handler: Handlers<unknown> = {
  async POST(req: Request, _ctx: FreshContext) {
    try {
      const {
        id,
        message,
        level
      } = await req.json();

      if (message.length < 1)
        throw new Error("message should be at least 1 emoji");

      if (message.length > 10)
        throw new Error("message should be less than 10 emojis");

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
    } catch(err) {
      return new Response(JSON.stringify({
        message: err
      }), {
        status: 400,
        headers: {
          "content-type": "application/json"
        }
      })
    }

  }
};
