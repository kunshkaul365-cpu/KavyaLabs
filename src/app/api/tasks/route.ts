import { NextResponse } from "next/server";
import { getAllTasks, createTask } from "@/lib/db";

export async function GET() {
  try {
    const tasks = await getAllTasks();
    return NextResponse.json(tasks);
  } catch (err: any) {
    return NextResponse.json(
      { error: err?.message || "Failed to fetch tasks" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const rawTitle = body.title || body.text || body.name || body.task;

    if (!rawTitle || typeof rawTitle !== "string" || !rawTitle.trim()) {
      return NextResponse.json(
        { error: "Task title is required." },
        { status: 400 }
      );
    }

    const newTask = await createTask({
      title: rawTitle.trim(),
      description: typeof body.description === "string" ? body.description.trim() : "",
      priority: ["low", "medium", "high"].includes(body.priority) ? body.priority : "medium",
      status: "pending",
    });

    return NextResponse.json(newTask, { status: 201 });
  } catch (err: any) {
    return NextResponse.json(
      { error: err?.message || "Failed to create task" },
      { status: 500 }
    );
  }
}
