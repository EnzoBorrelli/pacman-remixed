import { Stage, Text } from "@pixi/react";
import { SIZES } from "~/consts/game";
import FruitArray from "./fruitArray";
import { useSelector } from "react-redux";
import { RootState } from "~/store";
import Lives from "./lives";

export default function UIBottom() {
  const game = useSelector((state: RootState) => state.game);
  return (
    <Stage
      width={SIZES.MAP.WIDTH}
      height={50}
      options={{
        backgroundColor: 0x000000,
        antialias: false,
        autoDensity: true,
      }}
    >
      <FruitArray fruitArray={game.fruits} />
      <Lives lives={game.lives} />
      <Text/>
    </Stage>
  );
}
