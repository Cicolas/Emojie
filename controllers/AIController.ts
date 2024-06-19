import OpenAI from "openai";
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

export class AIController {
  private openai!: OpenAI;
  private assistantId?: string;

  public constructor() {
    this.openai = new OpenAI();
  }

  public async createAssistant() {
    if (Deno.env.get("MOCK_API") === "true") {
      console.log("Mock API enabled! to create an assistant disable \"MOCK_API\"");
      return;
    }

    const assistant = await this.openai.beta.assistants.create({
      instructions: AI_INSTRUCTION,
      name: "Emojie Game Master",
      model: "gpt-3.5-turbo-0125",
    });

    this.assistantId = assistant.id;

    console.log(`INFO: Assistant Created (id: "${this.assistantId}")!`);
  }

  public setAssistant(assistantId: string) {
    this.assistantId = assistantId;
  }

  public async createThread(): Promise<string> {
    if (Deno.env.get("MOCK_API") === "true") {
      return "Mock API enabled! to get actual responses disable \"MOCK_API\"";
    }

    const thread = await this.openai.beta.threads.create();

    console.log(`INFO: Thread Created (id: "${thread.id}")!`);

    return thread.id;
  }

  public async getThread(threadId: string) {
    if (!threadId) throw new Error("Invalid Thread ID (maybe the thread does not exist try creating one with \"createThread\" method)");

    const thread = await this.openai.beta.threads.retrieve(threadId);

    return thread;
  }

  public async sendMessage(threadId: string, content: string) {
    if (Deno.env.get("MOCK_API") === "true") {
      return "Mock API enabled! to get message disable \"MOCK_API\"";
    }

    await this.openai.beta.threads.messages.create(
      threadId,
      {
        role: "user",
        content
      }
    );
  }

  public async getResponse(threadId: string): Promise<string> {
    if (Deno.env.get("MOCK_API") === "true") {
      return "Mock API enabled! to get actual responses disable \"MOCK_API\"";
    }

    if (!this.assistantId) throw new Error("Invalid Assistant ID (maybe the assistant does not exist try creating one with \"createAssitant\" method)");

    const run = await this.openai.beta.threads.runs.create(
      threadId,
      {
        assistant_id: this.assistantId,
      }
    );

    const runResult = await pollingMessage({
      openai: this.openai,
      interval: 1000,
      maxTries: MAX_TRIES,
      runId: run.id,
      threadId
    });

    return runResult;
  }
}
