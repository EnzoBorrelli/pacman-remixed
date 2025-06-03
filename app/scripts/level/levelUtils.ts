import { Dispatch } from "@reduxjs/toolkit";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { GAME_STATUS, PACMAN_STATES } from "~/consts/game";
import { GameActions } from "~/store/gameSlice";
import {
  BlinkyActions,
  PinkyActions,
  InkyActions,
  ClydeActions,
} from "~/store/ghostSlices";
import { PacmanActions } from "~/store/pacmanSlice";
import soundPlayer from "~/utils/soundPlayer";

export function usePreloadLevelSounds() {
  useEffect(() => {
    soundPlayer.PreloadSound({ folder: "gameplay", audio: "eat_dot_0" });
    soundPlayer.PreloadSound({ folder: "gameplay", audio: "eat_dot_1" });
    soundPlayer.PreloadSound({ folder: "gameplay", audio: "eat_fruit" });
    soundPlayer.PreloadSound({ folder: "gameplay", audio: "eat_ghost" });
    soundPlayer.PreloadSound({ folder: "gameplay", audio: "death" });
    soundPlayer.PreloadSound({ folder: "gameplay", audio: "fright" });
  }, []);
}
function cinematicToGame(dispatch: Dispatch) {
  soundPlayer.PlaySound({ folder: "gameplay", audio: "start" });
  const timeout = setTimeout(() => {
    dispatch(GameActions.setStatus(GAME_STATUS.STARTED));
  }, 4000);
  return () => clearTimeout(timeout);
}

function resetLevel(dispatch: Dispatch) {
  dispatch(PacmanActions.reset());
  dispatch(BlinkyActions.reset());
  dispatch(PinkyActions.reset());
  dispatch(InkyActions.reset());
  dispatch(ClydeActions.reset());
}

function loseLife(dispatch: Dispatch) {
  soundPlayer.PlaySound({ folder: "gameplay", audio: "death", useCache: true });
  dispatch(PacmanActions.setState(PACMAN_STATES.DYING));
  dispatch(GameActions.loseLife());
  const timeout = setTimeout(() => {
    dispatch(GameActions.setStatus(GAME_STATUS.CONTINUE));
  }, 1800);
  return () => clearTimeout(timeout);
}

function gameOver(dispatch: Dispatch) {
  dispatch(GameActions.gameReset());
  dispatch(GameActions.setStatus(GAME_STATUS.CINEMATIC));
}
function levelWon(dispatch: Dispatch) {
  dispatch(GameActions.nextLevel());
  dispatch(GameActions.levelReset());
  dispatch(GameActions.setStatus(GAME_STATUS.CINEMATIC));
}

export function useGameStatus(status: string) {
  const dispatch = useDispatch();
  useEffect(() => {
    if (status === GAME_STATUS.CINEMATIC) cinematicToGame(dispatch);
    if (status === GAME_STATUS.STARTED || status === GAME_STATUS.CONTINUE)
      resetLevel(dispatch);
    if (status === GAME_STATUS.LOSE_LIFE) loseLife(dispatch);
    if (status === GAME_STATUS.OVER) gameOver(dispatch);
    if (status === GAME_STATUS.LEVEL_WON) levelWon(dispatch);
  }, [status, dispatch]);
}
