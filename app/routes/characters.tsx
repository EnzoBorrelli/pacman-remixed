import { Container, Stage, Text } from "@pixi/react";
import { TextStyle } from "pixi.js";
import Ghost from "~/components/ghost";
import Pacman from "~/components/pacman";
import Pellet from "~/components/pellet";
import { DIRECTIONS, GHOST_STATES, PACMAN_STATES, SIZES } from "~/consts/game";
import UITop from "~/ui/level_ui/ui_top";

const ghosts = [
  {
    x: 50,
    y: 100,
    name: "blinky",
    nameX: 320,
    chara: "SHADOW",
    charaX: 150,
    color: "#F3030E",
  },
  {
    x: 50,
    y: 140,
    name: "pinky",
    nameX: 310,
    chara: "SPEEDY",
    charaX: 150,
    color: "#F393FE",
  },
  {
    x: 50,
    y: 180,
    name: "inky",
    nameX: 300,
    chara: "BASHFUL",
    charaX: 157,
    color: "93D3FE",
  },
  {
    x: 50,
    y: 220,
    name: "clyde",
    nameX: 310,
    chara: "POKEY",
    charaX: 140,
    color: "#F3AC56",
  },
];

const baseTextStyle = (color: string, size = 16) =>
  new TextStyle({
    fontFamily: "PacFont",
    fontSize: size,
    fill: color,
    align: "center",
  });

export default function Characters() {
  return (
    <main className="relative flex flex-col items-center justify-center h-screen text-white bg-slate-950">
      <UITop />
      <Stage
        width={SIZES.MAP.WIDTH}
        height={SIZES.MAP.HEIGHT}
        options={{
          backgroundColor: 0x000000,
          antialias: false,
          autoDensity: true,
        }}
      >
        <Text
          text="CHARACTER / NICKNAME"
          x={SIZES.MAP.WIDTH / 2}
          y={60}
          anchor={0.5}
          style={baseTextStyle("white")}
        />
        {ghosts.map((ghost) => (
          <Container>
            <Ghost
              key={ghost.name}
              x={ghost.x}
              y={ghost.y}
              state={GHOST_STATES.IDLE}
              direction={DIRECTIONS.RIGHT}
              name={ghost.name}
            />
            <Text
              text={`-${ghost.chara}`}
              x={ghost.charaX}
              y={ghost.y + 10}
              anchor={0.5}
              style={baseTextStyle(ghost.color)}
            />
            <Text
              text={`"${ghost.name.toUpperCase()}"`}
              x={ghost.nameX}
              y={ghost.y + 10}
              anchor={0.5}
              style={baseTextStyle(ghost.color)}
            />
          </Container>
        ))}
        <Container>
          <Pacman
          x={50}
          y={260}
          state={PACMAN_STATES.MOVING}
          direction={DIRECTIONS.RIGHT}
          isPlaying={false}
        />
        <Text
              text="-PACMAN"
              x={146}
              y={270}
              anchor={0.5}
              style={baseTextStyle("#F3E03C")}
            />
        <Text
              text={`"CHOMP"`}
              x={310}
              y={270}
              anchor={0.5}
              style={baseTextStyle("#F3E03C")}
            />
        </Container>
        <Container>
          <Pellet
            x={SIZES.MAP.WIDTH / 3 + 20}
            y={SIZES.MAP.HEIGHT - 150}
            type={1}
          />
          <Text
            text="10 PTS"
            x={SIZES.MAP.WIDTH / 2 + 10}
            y={SIZES.MAP.HEIGHT - 141}
            anchor={0.5}
            style={baseTextStyle("#E6CCFF", 12)}
          />
        </Container>
        <Container>
          <Pellet
            x={SIZES.MAP.WIDTH / 3 + 20}
            y={SIZES.MAP.HEIGHT - 130}
            type={2}
          />
          <Text
            text="50 PTS"
            x={SIZES.MAP.WIDTH / 2 + 10}
            y={SIZES.MAP.HEIGHT - 121}
            anchor={0.5}
            style={baseTextStyle("#E6CCFF", 12)}
          />
        </Container>
        <Text
          text="© 1980 1990 NAMCO LTD"
          x={SIZES.MAP.WIDTH / 2}
          y={SIZES.MAP.HEIGHT - 60}
          anchor={0.5}
          style={baseTextStyle("#E6CCFF")}
        />
      </Stage>
    </main>
  );
}
