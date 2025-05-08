import { Stage } from "@pixi/react";
import Level from "./level";
import { CHAR_SPAWNS, DIRECTIONS, SIZES } from "~/consts/game";
import { useSelector } from "react-redux";
import { RootState } from "~/store";
import Pacman from "./pacman";

export default function Game() {
  const game = useSelector((state: RootState) => state.game);
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
      <Level level={game.level}/>
      <Pacman x={CHAR_SPAWNS.PACMAN.x} y={CHAR_SPAWNS.PACMAN.y} state="1" direction={DIRECTIONS.LEFT}/>
    </Stage>
  );
}
