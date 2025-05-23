import { SIZES } from "~/consts/game";
import { COLLISION_MAP } from "~/consts/map";

export function isColliding(x: number, y: number) {
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
