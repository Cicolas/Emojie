import { useState } from "preact/hooks";
import MdKeyboardDoubleArrowLeft from "react-icons/md/MdKeyboardDoubleArrowLeft.ts";

export default function EmojiTab() {
    const [open, setOpen] = useState(false);
    
    return <>
        <div class="flex flex-row-reverse justify-start items-start absolute top-0 right-0 h-full">
            <div class={`
                min-w-96 h-full p-2 ml-2
                border-l-2 border-gray-400
                ${open?"mr-0":"-mr-96"}
                ease-out duration-300
                bg-white
            `}>
                adsds
            </div>
            <button 
                class={`mt-2 text-gray-400 font-medium text-4xl cursor-pointer ${open?"rotate-180":""} duration-200`}
                onClick={() => {setOpen(!open)}}
            >
                <MdKeyboardDoubleArrowLeft />
            </button>
            <img src="emoji.png" class={`pt-4 -mr-4 rotate-12 pointer-events-none ${open?"opacity-0":""} duration-200`} aria-hidden/>
        </div>
    </>
}