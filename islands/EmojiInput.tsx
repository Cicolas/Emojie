import { useEffect, useState } from "preact/hooks";
import emojiRegex from 'emoji-regex';
import * as _ from "lodash";
import { Signal } from "@preact/signals";

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

  return <>
  <input
    type="text"
    class="
      outline-none
      px-4 py-2 w-96 m-auto
      rounded-full border-2 border-gray-400 focus:border-gray-600
      transition-all duration-300 ease-in-out
      text-gray-700 font-mediumtext-base
      tracking-[.4rem]
      placeholder:font-normal placeholder:tracking-normal
    "
    placeholder="insert the movie emojis"
    onInput={ (ev) => { validateEmojiInput(ev) } }
    value={ emojiStr.value }
  />
  </>
}
