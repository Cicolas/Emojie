import { useSignal } from "@preact/signals";
import EmojiInput from "../islands/EmojiInput.tsx"
import EmojiTab from "../islands/EmojiTab.tsx";

export default function Home() {
  const text = useSignal("");

  return (<>
    <EmojiTab></EmojiTab>
    <div class="grid grid-rows-3 justify-center items-center min-w-screen min-h-screen overflow-hidden">
      <div class="flex flex-col justify-center items-center mt-auto">
        <img 
          class="w-[30rem]"
          src="/logo.png"
        ></img>
        <span>"It's pronounced <span class="italic">emoooji</span> 🐄!"</span>
      </div>
      <EmojiInput></EmojiInput>
    </div>
  </>);
}
