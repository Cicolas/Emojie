import { signal } from "@preact/signals";
import { IS_BROWSER } from "$fresh/runtime.ts";

export const Thread = await (async () => {
  const thread = signal<string | undefined>(undefined);

  const fetchThread = async (): Promise<string> => {
    try {
      const resp = await (await fetch('/api/register', {
        method: "POST",
      })).json();

      thread.value = resp.id;

      return resp.id;
    } catch {
      throw new Error("could not get openAI thread!");
    }
  };

  const sendMessage = async (message: string, level: number): Promise<string> => {
    try {
      const resp = await (await fetch('/api/process-input',  {
        method: 'POST',
        body: JSON.stringify({
          id: thread.value,
          message,
          level
        })
      })).json();

      return resp.message;
    } catch {
      throw new Error("could not process the input!");
    }
  }

  if (IS_BROWSER) {
    await fetchThread();
  }

  return {
    value: thread,
    fetch: fetchThread,
    sendMessage
  }
})();
