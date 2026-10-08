import { NextResponse } from "next/server";
import { updateTask, deleteTask } from "@/lib/db";

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await req.json();
    const { status, priority, title } = body;

    const updated = await updateTask(id, {
      ...(status && { status }),
      ...(priority && { priority }),
      ...(title && { title }),
    });

    if (!updated) {
      return NextResponse.json({ error: "Task not found" }, { status: 404 });
    }

    return NextResponse.json({ task: updated });
  } catch (err: any) {
    return NextResponse.json(
      { error: err?.message || "Failed to update task" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const deleted = await deleteTask(id);

    if (!deleted) {
      return NextResponse.json({ error: "Task not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: "Task deleted" });
  } catch (err: any) {
    return NextResponse.json(
      { error: err?.message || "Failed to delete task" },
      { status: 500 }
    );
  }
}
