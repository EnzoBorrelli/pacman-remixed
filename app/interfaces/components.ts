import { BlinkyActions } from "~/store/ghostSlices";
import { iGameState, iGhost, iPacman } from "./slices";
import { Dispatch } from "@reduxjs/toolkit";

export interface iPellet {
  x: number;
  y: number;
  type: number;
  isEaten?: boolean;
}

export interface iFruit {
  x: number;
  y: number;
  type: number;
  isEaten?: boolean;
}

export interface iEatScoreDisplay {
  x: number;
  y: number;
  isVisible: boolean;
  score: number;
}

export type ghostActions = typeof BlinkyActions;

export interface gameFuntion {
  pacman: iPacman;
  ghosts: iGhost[];
  game: iGameState;
  dispatch: Dispatch;
}
