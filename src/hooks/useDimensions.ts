import { RefObject, useLayoutEffect, useRef, useState } from "react";

export function useDimensions<T extends Element>(): [
  RefObject<T | null>,
  [width: number, height: number]
] {
  const ref = useRef<T>(null);

  const [dimensions, setDimensions] = useState<[number, number]>([0, 0]);

  useLayoutEffect(() => {
    const element = ref.current;
    if (!element) return;

    const boundingRect = element.getBoundingClientRect();
    setDimensions([boundingRect.width, boundingRect.height]);

    const observer = new ResizeObserver(([entry]) => {
      setDimensions([entry.contentRect.width, entry.contentRect.height]);
    });

    observer.observe(element);

    return () => {
      observer.unobserve(element);
      observer.disconnect();
    };
  }, []);

  return [ref, dimensions];
}
