import { CHAR_SPAWNS, FRUIT_SCORES, GAME_STATUS, SIZES } from "~/consts/game";
import { isCollidingWithObject } from "~/utils/isColliding";
import { useGameloop } from "../useGameLoop";
import { useDispatch } from "react-redux";
import { GameActions } from "~/store/gameSlice";
import { iGameState } from "~/interfaces/slices";
import { useRef } from "react";
import soundPlayer from "~/utils/soundPlayer";

function shiftFruitArray(fruitArray: number[], fruitID: number, maxLenght = 7) {
  const newArray = [...fruitArray, fruitID];
  if (newArray.length > maxLenght) {
    newArray.shift();
  }
  return newArray;
}

export function useFruitCollision(
  game: iGameState,
  pacmanX: number,
  pacmanY: number,
  eatenPellets: number
) {
  const dispatch = useDispatch();
  const fruitID = game.level > 7 ? 7 : game.level;
  const fruitScore = FRUIT_SCORES[fruitID];
  const fruitTimer = useRef(0);

  useGameloop(() => {
    if(eatenPellets>=244){dispatch(GameActions.setStatus(GAME_STATUS.LEVEL_WON))}
    if (game.fruitSpawnsCount % 2 === 0 && game.fruitSpawnsCount <= 4) {
      if (eatenPellets === 70 || eatenPellets === 170) {
        dispatch(GameActions.increaseFruitSpawnsCount());
      }
    }
    if (game.fruitSpawnsCount <= 4) {
      if (game.fruitSpawnsCount % 2 !== 0) {
        fruitTimer.current += 1;
        if (fruitTimer.current >= 900) {
          dispatch(GameActions.increaseFruitSpawnsCount());
          fruitTimer.current = 0;
        }
      }
    }
    const isCollided = isCollidingWithObject(
      pacmanX,
      pacmanY,
      SIZES.TILE,
      CHAR_SPAWNS.FRUIT.x,
      CHAR_SPAWNS.FRUIT.y
    );
    if (game.fruitSpawned) {
      if (isCollided) {
        soundPlayer.PlaySound({
          folder: "gameplay",
          audio: "eat_fruit",
          useCache: true,
        });
        dispatch(GameActions.increaseScore(fruitScore));
        dispatch(GameActions.toggleFruitEaten());
        const newFruitArray = shiftFruitArray(game.fruits, fruitID);
        dispatch(GameActions.setFruits(newFruitArray));
      }
    }
  });
}
