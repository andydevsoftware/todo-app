"use client";

type View = "all" | "pending" | "completed";

interface BottomNavProps {
  currentView: View;
  onViewChange: (view: View) => void;
}

export default function BottomNav({
  currentView,
  onViewChange,
}: BottomNavProps) {
  const navItems = [
    { id: "all" as View, label: "Todas", icon: "📂" },
    { id: "pending" as View, label: "Pendientes", icon: "⏳" },
    { id: "completed" as View, label: "Completadas", icon: "✅" },
  ];

  return (
    <nav className="border-t border-slate-200 bg-white/95 backdrop-blur-xl dark:border-slate-800 dark:bg-slate-900/95">
      <div className="flex">
        {navItems.map((item) => {
          const isActive = currentView === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onViewChange(item.id)}
              className={`relative flex flex-1 flex-col items-center justify-center py-3 transition-all duration-300 ${
                isActive
                  ? "text-blue-600 dark:text-blue-400"
                  : "text-slate-400 hover:text-slate-600 dark:text-slate-500 dark:hover:text-slate-300"
              }`}
            >
              {/* Active Indicator */}
              {isActive && (
                <div className="absolute top-0 left-1/2 h-1 w-12 -translate-x-1/2 animate-slideDown rounded-b-full bg-blue-600 dark:bg-blue-400" />
              )}

              {/* Icon with animation */}
              <span
                className={`mb-1 text-xl transition-all duration-300 ${
                  isActive ? "scale-110 animate-bounce" : "scale-100"
                }`}
              >
                {item.icon}
              </span>

              {/* Label */}
              <span
                className={`text-xs font-medium transition-all duration-300 ${
                  isActive ? "font-semibold" : "font-normal"
                }`}
              >
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
