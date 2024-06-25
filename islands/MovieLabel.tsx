import { Signal, effect, useSignalEffect } from "@preact/signals";
import { useEffect, useState } from "preact/hooks";
import { Thread } from "../signals/Thread.ts";

interface MovieLabelProps {
  emojiStr: Signal<string>;
  movieName: Signal<string | undefined>;
}

export default function MovieLabel({ emojiStr, movieName }: MovieLabelProps) {
  const [feedback, setFeedback] = useState<"yes" | "no" | undefined>(undefined);
  const [tries, setTries] = useState<number>(0);

  async function handleFeedback(status: "yes" | "no") {
    if (status === "yes") {
      setFeedback("yes");
    } else {
      const message = await Thread.sendMessage(emojiStr.value, tries + 1);

      movieName.value = message;
      setTries(tries + 1);
    }
  }

  useEffect(() => {
    setFeedback(undefined);
  }, [movieName.value]);

  useEffect(() => {
    setTries(0);
  }, [emojiStr]);

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
