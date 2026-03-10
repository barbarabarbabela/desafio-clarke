export default function CardSkeleton() {
  return (
    <div className="flex flex-col gap-3">
      {[1, 2, 3].map((i) => (
        <div
          key={i}
          className="border border-zinc-800 rounded-2xl p-6 flex flex-col gap-4 animate-pulse"
        >
          <div className="flex items-start justify-between gap-4">
            <div className="flex flex-col gap-2">
              <div className="h-6 w-40 bg-zinc-800 rounded-full" />
              <div className="h-4 w-24 bg-zinc-800 rounded-full" />
            </div>
            <div className="w-20 h-20 rounded-xl bg-zinc-800 shrink-0" />
          </div>

          <div className="flex flex-col gap-2">
            <div className="h-3 w-28 bg-zinc-800 rounded-full" />
            <div className="h-8 w-44 bg-zinc-800 rounded-full" />
            <div className="h-3 w-52 bg-zinc-800 rounded-full" />
          </div>

          <div className="flex items-center gap-4">
            <div className="h-3 w-16 bg-zinc-800 rounded-full" />
            <div className="h-3 w-24 bg-zinc-800 rounded-full" />
          </div>

          <div className="h-14 w-full bg-zinc-800 rounded-xl" />
        </div>
      ))}
    </div>
  );
}
