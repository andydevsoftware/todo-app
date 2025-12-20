"use client";

import { useState } from "react";

interface TodoInputProps {
  onAdd: (text: string, priority: "low" | "medium" | "high") => void;
}

export default function TodoInput({ onAdd }: TodoInputProps) {
  const [value, setValue] = useState("");
  const [priority, setPriority] = useState<"low" | "medium" | "high">("medium");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (value.trim()) {
      onAdd(value.trim(), priority);
      setValue("");
      setPriority("medium");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">
          Descripción
        </label>
        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="¿Qué necesitas hacer?"
          autoFocus
          className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-slate-900 placeholder-slate-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-50 dark:placeholder-slate-500"
        />
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">
          Prioridad
        </label>
        <div className="flex gap-2">
          {[
            { value: "low", label: "Baja", color: "bg-green-500" },
            { value: "medium", label: "Media", color: "bg-yellow-500" },
            { value: "high", label: "Alta", color: "bg-red-500" },
          ].map((p) => (
            <button
              key={p.value}
              type="button"
              onClick={() => setPriority(p.value as "low" | "medium" | "high")}
              className={`flex-1 rounded-lg border py-2 text-sm font-medium transition-all ${
                priority === p.value
                  ? "border-blue-500 bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-300"
                  : "border-slate-300 text-slate-700 hover:border-slate-400 dark:border-slate-700 dark:text-slate-300 dark:hover:border-slate-600"
              }`}
            >
              <span
                className={`mr-2 inline-block h-2 w-2 rounded-full ${p.color}`}
              />
              {p.label}
            </button>
          ))}
        </div>
      </div>

      <button
        type="submit"
        disabled={!value.trim()}
        className="w-full rounded-lg bg-blue-600 py-3 text-sm font-semibold text-white transition-all hover:bg-blue-700 active:scale-95 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-blue-500 dark:hover:bg-blue-600"
      >
        Agregar Tarea
      </button>
    </form>
  );
}
