import { Signal, effect, useSignalEffect } from "@preact/signals";
import { useEffect, useState } from "preact/hooks";
import { thread, getThread, sendMessage } from "../signals/ThreadSignal.ts";

interface MovieLabelProps {
  emojiStr: Signal<string>;
  movieName: Signal<string | undefined>;
}

export default function MovieLabel({ emojiStr, movieName }: MovieLabelProps) {
  const [feedback, setFeedback] = useState<"yes" | "no" | undefined>(undefined);

  async function handleFeedback(status: "yes" | "no") {
    if (status === "yes") {
      setFeedback("yes");
    } else {
      if (!thread.value) await getThread();

      const message = await sendMessage(emojiStr.value);
    }

  }

  useEffect(() => {
    setFeedback(undefined);
  }, [movieName.value])

  return (
    <>
      <div class="mx-auto mb-auto text-center">
        <span class="font-normal">The movie is:</span>
        <br/>
        <span class="font-bold">"{movieName}"</span>
        <br/>
        <br/>
        <div class={`flex justify-center gap-2 font-bold duration-200 ${feedback === "yes" ? "hidden": ""}`}>
          <span class="cursor-pointer text-green-600" onClick={() => handleFeedback("yes")}>Yes</span>
          /
          <span class="cursor-pointer text-red-600" onClick={() => handleFeedback("no")}>No</span>
        </div>
      </div>
    </>
  );
}
