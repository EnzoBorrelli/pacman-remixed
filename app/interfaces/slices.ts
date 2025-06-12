import { iPellet } from "./components";

export interface iGameState {
  status: string;
  score: number;
  highScore: number;
  level: number;
  lives: number;
  fruits: number[];
  fruitSpawnsCount: number;
  fruitSpawned: boolean;
  pelletsArray: iPellet[];
}

export type Direction = "UP" | "DOWN" | "LEFT" | "RIGHT";

export interface iPacman {
  x: number;
  y: number;
  state: string;
  direction: Direction;
  eatenPellets?: number;
  powerPelletTimeout?: number;
}

export interface iGhost {
  x: number;
  y: number;
  state: string;
  direction: Direction;
  name?: string;
  behavior?:string;
  targetTile?:{x:number,y:number};
}
