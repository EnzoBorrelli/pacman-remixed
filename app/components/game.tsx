import { Stage } from "@pixi/react";
import Level from "./level";
import { SIZES } from "~/consts/game";

export default function Game() {
  return (
    <Stage
      width={SIZES.MAP.WIDTH}
      height={SIZES.MAP.HEIGHT}
      options={{
        backgroundColor: 0x000000,
        antialias: false,
        autoDensity: true,
      }}
    >
      <Level/>
    </Stage>
  );
}
