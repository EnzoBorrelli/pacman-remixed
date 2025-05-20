import { Container, Sprite } from "@pixi/react";
import { BaseTexture, Rectangle, Texture } from "pixi.js";
import { useMemo } from "react";
import { SIZES } from "~/consts/game";

export default function Lives({ lives }: { lives: number }) {
  const texture = useMemo(() => {
    const base = BaseTexture.from("/assets/spritesheets/pacman.png");

    return new Texture(
      base,
      new Rectangle(0, 4 * SIZES.CHARACTER, SIZES.CHARACTER, SIZES.CHARACTER)
    );
  }, []);

  return (
    <Container x={12} y={16}>
      {Array.from({ length: lives }).map((_, index) => (
        <Sprite
          key={index}
          texture={texture}
          x={24 * index}
          width={24}
          height={24}
          anchor={{ x: 0, y: 0.25 }}
        />
      ))}
    </Container>
  );
}
