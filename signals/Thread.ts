import { signal } from "@preact/signals";
import { IS_BROWSER } from "$fresh/runtime.ts";

export const Thread = await (async () => {
  const thread = signal<string | undefined>(undefined);

  const fetchThread = async (): Promise<string> => {
    try {
      const resp = await fetch('/api/register', {
        method: "POST",
      });

      if (resp.status !== 200) throw new Error("could not get openAI thread!");

      const json = await resp.json();
      thread.value = json.id;

      return json.id;
    } catch (err) {
      throw new Error(err);
    }
  };

  const sendMessage = async (message: string, level: number): Promise<string> => {
    try {
      const resp = await fetch('/api/process-input',  {
        method: 'POST',
        body: JSON.stringify({
          id: thread.value,
          message,
          level
        })
      });

      if (resp.status !== 200) throw new Error("could not proccess the input!");

      const json = await resp.json();

      return json.message;
    } catch (err) {
      throw new Error(err);
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
