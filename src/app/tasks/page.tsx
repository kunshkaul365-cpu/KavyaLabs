"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { 
  CheckCircle2, 
  Circle, 
  Clock, 
  ListTodo, 
  Plus, 
  Trash2, 
  TrendingUp, 
  AlertCircle,
  ArrowLeft
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

interface Task {
  id: string;
  title: string;
  description?: string;
  status: "pending" | "in_progress" | "completed";
  priority?: "low" | "medium" | "high";
  createdAt: string;
}

export default function TasksPage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [taskInput, setTaskInput] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Compute totals dynamically using .filter() on fetched task array
  const totalTasks = tasks.length;
  const completedCount = tasks.filter((t) => t.status === "completed").length;
  const pendingCount = tasks.filter((t) => t.status !== "completed").length;
  const completionRate = totalTasks > 0 ? Math.round((completedCount / totalTasks) * 100) : 0;

  // Fetch tasks from GET /api/tasks
  const fetchTasks = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/tasks");
      if (res.ok) {
        const data = await res.json();
        const taskList = Array.isArray(data) ? data : (data.tasks || []);
        setTasks(taskList);
      }
    } catch (err) {
      console.error("Failed to load tasks:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  // Task creation form submission calling POST /api/tasks
  const handleCreateTask = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!taskInput.trim()) {
      setError("Please enter a task title.");
      return;
    }

    try {
      setSubmitting(true);
      const res = await fetch("/api/tasks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: taskInput.trim() }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to create task");
      }

      // Reset text input and refresh task list immediately
      setTaskInput("");
      await fetchTasks();
    } catch (err: any) {
      setError(err?.message || "Failed to create task");
    } finally {
      setSubmitting(false);
    }
  };

  // Toggle task status
  const handleToggleStatus = async (taskId: string, currentStatus: string) => {
    const nextStatus = currentStatus === "completed" ? "pending" : "completed";
    try {
      const res = await fetch(`/api/tasks/${taskId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: nextStatus }),
      });

      if (res.ok) {
        setTasks((prev) =>
          prev.map((t) => (t.id === taskId ? { ...t, status: nextStatus as any } : t))
        );
      }
    } catch (err) {
      console.error("Failed to update task status:", err);
    }
  };

  // Delete task
  const handleDeleteTask = async (taskId: string) => {
    try {
      const res = await fetch(`/api/tasks/${taskId}`, {
        method: "DELETE",
      });

      if (res.ok) {
        setTasks((prev) => prev.filter((t) => t.id !== taskId));
      }
    } catch (err) {
      console.error("Failed to delete task:", err);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col selection:bg-slate-900 selection:text-white">
      <Navbar />

      <main className="flex-1 max-w-5xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Link
                href="/dashboard"
                className="text-xs text-slate-500 hover:text-slate-900 flex items-center gap-1"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Command Dashboard</span>
              </Link>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-950 tracking-tight">
              Swarm Mission Tasks
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
              Persistent task management backed by database storage (survives page refreshes)
            </p>
          </div>
        </div>

        {/* ======================================================== */}
        {/* STATS CARDS COMPONENT ABOVE TASK LIST */}
        {/* Computes totals dynamically: total tasks, completed count, and pending count using .filter() */}
        {/* ======================================================== */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
          {/* Total Tasks */}
          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-2">
            <div className="flex items-center justify-between text-xs text-slate-500 font-medium">
              <span>Total Tasks</span>
              <div className="p-2 rounded-lg bg-slate-100 text-slate-700">
                <ListTodo className="w-4 h-4" />
              </div>
            </div>
            <div className="text-3xl font-extrabold text-slate-950 tracking-tight">
              {totalTasks}
            </div>
            <p className="text-[11px] text-slate-400 font-medium">Recorded in persistent database</p>
          </div>

          {/* Completed Count (computed via .filter()) */}
          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-2">
            <div className="flex items-center justify-between text-xs text-slate-500 font-medium">
              <span>Completed Count</span>
              <div className="p-2 rounded-lg bg-emerald-50 text-emerald-600">
                <CheckCircle2 className="w-4 h-4" />
              </div>
            </div>
            <div className="text-3xl font-extrabold text-emerald-700 tracking-tight">
              {completedCount}
            </div>
            <p className="text-[11px] text-emerald-600/80 font-medium">
              {completionRate}% completion rate
            </p>
          </div>

          {/* Pending Count (computed via .filter()) */}
          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-2">
            <div className="flex items-center justify-between text-xs text-slate-500 font-medium">
              <span>Pending Count</span>
              <div className="p-2 rounded-lg bg-amber-50 text-amber-600">
                <Clock className="w-4 h-4" />
              </div>
            </div>
            <div className="text-3xl font-extrabold text-amber-700 tracking-tight">
              {pendingCount}
            </div>
            <p className="text-[11px] text-amber-600/80 font-medium">Active swarm objectives</p>
          </div>
        </div>

        {/* ======================================================== */}
        {/* TASK CREATION FORM */}
        {/* Has text input and submit button calling POST /api/tasks, then refreshes task list */}
        {/* ======================================================== */}
        <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-2xs space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-slate-900">
                Add New Task
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Submits to POST /api/tasks and saves to database
              </p>
            </div>
            <span className="text-xs font-mono font-medium text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
              POST /api/tasks
            </span>
          </div>

          {error && (
            <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleCreateTask} className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <input
              type="text"
              required
              value={taskInput}
              onChange={(e) => setTaskInput(e.target.value)}
              placeholder="What needs to be done? (e.g. Audit ledger transactions or Verify VPC RAG)..."
              className="flex-1 px-4 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-none focus:border-slate-900 focus:ring-1 focus:ring-slate-900 bg-slate-50/70"
            />
            <button
              type="submit"
              disabled={submitting}
              className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs sm:text-sm font-semibold shadow-xs transition-all cursor-pointer disabled:opacity-60 shrink-0"
            >
              <Plus className="w-4 h-4" />
              <span>{submitting ? "Adding..." : "Add Task"}</span>
            </button>
          </form>
        </div>

        {/* ======================================================== */}
        {/* TASK LIST (SURVIVES PAGE REFRESH) */}
        {/* ======================================================== */}
        <div className="rounded-3xl bg-white border border-slate-200 shadow-2xs overflow-hidden">
          <div className="p-6 border-b border-slate-200 flex items-center justify-between">
            <h3 className="text-base font-bold text-slate-900">
              Task List ({tasks.length})
            </h3>
            <span className="text-xs text-slate-500">
              Survives page refreshes
            </span>
          </div>

          {loading ? (
            <div className="py-12 text-center text-xs text-slate-500">
              Loading tasks from database...
            </div>
          ) : tasks.length === 0 ? (
            <div className="py-12 text-center text-xs text-slate-500">
              No tasks found. Use the form above to add your first task!
            </div>
          ) : (
            <div className="divide-y divide-slate-100">
              {tasks.map((task) => (
                <div
                  key={task.id}
                  className="p-4 sm:p-5 flex items-center justify-between gap-4 hover:bg-slate-50/70 transition-colors"
                >
                  <div className="flex items-center gap-3.5 flex-1 min-w-0">
                    <button
                      onClick={() => handleToggleStatus(task.id, task.status)}
                      className="shrink-0 p-1 text-slate-400 hover:text-emerald-600 transition-colors cursor-pointer"
                      title={task.status === "completed" ? "Mark as Pending" : "Mark as Completed"}
                    >
                      {task.status === "completed" ? (
                        <CheckCircle2 className="w-5 h-5 text-emerald-600 fill-emerald-50" />
                      ) : (
                        <Circle className="w-5 h-5 text-slate-300 hover:text-slate-500" />
                      )}
                    </button>

                    <span
                      className={`text-xs sm:text-sm font-medium truncate ${
                        task.status === "completed"
                          ? "line-through text-slate-400"
                          : "text-slate-900"
                      }`}
                    >
                      {task.title}
                    </span>
                  </div>

                  <div className="flex items-center gap-3 shrink-0">
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                        task.status === "completed"
                          ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                          : "bg-slate-100 text-slate-600 border-slate-200"
                      }`}
                    >
                      {task.status === "completed" ? "COMPLETED" : "PENDING"}
                    </span>

                    <button
                      onClick={() => handleDeleteTask(task.id)}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
                      title="Delete task"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
