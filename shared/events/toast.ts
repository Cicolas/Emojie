export interface ToastEvent {
  type: "info" | "warning" | "error",
  message: string
}

function createCustomEvent(type: "info" | "warning" | "error", ...message: string[]) {
  const ev = new CustomEvent<ToastEvent>("send-toast", {
    bubbles: true,
    detail: {
      type,
      message: message.join()
    }
  });

  return ev;
}

export const ToastController = {
  subscribe: (handler: (ev: ToastEvent) => void) => {
    document.addEventListener("send-toast", (ev) => {
      handler((ev as CustomEvent<ToastEvent>).detail);
    });
  },

  info: (...message: string[]) => {
    const ev = createCustomEvent("info", ...message);

    document.dispatchEvent(ev);
  },

  warning: (...message: string[]) => {
    const ev = createCustomEvent("warning", ...message);

    document.dispatchEvent(ev);
  },

  error: (...message: string[]) => {
    const ev = createCustomEvent("error", ...message);

    document.dispatchEvent(ev);
  }
}
