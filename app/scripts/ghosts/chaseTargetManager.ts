import { Direction, iGhost, iPacman } from "~/interfaces/slices";
import { pixelToTile } from "./travelUtils";
import { SCATTER_TILES } from "~/consts/game";

type target = {
  x: number;
  y: number;
};

function blinkyTarget(pacmanTile: target) {
  const target = pacmanTile;

  return target;
}

function pinkyTarget(
  pacmanDirection: Direction | undefined,
  pacmanTile: target
) {
  let target = pacmanTile;

  switch (pacmanDirection) {
    case "UP":
      target.y -= 4;
      target.x -= 4;
      break;
    case "DOWN":
      target.y += 4;
      break;
    case "LEFT":
      target.x -= 4;
      break;
    case "RIGHT":
      target.x += 4;
      break;
  }
  return target;
}

export function getTarget(pacman: iPacman, ghost: iGhost) {
  let target = SCATTER_TILES[ghost.name!];
  const pacmanTile = pixelToTile(pacman.x, pacman.y);

  if (ghost.name === "blinky") target = blinkyTarget(pacmanTile);
  if (ghost.name === "pinky")
    target = pinkyTarget(pacman.direction, pacmanTile);

  return target;
}
