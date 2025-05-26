import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "~/store";
import { GameActions } from "~/store/gameSlice";

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
  const dispatch = useDispatch();
  const status = useSelector((state: RootState) => state.game.status);

  const handleKey = useCallback((event: KeyboardEvent) => {
    const direction = DIRECTION_KEYS[event.code];
    if (!direction) return;

    setHeldDirection((current) => {
      return current !== direction ? direction : current;
    });
    dispatch(GameActions.play());
  }, []);

  useEffect(() => {
    if (status !== "PLAYING") {
      setHeldDirection(undefined);
    }

    window.addEventListener("keydown", handleKey);

    return () => {
      window.removeEventListener("keydown", handleKey);
    };
  }, [handleKey,status]);

  const getControlsDirection = useCallback(
    () => heldDirection,
    [heldDirection]
  );
  return { getControlsDirection };
}
