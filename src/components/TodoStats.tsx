"use client";

interface TodoStatsProps {
  activeCount: number;
  completedCount: number;
  onClearCompleted: () => void;
}

export default function TodoStats({
  activeCount,
  completedCount,
  onClearCompleted,
}: TodoStatsProps) {
  return (
    <div className="flex flex-col items-center justify-between gap-3 sm:flex-row sm:gap-0">
      <div className="flex items-center gap-4 text-xs text-slate-500 dark:text-slate-400 sm:gap-6 sm:text-sm">
        <span>
          <span className="font-semibold text-slate-900 dark:text-slate-50">
            {activeCount}
          </span>{" "}
          active
        </span>
        <span className="h-1 w-1 rounded-full bg-slate-300 dark:bg-slate-700" />
        <span>
          <span className="font-semibold text-slate-900 dark:text-slate-50">
            {completedCount}
          </span>{" "}
          completed
        </span>
      </div>

      {completedCount > 0 && (
        <button
          onClick={onClearCompleted}
          className="rounded-lg px-4 py-2 text-xs font-medium text-slate-500 transition-colors hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-950/50 dark:hover:text-red-400 sm:text-sm"
        >
          Clear completed
        </button>
      )}
    </div>
  );
}
