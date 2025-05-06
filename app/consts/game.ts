export const DIRECTIONS = {
  UP: "UP",
  DOWN: "DOWN",
  LEFT: "LEFT",
  RIGHT: "RIGHT",
  NONE: "NONE",
};
export const GAME_STATUS = {
  STARTED: "STARTED",
  LEVEL_WON: "LEVEL_WON",
  OVER: "OVER",
};

export const SIZES = {
  CHARACTER:32,
  TILE: 16,
  MAP: { WIDTH: 448, HEIGHT: 496 },
}

export const CHAR_SPAWNS = {
  PACMAN: { x: 1, y: 1 },
  BLINKY: { x: 1, y: 1 },
  PINKY: { x: 1, y: 1 },
  INKY: { x: 1, y: 1 },
  CLYDE: { x: 1, y: 1 },
  FRUIT:{ x: 208, y: 272 },
};

export const PACMAN_STATES = {
  IDLE: "IDLE",
  MOVING: "MOVING",
  EATING: "EATING",
  DYING: "DYING",
  EATING_GHOST: "EATING_GHOST",
  EATING_FRUIT: "EATING_FRUIT",
  EATING_POWER_PELLET: "EATING_POWER_PELLET",
};

export const GHOST_STATES = {
  IDLE: "IDLE",
  MOVING: "MOVING",
  EATING: "EATING",
  FRIGHTENED: "FRIGHTENED",
  DEAD: "DEAD",
  EATING_PACMAN: "EATING_PACMAN",
};
