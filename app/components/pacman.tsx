import { AnimatedSprite } from "@pixi/react";
import { Assets, Rectangle, Texture } from "pixi.js";
import { SIZES } from "~/consts/game";
import { iPacman } from "~/interfaces/components";
import pacmanSheet from "/assets/spritesheets/pacman.png";
import { useEffect, useState } from "react";

export default function Pacman({ x, y, state, direction }: iPacman) {
  const [textures, setTextures] = useState<Texture[]>([]);

  useEffect(() => {
    const load = async () => {
      const baseTexture = await Assets.load(pacmanSheet);
      const frameTextures: Texture[] = [];

      let startY = 1;
      switch (direction) {
        case "RIGHT": startY = 1; break;
        case "UP": startY = 2; break;
        case "DOWN": startY = 3; break;
        case "LEFT": startY = 4; break;
        default: startY = 1;
      }

      for (let i = 0; i < 2; i++) {
        frameTextures.push(
          new Texture(
            baseTexture,
            new Rectangle(
              i * SIZES.CHARACTER,
              startY * SIZES.CHARACTER,
              SIZES.CHARACTER,
              SIZES.CHARACTER
            )
          )
        );
      }

      setTextures(frameTextures);
    };

    load();
  }, [direction]);

  if (textures.length === 0) return null;

  return (
    <AnimatedSprite
      textures={textures}
      x={x}
      y={y}
      isPlaying={true}
      animationSpeed={0.1}
      anchor={{ x: 0, y: 0.25 }}
    />
  );
}
