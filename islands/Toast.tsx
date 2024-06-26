import { useEffect, useState } from "preact/hooks";
import { ToastController, ToastEvent } from "../shared/events/toast.ts"
import { MdError, MdInfo, MdWarning } from "react-icons/md";

const TOAST_TTL = 5000;

const bgColors = {
  "info": "bg-blue-100",
  "warning": "bg-yellow-100",
  "error": "bg-red-100"
} as const

type ToastProps = {
  id: string,
  type: "info" | "warning" | "error",
  message: string
}

function Toast({ type, message }: ToastProps) {
  return <div class={`
    px-4 py-2 w-96 rounded-sm
    ${bgColors[type]}
    flex flex-row justify-start items-center gap-4
    cursor-pointer`}>
    <div class="1/4">
      {
        type === "info" ? <MdInfo class="w-4 h-4" /> :
        type === "warning" ? <MdWarning class="w-4 h-4" /> :
        <MdError class="w-4 h-4" />
      }
    </div>
    {message}
  </div>
}

export default function ToastContext() {
  const [toasts, setToasts] = useState<ToastProps[]>([]);

  function deleteToast(id: string) {
    setToasts((value) => value.filter(val => val.id !== id));
  }

  function handleToast(toast: ToastEvent) {
    const newToast = {
      id: crypto.randomUUID(),
      ...toast
    }

    setToasts((value) => [...value, newToast]);

    setTimeout(deleteToast.bind(null, newToast.id), TOAST_TTL);
  }

  useEffect(() => {
    ToastController.subscribe(handleToast);
  }, []);

  return <div class="absolute top-2 left-2 flex flex-col gap-2">
    {toasts.map(val => Toast(val))}
  </div>
}
