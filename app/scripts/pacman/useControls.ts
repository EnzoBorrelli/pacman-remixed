import { useCallback, useEffect, useState } from "react";

type Direction = "UP" | "DOWN" | "LEFT" | "RIGHT" | undefined;

const DIRECTION_KEYS: Record<string, Direction> = {
  ArrowUp: "UP",
  ArrowDown: "DOWN",
  ArrowLeft: "LEFT",
  ArrowRight: "RIGHT",
  KeyW: "UP",
  KeyS: "DOWN",
  KeyA: "LEFT",
  KeyD: "RIGHT",
};

export function useControls() {
  const [heldDirection, setHeldDirection] = useState<Direction>(undefined);

  const handleKey = useCallback((event: KeyboardEvent) => {
    const direction = DIRECTION_KEYS[event.code];
    if (!direction) return;

    setHeldDirection((current) => {
      return current !== direction ? direction : current;
    });
  }, []);

  useEffect(() => {

    window.addEventListener("keydown", handleKey);

    return () => {
      window.removeEventListener("keydown", handleKey);
    };
  }, [handleKey]);

  const getControlsDirection = useCallback(()=> heldDirection,[heldDirection]);
  return { getControlsDirection };
}
