import { AnimatedSprite } from "@pixi/react";
import { Assets, Rectangle, Texture } from "pixi.js";
import { PACMAN_STATES, SIZES } from "~/consts/game";
import { iPacman } from "~/interfaces/components";
import pacmanSheet from "/assets/spritesheets/pacman.png";
import { useEffect, useRef, useState } from "react";

function getDirectionRow(direction: string): number {
  switch (direction) {
    case "RIGHT":
      return 1;
    case "UP":
      return 2;
    case "DOWN":
      return 3;
    case "LEFT":
      return 4;
    default:
      return 1;
  }
}

export default function Pacman({ x, y, state, direction }: iPacman) {
  const [textures, setTextures] = useState<Texture[]>([]);
  const spriteRef = useRef<any>(null);

  useEffect(() => {
    const load = async () => {
      const baseTexture = await Assets.load(pacmanSheet);
      const frameTextures: Texture[] = [];

      if (state === PACMAN_STATES.DYING) {
        const row = 0;
        const frameCount = 10;
        for (let i = 0; i < frameCount; i++) {
          frameTextures.push(
            new Texture(
              baseTexture,
              new Rectangle(
                i * SIZES.CHARACTER,
                row * SIZES.CHARACTER,
                SIZES.CHARACTER,
                SIZES.CHARACTER
              )
            )
          );
        }
      } else if (state === PACMAN_STATES.IDLE) {
        let row = getDirectionRow(direction);
        frameTextures.push(
          new Texture(
            baseTexture,
            new Rectangle(
              0,
              row * SIZES.CHARACTER,
              SIZES.CHARACTER,
              SIZES.CHARACTER
            )
          )
        );
      } else {
        let row = getDirectionRow(direction);
        for (let i = 0; i < 2; i++) {
          frameTextures.push(
            new Texture(
              baseTexture,
              new Rectangle(
                i * SIZES.CHARACTER,
                row * SIZES.CHARACTER,
                SIZES.CHARACTER,
                SIZES.CHARACTER
              )
            )
          );
        }
      }

      setTextures(frameTextures);
    };

    load();
  }, [state, direction]);

  useEffect(() => {
    if (spriteRef.current && textures.length > 0) {
      spriteRef.current.gotoAndPlay(0);
    }
  }, [textures]);

  if (textures.length === 0) return null;

  return (
    <AnimatedSprite
    ref={spriteRef}
      textures={textures}
      x={x}
      y={y}
      isPlaying={state !== PACMAN_STATES.IDLE}
      animationSpeed={0.1}
      loop={state !== PACMAN_STATES.DYING}
      anchor={{ x: 0, y: 0.25 }}
    />
  );
}
