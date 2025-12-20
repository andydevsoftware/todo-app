"use client";

type View = "all" | "pending" | "completed";

interface HeaderProps {
  currentView: View;
  pendingCount: number;
  completedCount: number;
  theme: "light" | "dark";
  onToggleTheme: () => void;
}

export default function Header({
  currentView,
  pendingCount,
  completedCount,
  theme,
  onToggleTheme,
}: HeaderProps) {
  const getTitle = () => {
    switch (currentView) {
      case "pending":
        return "Pendientes";
      case "completed":
        return "Completadas";
      default:
        return "Mis Tareas";
    }
  };

  const getCount = () => {
    switch (currentView) {
      case "pending":
        return pendingCount;
      case "completed":
        return completedCount;
      default:
        return pendingCount + completedCount;
    }
  };

  const getEmoji = () => {
    switch (currentView) {
      case "pending":
        return "⏳";
      case "completed":
        return "✅";
      default:
        return "📋";
    }
  };

  return (
    <header className="border-b border-slate-200 bg-white/95 backdrop-blur-xl px-4 py-5 dark:border-slate-800 dark:bg-slate-900/95">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <h1 className="animate-fadeIn text-2xl font-bold text-slate-900 transition-all duration-300 dark:text-slate-50">
            {getTitle()}
          </h1>
          <p className="animate-slideRight text-sm text-slate-500 transition-all duration-300 dark:text-slate-400">
            <span className="font-semibold text-blue-600 dark:text-blue-400">
              {getCount()}
            </span>{" "}
            {getCount() === 1 ? "tarea" : "tareas"}
          </p>
        </div>

        <div className="flex items-center gap-3">
          {/* Theme Toggle Button */}
          <button
            onClick={onToggleTheme}
            className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-slate-600 transition-all duration-300 hover:scale-110 hover:bg-slate-200 active:scale-95 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700"
            title={theme === "light" ? "Modo oscuro" : "Modo claro"}
          >
            {theme === "light" ? (
              <svg
                className="h-5 w-5"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
              </svg>
            ) : (
              <svg
                className="h-5 w-5"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            )}
          </button>

          {/* Emoji Icon */}
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-100 to-blue-200 shadow-lg shadow-blue-500/20 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-blue-500/30 dark:from-blue-900/40 dark:to-blue-800/40 dark:shadow-blue-400/20">
            <span className="animate-bounce text-2xl">{getEmoji()}</span>
          </div>
        </div>
      </div>
    </header>
  );
}
