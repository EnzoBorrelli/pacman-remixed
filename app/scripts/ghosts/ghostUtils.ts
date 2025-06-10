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

type iState = {
  ghost: ghostActions;
  dispatch: Dispatch;
};

function chaseState() {}

function scatterState({ ghost, dispatch }: iState) {
  dispatch(ghost.setState(GHOST_STATES.IDLE));
}

function frightenedState({ ghost, dispatch }: iState, powerTime: number) {
  if (powerTime > 400) {
    dispatch(ghost.setState(GHOST_STATES.FRIGHTENED));
  } else if (powerTime < 400 && powerTime > 0) {
    dispatch(ghost.setState(GHOST_STATES.RESTORING));
  }
}

function eatenState({ ghost, dispatch }: iState) {
  dispatch(ghost.setState(GHOST_STATES.DEAD));
}

export function useBehaviorManager() {
  const pacman = useSelector((state: RootState) => state.pacman);
  const dispatch = useDispatch();
  return (behavior: string, ghost: ghostActions) => {
    if (behavior === BEHAVIOR_STATES.CHASE) {
      chaseState();
    }
    if (behavior === BEHAVIOR_STATES.SCATTER) {
      scatterState({ ghost: ghost, dispatch: dispatch });
    }
    if (behavior === BEHAVIOR_STATES.FRIGHTENED) {
      if (pacman.powerPelletTimeout != null)
        frightenedState(
          { ghost: ghost, dispatch: dispatch },
          pacman.powerPelletTimeout
        );
    }
    if (behavior === BEHAVIOR_STATES.EATEN) {
      eatenState({ ghost: ghost, dispatch: dispatch });
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
