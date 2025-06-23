import type { MetaFunction } from "@remix-run/node";
import { useLocation, useNavigate } from "@remix-run/react";
import { useEffect } from "react";
import Logo from "~/ui/menu_ui/logo";
import soundPlayer from "~/utils/soundPlayer";

export const meta: MetaFunction = () => {
  return [
    { title: "Pacman Remixed" },
    { name: "description", content: "Welcome to pacWorld" },
  ];
};

export default function Index() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === "/") {
      soundPlayer.StopAllSounds();
    }
  }, [location.pathname]);

  const hoverSound = () => {
    soundPlayer.PlaySound({ folder: "ui", audio: "hover" });
  };
  return (
    <main className="relative flex flex-col items-center pt-20 h-screen text-white bg-slate-950">
      <Logo />
      <ul className="flex flex-col items-center justify-center gap-4 mt-10">
        <li
          onMouseEnter={hoverSound}
          className="group flex items-center justify-center gap-2 text-lg"
        >
          <span className="opacity-0 group-hover:opacity-100">&gt;</span>
          <button
            className="group-hover:text-yellow-500 group-hover:text-stroke-3"
            onClick={() => navigate("/play")}
          >
            PLAY
          </button>
        </li>
        <li
          onMouseEnter={hoverSound}
          className="group flex items-center justify-center gap-2 text-lg"
        >
          <span className="opacity-0 group-hover:opacity-100">&gt;</span>
          <button
            className="group-hover:text-yellow-500 group-hover:text-stroke-3"
            onClick={() => navigate("/characters")}
          >
            CHARACTERS
          </button>
        </li>
        <li
          onMouseEnter={hoverSound}
          className="group flex items-center justify-center gap-2 text-lg"
        >
          <span className="opacity-0 group-hover:opacity-100">&gt;</span>
          <button
            className="group-hover:text-yellow-500 group-hover:text-stroke-3"
            onClick={() => navigate("/credits")}
          >
            CREDITS
          </button>
        </li>
      </ul>
      <footer className="flex flex-col items-center gap-4 mt-20 font-bold tracking-wider text-center text-md text-slate-300">
        <a
          onMouseEnter={hoverSound}
          className="text-red-600 hover:text-yellow-600"
          href="https://www.namco.co.jp/"
          target="_blank"
          rel="noreferrer"
        >
          NAMCOT
        </a>
        <p>
          © 1980 1990 NAMCO LTD | ALL RIGHTS RESERVED | CODED BY{" "}
          <a
            onMouseEnter={hoverSound}
            className="text-teal-600 hover:text-yellow-600"
            href="https://endykaishi-web.vercel.app/
            "
            target="_blank"
            rel="noreferrer"
          >
            ENDY KAISHI®
          </a>
        </p>
      </footer>
    </main>
  );
}
