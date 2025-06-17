import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BEHAVIOR_STATES, DIRECTIONS } from "~/consts/game";
import { ghostActions } from "~/interfaces/components";
import { Direction, iGhost } from "~/interfaces/slices";
import { RootState } from "~/store";
import {
  BlinkyActions,
  InkyActions,
  PinkyActions,
  ClydeActions,
} from "~/store/ghostSlices";

export default function GhostDebugger() {
  const dispatch = useDispatch();
  const blinky = useSelector((state: RootState) => state.blinky);
  const inky = useSelector((state: RootState) => state.inky);
  const pinky = useSelector((state: RootState) => state.pinky);
  const clyde = useSelector((state: RootState) => state.clyde);

  const [focusedGhost, setFocusedGhost] = useState<iGhost>(blinky);
  const [ghostActions, setGhostActions] =
    useState<ghostActions>(BlinkyActions);
  const [colors,setColors] = useState(["bg-slate-800", "bg-slate-600", "ring-slate-400"]);

  function handleBehaviorChange(state: string) {
    dispatch(ghostActions.setBehavior(state));
  }
  function handleDirectionChange(dir: Direction) {
    dispatch(ghostActions.setDirection(dir));
  }

  function handleGhostChange(ghost: iGhost) {
    setFocusedGhost(ghost);
  }

  useEffect(() => {
    switch (focusedGhost.name) {
      case "blinky":
        setGhostActions(BlinkyActions);
        setColors(["bg-red-900", "bg-red-600", "ring-red-400"]);
        break;
      case "inky":
        setGhostActions(InkyActions);
        setColors(["bg-cyan-900", "bg-cyan-600", "ring-cyan-400"]);
        break;
      case "pinky":
        setGhostActions(PinkyActions);
        setColors(["bg-pink-900", "bg-pink-600", "ring-pink-400"]);
        break;
      case "clyde":
        setGhostActions(ClydeActions);
        setColors(["bg-orange-900", "bg-orange-600", "ring-orange-400"]);
        break;
    }
  } , [focusedGhost]);

  return (
    <article
      className={`absolute flex flex-col gap-4 p-4 rounded-lg top-10 right-20 ${colors[0]}`}
    >
      <h2 className="text-center text-yellow-400 uppercase">Ghosts Debugger</h2>
      <h3>Ghosts</h3>
      <ul className="grid grid-cols-2 gap-2 text-xs text-center">
        <li
          onClick={() => handleGhostChange(blinky)}
          className={`py-1 ${colors[1]} ring-1 ${colors[2]} hover:bg-slate-300 hover:ring-slate-50 hover:text-black hover:cursor-pointer`}
        >
          {blinky.name}
        </li>
        <li
          onClick={() => handleGhostChange(inky)}
          className={`py-1 ${colors[1]} ring-1 ${colors[2]} hover:bg-slate-300 hover:ring-slate-50 hover:text-black hover:cursor-pointer`}
        >
          {inky.name}
        </li>
        <li
          onClick={() => handleGhostChange(pinky)}
          className={`py-1 ${colors[1]} ring-1 ${colors[2]} hover:bg-slate-300 hover:ring-slate-50 hover:text-black hover:cursor-pointer`}
        >
          {pinky.name}
        </li>
        <li
          onClick={() => handleGhostChange(clyde)}
          className={`py-1 ${colors[1]} ring-1 ${colors[2]} hover:bg-slate-300 hover:ring-slate-50 hover:text-black hover:cursor-pointer`}
        >
          {clyde.name}
        </li>
      </ul>
      <h3>States</h3>
      <ul className="grid grid-cols-3 gap-2 text-xs text-center">
        <li
          onClick={() => handleBehaviorChange(BEHAVIOR_STATES.CAGE)}
          className={`py-1 ${colors[1]} ring-1 ${colors[2]} hover:bg-slate-300 hover:ring-slate-50 hover:text-black hover:cursor-pointer`}
        >
          {BEHAVIOR_STATES.CAGE}
        </li>
        <li
          onClick={() => handleBehaviorChange(BEHAVIOR_STATES.CHASE)}
          className={`py-1 ${colors[1]} ring-1 ${colors[2]} hover:bg-slate-300 hover:ring-slate-50 hover:text-black hover:cursor-pointer`}
        >
          {BEHAVIOR_STATES.CHASE}
        </li>
        <li
          onClick={() => handleBehaviorChange(BEHAVIOR_STATES.EATEN)}
          className={`py-1 ${colors[1]} ring-1 ${colors[2]} hover:bg-slate-300 hover:ring-slate-50 hover:text-black hover:cursor-pointer`}
        >
          {BEHAVIOR_STATES.EATEN}
        </li>
        <li
          onClick={() => handleBehaviorChange(BEHAVIOR_STATES.FRIGHTENED)}
          className={`py-1 col-span-3 ${colors[1]} ring-1 ${colors[2]} hover:bg-slate-300 hover:ring-slate-50 hover:text-black hover:cursor-pointer`}
        >
          {BEHAVIOR_STATES.FRIGHTENED}
        </li>
        <li
          onClick={() => handleBehaviorChange(BEHAVIOR_STATES.SCATTER)}
          className={`py-1 col-span-3 ${colors[1]} ring-1 ${colors[2]} hover:bg-slate-300 hover:ring-slate-50 hover:text-black hover:cursor-pointer`}
        >
          {BEHAVIOR_STATES.SCATTER}
        </li>
      </ul>
      <h3>Directions</h3>
      <ul className="grid grid-cols-2 gap-2 text-xs text-center">
        <li
          onClick={() => handleDirectionChange(DIRECTIONS.UP)}
          className={`py-1 ${colors[1]} ring-1 ${colors[2]} hover:bg-slate-300 hover:ring-slate-50 hover:text-black hover:cursor-pointer`}
        >
          {DIRECTIONS.UP}
        </li>
        <li
          onClick={() => handleDirectionChange(DIRECTIONS.LEFT)}
          className={`py-1 ${colors[1]} ring-1 ${colors[2]} hover:bg-slate-300 hover:ring-slate-50 hover:text-black hover:cursor-pointer`}
        >
          {DIRECTIONS.LEFT}
        </li>
        <li
          onClick={() => handleDirectionChange(DIRECTIONS.DOWN)}
          className={`py-1 ${colors[1]} ring-1 ${colors[2]} hover:bg-slate-300 hover:ring-slate-50 hover:text-black hover:cursor-pointer`}
        >
          {DIRECTIONS.DOWN}
        </li>
        <li
          onClick={() => handleDirectionChange(DIRECTIONS.RIGHT)}
          className={`py-1 ${colors[1]} ring-1 ${colors[2]} hover:bg-slate-300 hover:ring-slate-50 hover:text-black hover:cursor-pointer`}
        >
          {DIRECTIONS.RIGHT}
        </li>
      </ul>
      <h3>Current values</h3>
      <ul className="grid grid-cols-2 gap-2 text-xs text-center">
        <li>X: {focusedGhost.x}</li>
        <li>dir: {focusedGhost.direction}</li>
        <li>Y: {focusedGhost.y}</li>
        <li>beh: {focusedGhost.behavior}</li>
      </ul>
    </article>
  );
}
