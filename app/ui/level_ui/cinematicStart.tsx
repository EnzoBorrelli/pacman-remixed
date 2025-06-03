import { Container, Graphics, Text } from "@pixi/react";
import { TextStyle } from "pixi.js";
import { GAME_STATUS, SIZES } from "~/consts/game";

export default function CinematicStart({
  level,
  status,
}: {
  level: number;
  status: string;
}) {
  const textStyle = new TextStyle({
    fontFamily: "PacFont",
    fontSize: 11,
    fill: "yellow",
    align: "center",
  });
  return (
    <Container x={0} y={0} alpha={status === GAME_STATUS.CINEMATIC ? 1 : 0}>
      <Graphics
        draw={(g) => {
          g.clear();
          g.beginFill(0x222222, 0.6); // Red with some transparency
          g.drawRect(0, 0, SIZES.MAP.WIDTH, SIZES.MAP.HEIGHT);
          g.endFill();
        }}
        x={0}
        y={0}
      />
      <Text
        text={`Ready! Level ${level}`}
        x={SIZES.MAP.WIDTH / 2}
        y={SIZES.MAP.HEIGHT / 2+32}
        anchor={0.5}
        style={textStyle}
      />
    </Container>
  );
}
