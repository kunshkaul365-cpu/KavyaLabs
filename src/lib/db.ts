import fs from "fs";
import path from "path";
import bcrypt from "bcryptjs";

export interface UserRecord {
  id: string;
  name: string;
  email: string;
  passwordHash: string;
  role: "admin" | "developer" | "member";
  status: "active" | "invited" | "suspended";
  image?: string;
  createdAt: string;
  lastLogin?: string;
}

export interface TaskRecord {
  id: string;
  title: string;
  description?: string;
  status: "pending" | "in_progress" | "completed";
  priority: "low" | "medium" | "high";
  createdAt: string;
  completedAt?: string;
}

// In-memory fallback and cache for serverless environments
let inMemoryUsers: UserRecord[] | null = null;
let inMemoryTasks: TaskRecord[] | null = null;

function getDbFilePath(filename: string): string {
  if (process.env.VERCEL) {
    return path.join("/tmp", filename);
  }
  const localDir = path.join(process.cwd(), "data");
  if (!fs.existsSync(localDir)) {
    try {
      fs.mkdirSync(localDir, { recursive: true });
    } catch {
      return path.join("/tmp", filename);
    }
  }
  return path.join(localDir, filename);
}

// ==========================================
// USER DATABASE METHODS
// ==========================================

function getInitialSeedUsers(): UserRecord[] {
  const devHash = bcrypt.hashSync("devPassword123", 10);
  const adminHash = bcrypt.hashSync("adminPassword123", 10);

  return [
    {
      id: "usr_seed_admin_01",
      name: "Rohan Admin",
      email: "admin@kavyalabs.com",
      passwordHash: adminHash,
      role: "admin",
      status: "active",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=256&q=80",
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7).toISOString(),
      lastLogin: new Date().toISOString(),
    },
    {
      id: "usr_seed_dev_02",
      name: "Alex Dev",
      email: "developer@kavyalabs.com",
      passwordHash: devHash,
      role: "developer",
      status: "active",
      image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&q=80",
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5).toISOString(),
      lastLogin: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
    },
    {
      id: "usr_seed_member_03",
      name: "Priya Sharma",
      email: "priya@aetherdynamics.com",
      passwordHash: bcrypt.hashSync("memberPass123", 10),
      role: "member",
      status: "active",
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3).toISOString(),
      lastLogin: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
    },
    {
      id: "usr_seed_dev_04",
      name: "Vikram Nambiar",
      email: "vikram@hypercloud.io",
      passwordHash: bcrypt.hashSync("memberPass123", 10),
      role: "developer",
      status: "active",
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2).toISOString(),
      lastLogin: new Date(Date.now() - 1000 * 60 * 60 * 6).toISOString(),
    },
    {
      id: "usr_seed_member_05",
      name: "Neha Gupta",
      email: "neha.gupta@enterprise.in",
      passwordHash: bcrypt.hashSync("memberPass123", 10),
      role: "member",
      status: "invited",
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 12).toISOString(),
    },
  ];
}

function loadUsers(): UserRecord[] {
  if (inMemoryUsers !== null) {
    return inMemoryUsers;
  }

  const filePath = getDbFilePath("users.json");
  try {
    if (fs.existsSync(filePath)) {
      const data = fs.readFileSync(filePath, "utf-8");
      inMemoryUsers = JSON.parse(data);
      if (inMemoryUsers && inMemoryUsers.length > 0) {
        return inMemoryUsers;
      }
    }
  } catch (err) {
    console.error("Failed to read users from disk, using seed users:", err);
  }

  inMemoryUsers = getInitialSeedUsers();
  saveUsers(inMemoryUsers);
  return inMemoryUsers;
}

function saveUsers(users: UserRecord[]): void {
  inMemoryUsers = users;
  const filePath = getDbFilePath("users.json");
  try {
    fs.writeFileSync(filePath, JSON.stringify(users, null, 2), "utf-8");
  } catch (err) {
    console.error("Failed to persist users to disk:", err);
  }
}

export async function getUserByEmail(email: string): Promise<UserRecord | null> {
  const users = loadUsers();
  const normalized = email.trim().toLowerCase();
  const user = users.find((u) => u.email.toLowerCase() === normalized);
  return user || null;
}

export async function getUserById(id: string): Promise<UserRecord | null> {
  const users = loadUsers();
  const user = users.find((u) => u.id === id);
  return user || null;
}

export async function getAllUsers(): Promise<UserRecord[]> {
  return loadUsers();
}

export async function createUser(data: {
  name: string;
  email: string;
  passwordHash: string;
  role?: "admin" | "developer" | "member";
  status?: "active" | "invited" | "suspended";
}): Promise<UserRecord> {
  const users = loadUsers();
  const normalizedEmail = data.email.trim().toLowerCase();

  const existing = users.find((u) => u.email.toLowerCase() === normalizedEmail);
  if (existing) {
    throw new Error("User already exists with this email address");
  }

  const newUser: UserRecord = {
    id: `usr_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
    name: data.name.trim(),
    email: normalizedEmail,
    passwordHash: data.passwordHash,
    role: data.role || "member",
    status: data.status || "active",
    createdAt: new Date().toISOString(),
    lastLogin: new Date().toISOString(),
  };

  users.push(newUser);
  saveUsers(users);
  return newUser;
}

export async function updateUser(
  id: string,
  updates: Partial<Omit<UserRecord, "id" | "email" | "createdAt">>
): Promise<UserRecord | null> {
  const users = loadUsers();
  const index = users.findIndex((u) => u.id === id);
  if (index === -1) return null;

  users[index] = {
    ...users[index],
    ...updates,
  };

  saveUsers(users);
  return users[index];
}

export async function deleteUser(id: string): Promise<boolean> {
  const users = loadUsers();
  const initialLength = users.length;
  const filtered = users.filter((u) => u.id !== id);

  if (filtered.length !== initialLength) {
    saveUsers(filtered);
    return true;
  }
  return false;
}

// ==========================================
// TASK DATABASE METHODS (Survives page refresh)
// ==========================================

function getInitialSeedTasks(): TaskRecord[] {
  return [
    {
      id: "task_1",
      title: "Deploy Q3 RBI & IFRS Regulatory Audit Swarm",
      description: "Automated scan of 45,000 ledger transactions with cryptographic verification.",
      status: "completed",
      priority: "high",
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
      completedAt: new Date(Date.now() - 1000 * 60 * 60 * 18).toISOString(),
    },
    {
      id: "task_2",
      title: "Integrate Qdrant Vector DB with Private Bangalore VPC",
      description: "Sub-25ms semantic document indexing over confidential enterprise PDFs.",
      status: "completed",
      priority: "medium",
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 16).toISOString(),
      completedAt: new Date(Date.now() - 1000 * 60 * 60 * 4).toISOString(),
    },
    {
      id: "task_3",
      title: "Configure PII Sanitization Guardrail Filter",
      description: "Ensure regex & neural scrubbing of Aadhaar, PAN and credit card numbers.",
      status: "pending",
      priority: "high",
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
    },
    {
      id: "task_4",
      title: "Run Concurrency Load Test on Coordinator Node",
      description: "Verify atomic mutex backoff locks under 15,000 synthetic requests.",
      status: "pending",
      priority: "medium",
      createdAt: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
    },
  ];
}

function loadTasks(): TaskRecord[] {
  if (inMemoryTasks !== null) {
    return inMemoryTasks;
  }

  const filePath = getDbFilePath("tasks.json");
  try {
    if (fs.existsSync(filePath)) {
      const data = fs.readFileSync(filePath, "utf-8");
      inMemoryTasks = JSON.parse(data);
      if (inMemoryTasks && Array.isArray(inMemoryTasks)) {
        return inMemoryTasks;
      }
    }
  } catch (err) {
    console.error("Failed to read tasks from disk, using seed tasks:", err);
  }

  inMemoryTasks = getInitialSeedTasks();
  saveTasks(inMemoryTasks);
  return inMemoryTasks;
}

function saveTasks(tasks: TaskRecord[]): void {
  inMemoryTasks = tasks;
  const filePath = getDbFilePath("tasks.json");
  try {
    fs.writeFileSync(filePath, JSON.stringify(tasks, null, 2), "utf-8");
  } catch (err) {
    console.error("Failed to persist tasks to disk:", err);
  }
}

export async function getAllTasks(): Promise<TaskRecord[]> {
  return loadTasks();
}

export async function createTask(data: {
  title: string;
  description?: string;
  priority?: "low" | "medium" | "high";
  status?: "pending" | "in_progress" | "completed";
}): Promise<TaskRecord> {
  const tasks = loadTasks();

  const newTask: TaskRecord = {
    id: `task_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
    title: data.title.trim(),
    description: data.description?.trim() || "",
    status: data.status || "pending",
    priority: data.priority || "medium",
    createdAt: new Date().toISOString(),
  };

  tasks.unshift(newTask); // newest first
  saveTasks(tasks);
  return newTask;
}

export async function updateTask(
  id: string,
  updates: Partial<Omit<TaskRecord, "id" | "createdAt">>
): Promise<TaskRecord | null> {
  const tasks = loadTasks();
  const index = tasks.findIndex((t) => t.id === id);
  if (index === -1) return null;

  const current = tasks[index];
  const updatedStatus = updates.status !== undefined ? updates.status : current.status;
  
  tasks[index] = {
    ...current,
    ...updates,
    completedAt: updatedStatus === "completed" ? (current.completedAt || new Date().toISOString()) : undefined,
  };

  saveTasks(tasks);
  return tasks[index];
}

export async function deleteTask(id: string): Promise<boolean> {
  const tasks = loadTasks();
  const initialLength = tasks.length;
  const filtered = tasks.filter((t) => t.id !== id);

  if (filtered.length !== initialLength) {
    saveTasks(filtered);
    return true;
  }
  return false;
}
