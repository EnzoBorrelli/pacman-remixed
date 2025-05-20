import { Sprite } from "@pixi/react";
import { BaseTexture, Rectangle, Texture } from "pixi.js";
import { useMemo } from "react";
import { SIZES } from "~/consts/game";
import { iFruit } from "~/interfaces/components";

export default function Fruit({ x, y, type, isEaten }: iFruit) {
  const fruitTexture = useMemo(() => {
    const base = BaseTexture.from("/assets/spritesheets/fruit.png");

    return new Texture(
      base,
      new Rectangle(type * SIZES.CHARACTER, 0, SIZES.CHARACTER, SIZES.CHARACTER)
    );
  }, [type]);

  return (
    <Sprite
      texture={fruitTexture}
      x={x}
      y={y}
      width={SIZES.CHARACTER}
      height={SIZES.CHARACTER}
      anchor={{ x: 0, y: 0.25 }}
      alpha={isEaten ? 0 : 1}
    />
  );
}
