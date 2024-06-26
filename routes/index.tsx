import { useSignal } from "@preact/signals";
import EmojiInput from "../islands/EmojiInput.tsx"
import EmojiTab from "../islands/EmojiTab.tsx";
import EmojiListing from "../islands/EmojiListing.tsx";
import MovieLabel from "../islands/MovieLabel.tsx";
import ToastContext from "../islands/Toast.tsx";

export default function Home() {
  const emojiStr = useSignal("");
  const movieName = useSignal<string | undefined>("");

  return (<>
    <div class="relative w-screen h-screen overflow-hidden">
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

        <EmojiInput emojiStr={emojiStr} movieName={movieName}></EmojiInput>

        <MovieLabel emojiStr={emojiStr} movieName={movieName}></MovieLabel>
      </div>
    </div>
    <ToastContext></ToastContext>
  </>);
}
