import { BlinkyActions } from "~/store/ghostSlices";

export interface iPellet{
    x: number;
    y: number;
    type: number;
    isEaten?: boolean;
}

export interface iFruit{
    x: number;
    y: number;
    type: number;
    isEaten?: boolean;
}

export interface iEatScoreDisplay{
    x: number;
    y: number;
    isVisible: boolean;
    score: number;
}

export type ghostActions = typeof BlinkyActions