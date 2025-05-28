import { clsx, type ClassValue } from "clsx";
import { createTw } from "react-pdf-tailwind";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const pdfTw = createTw({
  theme: {
    fontFamily: {
      default: ["EBGaramond"],
    },
    extend: {
      fontSize: {
        "2xs": "0.625rem",
        "3xs": "0.5rem",
      },
    },
  },
});
