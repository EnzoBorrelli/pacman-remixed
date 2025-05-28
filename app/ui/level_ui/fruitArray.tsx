import { Container, Sprite } from "@pixi/react";
import { Assets, BaseTexture, Rectangle, Texture } from "pixi.js";
import { useEffect, useState } from "react";
import { SIZES } from "~/consts/game";

export default function FruitArray({ fruitArray }: { fruitArray: number[] }) {
  const [textures, setTextures] = useState<Texture[]>([]);
  const [baseTexture, setBaseTexture] = useState<BaseTexture | null>(null);

  useEffect(() => {
    const load = async () => {
      const texture = await Assets.load("/assets/spritesheets/fruit.png");
      setBaseTexture(texture);
    };
    load();
  }, []);

  useEffect(() => {
    if (!baseTexture) return;

    const newTextures = fruitArray.map(
      (fruitIndex) =>
        new Texture(
          baseTexture,
          new Rectangle(
            fruitIndex * SIZES.CHARACTER,
            0,
            SIZES.CHARACTER,
            SIZES.CHARACTER
          )
        )
    );

    // Optionally dispose of old textures here to free GPU memory
    textures.forEach((t) => t.destroy());

    setTextures(newTextures);
  }, [fruitArray, baseTexture]);

  return (
    <Container x={SIZES.MAP.WIDTH - 24} y={16}>
      {textures.map((texture, index) => (
        <Sprite
          key={index}
          texture={texture}
          x={-24 * index}
          width={20}
          height={20}
          anchor={{ x: 0, y: 0.25 }}
        />
      ))}
    </Container>
  );
}
