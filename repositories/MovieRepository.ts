import { redisClient } from "../lib/redis.ts"
import { BinaryConverter } from "../shared/functions/binaryConversion.ts"

export const MovieRepository = {
  set: async (emoji: string, name: string, level: number = 0) => {
    const key = `${BinaryConverter.to(emoji)}:${level}`;
    console.log("set");

    await redisClient.set(key, name);
  },

  get: async (emoji: string, level: number = 0): Promise<string | undefined> => {
    const key = `${BinaryConverter.to(emoji)}:${level}`;

    return await redisClient.get(key);
  }
}
