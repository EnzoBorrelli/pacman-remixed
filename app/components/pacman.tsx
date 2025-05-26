import { AnimatedSprite } from "@pixi/react";
import { PACMAN_STATES } from "~/consts/game";
import { iPacman } from "~/interfaces/slices";
import { useAnimations } from "~/animations/pacmanAnimations";



export default function Pacman({ x, y, state, direction }: iPacman) {
  const animation = useAnimations({ state, direction });
  const anchorX = state === PACMAN_STATES.MOVING ? 0.4 : 0;

  if (!animation || animation.textures.length === 0) return null;

  return (
    <AnimatedSprite
      ref={animation.spriteRef}
      textures={animation.textures}
      x={x}
      y={y}
      isPlaying={state !== PACMAN_STATES.IDLE}
      animationSpeed={state === PACMAN_STATES.EATING_POWER_PELLET ? 0.2 : 0.1}
      loop={state !== PACMAN_STATES.DYING}
      anchor={{ x: anchorX, y: 0.3 }}
    />
  );
}

