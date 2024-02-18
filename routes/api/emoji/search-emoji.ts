import { FreshContext, Handlers } from "$fresh/server.ts";
import emojiJSON from "../../../shared/emojis.json" with { type: "json" };

export const handler: Handlers<string[]> = {
  async POST(_req: Request, ctx: FreshContext) {
    const search = ctx.url.searchParams.get("search");

    if (search === null)
      return new Response("", {
        status: 400
      });

    const emojiListKeywords = emojiJSON.map(
      obj => {
        const wordsSet = Array.from(new Set(
          [

          ]
        ))
            obj.description             + " " +
            obj.category                + " " +
            [...obj.aliases].join(" ")  + " " +
            [...obj.tags].join(" ")

        return [
          obj.emoji,
          wordsSet
        ]
      }
    );

    return new Response(JSON.stringify(emojiListKeywords), {
      headers: {
        "content-type": "application/json",
      },
      status: 200
    });
  },
};
