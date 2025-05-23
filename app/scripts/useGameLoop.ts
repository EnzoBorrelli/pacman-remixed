import { useEffect, useRef } from "react";

type callback = (delta: number) => void;

export function useGameloop(callback: callback) {
  const frameRef = useRef<number>();
  const lastTimeRef = useRef<number>(performance.now());

  useEffect(() => {
    const loop = (time: number) => {
      const dealtaTime = (time - lastTimeRef.current) / 1000;
      lastTimeRef.current = time;
      callback(dealtaTime);
      frameRef.current = requestAnimationFrame(loop);
    };
    frameRef.current = requestAnimationFrame(loop);
    return () => {
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }
    };
  }, [callback]);
}
