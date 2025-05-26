// PacmanHitbox.tsx
import { Graphics } from '@pixi/react';
import { SIZES } from '~/consts/game';

interface Props {
  x: number;
  y: number;
}

export default function PacmanHitbox({ x, y }: Props) {
  return (
    <Graphics
      draw={(g) => {
        g.clear();
        g.beginFill(0xff0000, 0.3); // Red with some transparency
        g.drawRect(0, 0, SIZES.CHARACTER, SIZES.CHARACTER);
        g.endFill();
      }}
      x={x}
      y={y}
    />
  );
}
