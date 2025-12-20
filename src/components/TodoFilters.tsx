"use client";

interface TodoFiltersProps {
  currentFilter: "all" | "active" | "completed";
  onFilterChange: (filter: "all" | "active" | "completed") => void;
}

export default function TodoFilters({
  currentFilter,
  onFilterChange,
}: TodoFiltersProps) {
  const filters: Array<"all" | "active" | "completed"> = [
    "all",
    "active",
    "completed",
  ];

  return (
    <div className="flex border-b border-slate-100 dark:border-slate-800">
      {filters.map((filter) => (
        <button
          key={filter}
          onClick={() => onFilterChange(filter)}
          className={`flex-1 px-4 py-3 text-sm font-medium transition-colors sm:text-base ${
            currentFilter === filter
              ? "border-b-2 border-slate-900 bg-white text-slate-900 dark:border-slate-50 dark:bg-slate-900 dark:text-slate-50"
              : "text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-300"
          }`}
        >
          {filter.charAt(0).toUpperCase() + filter.slice(1)}
        </button>
      ))}
    </div>
  );
}
