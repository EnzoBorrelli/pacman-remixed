import { Container, Sprite } from "@pixi/react";
import map from "/assets/spritesheets/map.png";
import { iPellet } from "~/interfaces/components";
import Pellet from "./pellet";
import { CHAR_SPAWNS } from "~/consts/game";
import Fruit from "./fruit";

export default function Level({level,pellets}: { level: number,pellets: iPellet[] }) {
  
  const fruitType = level > 7 ? 7 : level;
  
  
 
  return (
    <Container x={0} y={0}>
      <Sprite image={map} />
      {pellets.map((pellet, index) => (
        <Pellet key={index} x={pellet.x} y={pellet.y} type={pellet.type} />
      ))}
      <Fruit x={CHAR_SPAWNS.FRUIT.x} y={CHAR_SPAWNS.FRUIT.y} type={fruitType} />
    </Container>
  );
}
