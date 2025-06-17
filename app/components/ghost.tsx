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
  const anchorX = state === GHOST_STATES.IDLE ? 0 : 0.3

  if (!animation || animation.textures.length === 0) return null;

  return (
    <AnimatedSprite
      ref={animation.spriteRef}
      textures={animation.textures}
      x={x}
      y={y}
      isPlaying={state !== GHOST_STATES.DEAD}
      animationSpeed={0.1}
      anchor={{ x: anchorX, y: 0.25 }}
    />
  );
}
