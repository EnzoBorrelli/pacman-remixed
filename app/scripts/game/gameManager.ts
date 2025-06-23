import { gameFuntion } from "~/interfaces/components";
import fraidManager, { ghostsActions } from "../ghosts/fraidManager";
import { PreloadLevelSounds, SwitchGameStatus } from "../level/levelUtils";
import { updateFruits } from "../objects/fruitUtils";
import { updatePacmanPosition } from "../pacman/updatePacmanPosition";
import { useGameloop } from "../useGameLoop";
import { Direction } from "~/interfaces/slices";
import { useEffect, useRef } from "react";
import { BEHAVIOR_STATES, PACMAN_STATES } from "~/consts/game";
import { NavigateFunction } from "@remix-run/react";

export function useSetup({ pacman, ghosts, game, dispatch }: gameFuntion,navigate:NavigateFunction) {
  PreloadLevelSounds();
  SwitchGameStatus(game.status,navigate);
  fraidManager.Attach({
    pacman: pacman,
    ghosts: ghosts,
    dispatch: dispatch,
    gameStatus: game.status,
  });
}

export function useLoop(
  { pacman, ghosts, game, dispatch }: gameFuntion,
  inputDirection: Direction | undefined
) {
  useGameloop(() => {
    updateFruits({ game: game, pacman: pacman, dispatch: dispatch });
    fraidManager.Update({ pacman: pacman, ghosts: ghosts, dispatch: dispatch });
    updatePacmanPosition({
      gameStatus: game.status,
      pacman: pacman,
      dispatch: dispatch,
      inputDirection: inputDirection,
    });
  });
}

export function PhaseSwitch({ pacman, game, dispatch }: gameFuntion) {
  const phase = useRef(0);
  const startTime = useRef(Date.now());

  const schedule = [
    { phase: BEHAVIOR_STATES.SCATTER, duration: 7000 },
    { phase: BEHAVIOR_STATES.CHASE, duration: 20000 },
    { phase: BEHAVIOR_STATES.SCATTER, duration: 7000 },
    { phase: BEHAVIOR_STATES.CHASE, duration: 20000 },
    { phase: BEHAVIOR_STATES.SCATTER, duration: 5000 },
    { phase: BEHAVIOR_STATES.CHASE, duration: Infinity },
  ];

  useEffect(() => {
    if (game.status !== "PLAYING") return;

    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime.current;
      let total = 0;

      for (let i = 0; i < schedule.length; i++) {
        total += schedule[i].duration;
        if (elapsed < total) {
          if (
            phase.current !== i &&
            pacman.state !== PACMAN_STATES.EATING_POWER_PELLET
          ) {
            phase.current = i;
            ghostsActions.forEach((action) => {
              dispatch(action.setBehavior(schedule[i].phase));
            });
          }
          return;
        }
      }
    }, 500);

    return () => clearInterval(interval);
  }, [game.status, pacman.state, dispatch]);

  useEffect(() => {
    if (game.status === "PLAYING") {
      startTime.current = Date.now();
      phase.current = 0;
    }
  }, [game.status]);
}
