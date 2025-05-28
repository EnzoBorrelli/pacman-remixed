import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { PACMAN_STATES, SIZES } from "~/consts/game";
import { PELLETS_MAP } from "~/consts/map";
import { GameActions } from "~/store/gameSlice";
import { PacmanActions } from "~/store/pacmanSlice";
import { useGameloop } from "../useGameLoop";
import { iPellet } from "~/interfaces/components";
import { isCollidingWithObject } from "~/utils/isColliding";
import soundPlayer from "~/utils/soundPlayer";

function useMapPellets(pelletsMap: number[][] = PELLETS_MAP) {
  const [pellets, setPellets] = useState<iPellet[]>([]);

  useEffect(() => {
    const pelletsArray: iPellet[] = [];
    for (let row = 0; row < pelletsMap.length; row++) {
      for (let col = 0; col < pelletsMap[row].length; col++) {
        if (pelletsMap[row][col] !== 0) {
          const x = col * SIZES.TILE;
          const y = row * SIZES.TILE;
          pelletsArray.push({
            x,
            y,
            type: pelletsMap[row][col],
            isEaten: false,
          });
        }
      }
    }
    setPellets(pelletsArray);
  }, [pelletsMap]);

  return pellets;
}

export function usePelletCollision(pacmanX: number, pacmanY: number) {
  const dispatch = useDispatch();
  const initialPellets = useMapPellets();
  const [visiblePellets, setVisiblePellets] = useState<iPellet[]>([]);
  const pelletsRef = useRef<iPellet[]>([]);

  // Set once pellets are loaded
  useEffect(() => {
    pelletsRef.current = initialPellets;
    setVisiblePellets(initialPellets);
  }, [initialPellets]);

  useGameloop(() => {
    let changed = false;
    dispatch(GameActions.setHighScore());
    for (const pellet of pelletsRef.current) {
      if (pellet.isEaten) continue;
      const isCollided = isCollidingWithObject(
        pacmanX,
        pacmanY,
        SIZES.TILE,
        pellet.x,
        pellet.y
      );
      if (isCollided) {
        dispatch(GameActions.removePellet({ x: pellet.x, y: pellet.y }));
        dispatch(PacmanActions.setEatenPellets());

        if (pellet.type === 2) {
          dispatch(PacmanActions.setState(PACMAN_STATES.EATING_POWER_PELLET));
          dispatch(PacmanActions.resetPowerPelletTimeout());
          soundPlayer.PlaySound({
            folder: "gameplay",
            audio: "eat_dot_1",
            useCache: true,
          });
          dispatch(GameActions.increaseScore(50));
        } else {
          dispatch(GameActions.increaseScore(10));
          soundPlayer.PlaySound({
            folder: "gameplay",
            audio: "eat_dot_0",
            useCache: true,
          });
        }

        pellet.isEaten = true;
        changed = true;
      }
      if (changed) {
        setVisiblePellets([...pelletsRef.current.filter((p) => !p.isEaten)]);
      }
    }
  });

  return visiblePellets;
}
