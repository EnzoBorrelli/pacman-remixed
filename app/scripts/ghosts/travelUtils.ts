import { SIZES } from "~/consts/game";
import { COLLISION_MAP } from "~/consts/map";

export const pixelToTile = (pixelX: number, pixelY: number) => {
  return {
    x: Math.floor(pixelX / SIZES.TILE),
    y: Math.floor(pixelY / SIZES.TILE),
  };
};

export function isAlignedToTile(x: number, y: number): boolean {
  return x % SIZES.TILE === 0 && y % SIZES.TILE === 0;
}

export function isWalkableTile(tileX: number, tileY: number) {
  if (
    tileY < 0 ||
    tileX < 0 ||
    tileY >= COLLISION_MAP.length ||
    tileX >= COLLISION_MAP[0].length
  ) {
    return false;
  }
  return COLLISION_MAP[tileY][tileX] === 0;
}

export function isIntersection(x: number, y: number) {
  if (!isWalkableTile(x, y)) return false;

  const neighbors = [
    isWalkableTile(x, y - 1), //Up
    isWalkableTile(x, y + 1), //Down
    isWalkableTile(x - 1, y), //Left
    isWalkableTile(x + 1, y), //Right
  ];

  const walkableCount = neighbors.filter(Boolean).length;

  if (walkableCount >= 3) return true;

  //check if two neighbors are perpendicular
  if (walkableCount === 2) {
    const [up, down, left, right] = neighbors;
    if ((up && left) || (up && right) || (down && left) || (down && right)) {
      return true;
    }
  }
  return false;
}
