import { GHOST_STATES, PACMAN_STATES } from "~/consts/game";
import { useGameloop } from "../useGameLoop";
import { useDispatch } from "react-redux";
import {
  BlinkyActions,
  ClydeActions,
  InkyActions,
  PinkyActions,
} from "~/store/ghostSlices";
import { Dispatch } from "@reduxjs/toolkit";
import soundPlayer from "~/utils/soundPlayer";
import { useEffect } from "react";

function frightMode(
  ghostName: typeof BlinkyActions,
  powerTime: number,
  dispatch: Dispatch
) {
  if (powerTime > 400) {
    dispatch(ghostName.setState(GHOST_STATES.FRIGHTENED));
  } else if (powerTime < 400 && powerTime > 0) {
    dispatch(ghostName.setState(GHOST_STATES.RESTORING));
  }
}

export function fraidManager({
  powerPelletTimeout,
  state,
}: {
  powerPelletTimeout: number;
  state: string;
}) {
  const dispatch = useDispatch();

  useEffect(() => {
    if (state === PACMAN_STATES.EATING_POWER_PELLET) {
      soundPlayer.PlaySound({
        folder: "gameplay",
        audio: "fright",
        loop: true,
      });
    } else {
      soundPlayer.StopAllSounds();
    }
  }, [state]);

  useGameloop(() => {
    if (state === PACMAN_STATES.EATING_POWER_PELLET) {
      frightMode(BlinkyActions, powerPelletTimeout, dispatch);
      frightMode(InkyActions, powerPelletTimeout, dispatch);
      frightMode(PinkyActions, powerPelletTimeout, dispatch);
      frightMode(ClydeActions, powerPelletTimeout, dispatch);
    } else {
      dispatch(BlinkyActions.reset());
      dispatch(InkyActions.reset());
      dispatch(PinkyActions.reset());
      dispatch(ClydeActions.reset());
    }
  });
}
