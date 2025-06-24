import { Dispatch } from "@reduxjs/toolkit";
import { NavigateFunction } from "@remix-run/react";
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

export function PreloadLevelSounds() {
  useEffect(() => {
    soundPlayer.PreloadSound({ folder: "gameplay", audio: "eat_dot_0" });
    soundPlayer.PreloadSound({ folder: "gameplay", audio: "eat_dot_1" });
    soundPlayer.PreloadSound({ folder: "gameplay", audio: "eat_fruit" });
    soundPlayer.PreloadSound({ folder: "gameplay", audio: "eat_ghost" });
    soundPlayer.PreloadSound({ folder: "gameplay", audio: "death" });
    soundPlayer.PreloadSound({ folder: "gameplay", audio: "fright" });
    soundPlayer.PreloadSound({ folder: "gameplay", audio: "start" });
    soundPlayer.PreloadSound({ folder: "gameplay", audio: "siren0" });
    soundPlayer.PreloadSound({ folder: "gameplay", audio: "siren1" });
    soundPlayer.PreloadSound({ folder: "gameplay", audio: "siren2" });
    soundPlayer.PreloadSound({ folder: "gameplay", audio: "siren3" });
    soundPlayer.PreloadSound({ folder: "gameplay", audio: "siren4" });
  }, []);
}
function cinematicToGame(dispatch: Dispatch) {
  resetLevel(dispatch);
  soundPlayer.PlaySound({ folder: "gameplay", audio: "start", useCache: true });
  const timeout = setTimeout(() => {
    dispatch(GameActions.setStatus(GAME_STATUS.STARTED));
  }, 6000);
  return () => clearTimeout(timeout);
}

function resetLevel(dispatch: Dispatch) {
  dispatch(PacmanActions.reset());
  dispatch(BlinkyActions.reset());
  dispatch(PinkyActions.reset());
  dispatch(InkyActions.reset());
  dispatch(ClydeActions.reset());
}

function playLevel(dispatch:Dispatch){
  resetLevel(dispatch)
  dispatch(GameActions.setStatus(GAME_STATUS.PLAYING));
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

function gameOver(dispatch: Dispatch,navigate:NavigateFunction) {
  navigate("/")
  dispatch(GameActions.gameReset());
  dispatch(GameActions.setStatus(GAME_STATUS.CINEMATIC));
}
function levelWon(dispatch: Dispatch) {
  dispatch(GameActions.nextLevel());
  dispatch(GameActions.levelReset());
  dispatch(GameActions.setStatus(GAME_STATUS.CINEMATIC));
}

export function SwitchGameStatus(status: string,navigate:NavigateFunction) {
  const dispatch = useDispatch();
  useEffect(() => {
    if (status === GAME_STATUS.CINEMATIC) cinematicToGame(dispatch);
    if (status === GAME_STATUS.STARTED) {
      dispatch(PacmanActions.resetPellets());
      playLevel(dispatch);
    }
    if (status === GAME_STATUS.CONTINUE) playLevel(dispatch);
    if (status === GAME_STATUS.LOSE_LIFE) loseLife(dispatch);
    if (status === GAME_STATUS.OVER) gameOver(dispatch,navigate);
    if (status === GAME_STATUS.LEVEL_WON) levelWon(dispatch);
  }, [status, dispatch]);
}
