import { Thread } from "openai/resources/beta/threads/threads.ts";
import OpenAI from "openai";
import { Assistant } from "openai/resources/beta/assistants/assistants.ts";
import { MessageContentText } from "openai/resources/beta/threads/messages/messages.ts";

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
  private assistant?: Assistant;

  public constructor() {
    this.openai = new OpenAI();
  }

  public async createAssistant() {
    this.assistant = await this.openai.beta.assistants.create({
      instructions: AI_INSTRUCTION,
      name: "Emojie Game Master",
      model: "gpt-3.5-turbo-0125",
    });

    console.log(`INFO: Assistant Created (id: "${this.assistant.id}")!`);
  }

  public async loadAssistant(assistantId: string) {
    if (!assistantId) throw new Error("Invalid Assistant ID (maybe the assistant does not exist try creating one with \"createAssitant\" method)");

    this.assistant = {
      id: assistantId,
      created_at: 0,
      description: "",
      file_ids: [],
      instructions: "",
      metadata: [],
      name: "",
      model: "",
      object: "assistant",
      tools: []
    };
    // this.assistant = await this.openai.beta.assistants.retrieve(assistantId);

    console.log("INFO: Assistant Loaded!");
  }

  public async createThread() {
    const thread = await this.openai.beta.threads.create();

    console.log(`INFO: Thread Created (id: "${thread.id}")!`);

    return thread;
  }

  public async getThread(threadId: string) {
    if (!threadId) throw new Error("Invalid Thread ID (maybe the thread does not exist try creating one with \"createThread\" method)");

    const thread = await this.openai.beta.threads.retrieve(threadId);

    return thread;
  }

  public async sendMessage(threadId: string, content: string) {
    await this.openai.beta.threads.messages.create(
      threadId,
      {
        role: "user",
        content
      }
    );
  }

  public async getResponse(threadId: string) {
    if (!this.assistant) throw new Error("Invalid Assistant ID (maybe the assistant does not exist try creating one with \"createAssitant\" method)");

    const run = await this.openai.beta.threads.runs.create(
      threadId,
      {
        assistant_id: this.assistant.id,
      }
    );

    let timesTried = 0;
    const checkCompletion: () => Promise<string> = async () => {
      const runOngoing = await this.openai.beta.threads.runs.retrieve(
        threadId,
        run.id
      );

      if (
        runOngoing.status === "in_progress" ||
        runOngoing.status === "queued" &&
        timesTried < MAX_TRIES) {

        timesTried++;
        await timeout(1000);
        return await checkCompletion();
      } else if (runOngoing.status === "completed") {
        const ts = await this.openai.beta.threads.messages.list(
          threadId,
          { limit: 1 }
        );

        return (ts.data[0].content as MessageContentText[])[0].text.value;
      } else {
        throw Error(`unknown status: "${runOngoing.status}" or times tried >= 5 (${timesTried})`);
      }
    }

    const runResult = await checkCompletion();
    return runResult;
  }
}

function timeout(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
