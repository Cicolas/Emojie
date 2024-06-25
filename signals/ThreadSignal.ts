import { signal } from "@preact/signals";

export const thread = signal(null);

export async function getThread(): Promise<string> {
  // try {
    const resp = await (await fetch('/api/register', {
      method: "POST",
    })).json();

    thread.value = resp.id;

    return resp.id;
  // } catch {
    // throw new Error("could not get openAI thread!");
  // }
}

export async function sendMessage(message: string, level: number): Promise<string> {
  // try {
    const resp = await (await fetch('/api/process-input',  {
      method: 'POST',
      body: JSON.stringify({
        id: thread.value,
        message,
        level
      })
    })).json();

    return resp.message;
  // } catch {
  //   throw new Error("could not process the input!");
  // }
}
