import { useState } from "preact/hooks";
import emojiRegex from 'emoji-regex';
import * as _ from "lodash";

export default function EmojiInput() {  
  const [emojisStr, setEmojisStr] = useState("");
  
  function validateEmojiInput(ev: Event) {
    const target = ev.target as HTMLInputElement;
    
    const emojis = Array
      .from(target.value.matchAll(emojiRegex()))
      .map(value => value[0])
      .join(" ");

    target.value = emojis;
    setEmojisStr(emojis);
  }

  return <input
    type="text"
    class="
      outline-none 
      px-4 py-2 w-96 m-auto
      rounded-full border-2 border-gray-400 focus:border-gray-600 
      transition-all duration-300 ease-in-out 
      text-gray-700 font-mediumtext-base
      tracking-widest
      placeholder:font-normal placeholder:tracking-normal
    "
    placeholder="insert the movie emojis"
    onInput={ (ev) => { validateEmojiInput(ev) } }
  />
}