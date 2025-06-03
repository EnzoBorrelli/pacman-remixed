import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { GAME_STATUS, PACMAN_STATES, SIZES } from "~/consts/game";
import { PELLETS_MAP } from "~/consts/map";
import { GameActions } from "~/store/gameSlice";
import { PacmanActions } from "~/store/pacmanSlice";
import { useGameloop } from "../useGameLoop";
import { iPellet } from "~/interfaces/components";
import { isCollidingWithObject } from "~/utils/isColliding";
import soundPlayer from "~/utils/soundPlayer";

export function generatePellets(map: number[][]): iPellet[] {
  const pelletsArray: iPellet[] = [];

  for (let row = 0; row < map.length; row++) {
    for (let col = 0; col < map[row].length; col++) {
      if (map[row][col] !== 0) {
        const x = col * SIZES.TILE;
        const y = row * SIZES.TILE;
        pelletsArray.push({
          x,
          y,
          type: map[row][col],
          isEaten: false,
        });
      }
    }
  }

  return pelletsArray;
}

export function usePelletCollision(
  pacmanX: number,
  pacmanY: number,
  pellets: iPellet[],
  status: string
) {
  const dispatch = useDispatch();

  useEffect(() => {
    if (status === GAME_STATUS.STARTED) {
      const pelletsArray = generatePellets(PELLETS_MAP);
      dispatch(GameActions.setPellets(pelletsArray));
    }
  }, [status, dispatch]);

  useGameloop(() => {
    for (const pellet of pellets) {
      if (pellet.isEaten) continue;
      dispatch(GameActions.setHighScore());
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

        break;
      }
    }
  });

  return pellets.filter((p) => !p.isEaten);
}
