import type { MetaFunction } from "@remix-run/node";
import Game from "~/components/game";
import UIBottom from "~/ui/level_ui/ui_bottom";
import UITop from "~/ui/level_ui/ui_top";
import Debuggers from "~/utils/debuggers";

export const meta: MetaFunction = () => {
  return [
    { title: "Pacman Remixed" },
    { name: "description", content: "Welcome to pacWorld" },
  ];
};

export default function Index() {
  return (
    <main className="relative flex flex-col items-center justify-center h-screen text-white bg-slate-950">
      <UITop/>
      <Game/>
      <UIBottom/>
      <Debuggers debugMode={true}/>
    </main>
  );
}

