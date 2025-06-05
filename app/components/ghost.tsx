import { AnimatedSprite } from "@pixi/react";
import { GHOST_STATES } from "~/consts/game";
import { iGhost } from "~/interfaces/slices";
import { useAnimations } from "~/animations/ghostAnimations";

export default function Ghost({ x, y, state, direction, name }: iGhost) {
  const animation = useAnimations({
    state: state,
    direction: direction,
    name: name,
  });

  if (!animation || animation.textures.length === 0) return null;

  return (
    <AnimatedSprite
      ref={animation.spriteRef}
      textures={animation.textures}
      x={x}
      y={y}
      isPlaying={state !== GHOST_STATES.DEAD}
      animationSpeed={0.1}
      anchor={{ x: 0, y: 0.25 }}
    />
  );
}
