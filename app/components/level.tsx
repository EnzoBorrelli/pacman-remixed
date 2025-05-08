import { Container, Sprite } from "@pixi/react";
import map from "/assets/spritesheets/map.png";
import { iPellet } from "~/interfaces/components";
import { useEffect, useState } from "react";
import { PELLETS_MAP } from "~/consts/map";
import Pellet from "./pellet";
import { CHAR_SPAWNS, SIZES } from "~/consts/game";
import Fruit from "./fruit";

export default function Level({level}: { level: number }) {
  const [pellets, setPellets] = useState<iPellet[]>([]);

  const fruitType = level > 7 ? 7 : level;
  

  useEffect(() => {
    const pelletsArray = [];
    for (let row = 0; row < PELLETS_MAP.length; row++) {
      for (let col = 0; col < PELLETS_MAP[row].length; col++) {
        if (PELLETS_MAP[row][col] !== 0) {
          const x = col * SIZES.TILE;
          const y = row * SIZES.TILE;
          pelletsArray.push({ x, y, type: PELLETS_MAP[row][col] });
        }
      }
    }
    setPellets(pelletsArray);
  }, []);
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
