import type { MetaFunction } from "@remix-run/node";
import Game from "~/components/game";

export const meta: MetaFunction = () => {
  return [
    { title: "Pacman Remixed" },
    { name: "description", content: "Welcome to pacWorld" },
  ];
};

export default function Index() {
  return (
    <main className="flex h-screen items-center justify-center bg-slate-950 text-white">
      <Game/>
    </main>
  );
}

