import emojiRegex from 'emoji-regex';
import * as _ from "lodash";
import { Signal } from "@preact/signals";
import { MdKeyboardReturn } from "react-icons/md";
import { thread, getThread, sendMessage } from "../signals/ThreadSignal.ts";
import { Handlers } from "$fresh/server.ts";

interface EmojiInputProps {
  emojiStr: Signal<string>;
}

export default function EmojiInput({ emojiStr }: EmojiInputProps) {
  function validateEmojiInput(ev: Event) {
    const target = ev.target as HTMLInputElement;

    const emojis = Array
      .from(target.value.matchAll(emojiRegex()))
      .map(value => value[0])
      .join("");

    emojiStr.value = emojis;
    target.value = emojiStr.value;
  }

  async function handleInput() {
    if (!thread.value) await getThread();

    const message = await sendMessage(emojiStr.value);
    console.log(message)
  }

  return <div class="
      flex justify-between items-center flex-row gap-1 w-96 m-auto pl-4 pr-1
      rounded-full border-2 border-gray-400 focus:border-gray-600
      overflow-hidden
    ">
    <input
      type="text"
      class="
        min-w-0
        outline-none
        py-2
        transition-all duration-300 ease-in-out
        text-gray-700 font-medium text-base
        tracking-[.4rem]
        placeholder:font-normal placeholder:tracking-normal
      "
      placeholder="insert the movie emojis"
      onInput={ (ev) => { validateEmojiInput(ev) } }
      value={ emojiStr.value }
    />
    <button onClick={handleInput} class="flex flex-shrink-0 justify-center items-center h-8 w-8 rounded-full hover:bg-gray-300 duration-200">
      <MdKeyboardReturn></MdKeyboardReturn>
    </button>
  </div>
}
