import { useCallback, useEffect, useMemo, useState } from "react";
import {
  Activity,
  BarChart,
  Calendar,
  Check,
  ChevronLeft,
  ChevronRight,
  Clock,
  Close,
  CrossPlus,
  Database,
  Download,
  Filter,
  LogOut,
  Lock,
  Mail,
  MapPin,
  MessageSquare,
  Phone,
  RefreshCw,
  Search,
  Shield,
  Sparkles,
  User,
  Users,
} from "../components/Icons";

const API_BASE = "https://new-ikeja-hospital.onrender.com";

interface AppointmentRecord {
  _id?: string;
  name: string;
  email: string;
  phone: string;
  date: string;
  department: string;
  message: string;
  createdAt?: string;
}

interface HealthData {
  status: string;
  uptimeSeconds: number;
  mongo: string;
  email: { configured: boolean; user: string | null; passSet: boolean };
  time: string;
}

const deptColors: Record<string, string> = {
  "General Medicine": "bg-brand-50 text-brand-700",
  "Cardiology": "bg-rose-50 text-rose-700",
  "Pediatrics": "bg-amber-50 text-amber-700",
  "Maternity": "bg-pink-50 text-pink-700",
  "Maternity & Obstetrics": "bg-pink-50 text-pink-700",
  "Surgery": "bg-violet-50 text-violet-700",
  "Diagnostics": "bg-emerald-50 text-emerald-700",
  "Neurology": "bg-purple-50 text-purple-700",
  "Orthopaedics": "bg-teal-50 text-teal-700",
};

const PAGE_SIZE = 25;

type SortKey = "newest" | "oldest" | "appt_date" | "name";
type DateRange = "all" | "today" | "7d" | "30d" | "upcoming";

function startOfDay(d = new Date()) {
  const x = new Date(d);
  x.setHours(0, 0, 0, 0);
  return x;
}

function formatDateTime(iso?: string) {
  if (!iso) return "—";
  try {
    return new Date(iso).toLocaleString([], {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  } catch {
    return iso;
  }
}

function formatRelative(iso?: string) {
  if (!iso) return "";
  const ms = Date.now() - new Date(iso).getTime();
  const s = Math.round(ms / 1000);
  if (s < 60) return `${s}s ago`;
  const m = Math.round(s / 60);
  if (m < 60) return `${m}m ago`;
  const h = Math.round(m / 60);
  if (h < 24) return `${h}h ago`;
  const d = Math.round(h / 24);
  if (d < 30) return `${d}d ago`;
  const mo = Math.round(d / 30);
  return `${mo}mo ago`;
}

function downloadCSV(rows: AppointmentRecord[]) {
  const headers = [
    "Name",
    "Email",
    "Phone",
    "Appointment Date",
    "Department",
    "Message",
    "Submitted At",
  ];
  const escape = (v: string) => `"${(v ?? "").replace(/"/g, '""')}"`;
  const lines = [
    headers.join(","),
    ...rows.map((r) =>
      [
        escape(r.name),
        escape(r.email),
        escape(r.phone),
        escape(r.date),
        escape(r.department),
        escape(r.message),
        escape(r.createdAt ?? ""),
      ].join(",")
    ),
  ];
  const blob = new Blob([lines.join("\n")], { type: "text/csv;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `appointments-${new Date().toISOString().slice(0, 10)}.csv`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

export default function Admin() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const [appointments, setAppointments] = useState<AppointmentRecord[]>([]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [lastFetched, setLastFetched] = useState<Date | null>(null);
  const [autoRefresh, setAutoRefresh] = useState(true);

  const [health, setHealth] = useState<HealthData | null>(null);
  const [healthError, setHealthError] = useState(false);

  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<string>("all");
  const [range, setRange] = useState<DateRange>("all");
  const [sort, setSort] = useState<SortKey>("newest");
  const [page, setPage] = useState(1);

  const [selected, setSelected] = useState<AppointmentRecord | null>(null);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === "admin" && password === "hospital123") {
      setIsLoggedIn(true);
      setError("");
    } else {
      setError("Invalid username or password");
    }
  };

  const fetchAppointments = useCallback(async (showSpinner = false) => {
    if (showSpinner) setLoading(true);
    else setRefreshing(true);
    try {
      const res = await fetch(`${API_BASE}/appointments`);
      if (!res.ok) throw new Error("Failed");
      const data = await res.json();
      setAppointments(Array.isArray(data) ? data : []);
      setLastFetched(new Date());
    } catch {
      // swallow — keep previous data on screen
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  const fetchHealth = useCallback(async () => {
    try {
      const res = await fetch(`${API_BASE}/health`);
      if (!res.ok) throw new Error("not ok");
      const data: HealthData = await res.json();
      setHealth(data);
      setHealthError(false);
    } catch {
      setHealthError(true);
    }
  }, []);

  useEffect(() => {
    if (!isLoggedIn) return;
    fetchAppointments(true);
    fetchHealth();
  }, [isLoggedIn, fetchAppointments, fetchHealth]);

  useEffect(() => {
    if (!isLoggedIn || !autoRefresh) return;
    const id = window.setInterval(() => {
      fetchAppointments();
      fetchHealth();
    }, 30000);
    return () => window.clearInterval(id);
  }, [isLoggedIn, autoRefresh, fetchAppointments, fetchHealth]);

  // Reset page when filters change
  useEffect(() => {
    setPage(1);
  }, [query, filter, range, sort]);

  const departments = useMemo(
    () =>
      Array.from(
        new Set(appointments.map((a) => a.department).filter(Boolean))
      ),
    [appointments]
  );

  const departmentCounts = useMemo(() => {
    const map: Record<string, number> = {};
    for (const a of appointments) {
      const k = a.department || "Unknown";
      map[k] = (map[k] || 0) + 1;
    }
    return Object.entries(map).sort((a, b) => b[1] - a[1]);
  }, [appointments]);

  const todayCount = useMemo(() => {
    const today = startOfDay();
    return appointments.filter((a) => {
      if (!a.date) return false;
      return startOfDay(new Date(a.date)).getTime() === today.getTime();
    }).length;
  }, [appointments]);

  const upcomingCount = useMemo(() => {
    const today = startOfDay();
    return appointments.filter((a) => {
      if (!a.date) return false;
      return startOfDay(new Date(a.date)).getTime() >= today.getTime();
    }).length;
  }, [appointments]);

  const newThisWeekCount = useMemo(() => {
    const cutoff = Date.now() - 7 * 24 * 60 * 60 * 1000;
    return appointments.filter((a) => {
      if (!a.createdAt) return false;
      return new Date(a.createdAt).getTime() >= cutoff;
    }).length;
  }, [appointments]);

  const filtered = useMemo(() => {
    const today = startOfDay();
    return appointments
      .filter((a) => (filter === "all" ? true : a.department === filter))
      .filter((a) => {
        if (range === "all") return true;
        if (!a.createdAt && range !== "upcoming") return false;
        if (range === "today") {
          if (!a.createdAt) return false;
          return startOfDay(new Date(a.createdAt)).getTime() === today.getTime();
        }
        if (range === "7d") {
          const cutoff = Date.now() - 7 * 24 * 60 * 60 * 1000;
          return a.createdAt ? new Date(a.createdAt).getTime() >= cutoff : false;
        }
        if (range === "30d") {
          const cutoff = Date.now() - 30 * 24 * 60 * 60 * 1000;
          return a.createdAt ? new Date(a.createdAt).getTime() >= cutoff : false;
        }
        if (range === "upcoming") {
          if (!a.date) return false;
          return startOfDay(new Date(a.date)).getTime() >= today.getTime();
        }
        return true;
      })
      .filter((a) => {
        if (!query) return true;
        const q = query.toLowerCase();
        return (
          a.name?.toLowerCase().includes(q) ||
          a.email?.toLowerCase().includes(q) ||
          a.phone?.includes(q) ||
          a.message?.toLowerCase().includes(q) ||
          a.department?.toLowerCase().includes(q)
        );
      })
      .sort((a, b) => {
        if (sort === "newest")
          return (
            new Date(b.createdAt || 0).getTime() -
            new Date(a.createdAt || 0).getTime()
          );
        if (sort === "oldest")
          return (
            new Date(a.createdAt || 0).getTime() -
            new Date(b.createdAt || 0).getTime()
          );
        if (sort === "appt_date")
          return (
            new Date(a.date || 0).getTime() - new Date(b.date || 0).getTime()
          );
        if (sort === "name") return (a.name || "").localeCompare(b.name || "");
        return 0;
      });
  }, [appointments, filter, range, query, sort]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const paged = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const maxDept = departmentCounts[0]?.[1] ?? 1;

  /* ============== LOGIN ============== */
  if (!isLoggedIn) {
    return (
      <main className="relative min-h-screen mesh-bg text-white -mt-[72px] md:-mt-[calc(72px+36px)] pt-[72px] md:pt-[calc(72px+36px)] flex items-center">
        <div className="absolute inset-0 grid-overlay opacity-50" />
        <div className="absolute -top-40 -right-32 w-[520px] h-[520px] rounded-full bg-brand-500/25 blur-3xl animate-float-slow" />
        <div className="absolute -bottom-40 -left-32 w-[420px] h-[420px] rounded-full bg-coral-500/20 blur-3xl animate-float-slow" />

        <div className="container-x relative grid lg:grid-cols-2 gap-12 items-center py-20">
          <div className="hidden lg:block">
            <div className="pill bg-white/10 border border-white/15 text-brand-200">
              <Shield className="w-3.5 h-3.5" />
              Staff portal · Secure access
            </div>
            <h1 className="heading-xl mt-5 text-balance">
              Welcome back,{" "}
              <span className="font-serif italic font-medium gradient-text">
                doctor.
              </span>
            </h1>
            <p className="mt-6 text-lg text-white/75 max-w-md leading-relaxed">
              Sign in to monitor live bookings, track department load, and
              keep the day moving.
            </p>

            <ul className="mt-10 space-y-4">
              {[
                "End-to-end encrypted",
                "Audit-logged sessions",
                "HIPAA-aligned storage",
              ].map((b) => (
                <li key={b} className="flex items-center gap-3 text-white/80">
                  <span className="w-7 h-7 rounded-full bg-emerald-500/20 text-emerald-300 grid place-items-center">
                    <Check className="w-4 h-4" />
                  </span>
                  {b}
                </li>
              ))}
            </ul>
          </div>

          <div className="reveal">
            <div className="rounded-3xl bg-white text-ink-900 p-8 md:p-10 shadow-2xl shadow-brand-900/30 border border-white/10">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-brand-400 to-brand-700 grid place-items-center text-white shadow-lg shadow-brand-500/30">
                  <CrossPlus className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-display font-extrabold text-lg text-ink-900">
                    Admin Login
                  </div>
                  <div className="text-xs text-ink-500">
                    Authorized personnel only
                  </div>
                </div>
              </div>

              {error && (
                <div className="mb-5 flex items-center gap-2 rounded-xl bg-red-50 border border-red-200 px-4 py-3 text-red-700 text-sm font-medium">
                  <Lock className="w-4 h-4" />
                  {error}
                </div>
              )}

              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <label className="label-base">Username</label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-ink-400" />
                    <input
                      type="text"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      placeholder="admin"
                      className="input-base pl-11"
                    />
                  </div>
                </div>

                <div>
                  <label className="label-base">Password</label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-ink-400" />
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="input-base pl-11"
                    />
                  </div>
                </div>

                <button type="submit" className="btn-primary w-full">
                  Sign in <Shield className="w-4 h-4" />
                </button>
              </form>

              <p className="mt-6 text-center text-xs text-ink-400">
                Trouble signing in? Contact IT at{" "}
                <a
                  href="mailto:it@newikejahospital.com"
                  className="text-brand-700 font-semibold"
                >
                  it@newikejahospital.com
                </a>
              </p>
            </div>
          </div>
        </div>
      </main>
    );
  }

  /* ============== DASHBOARD ============== */
  return (
    <main className="bg-ink-50/60 min-h-screen">
      <div className="container-x py-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div>
            <span className="eyebrow">Live monitoring</span>
            <h1 className="heading-lg mt-2 text-balance">Booking dashboard</h1>
            <p className="text-ink-600 mt-2">
              Real-time view of every appointment coming through New Ikeja
              Hospital.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => {
                fetchAppointments();
                fetchHealth();
              }}
              disabled={refreshing}
              className="inline-flex items-center gap-2 rounded-full bg-white border border-ink-100 hover:bg-ink-50 px-4 py-2 text-sm font-semibold text-ink-700 transition disabled:opacity-50"
            >
              <RefreshCw
                className={`w-4 h-4 ${refreshing ? "animate-spin" : ""}`}
              />
              Refresh
            </button>
            <label className="inline-flex items-center gap-2 rounded-full bg-white border border-ink-100 px-4 py-2 text-sm font-semibold text-ink-700 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={autoRefresh}
                onChange={(e) => setAutoRefresh(e.target.checked)}
                className="accent-brand-600"
              />
              Auto-refresh 30s
            </label>
            <button
              onClick={() => downloadCSV(filtered)}
              className="inline-flex items-center gap-2 rounded-full bg-ink-900 text-white hover:bg-ink-800 px-4 py-2 text-sm font-semibold transition"
            >
              <Download className="w-4 h-4" /> Export CSV
            </button>
            <button
              onClick={() => setIsLoggedIn(false)}
              className="inline-flex items-center gap-2 rounded-full bg-white border border-ink-100 hover:bg-red-50 hover:border-red-200 hover:text-red-700 px-4 py-2 text-sm font-semibold text-ink-700 transition"
            >
              <LogOut className="w-4 h-4" /> Logout
            </button>
          </div>
        </div>

        {/* System health row */}
        <div className="grid lg:grid-cols-3 gap-4 mt-8">
          <div className="lg:col-span-2 rounded-2xl bg-white border border-ink-100 p-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Activity className="w-4 h-4 text-emerald-600" />
                <span className="font-display font-bold">System health</span>
                {healthError ? (
                  <span className="pill bg-red-50 text-red-700 border border-red-100">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
                    Offline
                  </span>
                ) : health ? (
                  <span className="pill bg-emerald-50 text-emerald-700 border border-emerald-100">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse-soft" />
                    Operational
                  </span>
                ) : (
                  <span className="pill bg-ink-50 text-ink-500 border border-ink-100">
                    Checking…
                  </span>
                )}
              </div>
              <span className="text-xs text-ink-500">
                {lastFetched
                  ? `Last sync ${formatRelative(lastFetched.toISOString())}`
                  : "—"}
              </span>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-4 text-sm">
              <div className="rounded-xl bg-ink-50 p-3">
                <div className="text-[11px] uppercase tracking-wider text-ink-500 font-semibold flex items-center gap-1.5">
                  <Database className="w-3 h-3" /> MongoDB
                </div>
                <div
                  className={`mt-1 font-bold ${
                    health?.mongo === "connected"
                      ? "text-emerald-700"
                      : health
                      ? "text-amber-700"
                      : "text-ink-500"
                  }`}
                >
                  {health?.mongo ?? "—"}
                </div>
              </div>
              <div className="rounded-xl bg-ink-50 p-3">
                <div className="text-[11px] uppercase tracking-wider text-ink-500 font-semibold flex items-center gap-1.5">
                  <Mail className="w-3 h-3" /> Email
                </div>
                <div
                  className={`mt-1 font-bold ${
                    health?.email?.configured ? "text-emerald-700" : "text-amber-700"
                  }`}
                  title={health?.email?.user ?? ""}
                >
                  {health?.email?.user ?? (health ? "Not set" : "—")}
                </div>
              </div>
              <div className="rounded-xl bg-ink-50 p-3">
                <div className="text-[11px] uppercase tracking-wider text-ink-500 font-semibold flex items-center gap-1.5">
                  <Clock className="w-3 h-3" /> Uptime
                </div>
                <div className="mt-1 font-bold text-ink-900">
                  {health
                    ? health.uptimeSeconds < 3600
                      ? `${Math.round(health.uptimeSeconds / 60)}m`
                      : `${Math.round(health.uptimeSeconds / 3600)}h`
                    : "—"}
                </div>
              </div>
              <div className="rounded-xl bg-ink-50 p-3">
                <div className="text-[11px] uppercase tracking-wider text-ink-500 font-semibold flex items-center gap-1.5">
                  <Sparkles className="w-3 h-3" /> Status
                </div>
                <div className="mt-1 font-bold text-ink-900 capitalize">
                  {health?.status ?? "—"}
                </div>
              </div>
            </div>
          </div>

          {/* Department mini-chart */}
          <div className="rounded-2xl bg-white border border-ink-100 p-5">
            <div className="flex items-center gap-2 mb-3">
              <BarChart className="w-4 h-4 text-brand-600" />
              <span className="font-display font-bold">By department</span>
            </div>
            {departmentCounts.length === 0 ? (
              <p className="text-sm text-ink-500">No data yet.</p>
            ) : (
              <ul className="space-y-2.5">
                {departmentCounts.slice(0, 5).map(([dept, count]) => (
                  <li key={dept}>
                    <div className="flex items-center justify-between text-xs mb-1">
                      <span className="font-semibold text-ink-700 truncate pr-2">
                        {dept}
                      </span>
                      <span className="text-ink-500 font-mono">{count}</span>
                    </div>
                    <div className="h-1.5 rounded-full bg-ink-100 overflow-hidden">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-brand-400 to-brand-600 transition-all duration-700"
                        style={{ width: `${(count / maxDept) * 100}%` }}
                      />
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        {/* Stat cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
          {[
            {
              label: "Total appointments",
              value: appointments.length,
              icon: Calendar,
              grad: "from-brand-400 to-brand-700",
            },
            {
              label: "Today (booked for)",
              value: todayCount,
              icon: Clock,
              grad: "from-coral-400 to-coral-700",
            },
            {
              label: "Upcoming",
              value: upcomingCount,
              icon: Sparkles,
              grad: "from-violet-400 to-purple-700",
            },
            {
              label: "New this week",
              value: newThisWeekCount,
              icon: Users,
              grad: "from-emerald-400 to-teal-700",
            },
          ].map((c) => {
            const Icon = c.icon;
            return (
              <div
                key={c.label}
                className="rounded-2xl bg-white border border-ink-100 p-5 flex items-start justify-between"
              >
                <div>
                  <div className="text-xs uppercase tracking-wider text-ink-500 font-semibold">
                    {c.label}
                  </div>
                  <div className="font-display font-extrabold text-3xl text-ink-900 mt-1">
                    {c.value}
                  </div>
                </div>
                <div
                  className={`w-11 h-11 rounded-xl bg-gradient-to-br ${c.grad} text-white grid place-items-center shadow-lg shadow-black/10`}
                >
                  <Icon className="w-5 h-5" />
                </div>
              </div>
            );
          })}
        </div>

        {/* Filters bar */}
        <div className="mt-8 rounded-3xl bg-white border border-ink-100 p-4 md:p-5 grid lg:grid-cols-12 gap-3">
          <div className="lg:col-span-5 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-ink-400" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by name, email, phone, message..."
              className="input-base pl-11"
            />
          </div>

          <div className="lg:col-span-4 flex items-center gap-2">
            <Filter className="w-4 h-4 text-ink-400 shrink-0" />
            <div className="flex items-center gap-1 overflow-x-auto -mx-1 px-1">
              {(
                [
                  { k: "all", l: "All time" },
                  { k: "today", l: "Today" },
                  { k: "7d", l: "7 days" },
                  { k: "30d", l: "30 days" },
                  { k: "upcoming", l: "Upcoming" },
                ] as { k: DateRange; l: string }[]
              ).map((r) => (
                <button
                  key={r.k}
                  onClick={() => setRange(r.k)}
                  className={`shrink-0 px-3 py-1.5 rounded-full text-xs font-semibold transition ${
                    range === r.k
                      ? "bg-ink-900 text-white"
                      : "bg-ink-50 text-ink-700 hover:bg-ink-100"
                  }`}
                >
                  {r.l}
                </button>
              ))}
            </div>
          </div>

          <div className="lg:col-span-3">
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as SortKey)}
              className="input-base !py-3"
            >
              <option value="newest">Newest first</option>
              <option value="oldest">Oldest first</option>
              <option value="appt_date">Appointment date ↑</option>
              <option value="name">Name (A → Z)</option>
            </select>
          </div>

          <div className="lg:col-span-12 flex items-center gap-2 overflow-x-auto -mx-1 px-1 pt-1">
            <button
              onClick={() => setFilter("all")}
              className={`shrink-0 px-3.5 py-1.5 rounded-full text-xs font-semibold transition ${
                filter === "all"
                  ? "bg-brand-600 text-white"
                  : "bg-ink-50 text-ink-700 hover:bg-ink-100"
              }`}
            >
              All departments
            </button>
            {departments.map((d) => (
              <button
                key={d}
                onClick={() => setFilter(d)}
                className={`shrink-0 px-3.5 py-1.5 rounded-full text-xs font-semibold transition ${
                  filter === d
                    ? "bg-brand-600 text-white"
                    : "bg-ink-50 text-ink-700 hover:bg-ink-100"
                }`}
              >
                {d}
              </button>
            ))}
          </div>
        </div>

        {/* Appointments */}
        <div className="mt-6 rounded-3xl bg-white border border-ink-100 overflow-hidden">
          <div className="px-5 md:px-7 py-5 border-b border-ink-100 flex items-center justify-between gap-3">
            <h2 className="font-display font-bold text-lg">
              Appointments{" "}
              <span className="text-ink-400 font-semibold">
                ({filtered.length}
                {filtered.length !== appointments.length
                  ? ` of ${appointments.length}`
                  : ""}
                )
              </span>
            </h2>
            <span className="text-xs text-ink-500 hidden sm:block">
              Page {page} of {totalPages}
            </span>
          </div>

          {loading ? (
            <div className="p-12 text-center">
              <div className="w-10 h-10 rounded-full border-4 border-brand-200 border-t-brand-600 animate-spin mx-auto" />
              <p className="text-ink-500 mt-4">Loading appointments...</p>
            </div>
          ) : filtered.length === 0 ? (
            <div className="p-16 text-center">
              <div className="w-16 h-16 rounded-2xl bg-ink-50 grid place-items-center mx-auto text-ink-400">
                <Calendar className="w-7 h-7" />
              </div>
              <p className="font-display font-bold text-lg mt-4">
                No appointments found
              </p>
              <p className="text-ink-500 mt-1 text-sm">
                Try clearing filters or searching for something else.
              </p>
            </div>
          ) : (
            <>
              {/* Desktop table */}
              <div className="hidden lg:block overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-ink-50 text-left text-xs uppercase tracking-wider text-ink-500">
                      <th className="px-7 py-4 font-semibold">#</th>
                      <th className="px-4 py-4 font-semibold">Patient</th>
                      <th className="px-4 py-4 font-semibold">Contact</th>
                      <th className="px-4 py-4 font-semibold">Appt date</th>
                      <th className="px-4 py-4 font-semibold">Department</th>
                      <th className="px-4 py-4 font-semibold">Submitted</th>
                      <th className="px-4 py-4 font-semibold w-10" />
                    </tr>
                  </thead>
                  <tbody>
                    {paged.map((a, i) => {
                      const initial = a.name?.charAt(0)?.toUpperCase() ?? "?";
                      const deptClass =
                        deptColors[a.department] || "bg-ink-50 text-ink-700";
                      const indexNum = (page - 1) * PAGE_SIZE + i + 1;
                      return (
                        <tr
                          key={a._id ?? i}
                          onClick={() => setSelected(a)}
                          className="border-t border-ink-100 hover:bg-ink-50/60 cursor-pointer transition-colors"
                        >
                          <td className="px-7 py-5 text-ink-400 font-mono text-sm">
                            {String(indexNum).padStart(2, "0")}
                          </td>
                          <td className="px-4 py-5">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-brand-400 to-brand-700 text-white font-bold grid place-items-center">
                                {initial}
                              </div>
                              <div>
                                <div className="font-semibold text-ink-900">
                                  {a.name}
                                </div>
                                <div className="text-xs text-ink-500">
                                  {a.email}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="px-4 py-5">
                            <a
                              onClick={(e) => e.stopPropagation()}
                              href={`tel:${a.phone}`}
                              className="text-sm text-ink-700 flex items-center gap-1.5 hover:text-brand-700 transition"
                            >
                              <Phone className="w-3.5 h-3.5 text-ink-400" />
                              {a.phone}
                            </a>
                            <a
                              onClick={(e) => e.stopPropagation()}
                              href={`mailto:${a.email}`}
                              className="text-xs text-ink-500 flex items-center gap-1.5 mt-1 hover:text-brand-700 transition"
                            >
                              <Mail className="w-3.5 h-3.5 text-ink-400" />
                              {a.email}
                            </a>
                          </td>
                          <td className="px-4 py-5">
                            <div className="font-semibold text-ink-900">
                              {a.date || "—"}
                            </div>
                          </td>
                          <td className="px-4 py-5">
                            <span
                              className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold ${deptClass}`}
                            >
                              {a.department}
                            </span>
                          </td>
                          <td className="px-4 py-5">
                            <div className="text-sm text-ink-700">
                              {formatDateTime(a.createdAt)}
                            </div>
                            <div className="text-xs text-ink-400">
                              {formatRelative(a.createdAt)}
                            </div>
                          </td>
                          <td className="px-4 py-5 text-ink-400">
                            <ChevronRight className="w-4 h-4" />
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              {/* Mobile cards */}
              <div className="lg:hidden divide-y divide-ink-100">
                {paged.map((a, i) => {
                  const deptClass =
                    deptColors[a.department] || "bg-ink-50 text-ink-700";
                  return (
                    <button
                      key={a._id ?? i}
                      onClick={() => setSelected(a)}
                      className="w-full text-left p-5 hover:bg-ink-50/60 transition"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-brand-400 to-brand-700 text-white font-bold grid place-items-center">
                          {a.name?.charAt(0)?.toUpperCase()}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="font-semibold text-ink-900 truncate">
                            {a.name}
                          </div>
                          <div className="text-xs text-ink-500 truncate">
                            {a.email}
                          </div>
                        </div>
                        <span
                          className={`inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-semibold ${deptClass}`}
                        >
                          {a.department}
                        </span>
                      </div>
                      <div className="mt-3 grid grid-cols-2 gap-3 text-sm">
                        <div>
                          <div className="text-xs text-ink-500">Phone</div>
                          <div className="font-medium">{a.phone}</div>
                        </div>
                        <div>
                          <div className="text-xs text-ink-500">Appt date</div>
                          <div className="font-medium">{a.date || "—"}</div>
                        </div>
                      </div>
                      <div className="text-xs text-ink-400 mt-2">
                        Submitted {formatRelative(a.createdAt)}
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex items-center justify-between gap-3 px-5 md:px-7 py-4 border-t border-ink-100">
                  <span className="text-sm text-ink-500">
                    Showing{" "}
                    <span className="font-semibold text-ink-900">
                      {(page - 1) * PAGE_SIZE + 1}–
                      {Math.min(page * PAGE_SIZE, filtered.length)}
                    </span>{" "}
                    of {filtered.length}
                  </span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setPage((p) => Math.max(1, p - 1))}
                      disabled={page === 1}
                      className="w-9 h-9 grid place-items-center rounded-full border border-ink-100 text-ink-700 hover:bg-ink-50 disabled:opacity-30 disabled:cursor-not-allowed transition"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <span className="text-sm font-mono text-ink-600 px-2">
                      {page} / {totalPages}
                    </span>
                    <button
                      onClick={() =>
                        setPage((p) => Math.min(totalPages, p + 1))
                      }
                      disabled={page === totalPages}
                      className="w-9 h-9 grid place-items-center rounded-full border border-ink-100 text-ink-700 hover:bg-ink-50 disabled:opacity-30 disabled:cursor-not-allowed transition"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {/* Detail drawer */}
      <div
        className={`fixed inset-0 z-50 transition-opacity duration-300 ${
          selected ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        <div
          className="absolute inset-0 bg-ink-950/60 backdrop-blur-sm"
          onClick={() => setSelected(null)}
        />
        <aside
          className={`absolute right-0 top-0 h-full w-full sm:w-[480px] bg-white shadow-2xl transition-transform duration-500 overflow-y-auto ${
            selected ? "translate-x-0" : "translate-x-full"
          }`}
        >
          {selected && (
            <div>
              {/* Drawer header */}
              <div className="relative bg-gradient-to-br from-ink-900 via-ink-950 to-brand-900 text-white p-7 overflow-hidden">
                <div className="absolute inset-0 grid-overlay opacity-30" />
                <div className="absolute -top-16 -right-16 w-48 h-48 rounded-full bg-brand-400/30 blur-3xl" />
                <div className="relative flex items-start justify-between gap-4">
                  <div>
                    <span className="pill bg-white/10 border border-white/15 text-brand-200">
                      <Calendar className="w-3 h-3" />
                      Appointment
                    </span>
                    <h3 className="font-display font-bold text-2xl mt-3">
                      {selected.name}
                    </h3>
                    <p className="text-white/65 text-sm mt-1">
                      {selected.email}
                    </p>
                  </div>
                  <button
                    onClick={() => setSelected(null)}
                    className="w-9 h-9 grid place-items-center rounded-full bg-white/10 border border-white/15 hover:bg-white/20 transition"
                    aria-label="Close"
                  >
                    <Close className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Quick actions */}
              <div className="p-6 grid grid-cols-2 gap-2">
                <a
                  href={`tel:${selected.phone}`}
                  className="rounded-xl bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 text-emerald-800 px-4 py-3 text-sm font-semibold flex items-center gap-2 transition"
                >
                  <Phone className="w-4 h-4" /> Call
                </a>
                <a
                  href={`mailto:${selected.email}`}
                  className="rounded-xl bg-brand-50 hover:bg-brand-100 border border-brand-200 text-brand-800 px-4 py-3 text-sm font-semibold flex items-center gap-2 transition"
                >
                  <Mail className="w-4 h-4" /> Email
                </a>
              </div>

              {/* Details */}
              <div className="px-6 pb-6 space-y-4">
                <DetailRow icon={Calendar} label="Appointment date" value={selected.date || "—"} />
                <DetailRow
                  icon={CrossPlus}
                  label="Department"
                  value={selected.department}
                  pillClass={deptColors[selected.department]}
                />
                <DetailRow icon={Phone} label="Phone" value={selected.phone} />
                <DetailRow icon={Mail} label="Email" value={selected.email} />
                <DetailRow
                  icon={Clock}
                  label="Submitted"
                  value={`${formatDateTime(selected.createdAt)} · ${formatRelative(selected.createdAt)}`}
                />
                <div>
                  <div className="text-xs uppercase tracking-wider text-ink-500 font-semibold flex items-center gap-2 mb-2">
                    <MessageSquare className="w-3.5 h-3.5" /> Message
                  </div>
                  <div className="rounded-2xl bg-ink-50 border border-ink-100 p-4 text-ink-800 leading-relaxed text-[15px]">
                    {selected.message || (
                      <span className="text-ink-400 italic">
                        No message provided.
                      </span>
                    )}
                  </div>
                </div>

                <div className="pt-2">
                  <div className="text-xs uppercase tracking-wider text-ink-500 font-semibold mb-2 flex items-center gap-2">
                    <MapPin className="w-3.5 h-3.5" /> Record ID
                  </div>
                  <code className="block text-xs text-ink-600 bg-ink-50 border border-ink-100 rounded-lg px-3 py-2 break-all">
                    {selected._id ?? "—"}
                  </code>
                </div>
              </div>
            </div>
          )}
        </aside>
      </div>
    </main>
  );
}

function DetailRow({
  icon: Icon,
  label,
  value,
  pillClass,
}: {
  icon: (p: React.SVGProps<SVGSVGElement>) => React.ReactElement;
  label: string;
  value: string;
  pillClass?: string;
}) {
  return (
    <div className="flex items-start gap-3">
      <div className="w-9 h-9 shrink-0 rounded-lg bg-ink-50 text-ink-600 grid place-items-center">
        <Icon className="w-4 h-4" />
      </div>
      <div className="flex-1 min-w-0">
        <div className="text-xs uppercase tracking-wider text-ink-500 font-semibold">
          {label}
        </div>
        {pillClass ? (
          <span
            className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold mt-1 ${pillClass}`}
          >
            {value}
          </span>
        ) : (
          <div className="font-semibold text-ink-900 mt-0.5 break-words">
            {value}
          </div>
        )}
      </div>
    </div>
  );
}
