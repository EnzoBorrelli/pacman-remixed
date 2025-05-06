export default function GlitchedText({text}: {text: string}) {
    return (
        <div className="relative group">
          <h2 className="absolute text-xl font-bold tracking-widest text-center text-red-500 top-9 -left-[7.5rem] group-hover:animate-pulse">
            {text}
          </h2>
          <h2 className="absolute text-xl font-bold tracking-widest text-center text-blue-500 top-7 -left-[8.5rem] group-hover:animate-pulse">
            {text}
          </h2>
          <h2 className="absolute text-xl font-bold tracking-widest text-center text-white top-8 -left-[8rem] group-hover:animate-pulse">
            {text}
          </h2>
        </div>
    );
  }