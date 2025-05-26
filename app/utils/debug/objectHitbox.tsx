// PelletHitbox.tsx
import { Graphics } from '@pixi/react';
import { SIZES } from '~/consts/game';
import { iPellet } from '~/interfaces/components';

interface Props {
  pellet: iPellet;
}

export default function PelletHitbox({ pellet }: Props) {
  return (
    <Graphics
      draw={(g) => {
        g.clear();
        // Use different colors for pellet types, e.g., small pellets white, power pellets yellow
        const color = pellet.type === 2 ? 0xffff00 : 0xffffff;
        g.beginFill(color, 0.7);
        g.drawRect(0, 0, SIZES.TILE, SIZES.TILE);
        g.endFill();
      }}
      x={pellet.x}
      y={pellet.y}
    />
  );
}
