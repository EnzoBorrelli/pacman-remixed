import type { MetaFunction } from "@remix-run/node";
import Game from "~/components/game";
import GhostDebugger from "~/utils/debug/ghostDebugger";
import PacmanDebugger from "~/utils/debug/pacmanDebugger";

export const meta: MetaFunction = () => {
  return [
    { title: "Pacman Remixed" },
    { name: "description", content: "Welcome to pacWorld" },
  ];
};

export default function Index() {
  return (
    <main className="relative flex h-screen items-center justify-center bg-slate-950 text-white">
      <Game/>
      <PacmanDebugger/>
      <GhostDebugger/>
    </main>
  );
}

