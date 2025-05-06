import { GhostState, GhostType } from "~/components/enums/ghosts";
import {
  CharacterSize,
  Direction,
  objectSize,
} from "~/components/enums/global";
import { PacState } from "~/components/enums/pacman";
import Dot from "~/components/sprites/dot";
import Ghost from "~/components/sprites/ghost";
import Pacman from "~/components/sprites/pacman";

export default function CharactersDisplay() {
  return (
    <div className="flex flex-row items-center justify-center gap-4">
      <Pacman
        size={CharacterSize.small}
        direction={Direction.right}
        animation={PacState.idle}
      />
      <div className="pt-2 flex flex-row gap-2">
      <Dot size={objectSize.small} isPower={false} />
      <Dot size={objectSize.small} isPower={false} />
      <Dot size={objectSize.small} isPower={false} />
      <Dot size={objectSize.small} isPower={false} />
      </div>
      <Ghost
        size={CharacterSize.small}
        type={GhostType.inky}
        direction={Direction.right}
        state={GhostState.idle}
      />
      <Ghost
        size={CharacterSize.small}
        type={GhostType.blinky}
        direction={Direction.right}
        state={GhostState.idle}
      />
      <Ghost
        size={CharacterSize.small}
        type={GhostType.pinky}
        direction={Direction.right}
        state={GhostState.idle}
      />
      <Ghost
        size={CharacterSize.small}
        type={GhostType.clyde}
        direction={Direction.right}
        state={GhostState.idle}
      />
    </div>
  );
}
