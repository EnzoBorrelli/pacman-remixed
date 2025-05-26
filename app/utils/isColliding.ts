import { SIZES } from "~/consts/game";
import { COLLISION_MAP } from "~/consts/map";

export function isCollidingWithMap(x: number, y: number) {
  const tileX = Math.floor(x / SIZES.TILE);
  const tileY = Math.floor(y / SIZES.TILE);

  if (
    tileY < 0 ||
    tileX < 0 ||
    tileY >= COLLISION_MAP.length ||
    tileX >= COLLISION_MAP[0].length
  ) {
    return true;
  }
  return COLLISION_MAP[tileY][tileX] === 1;
}

export function isCollidingWithObject(
  x1: number,
  y1: number,
  size: number,
  x2: number,
  y2: number,
) {
  return (
    x1 < x2 + size &&
    x1 + size > x2 &&
    y1 < y2 + size &&
    y1 + size > y2
  );
}

