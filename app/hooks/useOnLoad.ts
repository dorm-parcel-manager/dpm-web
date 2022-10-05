import { useEffect } from "react";

export function useOnLoad(callback: () => void) {
  useEffect(() => {
    if (document.readyState === "complete") {
      callback();
    } else {
      const listener = () => callback();
      window.addEventListener("load", listener);
      return () => window.removeEventListener("load", listener);
    }
  }, [callback]);
}
