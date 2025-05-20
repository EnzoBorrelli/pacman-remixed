import type { MetaFunction } from "@remix-run/node";
import Game from "~/components/game";
import Debuggers from "~/utils/Debuggers";

export const meta: MetaFunction = () => {
  return [
    { title: "Pacman Remixed" },
    { name: "description", content: "Welcome to pacWorld" },
  ];
};

export default function Index() {
  return (
    <main className="relative flex items-center justify-center h-screen text-white bg-slate-950">
      <Game/>
      <Debuggers debugMode={true}/>
    </main>
  );
}

