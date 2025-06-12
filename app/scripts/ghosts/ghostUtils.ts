import { Dispatch } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import {
  BEHAVIOR_STATES,
  GAME_STATUS,
  GHOST_STATES,
  PACMAN_STATES,
  SIZES,
} from "~/consts/game";
import { ghostActions } from "~/interfaces/components";
import { iGhost, iPacman } from "~/interfaces/slices";
import { RootState } from "~/store";
import { GameActions } from "~/store/gameSlice";
import { isCollidingWithObject } from "~/utils/isColliding";
import { moveToTarget } from "./moveToTarget";

type iState = {
  ghost: iGhost;
  actions: ghostActions;
  dispatch: Dispatch;
};

function chaseState() {}

function scatterState(
  { ghost, actions, dispatch }: iState,
  pacmanX: number,
  pacmanY: number
) {
  moveToTarget(ghost, actions, pacmanX, pacmanY, dispatch);
}

function frightenedState(
  { ghost, actions, dispatch }: iState,
  powerTime: number
) {
  if (powerTime > 400) {
    dispatch(actions.setState(GHOST_STATES.FRIGHTENED));
  } else if (powerTime < 400 && powerTime > 0) {
    dispatch(actions.setState(GHOST_STATES.RESTORING));
  }
}

function eatenState({ ghost, actions, dispatch }: iState) {
  dispatch(actions.setState(GHOST_STATES.DEAD));
}

export function useBehaviorManager() {
  const pacman = useSelector((state: RootState) => state.pacman);
  const dispatch = useDispatch();
  return (ghost: iGhost, actions: ghostActions) => {
    if (ghost.behavior === BEHAVIOR_STATES.CHASE) {
      chaseState();
    }
    if (ghost.behavior === BEHAVIOR_STATES.SCATTER) {
      scatterState(
        { ghost: ghost, actions: actions, dispatch: dispatch },
        pacman.x,
        pacman.y
      );
    }
    if (ghost.behavior === BEHAVIOR_STATES.FRIGHTENED) {
      if (pacman.powerPelletTimeout != null)
        frightenedState(
          { ghost: ghost, actions: actions, dispatch: dispatch },
          pacman.powerPelletTimeout
        );
    }
    if (ghost.behavior === BEHAVIOR_STATES.EATEN) {
      eatenState({ ghost: ghost, actions: actions, dispatch: dispatch });
    }
  };
}

export function collisionState(
  pacman: iPacman,
  ghost: iGhost,
  ghostActions: ghostActions,
  dispatch: Dispatch
) {
  const isColliding = isCollidingWithObject(
    pacman.x,
    pacman.y,
    SIZES.TILE,
    ghost.x,
    ghost.y
  );

  if (isColliding && ghost.state !== GHOST_STATES.DEAD) {
    if (pacman.state === PACMAN_STATES.EATING_POWER_PELLET) {
      dispatch(ghostActions.setBehavior(BEHAVIOR_STATES.EATEN));
    } else {
      dispatch(GameActions.setStatus(GAME_STATUS.LOSE_LIFE));
    }
  }
}
