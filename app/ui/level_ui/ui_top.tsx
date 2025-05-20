import { Stage, Text } from "@pixi/react";
import { TextStyle } from "pixi.js";
import { useSelector } from "react-redux";
import { SIZES } from "~/consts/game";
import { RootState } from "~/store";

export default function UITop() {
  const game = useSelector((state: RootState) => state.game);
  const textStyle = new TextStyle({
    fontFamily: "PacFont",
    fontSize: 12,
    fill: "white",
    align: "center",
  });
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
      <Text text="SCORE" x={60} y={20} anchor={0.5} style={textStyle} />
      <Text
        text={`${game.score}`}
        x={60}
        y={40}
        anchor={0.5}
        style={textStyle}
      />
      <Text
        text="HIGH SCORE"
        x={SIZES.MAP.WIDTH / 2}
        y={20}
        anchor={0.5}
        style={textStyle}
      />
      <Text
        text={`${game.highScore}`}
        x={SIZES.MAP.WIDTH /2}
        y={40}
        anchor={0.5}
        style={textStyle}
      />
    </Stage>
  );
}
