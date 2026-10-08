import { NextResponse } from "next/server";
import { getAllTasks, createTask } from "@/lib/db";
import { auth } from "@/auth";

export async function GET() {
  try {
    const tasks = await getAllTasks();
    return NextResponse.json({ tasks });
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
    const { title, description, priority } = body;

    // Validate title
    if (!title || typeof title !== "string" || !title.trim()) {
      return NextResponse.json(
        { error: "Task title is required." },
        { status: 400 }
      );
    }

    const newTask = await createTask({
      title: title.trim(),
      description: typeof description === "string" ? description.trim() : "",
      priority: ["low", "medium", "high"].includes(priority) ? priority : "medium",
      status: "pending",
    });

    return NextResponse.json({ task: newTask }, { status: 201 });
  } catch (err: any) {
    return NextResponse.json(
      { error: err?.message || "Failed to create task" },
      { status: 500 }
    );
  }
}
