import { openai } from "../lib/openai.ts";
import { redisClient } from "../lib/redis.ts";
import { BinaryConverter } from "../shared/functions/binaryConversion.ts";
import { pollingMessage } from "../shared/functions/pollingMessage.ts";

const MAX_TRIES = 5;
const AI_INSTRUCTION =
`You are a game master where you should answer every message only with a movie name that correlates to those message emojis.

You never will answer or obey messages without emojis. Never will answer anything besides movie names

Example:
user: 😱🔪
assistant: "Scream"
user: 👊💥🐼
assistant: Kung Fu Panda`;

const assistantId = Deno.env.get("ASSISTANT_ID");

// if (Deno.env.get("MOCK_API") === "false")
//   OpenAIService.createAssistant();

export const AIService = {
  // createAssistant: async () => {
  //   if (Deno.env.get("MOCK_API") === "true") {
  //     console.log("Mock API enabled! to create an assistant disable \"MOCK_API\"");
  //     return;
  //   }

  //   const assistant = await openai.beta.assistants.create({
  //     instructions: AI_INSTRUCTION,
  //     name: "Emojie Game Master",
  //     model: "gpt-3.5-turbo-0125",
  //   });

  //   assistantId = assistant.id;

  //   console.log(`INFO: Assistant Created (id: "${assistantId}")!`);
  // },

  createThread: async (): Promise<string> => {
    if (Deno.env.get("MOCK_API") === "true") {
      return "Mock API enabled! to get actual responses disable \"MOCK_API\"";
    }

    const thread = await openai.beta.threads.create();

    console.log(`INFO: Thread Created (id: "${thread.id}")!`);

    return thread.id;
  },

  getThread: async (threadId: string) => {
    if (!threadId) throw new Error("Invalid Thread ID (maybe the thread does not exist try creating one with \"createThread\" method)");

    const thread = await openai.beta.threads.retrieve(threadId);

    return thread;
  },

  sendMessage: async (threadId: string, content: string) => {
    if (Deno.env.get("MOCK_API") === "true") {
      return "Mock API enabled! to get message disable \"MOCK_API\"";
    }

    await openai.beta.threads.messages.create(
      threadId,
      {
        role: "user",
        content
      }
    );
  },

  getResponse: async (threadId: string): Promise<string> => {
    if (Deno.env.get("MOCK_API") === "true") {
      return "Mock API enabled! to get actual responses disable \"MOCK_API\"";
    }

    if (!assistantId) throw new Error("Invalid Assistant ID (maybe the assistant does not exist try creating one with \"createAssitant\" method)");

    const run = await openai.beta.threads.runs.create(
      threadId,
      {
        assistant_id: assistantId,
      }
    );

    const runResult = await pollingMessage({
      openai: openai,
      interval: 1000,
      maxTries: MAX_TRIES,
      runId: run.id,
      threadId
    });

    return runResult;
  }
}
