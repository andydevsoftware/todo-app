"use client";

import { useState, useEffect } from "react";
import TodoInput from "./TodoInput";
import TodoList from "./TodoList";
import Header from "./Header";
import BottomNav from "./BottomNav";
import SearchBar from "./SearchBar";

export interface Todo {
  id: string;
  text: string;
  completed: boolean;
  priority: "low" | "medium" | "high";
  dueDate?: string;
  createdAt: Date;
}

type View = "all" | "pending" | "completed";

export default function TodoApp() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [currentView, setCurrentView] = useState<View>("all");
  const [showInput, setShowInput] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [mounted, setMounted] = useState(false);

  // Cargar tema del localStorage al montar
  useEffect(() => {
    setMounted(true);
    const savedTheme = localStorage.getItem("theme") as "light" | "dark" | null;

    if (savedTheme) {
      setTheme(savedTheme);
      if (savedTheme === "dark") {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
    } else {
      const prefersDark = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;
      const initialTheme = prefersDark ? "dark" : "light";
      setTheme(initialTheme);
      if (initialTheme === "dark") {
        document.documentElement.classList.add("dark");
      }
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);

    if (newTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  const addTodo = (
    text: string,
    priority: "low" | "medium" | "high",
    dueDate?: string
  ) => {
    const newTodo: Todo = {
      id: crypto.randomUUID(),
      text,
      completed: false,
      priority,
      dueDate: dueDate || undefined,
      createdAt: new Date(),
    };
    setTodos([newTodo, ...todos]);
    setShowInput(false);
  };

  const toggleTodo = (id: string) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id: string) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const editTodo = (id: string, newText: string, newDueDate?: string) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id
          ? { ...todo, text: newText, dueDate: newDueDate || undefined }
          : todo
      )
    );
  };

  // Filtrar por vista y búsqueda
  const filteredTodos = todos.filter((todo) => {
    // Filtro por vista
    if (currentView === "pending" && todo.completed) return false;
    if (currentView === "completed" && !todo.completed) return false;

    // Filtro por búsqueda
    if (searchQuery.trim()) {
      return todo.text.toLowerCase().includes(searchQuery.toLowerCase());
    }

    return true;
  });

  const pendingCount = todos.filter((t) => !t.completed).length;
  const completedCount = todos.filter((t) => t.completed).length;

  if (!mounted) {
    return null; // Evitar flash de contenido sin estilo
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-200 via-slate-100 to-slate-200 p-0 md:p-4 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      <div className="flex h-[100dvh] md:h-[90vh] w-full max-w-md flex-col overflow-hidden md:rounded-3xl shadow-2xl shadow-slate-900/20 dark:shadow-slate-950/50">
        {/* Header */}
        <Header
          currentView={currentView}
          pendingCount={pendingCount}
          completedCount={completedCount}
          theme={theme}
          onToggleTheme={toggleTheme}
        />

        {/* Search Bar */}
        <SearchBar searchQuery={searchQuery} onSearchChange={setSearchQuery} />

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto bg-gradient-to-br from-slate-100 via-slate-50 to-slate-100 px-4 py-4 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
          <TodoList
            todos={filteredTodos}
            onToggle={toggleTodo}
            onDelete={deleteTodo}
            onEdit={editTodo}
            currentView={currentView}
          />
        </main>

        {/* Floating Add Button */}
        <button
          onClick={() => setShowInput(true)}
          className="absolute bottom-20 right-4 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-blue-700 text-white shadow-xl shadow-blue-500/40 transition-all duration-300 hover:scale-110 hover:shadow-2xl hover:shadow-blue-500/50 active:scale-95 dark:from-blue-500 dark:to-blue-600 dark:shadow-blue-400/40 md:right-8"
        >
          <svg
            className={`h-6 w-6 transition-transform duration-300 ${
              showInput ? "rotate-45" : "rotate-0"
            }`}
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path d="M12 4v16m8-8H4" />
          </svg>
        </button>

        {/* Bottom Navigation */}
        <BottomNav currentView={currentView} onViewChange={setCurrentView} />

        {/* Add Todo Modal */}
        {showInput && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm animate-fadeIn"
            onClick={() => setShowInput(false)}
          >
            <div
              className="w-full max-w-md animate-slideUp rounded-3xl bg-white p-6 shadow-2xl dark:bg-slate-900"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="mb-4 flex items-center justify-between">
                <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-50">
                  Nueva Tarea
                </h3>
                <button
                  onClick={() => setShowInput(false)}
                  className="rounded-lg p-1 text-slate-400 transition-all duration-200 hover:bg-slate-100 hover:text-slate-600 active:scale-90 dark:hover:bg-slate-800 dark:hover:text-slate-300"
                >
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <TodoInput onAdd={addTodo} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
