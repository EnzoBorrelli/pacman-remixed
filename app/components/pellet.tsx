import { Sprite } from "@pixi/react";
import { Texture } from "pixi.js";
import { SIZES } from "~/consts/game";
import { iPellet } from "~/interfaces/components";

export default function Pellet({ x, y, type, isEaten }: iPellet) {
  const pelletTexture =
    type === 1
      ? Texture.from("/assets/spritesheets/pellet.png")
      : Texture.from("/assets/spritesheets/power_pellet.png")
  return (
    <Sprite
      texture={pelletTexture}
      x={x}
      y={y}
      width={SIZES.TILE}
      height={SIZES.TILE}
      alpha={isEaten ? 0 : 1}
    />
  );
}
