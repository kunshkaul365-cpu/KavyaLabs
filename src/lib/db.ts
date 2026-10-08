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

// In-memory fallback and cache for serverless environments
let inMemoryUsers: UserRecord[] | null = null;

function getDbFilePath(): string {
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

  const filePath = getDbFilePath();
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
