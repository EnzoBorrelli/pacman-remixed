import { Direction } from "~/interfaces/slices";


export const DIRECTIONS : Record<string,Direction> = {
  UP: "UP",
  DOWN: "DOWN",
  LEFT: "LEFT",
  RIGHT: "RIGHT"
};
export const GAME_STATUS = {
  CINEMATIC: "CINEMATIC",
  STARTED: "STARTED",
  CONTINUE: "CONTINUE",
  PLAYING: "PLAYING",
  LOSE_LIFE: "LOSE_LIFE",
  LEVEL_WON: "LEVEL_WON",
  OVER: "OVER",
};

export const SIZES = {
  CHARACTER: 32,
  TILE: 16,
  MAP: { WIDTH: 448, HEIGHT: 496 },
};

export const CHAR_SPAWNS = {
  PACMAN: { x: 208, y: 368 },
  BLINKY: { x: 208, y: 174 },
  PINKY: { x: 208, y: 222 },
  INKY: { x: 176, y: 222 },
  CLYDE: { x: 240, y: 222 },
  FRUIT: { x: 208, y: 272 },
};

export const SCATTER_TILES = {
  BLINKY:{x:28,y:0},
  PINKY:{x:0,y:0},
  INKY:{x:28,y:31},
  CLYDE:{x:0,y:31},
}

export const MAP_TP_COORDS = {
  LEFT_IN: 12,
  LEFT_OUT: 20,
  RIGHT_IN: 430,
  RIGHT_OUT: 424,
};

export const PACMAN_STATES = {
  IDLE: "IDLE",
  MOVING: "MOVING",
  DYING: "DYING",
  EATING_GHOST: "EAT_GHOST",
  EATING_POWER_PELLET: "EAT_POWER_PELLET",
  EATING_FRUIT: "EAT_FRUIT",
};

export const GHOST_STATES = {
  IDLE: "IDLE",
  MOVING: "MOVING",
  FRIGHTENED: "FRIGHTENED",
  RESTORING: "RESTORING",
  DEAD: "DEAD",
  EATING_PACMAN: "EATING_PACMAN",
};

export const BEHAVIOR_STATES = {
  CHASE: "CHASE",
  SCATTER: "SCATTER",
  EATEN: "EATEN",
  FRIGHTENED: "FRIGHTENED",
};

export const FRUIT_SCORES = [100, 300, 500, 700, 1000, 2000, 3000, 5000];

export const COMBO_SCORES = [200,400,800,1600]
