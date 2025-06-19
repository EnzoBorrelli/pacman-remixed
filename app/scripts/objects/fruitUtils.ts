import { CHAR_SPAWNS, FRUIT_SCORES, GAME_STATUS, SIZES } from "~/consts/game";
import { isCollidingWithObject } from "~/utils/isColliding";
import { GameActions } from "~/store/gameSlice";
import { iGameState, iPacman } from "~/interfaces/slices";
import { useRef } from "react";
import soundPlayer from "~/utils/soundPlayer";
import { Dispatch } from "@reduxjs/toolkit";

function shiftFruitArray(fruitArray: number[], fruitID: number, maxLenght = 7) {
  const newArray = [...fruitArray, fruitID];
  if (newArray.length > maxLenght) {
    newArray.shift();
  }
  return newArray;
}

let fruitTimer = 0;

export function updateFruits({
  game,
  pacman,
  dispatch,
}: {
  game: iGameState;
  pacman: iPacman;
  dispatch: Dispatch;
}) {
  const fruitID = game.level > 7 ? 7 : game.level;
  const fruitScore = FRUIT_SCORES[fruitID];

  if (pacman.eatenPellets! >= 244 && game.status === GAME_STATUS.PLAYING) {
    dispatch(GameActions.setStatus(GAME_STATUS.LEVEL_WON));
  }
  if (game.fruitSpawnsCount % 2 === 0 && game.fruitSpawnsCount <= 4) {
    if (pacman.eatenPellets! === 70 || pacman.eatenPellets! === 170) {
      dispatch(GameActions.increaseFruitSpawnsCount());
    }
  }
  if (game.fruitSpawnsCount <= 4) {
    if (game.fruitSpawnsCount % 2 !== 0) {
      fruitTimer += 1;
      if (fruitTimer >= 900) {
        dispatch(GameActions.increaseFruitSpawnsCount());
        fruitTimer = 0;
      }
    }
  }
  const isCollided = isCollidingWithObject(
    pacman.x,
    pacman.y,
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
}
