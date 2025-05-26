import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { DIRECTIONS, PACMAN_STATES } from "~/consts/game";
import { RootState } from "~/store";
import { GameActions } from "~/store/gameSlice";
import { PacmanActions } from "~/store/pacmanSlice";

export default function PacmanDebugger() {
  const dispatch = useDispatch();
  const pacman = useSelector((state: RootState) => state.pacman);

  function handleStateChange(state: string) {
    dispatch(PacmanActions.setState(state));
  }
  function handleDirectionChange(dir: string) {
    dispatch(PacmanActions.setDirection(dir));
  }

  function resetPacman() {
    dispatch(GameActions.startGame());
    dispatch(PacmanActions.reset());
  }

  return (
    <article className="absolute flex flex-col gap-4 p-4 max-w-[350px] rounded-lg top-10 left-10 bg-slate-800">
      <h2 className="text-center text-yellow-400 uppercase">Pacman Debugger</h2>
      <h3>States</h3>
      <ul className="grid grid-cols-3 gap-2 text-xs text-center">
        <li
          onClick={() => handleStateChange(PACMAN_STATES.IDLE)}
          className="py-1 bg-slate-600 ring-1 ring-slate-400 hover:bg-slate-300 hover:ring-slate-50 hover:text-black hover:cursor-pointer"
        >
          {PACMAN_STATES.IDLE}
        </li>
        <li
          onClick={() => handleStateChange(PACMAN_STATES.DYING)}
          className="py-1 bg-slate-600 ring-1 ring-slate-400 hover:bg-slate-300 hover:ring-slate-50 hover:text-black hover:cursor-pointer"
        >
          {PACMAN_STATES.DYING}
        </li>
        <li
          onClick={() => handleStateChange(PACMAN_STATES.MOVING)}
          className="py-1 bg-slate-600 ring-1 ring-slate-400 hover:bg-slate-300 hover:ring-slate-50 hover:text-black hover:cursor-pointer"
        >
          {PACMAN_STATES.MOVING}
        </li>
        <li
          onClick={() => handleStateChange(PACMAN_STATES.EATING_POWER_PELLET)}
          className="col-span-3 py-1 bg-slate-600 ring-1 ring-slate-400 hover:bg-slate-300 hover:ring-slate-50 hover:text-black hover:cursor-pointer"
        >
          {PACMAN_STATES.EATING_POWER_PELLET}
        </li>
        <li
          onClick={() => handleStateChange(PACMAN_STATES.EATING_GHOST)}
          className="col-span-3 py-1 bg-slate-600 ring-1 ring-slate-400 hover:bg-slate-300 hover:ring-slate-50 hover:text-black hover:cursor-pointer"
        >
          {PACMAN_STATES.EATING_GHOST}
        </li>
      </ul>
      <h3>Directions</h3>
      <ul className="grid grid-cols-2 gap-2 text-xs text-center">
        <li
          onClick={() => handleDirectionChange(DIRECTIONS.UP)}
          className="py-1 bg-slate-600 ring-1 ring-slate-400 hover:bg-slate-300 hover:ring-slate-50 hover:text-black hover:cursor-pointer"
        >
          {DIRECTIONS.UP}
        </li>
        <li
          onClick={() => handleDirectionChange(DIRECTIONS.LEFT)}
          className="py-1 bg-slate-600 ring-1 ring-slate-400 hover:bg-slate-300 hover:ring-slate-50 hover:text-black hover:cursor-pointer"
        >
          {DIRECTIONS.LEFT}
        </li>
        <li
          onClick={() => handleDirectionChange(DIRECTIONS.DOWN)}
          className="py-1 bg-slate-600 ring-1 ring-slate-400 hover:bg-slate-300 hover:ring-slate-50 hover:text-black hover:cursor-pointer"
        >
          {DIRECTIONS.DOWN}
        </li>
        <li
          onClick={() => handleDirectionChange(DIRECTIONS.RIGHT)}
          className="py-1 bg-slate-600 ring-1 ring-slate-400 hover:bg-slate-300 hover:ring-slate-50 hover:text-black hover:cursor-pointer"
        >
          {DIRECTIONS.RIGHT}
        </li>
      </ul>
      <h3>Current values</h3>
      <ul className="grid grid-cols-2 gap-2 text-xs text-center">
        <li>X: {pacman.x}</li>
        <li>Sta: {pacman.state}</li>
        <li>Y: {pacman.y}</li>
        <li>dir: {pacman.direction}</li>
      </ul>
      <button
        onClick={resetPacman}
        className="py-1 bg-slate-600 ring-1 ring-slate-400 hover:bg-red-600 hover:ring-red-200 hover:text-white hover:cursor-pointer"
      >
        Reset Pacman
      </button>
    </article>
  );
}
