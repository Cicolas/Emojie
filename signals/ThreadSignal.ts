import { signal } from "@preact/signals";

const BASE_URL = "http://localhost:8000"

export const thread = signal(null);

export async function getThread(): Promise<string> {
  // try {
    const resp = await (await fetch(BASE_URL + '/api/register', {
      method: "POST",
    })).json();

    thread.value = resp.id;

    return resp.id;
  // } catch {
    // throw new Error("could not get openAI thread!");
  // }
}

export async function sendMessage(message: string): Promise<string> {
  // try {
    const resp = await (await fetch(BASE_URL + '/api/process-input',  {
      method: 'POST',
      body: JSON.stringify({
        id: thread.value,
        message
      })
    })).json();

    return resp.message;
  // } catch {
  //   throw new Error("could not process the input!");
  // }
}
