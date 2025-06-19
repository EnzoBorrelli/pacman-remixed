import {
  BEHAVIOR_STATES,
  COMBO_SCORES,
  GHOST_STATES,
  PACMAN_STATES,
} from "~/consts/game";
import {
  BlinkyActions,
  ClydeActions,
  InkyActions,
  PinkyActions,
} from "~/store/ghostSlices";
import soundPlayer from "~/utils/soundPlayer";
import { useEffect, useState } from "react";
import { collisionState, useBehaviorManager } from "./ghostUtils";
import { iGhost, iPacman } from "~/interfaces/slices";
import { GameActions } from "~/store/gameSlice";
import { moveToTarget } from "./moveToTarget";
import { Dispatch } from "@reduxjs/toolkit";

export const ghostsActions = [
  BlinkyActions,
  InkyActions,
  PinkyActions,
  ClydeActions,
];

function Attach({
  ghosts,
  pacman,
  dispatch,
  gameStatus,
}: {
  ghosts: iGhost[];
  pacman: iPacman;
  dispatch: Dispatch;
  gameStatus: string;
}) {
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
    if (pacman.state === PACMAN_STATES.EATING_POWER_PELLET) {
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
  }, [pacman.state]);

  useEffect(() => {
    if (gameStatus !== "CINEMATIC") {
      ghosts.forEach((ghost, index) => {
        if (ghost.behavior === BEHAVIOR_STATES.IDLE) {
          dispatch(ghostsActions[index].setBehavior(BEHAVIOR_STATES.CAGE));
        }
      });
    }
  }, [
    gameStatus,
    ghosts[0].state,
    ghosts[1].state,
    ghosts[2].state,
    ghosts[3].state,
    dispatch,
  ]);
}

function Update({
  ghosts,
  pacman,
  dispatch,
}: {
  ghosts: iGhost[];
  pacman: iPacman;
  dispatch: Dispatch;
}) {
  const behaviorManager = useBehaviorManager();

  ghostsActions.forEach((actions, index) => {
    collisionState(pacman, ghosts[index], actions, dispatch);
    moveToTarget(ghosts[index], actions, dispatch);
    if (ghosts[index].behavior != null)
      behaviorManager(ghosts[index], actions, pacman, dispatch);
  });
}

export default { Attach, Update };
