import { useSignal } from "@preact/signals";
import EmojiInput from "../islands/EmojiInput.tsx"
import EmojiTab from "../islands/EmojiTab.tsx";
import EmojiListing from "../islands/EmojiListing.tsx";

export default function Home() {
  const emojiStr = useSignal("");

  return (<div class="relative w-screen h-screen overflow-hidden">
    <EmojiTab>
      <EmojiListing emojiStr={emojiStr}></EmojiListing>
    </EmojiTab>

    <div class="grid grid-rows-3 justify-center items-center w-full h-full">
      <div class="flex flex-col justify-center items-center mt-auto">
        <img
          class="w-[30rem]"
          src="/logo.png"
        ></img>
        <span>"It's pronounced <span class="italic">emoooji</span> 🐄!"</span>
      </div>
      <EmojiInput emojiStr={emojiStr}></EmojiInput>
    </div>
  </div>);
}
