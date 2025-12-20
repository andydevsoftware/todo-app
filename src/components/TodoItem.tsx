"use client";

import { Todo } from "./TodoList";
import { useState } from "react";

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, newText: string, newDueDate?: string) => void;
}

export default function TodoItem({
  todo,
  onToggle,
  onDelete,
  onEdit,
}: TodoItemProps) {
  const [isDeleting, setIsDeleting] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);
  const [editDueDate, setEditDueDate] = useState(todo.dueDate || "");

  const priorityColors = {
    low: "bg-green-500",
    medium: "bg-yellow-500",
    high: "bg-red-500",
  };

  const priorityGlow = {
    low: "shadow-green-500/20",
    medium: "shadow-yellow-500/20",
    high: "shadow-red-500/20",
  };

  const handleDelete = () => {
    setIsDeleting(true);
    setTimeout(() => {
      onDelete(todo.id);
    }, 300);
  };

  const handleEdit = () => {
    if (editText.trim()) {
      onEdit(todo.id, editText.trim(), editDueDate || undefined);
      setIsEditing(false);
    }
  };

  const handleCancelEdit = () => {
    setEditText(todo.text);
    setEditDueDate(todo.dueDate || "");
    setIsEditing(false);
  };

  // Calcular si la fecha está vencida
  const isOverdue =
    todo.dueDate &&
    !todo.completed &&
    new Date(todo.dueDate) < new Date(new Date().setHours(0, 0, 0, 0));
  const isDueToday =
    todo.dueDate &&
    new Date(todo.dueDate).toDateString() === new Date().toDateString();

  const formatDueDate = (dateStr: string) => {
    const date = new Date(dateStr + "T00:00:00");
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    if (date.toDateString() === today.toDateString()) return "Hoy";
    if (date.toDateString() === tomorrow.toDateString()) return "Mañana";

    return date.toLocaleDateString("es-ES", { day: "numeric", month: "short" });
  };

  return (
    <div
      className={`group relative animate-slideIn rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition-all duration-300 hover:shadow-lg hover:z-10 ${
        priorityGlow[todo.priority]
      } dark:border-slate-800 dark:bg-slate-900 ${
        isDeleting ? "animate-slideOut" : ""
      }`}
    >
      {isEditing ? (
        // Modo Edición
        <div className="space-y-3">
          <input
            type="text"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            className="w-full rounded-lg border-2 border-blue-500 bg-white px-3 py-2 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:bg-slate-800 dark:text-slate-50"
            autoFocus
          />
          <div>
            <label className="mb-1 block text-xs font-medium text-slate-600 dark:text-slate-400">
              Fecha de vencimiento
            </label>
            <input
              type="date"
              value={editDueDate}
              onChange={(e) => setEditDueDate(e.target.value)}
              className="w-full rounded-lg border-2 border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-50"
            />
          </div>
          <div className="flex gap-2">
            <button
              onClick={handleEdit}
              className="flex-1 rounded-lg bg-blue-600 py-2 text-sm font-medium text-white transition-all hover:bg-blue-700 active:scale-95"
            >
              💾 Guardar
            </button>
            <button
              onClick={handleCancelEdit}
              className="flex-1 rounded-lg bg-slate-200 py-2 text-sm font-medium text-slate-700 transition-all hover:bg-slate-300 active:scale-95 dark:bg-slate-700 dark:text-slate-300 dark:hover:bg-slate-600"
            >
              Cancelar
            </button>
          </div>
        </div>
      ) : (
        // Modo Normal
        <div className="flex items-start gap-3">
          {/* Checkbox */}
          <button
            onClick={() => onToggle(todo.id)}
            className="relative mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center overflow-hidden rounded-lg border-2 transition-all duration-300"
            style={{
              borderColor: todo.completed ? "#3b82f6" : "#cbd5e1",
              backgroundColor: todo.completed ? "#3b82f6" : "transparent",
            }}
          >
            <div
              className={`absolute inset-0 bg-blue-600 transition-transform duration-300 ${
                todo.completed ? "scale-100" : "scale-0"
              }`}
            />
            <svg
              className={`relative z-10 h-4 w-4 text-white transition-all duration-300 ${
                todo.completed ? "scale-100 opacity-100" : "scale-0 opacity-0"
              }`}
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2.5"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M5 13l4 4L19 7" />
            </svg>
          </button>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <p
              className={`text-sm leading-relaxed transition-all duration-300 ${
                todo.completed
                  ? "translate-x-1 text-slate-400 line-through dark:text-slate-600"
                  : "translate-x-0 text-slate-900 dark:text-slate-50"
              }`}
            >
              {todo.text}
            </p>

            {/* Priority and Due Date */}
            <div className="mt-2 flex flex-wrap items-center gap-2">
              <div className="flex items-center gap-2">
                <span
                  className={`h-2 w-2 animate-pulse rounded-full ${
                    priorityColors[todo.priority]
                  }`}
                />
                <span className="text-xs text-slate-500 dark:text-slate-400">
                  {todo.priority === "low" && "Baja"}
                  {todo.priority === "medium" && "Media"}
                  {todo.priority === "high" && "Alta"}
                </span>
              </div>

              {todo.dueDate && (
                <span
                  className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                    isOverdue
                      ? "bg-red-100 text-red-700 dark:bg-red-950/30 dark:text-red-400"
                      : isDueToday
                      ? "bg-orange-100 text-orange-700 dark:bg-orange-950/30 dark:text-orange-400"
                      : "bg-blue-100 text-blue-700 dark:bg-blue-950/30 dark:text-blue-400"
                  }`}
                >
                  {isOverdue
                    ? "⚠️ Vencida"
                    : `📅 ${formatDueDate(todo.dueDate)}`}
                </span>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex shrink-0 gap-1">
            <button
              onClick={() => setIsEditing(true)}
              className="flex h-9 w-9 items-center justify-center rounded-xl text-slate-400 opacity-0 transition-all duration-300 hover:bg-blue-50 hover:text-blue-600 hover:scale-110 group-hover:opacity-100 active:scale-95 dark:hover:bg-blue-950/30 dark:hover:text-blue-400"
            >
              <svg
                className="h-5 w-5"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
            </button>
            <button
              onClick={handleDelete}
              className="flex h-9 w-9 items-center justify-center rounded-xl text-slate-400 opacity-0 transition-all duration-300 hover:bg-red-50 hover:text-red-600 hover:scale-110 group-hover:opacity-100 active:scale-95 dark:hover:bg-red-950/30 dark:hover:text-red-400"
            >
              <svg
                className="h-5 w-5 transition-transform duration-300 hover:rotate-12"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
