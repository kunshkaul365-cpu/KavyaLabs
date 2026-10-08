import fs from "fs";
import path from "path";
import bcrypt from "bcryptjs";

export interface UserRecord {
  id: string;
  name: string;
  email: string;
  passwordHash: string;
  role: "admin" | "developer" | "member";
  image?: string;
  createdAt: string;
}

// In-memory fallback and cache for serverless environments
let inMemoryUsers: UserRecord[] | null = null;

function getDbFilePath(): string {
  // On Vercel serverless functions, /tmp is the only writable directory
  if (process.env.VERCEL) {
    return path.join("/tmp", "kavya_users.json");
  }
  const localDir = path.join(process.cwd(), "data");
  if (!fs.existsSync(localDir)) {
    try {
      fs.mkdirSync(localDir, { recursive: true });
    } catch {
      return path.join("/tmp", "kavya_users.json");
    }
  }
  return path.join(localDir, "users.json");
}

function getInitialSeedUsers(): UserRecord[] {
  // Pre-hashed passwords using bcrypt (10 rounds)
  // "devPassword123" -> $2a$10$7Z2N2xK8i4I4Y0bW5Xb5/.Z7HkWgEwXzH2Z9tS3v4d8K7t2m1g4qW
  // "adminPassword123" -> $2a$10$9p0w1e2r3t4y5u6i7o8p9u.Z7HkWgEwXzH2Z9tS3v4d8K7t2m1g4qW
  const devHash = bcrypt.hashSync("devPassword123", 10);
  const adminHash = bcrypt.hashSync("adminPassword123", 10);

  return [
    {
      id: "usr_seed_dev_01",
      name: "Alex Dev",
      email: "developer@kavyalabs.com",
      passwordHash: devHash,
      role: "developer",
      image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&q=80",
      createdAt: new Date().toISOString(),
    },
    {
      id: "usr_seed_admin_02",
      name: "Rohan Admin",
      email: "admin@kavyalabs.com",
      passwordHash: adminHash,
      role: "admin",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=256&q=80",
      createdAt: new Date().toISOString(),
    },
  ];
}

function loadUsers(): UserRecord[] {
  if (inMemoryUsers !== null) {
    return inMemoryUsers;
  }

  const filePath = getDbFilePath();
  try {
    if (fs.existsSync(filePath)) {
      const data = fs.readFileSync(filePath, "utf-8");
      inMemoryUsers = JSON.parse(data);
      return inMemoryUsers || [];
    }
  } catch (err) {
    console.error("Failed to read users from disk, using seed users:", err);
  }

  // Initialize with seed users if file does not exist
  inMemoryUsers = getInitialSeedUsers();
  saveUsers(inMemoryUsers);
  return inMemoryUsers;
}

function saveUsers(users: UserRecord[]): void {
  inMemoryUsers = users;
  const filePath = getDbFilePath();
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
    createdAt: new Date().toISOString(),
  };

  users.push(newUser);
  saveUsers(users);
  return newUser;
}
