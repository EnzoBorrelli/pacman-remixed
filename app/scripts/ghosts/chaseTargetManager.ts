import { Direction, iGhost, iPacman } from "~/interfaces/slices";
import { pixelToTile } from "./travelUtils";
import { SCATTER_TILES } from "~/consts/game";

type target = {
  x: number;
  y: number;
};

function addTilesToTarget(
  target: target,
  direction: Direction | undefined,
  tilesToAdd: number
) {
  switch (direction) {
    case "UP":
      target.y -= tilesToAdd;
      target.x -= tilesToAdd;
      break;
    case "DOWN":
      target.y += tilesToAdd;
      break;
    case "LEFT":
      target.x -= tilesToAdd;
      break;
    case "RIGHT":
      target.x += tilesToAdd;
      break;
  }
  return target;
}

function blinkyTarget(pacmanTile: target) {
  const target = { ...pacmanTile };

  return target;
}

function pinkyTarget(
  pacmanDirection: Direction | undefined,
  pacmanTile: target
) {
  const target = addTilesToTarget(pacmanTile, pacmanDirection, 4);

  return target;
}

function inkyTarget(
  pacmanDirection: Direction | undefined,
  pacmanTile: target,
  blinkyTile: target
) {
  const aheadTile = addTilesToTarget(pacmanTile, pacmanDirection, 2);

  const vectorX = aheadTile.x - blinkyTile.x;
  const vectorY = aheadTile.y - blinkyTile.y;

  const targetX = blinkyTile.x + vectorX * 2;
  const targetY = blinkyTile.y + vectorY * 2;

  return { x: targetX, y: targetY };
}

function clydeTarget(pacmanTile: target, clydeTile: target) {
  const dx = pacmanTile.x - clydeTile.x;
  const dy = pacmanTile.y - clydeTile.y;
  const distance = Math.sqrt(dx * dx + dy * dy);

  if (distance <= 8) {
    return SCATTER_TILES["clyde"];
  } else {
    return { ...pacmanTile };
  }
}

export function getTarget(pacman: iPacman, ghost: iGhost, blinky: iGhost) {
  let target = SCATTER_TILES[ghost.name!];
  const pacmanTile = pixelToTile(pacman.x, pacman.y);
  const blinkyTile = pixelToTile(blinky.x, blinky.y);
  const clydeTile = pixelToTile(ghost.x, ghost.y);

  if (ghost.name === "blinky") target = blinkyTarget(pacmanTile);
  if (ghost.name === "pinky")
    target = pinkyTarget(pacman.direction, pacmanTile);
  if (ghost.name === "inky")
    target = inkyTarget(pacman.direction, pacmanTile, blinkyTile);
  if (ghost.name === "clyde") target = clydeTarget(pacmanTile, clydeTile);

  return target;
}
