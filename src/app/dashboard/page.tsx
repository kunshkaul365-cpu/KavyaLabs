"use client";

import { useState, useEffect } from "react";
import { useSession, signOut } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { 
  ShieldCheck, 
  User as UserIcon, 
  LogOut, 
  Home, 
  Layers, 
  Activity, 
  CheckCircle2, 
  Lock,
  Search,
  UserPlus,
  Trash2,
  Edit,
  TrendingUp,
  Cpu,
  Clock,
  Zap,
  MoreVertical,
  X,
  AlertCircle,
  Filter,
  Check
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

interface UserItem {
  id: string;
  name: string;
  email: string;
  role: "admin" | "developer" | "member";
  status: "active" | "invited" | "suspended";
  image?: string;
  createdAt: string;
  lastLogin?: string;
}

interface AnalyticsData {
  kpis: {
    label: string;
    value: string;
    change: string;
    isPositive: boolean;
    timeframe: string;
  }[];
  dailyExecutions: {
    day: string;
    executions: number;
    tokens: number;
    latency: number;
  }[];
  modelDistribution: {
    model: string;
    percentage: number;
    color: string;
  }[];
  recentAuditLogs: {
    id: string;
    agent: string;
    mission: string;
    status: string;
    tokens: string;
    latency: string;
    timestamp: string;
  }[];
}

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const [activeTab, setActiveTab] = useState<"analytics" | "users" | "swarms">("analytics");

  // User Management State
  const [users, setUsers] = useState<UserItem[]>([]);
  const [loadingUsers, setLoadingUsers] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState<string>("all");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newUserName, setNewUserName] = useState("");
  const [newUserEmail, setNewUserEmail] = useState("");
  const [newUserRole, setNewUserRole] = useState<"developer" | "member" | "admin">("developer");
  const [modalLoading, setModalLoading] = useState(false);
  const [modalError, setModalError] = useState<string | null>(null);

  // Analytics State
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null);
  const [loadingAnalytics, setLoadingAnalytics] = useState(false);

  // Fetch Users
  const fetchUsers = async () => {
    try {
      setLoadingUsers(true);
      const res = await fetch("/api/admin/users");
      if (res.ok) {
        const data = await res.json();
        setUsers(data.users || []);
      }
    } catch (err) {
      console.error("Failed to load users:", err);
    } finally {
      setLoadingUsers(false);
    }
  };

  // Fetch Analytics
  const fetchAnalytics = async () => {
    try {
      setLoadingAnalytics(true);
      const res = await fetch("/api/admin/analytics");
      if (res.ok) {
        const data = await res.json();
        setAnalytics(data);
      }
    } catch (err) {
      console.error("Failed to load analytics:", err);
    } finally {
      setLoadingAnalytics(false);
    }
  };

  useEffect(() => {
    if (session) {
      fetchUsers();
      fetchAnalytics();
    }
  }, [session]);

  // Handle Add User
  const handleAddUser = async (e: React.FormEvent) => {
    e.preventDefault();
    setModalError(null);
    if (!newUserName.trim() || !newUserEmail.trim()) {
      setModalError("Please provide name and email.");
      return;
    }

    try {
      setModalLoading(true);
      const res = await fetch("/api/admin/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: newUserName.trim(),
          email: newUserEmail.trim().toLowerCase(),
          role: newUserRole,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to add user.");
      }

      setUsers([data.user, ...users]);
      setIsAddModalOpen(false);
      setNewUserName("");
      setNewUserEmail("");
      setNewUserRole("developer");
    } catch (err: any) {
      setModalError(err.message || "Failed to create user.");
    } finally {
      setModalLoading(false);
    }
  };

  // Handle Role Change
  const handleRoleChange = async (userId: string, newRole: "admin" | "developer" | "member") => {
    try {
      const res = await fetch(`/api/admin/users/${userId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ role: newRole }),
      });

      if (res.ok) {
        setUsers(users.map((u) => (u.id === userId ? { ...u, role: newRole } : u)));
      }
    } catch (err) {
      console.error("Failed to update role:", err);
    }
  };

  // Handle Status Toggle (Suspend / Activate)
  const handleToggleStatus = async (userId: string, currentStatus: string) => {
    const nextStatus = currentStatus === "suspended" ? "active" : "suspended";
    try {
      const res = await fetch(`/api/admin/users/${userId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: nextStatus }),
      });

      if (res.ok) {
        setUsers(users.map((u) => (u.id === userId ? { ...u, status: nextStatus as any } : u)));
      }
    } catch (err) {
      console.error("Failed to toggle status:", err);
    }
  };

  // Handle Delete User
  const handleDeleteUser = async (userId: string) => {
    if (!confirm("Are you sure you want to remove this user from the workspace?")) {
      return;
    }

    try {
      const res = await fetch(`/api/admin/users/${userId}`, {
        method: "DELETE",
      });

      if (res.ok) {
        setUsers(users.filter((u) => u.id !== userId));
      }
    } catch (err) {
      console.error("Failed to delete user:", err);
    }
  };

  // Filtered Users
  const filteredUsers = users.filter((u) => {
    const matchesSearch =
      u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRole = roleFilter === "all" || u.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  if (status === "loading") {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="flex items-center gap-3 text-slate-600 font-mono text-sm">
          <span className="w-2.5 h-2.5 rounded-full bg-slate-900 animate-ping" />
          <span>Verifying encrypted session...</span>
        </div>
      </div>
    );
  }

  if (status === "unauthenticated" || !session) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col justify-center items-center px-4 text-center">
        <div className="w-12 h-12 rounded-2xl bg-white border border-slate-200 shadow-2xs flex items-center justify-center text-slate-900 mb-4">
          <Lock className="w-6 h-6 text-slate-700" />
        </div>
        <h1 className="text-2xl font-extrabold text-slate-950">Authentication Required</h1>
        <p className="mt-2 text-sm text-slate-600 max-w-md">
          This is a protected enterprise route. Please sign in with Google or your Kavya Labs credentials to access the workspace.
        </p>
        <div className="mt-6 flex items-center gap-3">
          <Link
            href="/login"
            className="px-5 py-2.5 rounded-xl bg-slate-900 text-white text-sm font-semibold hover:bg-slate-800 shadow-sm transition-all"
          >
            Sign In Now
          </Link>
          <Link
            href="/"
            className="px-4 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-700 text-sm font-medium hover:bg-slate-100 transition-all"
          >
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col selection:bg-slate-900 selection:text-white">
      <Navbar />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Top Control Header */}
        <div className="rounded-3xl p-6 sm:p-8 bg-white border border-slate-200 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="relative w-14 h-14 rounded-2xl overflow-hidden border border-slate-200 shadow-2xs bg-slate-100 flex items-center justify-center">
              {session.user?.image ? (
                <Image
                  src={session.user.image}
                  alt={session.user.name || "User"}
                  width={56}
                  height={56}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-slate-900 text-white flex items-center justify-center font-bold text-xl">
                  {session.user?.name ? session.user.name[0].toUpperCase() : "A"}
                </div>
              )}
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-extrabold text-slate-950">
                  Kavya Labs Admin Command Center
                </h1>
                <span className="px-2.5 py-0.5 rounded-full bg-lime-50 text-lime-700 border border-lime-200 text-[10px] font-bold uppercase tracking-wider">
                  Live Operations
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                Logged in as <strong className="text-slate-700">{session.user?.name || "Admin"}</strong> ({session.user?.email})
              </p>
            </div>
          </div>

          {/* Quick Tab Switcher */}
          <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-xl border border-slate-200 text-xs w-full sm:w-auto">
            <button
              onClick={() => setActiveTab("analytics")}
              className={`flex-1 sm:flex-none px-4 py-2 rounded-lg font-semibold transition-all cursor-pointer ${
                activeTab === "analytics"
                  ? "bg-white text-slate-900 shadow-2xs"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              Analytics &amp; Telemetry
            </button>
            <button
              onClick={() => setActiveTab("users")}
              className={`flex-1 sm:flex-none px-4 py-2 rounded-lg font-semibold transition-all cursor-pointer ${
                activeTab === "users"
                  ? "bg-white text-slate-900 shadow-2xs"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              User Management ({users.length})
            </button>
            <button
              onClick={() => setActiveTab("swarms")}
              className={`flex-1 sm:flex-none px-4 py-2 rounded-lg font-semibold transition-all cursor-pointer ${
                activeTab === "swarms"
                  ? "bg-white text-slate-900 shadow-2xs"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              Cluster Health
            </button>
          </div>
        </div>

        {/* ======================================================== */}
        {/* TAB 1: ANALYTICS & TELEMETRY VIEW */}
        {/* ======================================================== */}
        {activeTab === "analytics" && (
          <div className="space-y-8 animate-in fade-in duration-200">
            {/* KPI Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {analytics?.kpis.map((kpi, idx) => (
                <div
                  key={idx}
                  className="p-6 rounded-2xl bg-white border border-slate-200 shadow-2xs hover:shadow-xs transition-all space-y-3"
                >
                  <div className="flex items-center justify-between text-xs text-slate-500 font-medium">
                    <span>{kpi.label}</span>
                    <span className="flex items-center gap-1 text-[11px] font-bold text-lime-700 bg-lime-50 px-2 py-0.5 rounded-full border border-lime-200">
                      <TrendingUp className="w-3 h-3" />
                      {kpi.change}
                    </span>
                  </div>
                  <div className="text-3xl font-extrabold text-slate-950 tracking-tight">
                    {kpi.value}
                  </div>
                  <p className="text-[11px] text-slate-400 font-medium">{kpi.timeframe}</p>
                </div>
              ))}
            </div>

            {/* Charts & Graphs Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Daily Invocations Bar Chart */}
              <div className="lg:col-span-8 p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-2xs space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <h3 className="text-base font-bold text-slate-900">
                      Swarm Execution Volume (Last 7 Days)
                    </h3>
                    <p className="text-xs text-slate-500">
                      Daily autonomous agent swarm invocations across production workloads
                    </p>
                  </div>
                  <span className="text-xs font-mono font-medium text-slate-500 bg-slate-100 px-3 py-1 rounded-lg border border-slate-200 w-fit">
                    1.42M Total Calls
                  </span>
                </div>

                {/* SVG & CSS Bar Visualizer */}
                <div className="pt-6">
                  <div className="h-48 flex items-end gap-3 sm:gap-6 border-b border-slate-200 pb-2">
                    {analytics?.dailyExecutions.map((item, idx) => {
                      const maxVal = 320000;
                      const heightPercent = Math.round((item.executions / maxVal) * 100);
                      return (
                        <div key={idx} className="flex-1 flex flex-col items-center gap-2 group">
                          {/* Tooltip value */}
                          <span className="text-[10px] font-mono font-semibold text-slate-700 opacity-0 group-hover:opacity-100 transition-opacity">
                            {(item.executions / 1000).toFixed(0)}k
                          </span>
                          <div className="w-full max-w-[42px] bg-slate-100 rounded-t-lg overflow-hidden flex items-end h-36">
                            <div
                              style={{ height: `${heightPercent}%` }}
                              className="w-full bg-slate-900 group-hover:bg-indigo-600 transition-all rounded-t-lg"
                            />
                          </div>
                          <span className="text-xs font-medium text-slate-600">{item.day}</span>
                        </div>
                      );
                    })}
                  </div>
                  <div className="pt-3 flex items-center justify-between text-[11px] text-slate-500 font-mono">
                    <span>Average: 204k calls/day</span>
                    <span>Peak: Friday (310k calls)</span>
                  </div>
                </div>
              </div>

              {/* Model Distribution Card */}
              <div className="lg:col-span-4 p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-2xs space-y-6 flex flex-col justify-between">
                <div>
                  <h3 className="text-base font-bold text-slate-900">
                    Model Routing Breakdown
                  </h3>
                  <p className="text-xs text-slate-500">
                    Autonomous inference traffic allocation
                  </p>
                </div>

                <div className="space-y-4">
                  {analytics?.modelDistribution.map((item, idx) => (
                    <div key={idx} className="space-y-1.5">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-semibold text-slate-800">{item.model}</span>
                        <span className="font-mono font-bold text-slate-900">{item.percentage}%</span>
                      </div>
                      <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
                        <div
                          style={{
                            width: `${item.percentage}%`,
                            backgroundColor: item.color,
                          }}
                          className="h-full rounded-full transition-all"
                        />
                      </div>
                    </div>
                  ))}
                </div>

                <div className="pt-4 border-t border-slate-100 text-[11px] text-slate-500 flex items-center justify-between">
                  <span>Routing Strategy</span>
                  <span className="font-semibold text-slate-800">Dynamic Cost-Latency Optimization</span>
                </div>
              </div>
            </div>

            {/* Recent Swarm Execution Audit Logs */}
            <div className="rounded-3xl bg-white border border-slate-200 shadow-2xs overflow-hidden">
              <div className="p-6 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h3 className="text-base font-bold text-slate-900">
                    Real-Time Swarm Execution Audit Logs
                  </h3>
                  <p className="text-xs text-slate-500">
                    Live stream of deterministic decisions, token costs, and consensus times
                  </p>
                </div>
                <div className="flex items-center gap-2 text-xs font-medium text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span>Telemetry Feed Live</span>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-mono uppercase text-[10px]">
                    <tr>
                      <th className="py-3.5 px-6">Trace ID</th>
                      <th className="py-3.5 px-6">Agent Swarm</th>
                      <th className="py-3.5 px-6">Mission Objective</th>
                      <th className="py-3.5 px-6">Latency</th>
                      <th className="py-3.5 px-6">Tokens</th>
                      <th className="py-3.5 px-6">Status</th>
                      <th className="py-3.5 px-6">Timestamp</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {analytics?.recentAuditLogs.map((log) => (
                      <tr key={log.id} className="hover:bg-slate-50/80 transition-colors">
                        <td className="py-3.5 px-6 font-mono font-semibold text-slate-900">{log.id}</td>
                        <td className="py-3.5 px-6 font-semibold text-slate-800">{log.agent}</td>
                        <td className="py-3.5 px-6 text-slate-600 max-w-xs truncate">{log.mission}</td>
                        <td className="py-3.5 px-6 font-mono text-slate-700">⚡ {log.latency}</td>
                        <td className="py-3.5 px-6 font-mono text-slate-700">{log.tokens}</td>
                        <td className="py-3.5 px-6">
                          <span className="px-2 py-0.5 rounded-full bg-lime-50 text-lime-700 border border-lime-200 font-semibold text-[10px]">
                            {log.status}
                          </span>
                        </td>
                        <td className="py-3.5 px-6 text-slate-400 font-mono text-[11px]">{log.timestamp}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* TAB 2: USER MANAGEMENT VIEW */}
        {/* ======================================================== */}
        {activeTab === "users" && (
          <div className="space-y-6 animate-in fade-in duration-200">
            {/* Action Bar: Search, Filters, Add User */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs">
              <div className="flex flex-1 items-center gap-3">
                <div className="relative flex-1 max-w-md">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search users by name or email..."
                    className="w-full pl-9 pr-4 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-slate-900 focus:ring-1 focus:ring-slate-900 bg-slate-50/60"
                  />
                </div>

                {/* Role filter */}
                <div className="flex items-center gap-1.5 text-xs">
                  <Filter className="w-3.5 h-3.5 text-slate-400" />
                  <select
                    value={roleFilter}
                    onChange={(e) => setRoleFilter(e.target.value)}
                    className="px-2.5 py-2 rounded-xl border border-slate-200 bg-white text-xs text-slate-700 focus:outline-none"
                  >
                    <option value="all">All Roles</option>
                    <option value="admin">Admins</option>
                    <option value="developer">Developers</option>
                    <option value="member">Members</option>
                  </select>
                </div>
              </div>

              {/* Add / Invite Button */}
              <button
                onClick={() => setIsAddModalOpen(true)}
                className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold shadow-xs transition-all cursor-pointer"
              >
                <UserPlus className="w-4 h-4" />
                <span>Invite Member</span>
              </button>
            </div>

            {/* Users Table */}
            <div className="rounded-3xl bg-white border border-slate-200 shadow-2xs overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-mono uppercase text-[10px]">
                    <tr>
                      <th className="py-3.5 px-6">User</th>
                      <th className="py-3.5 px-6">Role</th>
                      <th className="py-3.5 px-6">Status</th>
                      <th className="py-3.5 px-6">Created Date</th>
                      <th className="py-3.5 px-6 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {loadingUsers ? (
                      <tr>
                        <td colSpan={5} className="py-12 text-center text-slate-500">
                          Loading workspace members...
                        </td>
                      </tr>
                    ) : filteredUsers.length === 0 ? (
                      <tr>
                        <td colSpan={5} className="py-12 text-center text-slate-500">
                          No users match your criteria.
                        </td>
                      </tr>
                    ) : (
                      filteredUsers.map((user) => (
                        <tr key={user.id} className="hover:bg-slate-50/70 transition-colors">
                          {/* User info */}
                          <td className="py-4 px-6">
                            <div className="flex items-center gap-3">
                              {user.image ? (
                                <Image
                                  src={user.image}
                                  alt={user.name}
                                  width={32}
                                  height={32}
                                  className="w-8 h-8 rounded-full object-cover border border-slate-200"
                                />
                              ) : (
                                <div className="w-8 h-8 rounded-full bg-slate-900 text-white flex items-center justify-center font-bold text-xs">
                                  {user.name[0].toUpperCase()}
                                </div>
                              )}
                              <div>
                                <div className="font-bold text-slate-900">{user.name}</div>
                                <div className="text-[11px] text-slate-500 font-mono">{user.email}</div>
                              </div>
                            </div>
                          </td>

                          {/* Role selector dropdown */}
                          <td className="py-4 px-6">
                            <select
                              value={user.role}
                              onChange={(e) => handleRoleChange(user.id, e.target.value as any)}
                              className={`text-[11px] font-semibold px-2.5 py-1 rounded-lg border focus:outline-none cursor-pointer ${
                                user.role === "admin"
                                  ? "bg-purple-50 text-purple-700 border-purple-200"
                                  : user.role === "developer"
                                  ? "bg-blue-50 text-blue-700 border-blue-200"
                                  : "bg-slate-100 text-slate-700 border-slate-200"
                              }`}
                            >
                              <option value="admin">Admin</option>
                              <option value="developer">Developer</option>
                              <option value="member">Member</option>
                            </select>
                          </td>

                          {/* Status toggle button */}
                          <td className="py-4 px-6">
                            <button
                              onClick={() => handleToggleStatus(user.id, user.status)}
                              className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border transition-all cursor-pointer ${
                                user.status === "active"
                                  ? "bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100"
                                  : user.status === "invited"
                                  ? "bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-100"
                                  : "bg-rose-50 text-rose-700 border-rose-200 hover:bg-rose-100"
                              }`}
                            >
                              {user.status === "active" ? "Active" : user.status === "invited" ? "Invited" : "Suspended"}
                            </button>
                          </td>

                          {/* Created Date */}
                          <td className="py-4 px-6 text-slate-500 text-[11px] font-mono">
                            {new Date(user.createdAt).toLocaleDateString("en-US", {
                              month: "short",
                              day: "numeric",
                              year: "numeric",
                            })}
                          </td>

                          {/* Actions */}
                          <td className="py-4 px-6 text-right">
                            <button
                              onClick={() => handleDeleteUser(user.id)}
                              className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
                              title="Delete user"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* TAB 3: CLUSTER HEALTH VIEW */}
        {/* ======================================================== */}
        {activeTab === "swarms" && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono text-slate-500 uppercase">Primary Edge Region</span>
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                </div>
                <div className="text-lg font-bold text-slate-900">in-south-blr-1 (Bengaluru)</div>
                <p className="text-xs text-slate-500">12 worker pods active • 18ms VPC cross-connect</p>
              </div>

              <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono text-slate-500 uppercase">Failover Secondary</span>
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                </div>
                <div className="text-lg font-bold text-slate-900">us-east-va-1 (Virginia)</div>
                <p className="text-xs text-slate-500">8 worker pods active • Automated sync active</p>
              </div>

              <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono text-slate-500 uppercase">Audit &amp; Security</span>
                  <span className="w-2 h-2 rounded-full bg-lime-600" />
                </div>
                <div className="text-lg font-bold text-slate-900">SOC2 Type II Standard</div>
                <p className="text-xs text-slate-500">Continuous zero-retention memory scrubbing</p>
              </div>
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* MODAL: INVITE / ADD MEMBER */}
        {/* ======================================================== */}
        {isAddModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/40 backdrop-blur-xs animate-in fade-in duration-150">
            <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl border border-slate-200 space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-bold text-slate-950">Invite Workspace Member</h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Add an engineer or admin to your Kavya Labs tenant
                  </p>
                </div>
                <button
                  onClick={() => setIsAddModalOpen(false)}
                  className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {modalError && (
                <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{modalError}</span>
                </div>
              )}

              <form onSubmit={handleAddUser} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    required
                    value={newUserName}
                    onChange={(e) => setNewUserName(e.target.value)}
                    placeholder="e.g. Maya Chen"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs text-slate-900 focus:outline-none focus:border-slate-900"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Work Email
                  </label>
                  <input
                    type="email"
                    required
                    value={newUserEmail}
                    onChange={(e) => setNewUserEmail(e.target.value)}
                    placeholder="e.g. maya@company.com"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs text-slate-900 focus:outline-none focus:border-slate-900"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Access Role
                  </label>
                  <select
                    value={newUserRole}
                    onChange={(e) => setNewUserRole(e.target.value as any)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs text-slate-900 focus:outline-none bg-white"
                  >
                    <option value="developer">Developer (Execute swarms &amp; inspect traces)</option>
                    <option value="admin">Admin (Full workspace control &amp; user management)</option>
                    <option value="member">Member (Read-only access)</option>
                  </select>
                </div>

                <div className="pt-2 flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setIsAddModalOpen(false)}
                    className="flex-1 py-2.5 rounded-xl border border-slate-200 text-slate-700 text-xs font-semibold hover:bg-slate-50 cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={modalLoading}
                    className="flex-1 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold shadow-xs cursor-pointer disabled:opacity-60"
                  >
                    {modalLoading ? "Inviting..." : "Send Invitation"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
