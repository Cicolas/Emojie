import { ComponentChildren } from "https://esm.sh/v128/preact@10.19.2/src/index.js";
import { useState } from "preact/hooks";
import MdKeyboardDoubleArrowLeft from "react-icons/md/MdKeyboardDoubleArrowLeft.ts";

interface EmojiTabProps {
  children: ComponentChildren;
}

export default function EmojiTab({ children }: EmojiTabProps) {
  const [open, setOpen] = useState(true);

  return (
    <>
      <div class="flex flex-row-reverse justify-start items-start absolute top-0 right-0 h-full">
        <div
          class={`
              w-96 h-full p-2 pt-4 ml-2
              border-l-2 border-gray-400
              ${open ? "mr-0" : "-mr-96"}
              ease-out duration-300
              bg-white
              overflow-y-auto
            `}
        >
          {children}
        </div>
        <button
          class={`mt-2 text-gray-400 font-medium text-4xl cursor-pointer ${open ? "rotate-180" : ""
            } duration-200`}
          onClick={() => {
            setOpen(!open);
          }}
        >
          <MdKeyboardDoubleArrowLeft />
        </button>
        <img
          src="emoji.png"
          class={`pt-4 -mr-4 rotate-[15deg] pointer-events-none ${open ? "opacity-0" : ""} duration-200`}
          aria-hidden
        />
      </div>
    </>
  );
}
