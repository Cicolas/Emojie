import { redisClient } from "../lib/redis.ts"
import { BinaryConverter } from "../shared/functions/binaryConversion.ts"

export const MovieRepository = {
  set: async (emoji: string, name: string, level: number) => {
    if (level >= +(Deno.env.get("MAX_CACHING_LEVEL")??0)) return undefined;

    const key = `${level}:${BinaryConverter.to(emoji)}`;

    await redisClient.set(key, name);
  },

  get: async (emoji: string, level: number): Promise<string | undefined> => {
    const key = `${level}:${BinaryConverter.to(emoji)}`;

    return await redisClient.get(key);
  }
}
