import { Container, Sprite } from "@pixi/react";
import { Assets, Rectangle, Texture } from "pixi.js";
import { useEffect, useState } from "react";
import { SIZES } from "~/consts/game";

export default function FruitArray({ fruitArray }: { fruitArray: number[] }) {
  const [textures, setTextures] = useState<Texture[]>([]);
  useEffect(() => {
    const load = async () => {
      const baseTexture = await Assets.load("/assets/spritesheets/fruit.png");
      const frameTextures: Texture[] = [];

      for (let i = 0; i < fruitArray.length; i++) {
        frameTextures.push(
          new Texture(
            baseTexture,
            new Rectangle(
              fruitArray[i] * SIZES.CHARACTER,
              0,
              SIZES.CHARACTER,
              SIZES.CHARACTER
            )
          )
        );
      }
      setTextures(frameTextures);
    };
    load();
  }, []);

  return (
    <Container x={SIZES.MAP.WIDTH-24} y={16}>
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
