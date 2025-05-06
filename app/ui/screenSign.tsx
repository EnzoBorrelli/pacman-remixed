export default function ScreenSign({level,isLose}: {level: number,isLose?: boolean}) {
  const isGlitched = level === 256;
  const text = isGlitched?"err..!": level;
    return (
        <div className={`relative w-[480px] ${isGlitched?"animate-pulse":"bg-slate-500"} rounded-2xl h-[7.5rem]`}>
          <div className={`absolute w-[95%] top-3 left-3 h-[6rem] ${isGlitched?"":"bg-slate-400"} rounded-lg ring-4 ring-slate-950`}></div>
          <h2 className={`absolute text-2xl font-bold tracking-widest text-center ${isGlitched?"text-sky-500":"text-sky-700"} text-stroke-1 top-9 left-9`}>
            {isLose?`LEVEL ${text} FAILED! TRY AGAIN`:`LEVEL ${text} COMPLETED!`}
          </h2>
          <h2 className={`absolute text-2xl font-bold tracking-widest text-center ${isGlitched?"text-orange-400":"text-sky-200"} text-stroke-2 top-7 left-6`}>
            {isLose?`LEVEL ${text} FAILED! TRY AGAIN`:`LEVEL ${text} COMPLETED!`}
          </h2>
          <h2 className={`absolute text-2xl font-bold tracking-widest text-center ${isGlitched?"text-yellow-100":"text-lime-400"} text-stroke-3 top-8 left-8`}>
            {isLose?`LEVEL ${text} FAILED! TRY AGAIN`:`LEVEL ${text} COMPLETED!`}
          </h2>
        </div>
    );
  }