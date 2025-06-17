import {
  BEHAVIOR_STATES,
  COMBO_SCORES,
  GHOST_STATES,
  PACMAN_STATES,
} from "~/consts/game";
import { useGameloop } from "../useGameLoop";
import {
  BlinkyActions,
  ClydeActions,
  InkyActions,
  PinkyActions,
} from "~/store/ghostSlices";
import soundPlayer from "~/utils/soundPlayer";
import { useEffect, useState } from "react";
import { collisionState, useBehaviorManager } from "./ghostUtils";
import { useDispatch } from "react-redux";
import { iGhost, iPacman } from "~/interfaces/slices";
import { GameActions } from "~/store/gameSlice";
import { moveToTarget } from "./moveToTarget";

export const ghostsActions = [
  BlinkyActions,
  InkyActions,
  PinkyActions,
  ClydeActions,
];

export function fraidManager({
  state,
  ghosts,
}: {
  state: string;
  ghosts: iGhost[];
}) {
  const behaviorManager = useBehaviorManager();
  const dispatch = useDispatch();
  const [combo, setCombo] = useState(0);

  useEffect(() => {
    ghosts.forEach((ghost) => {
      if (ghost.state === GHOST_STATES.DEAD) {
        soundPlayer.PlaySound({
          folder: "gameplay",
          audio: "eat_ghost",
          useCache: true,
        });
        dispatch(GameActions.increaseScore(COMBO_SCORES[combo]));
        setCombo(combo + 1);
      }
    });
  }, [
    ghosts[0].state,
    ghosts[1].state,
    ghosts[2].state,
    ghosts[3].state,
    dispatch,
  ]);

  useEffect(() => {
    if (combo === 3) dispatch(GameActions.addLife());
  }, [combo, dispatch]);

  useEffect(() => {
    if (state === PACMAN_STATES.EATING_POWER_PELLET) {
      setCombo(0);
      soundPlayer.PlaySound({
        folder: "gameplay",
        audio: "fright",
        loop: true,
      });
    } else {
      soundPlayer.StopSound("gameplay", "fright");
      ghostsActions.forEach((actions, index) => {
        if (ghosts[index].behavior === GHOST_STATES.FRIGHTENED)
          dispatch(actions.setBehavior(BEHAVIOR_STATES.SCATTER));
      });
    }
  }, [state]);

  useGameloop(() => {
    ghostsActions.forEach((actions, index) => {
      moveToTarget(ghosts[index], actions, dispatch);
      if (ghosts[index].behavior != null)
        behaviorManager(ghosts[index], actions);
    });
  });
}

export function fraidCollisions(ghosts: iGhost[], pacman: iPacman) {
  const dispatch = useDispatch();

  useGameloop(() => {
    ghosts.forEach((ghost, index) =>
      collisionState(pacman, ghost, ghostsActions[index], dispatch)
    );
  });
}
