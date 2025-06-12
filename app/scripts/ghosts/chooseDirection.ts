import { Direction } from "~/interfaces/slices";
import { isWalkableTile } from "./travelUtils";

export const DIRS = {
  UP: { x: 0, y: -1 },
  DOWN: { x: 0, y: 1 },
  LEFT: { x: -1, y: 0 },
  RIGHT: { x: 1, y: 0 },
};

export function getValidDirections(
  tileX: number,
  tileY: number,
  currentDirection: Direction
): Direction[] {
  const opposite: Record<Direction, Direction> = {
    UP: "DOWN",
    DOWN: "UP",
    LEFT: "RIGHT",
    RIGHT: "LEFT",
  };
  return (["UP", "DOWN", "LEFT", "RIGHT"] as Direction[]).filter((dir) => {
    if (dir === opposite[currentDirection]) return false;
    const dx = DIRS[dir].x;
    const dy = DIRS[dir].y;
    return isWalkableTile(tileX + dx, tileY + dy);
  });
}

export function chooseDirection(
  tileX: number,
  tileY: number,
  validDirs: Direction[],
  targetX: number,
  targetY: number
): Direction {
  let bestDirection = validDirs[0];
  let bestDistance = Infinity;

  for (const dir of validDirs) {
    const dx = DIRS[dir].x;
    const dy = DIRS[dir].y;
    const nextX = tileX + dx;
    const nextY = tileY + dy;

    const dist = (targetX - nextX) ** 2 + (targetY - nextY) ** 2; //squared euclidean distance
    if (dist < bestDistance) {
      bestDistance = dist;
      bestDirection = dir;
    }
  }
  return bestDirection;
}
