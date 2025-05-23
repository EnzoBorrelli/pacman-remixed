import { Container, Graphics, Text } from "@pixi/react";
import { TextStyle } from "pixi.js";
import { SIZES } from "~/consts/game";
import { iEatScoreDisplay } from "~/interfaces/components";

export default function EatScoreDisplay({x,y,isVisible,score}: iEatScoreDisplay) {
  const textStyle = new TextStyle({
    fontFamily: "PacFont",
    fontSize: 8,
    fill: "cyan",
    align: "center",
  });

  return (
    <Container x={x} y={y-8} width={SIZES.CHARACTER} height={SIZES.CHARACTER} alpha={isVisible ? 1 : 0}>
      <Graphics
      draw={g => {
          g.clear()
          g.beginFill(0x000000)
          g.drawRect(0, 0, SIZES.CHARACTER, SIZES.CHARACTER)
          g.endFill()
        }}
    />
        <Text text={`${score}`} anchor={{x:0,y:-1.4}} style={textStyle} />
    </Container>
  );
}
