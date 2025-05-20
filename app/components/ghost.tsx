import { AnimatedSprite } from "@pixi/react";
import { Assets, Rectangle, Texture } from "pixi.js";
import { GHOST_STATES, SIZES } from "~/consts/game";
import ghostsSheet from "/assets/spritesheets/ghosts.png";
import { useEffect, useRef, useState } from "react";
import { iGhost } from "~/interfaces/slices";

function getDirectionCol(direction: string): number {
  switch (direction) {
    case "DOWN":
      return 0;
    case "LEFT":
      return 2;
    case "RIGHT":
      return 4;
    case "UP":
      return 6;
    default:
      return 0;
  }
}
function getDeadCol(direction: string): number {
  switch (direction) {
    case "DOWN":
      return 0;
    case "LEFT":
      return 1;
    case "RIGHT":
      return 2;
    case "UP":
      return 3;
    default:
      return 0;
  }
}
function getGhostRow(name: string): number {
  switch (name) {
    case "blinky":
      return 0;
    case "clyde":
      return 1;
    case "inky":
      return 2;
    case "pinky":
      return 3;
    default:
      return 0;
  }
}

export default function Ghost({ x, y, state, direction, name }: iGhost) {
  const [textures, setTextures] = useState<Texture[]>([]);
  const spriteRef = useRef<any>(null);

  useEffect(() => {
    const load = async () => {
      const baseTexture = await Assets.load(ghostsSheet);
      const frameTextures: Texture[] = [];

      if (state === GHOST_STATES.DEAD) {
        const row = 4;
        const col = getDeadCol(direction);
        frameTextures.push(
          new Texture(
            baseTexture,
            new Rectangle(
              col * SIZES.CHARACTER,
              row * SIZES.CHARACTER,
              SIZES.CHARACTER,
              SIZES.CHARACTER
            )
          )
        );
      } else if (
        state === GHOST_STATES.FRIGHTENED
      ) {
        let row = 4;
        for (let i = 4; i < 6; i++) {
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
      }else if( state === GHOST_STATES.RESTORING){
        let row = 4;
        for (let i = 4; i < 8; i++) {
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

      } else {
        let col = getDirectionCol(direction);
        let row = getGhostRow(name!);
        for (let i = col; i < col + 2; i++) {
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
      isPlaying={state !== GHOST_STATES.DEAD}
      animationSpeed={0.1}
      anchor={{ x: 0, y: 0.25 }}
    />
  );
}
