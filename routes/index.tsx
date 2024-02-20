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

    <div class="grid grid-rows-3 justify-center items-center w-full h-full relative">
      <div class="flex flex-col justify-center items-center mt-auto">
        <img
          class="w-[30rem]"
          src="/logo.png"
        ></img>
        <span>"It's pronounced <span class="italic">emoooji</span> 🐄!"</span>
      </div>

      <EmojiInput emojiStr={emojiStr}></EmojiInput>

      <div class="mx-auto mb-auto text-center">
        <span class="font-normal">The movie is:</span>
        <br/>
        <span class="font-bold">"Indiana Jones(2000)"</span>
        <br/>
        <br/>
        <div class="flex justify-center gap-2 font-bold">
          <span class="cursor-pointer text-green-600">Yes</span>
          /
          <span class="cursor-pointer text-red-600">No</span>
        </div>
      </div>

    </div>
    {/* <span class="absolute left-2 bottom-2 font-bold text-sm text-gray-300">
      Made with&nbsp;
      <a class="underline" target="_blank" href="https://fresh.deno.dev/">Fresh</a>
      &nbsp;by:&nbsp;
      <a class="underline" target="_blank" href="https://github.com/Cicolas">Nícolas Carvalho</a>
    </span> */}
  </div>);
}
