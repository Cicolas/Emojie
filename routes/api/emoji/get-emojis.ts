import { FreshContext, Handlers } from "$fresh/server.ts";
import emojiJSON from "../../../shared/emojis.json" with { type: "json" };

const emojiListCache = emojiJSON.map(
  obj => {
    const wordsSet = Array.from(new Set(
      [
        ...obj.description.split(" "),
        ...obj.category.split(" "),
        ...obj.aliases,
        ...obj.tags
      ]
    ))

    return {
      emoji: obj.emoji,
      name: obj.aliases[0],
      words: wordsSet
    }
  }
)

export const handler: Handlers<string[]> = {
  async POST(_req: Request, ctx: FreshContext) {
    const filter = ctx.url.searchParams.get("filter") ?? "";

    const emojiListKeywords = emojiListCache
      .filter(({words}) => words.some((val) => val.includes(filter)))
      .map(({emoji, name}) => {return {emoji, name}});

    return new Response(JSON.stringify(emojiListKeywords), {
      headers: {
        "content-type": "application/json"
      },
      status: 200,
    });
  },
};
