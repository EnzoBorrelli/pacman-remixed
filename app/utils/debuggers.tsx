import GameStatusDebugger from "./debug/gameStatusDebugger";
import GhostDebugger from "./debug/ghostDebugger";
import PacmanDebugger from "./debug/pacmanDebugger";


export default function Debuggers({ debugMode }: { debugMode: boolean }) {
  return (
    <div className={`${debugMode ? "block" : "hidden"}`}>
        <PacmanDebugger/>
      <GhostDebugger/>
      <GameStatusDebugger/>
    </div>
  )
}
