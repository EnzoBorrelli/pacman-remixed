import { Container, Stage, Text } from "@pixi/react";
import { useNavigate } from "@remix-run/react";
import { TextStyle } from "pixi.js";
import { useSelector } from "react-redux";
import { SIZES } from "~/consts/game";
import { RootState } from "~/store";
import soundPlayer from "~/utils/soundPlayer";

export default function UITop() {
  const game = useSelector((state: RootState) => state.game);
  const navigate = useNavigate();
  function handleClick() {
    navigate("/");
    soundPlayer.PlaySound({ folder: "ui", audio: "menu" });
  }

  const textStyle = (color: string) =>
    new TextStyle({
      fontFamily: "PacFont",
      fontSize: 12,
      fill: color,
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
      <Text
        text="SCORE"
        x={60}
        y={20}
        anchor={0.5}
        style={textStyle("white")}
      />
      <Text
        text={`${game.score}`}
        x={60}
        y={40}
        anchor={0.5}
        style={textStyle("white")}
      />
      <Text
        text="HIGH SCORE"
        x={SIZES.MAP.WIDTH / 2}
        y={20}
        anchor={0.5}
        style={textStyle("white")}
      />
      <Text
        text={`${game.highScore}`}
        x={SIZES.MAP.WIDTH / 2}
        y={40}
        anchor={0.5}
        style={textStyle("white")}
      />
      <Container
        interactive={true}
        pointertap={handleClick}
        cursor="pointer"
      >
        <Text
          text="MENU"
          x={SIZES.MAP.WIDTH - 60}
          y={20}
          anchor={0.5}
          style={textStyle("orange")}
        />
      </Container>
    </Stage>
  );
}
