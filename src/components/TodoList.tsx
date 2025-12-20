"use client";

import TodoItem from "./TodoItem";

export interface Todo {
  id: string;
  text: string;
  completed: boolean;
  priority: "low" | "medium" | "high";
  dueDate?: string;
  createdAt: Date;
}

interface TodoListProps {
  todos: Todo[];
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, newText: string, newDueDate?: string) => void;
  currentView: "all" | "pending" | "completed";
}

export default function TodoList({
  todos,
  onToggle,
  onDelete,
  onEdit,
  currentView,
}: TodoListProps) {
  if (todos.length === 0) {
    const emptyMessages = {
      all: { emoji: "📝", text: "No tienes tareas" },
      pending: { emoji: "🎉", text: "¡Todo completado!" },
      completed: { emoji: "⏰", text: "Aún no has completado ninguna tarea" },
    };

    const message = emptyMessages[currentView];

    return (
      <div className="flex h-full flex-col items-center justify-center">
        <div className="mb-4 text-6xl">{message.emoji}</div>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          {message.text}
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={onToggle}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      ))}
    </div>
  );
}
