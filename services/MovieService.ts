import { MovieRepository } from "../repositories/MovieRepository.ts"
import { AIService } from "./AIService.ts";

type CacheStatusResponse<T> = {
  response: T,
  cacheStatus: "hit" | "miss",
}

export const MovieService = {
  searchMovie: async (threadId: string, emoji: string, level: number): Promise<CacheStatusResponse<string>> => {
    const movie: string | undefined = await MovieRepository.get(emoji, level);

    if (movie) {
      return {
        response: movie,
        cacheStatus: "hit"
      }
    }

    await AIService.sendMessage(threadId, emoji);
    const AIResponse = await AIService.getResponse(threadId);

    if (AIResponse)
      MovieRepository.set(emoji, AIResponse, level);

    return {
      response: AIResponse,
      cacheStatus: "miss"
    }
  }
}
