import { useEffect, useRef, useState } from "react";

export const useMouseMove = <T extends HTMLElement = HTMLDivElement>() => {
  const ref = useRef<T>(null);
  const [position, setPosition] = useState<MouseEvent>();

  const onMouseMove = (event: MouseEvent) => {
    setPosition(event);
  }
  useEffect(() => {
    if (!ref || !ref.current) {
      return;
    }
    ref.current.addEventListener("mousemove", onMouseMove);

    return () => {
      ref.current?.removeEventListener("mousemove", onMouseMove);
    }
  }, []);

  return { position, ref };
};
