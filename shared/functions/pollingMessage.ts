import { MessageContentText } from "openai/resources/beta/threads/messages/messages.ts";
import OpenAI from "openai/mod.ts";

function wait(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

interface pollingMessagesArguments {
  openai: OpenAI,
  threadId: string,
  runId: string,
  interval: number,
  maxTries: number
}

export async function pollingMessage({openai, threadId, runId, interval, maxTries}: pollingMessagesArguments) {
  const runOngoing = await openai.beta.threads.runs.retrieve(
    threadId,
    runId
  );

  if (Deno.env.get("LOG_LEVEL") === "ALL")
    console.log(`INFO:`, runOngoing);

  if (
    runOngoing.status === "in_progress" ||
    runOngoing.status === "queued" &&
    maxTries > 0) {

    maxTries--;
    await wait(interval);
    return await pollingMessage({openai, threadId, runId, interval, maxTries});
  } else if (runOngoing.status === "completed") {
    const ts = await openai.beta.threads.messages.list(
      threadId,
      { limit: 1 }
    );

    return (ts.data[0].content as MessageContentText[])[0].text.value;
  } else {
    throw Error(`unknown status: "${runOngoing.status}" or times tried >= 5 (${maxTries})`);
  }
}
