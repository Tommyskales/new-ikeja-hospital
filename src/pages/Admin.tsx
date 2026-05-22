import { useEffect, useState } from "react";
import {
  Calendar,
  Check,
  Clock,
  CrossPlus,
  LogOut,
  Lock,
  Mail,
  Phone,
  Search,
  Shield,
  User,
  Users,
} from "../components/Icons";

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

const deptColors: Record<string, string> = {
  "General Medicine": "bg-brand-50 text-brand-700",
  "Cardiology": "bg-rose-50 text-rose-700",
  "Pediatrics": "bg-amber-50 text-amber-700",
  "Maternity": "bg-pink-50 text-pink-700",
  "Surgery": "bg-violet-50 text-violet-700",
  "Diagnostics": "bg-emerald-50 text-emerald-700",
  "Neurology": "bg-purple-50 text-purple-700",
  "Orthopaedics": "bg-teal-50 text-teal-700",
};

export default function Admin() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [appointments, setAppointments] = useState<AppointmentRecord[]>([]);
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<string>("all");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === "admin" && password === "hospital123") {
      setIsLoggedIn(true);
      setError("");
    } else {
      setError("Invalid username or password");
    }
  };

  useEffect(() => {
    if (isLoggedIn) {
      setLoading(true);
      fetch("https://new-ikeja-hospital.onrender.com/appointments")
        .then((res) => res.json())
        .then((data) => setAppointments(data))
        .catch(() => alert("Error fetching appointments"))
        .finally(() => setLoading(false));
    }
  }, [isLoggedIn]);

  const filtered = appointments
    .filter((a) =>
      filter === "all" ? true : a.department === filter
    )
    .filter((a) => {
      if (!query) return true;
      const q = query.toLowerCase();
      return (
        a.name?.toLowerCase().includes(q) ||
        a.email?.toLowerCase().includes(q) ||
        a.phone?.includes(q) ||
        a.message?.toLowerCase().includes(q)
      );
    });

  const todayCount = appointments.filter((a) => {
    if (!a.date) return false;
    const d = new Date(a.date);
    const today = new Date();
    return d.toDateString() === today.toDateString();
  }).length;

  const departments = Array.from(
    new Set(appointments.map((a) => a.department).filter(Boolean))
  );

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
              Sign in to view today's appointments, manage records and keep
              the day moving.
            </p>

            <ul className="mt-10 space-y-4">
              {[
                "End-to-end encrypted",
                "Audit-logged sessions",
                "HIPAA-aligned storage",
              ].map((b) => (
                <li
                  key={b}
                  className="flex items-center gap-3 text-white/80"
                >
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
                <a href="mailto:it@newikejahospital.com" className="text-brand-700 font-semibold">
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
            <span className="eyebrow">Dashboard</span>
            <h1 className="heading-lg mt-2 text-balance">
              Good day, Admin.
            </h1>
            <p className="text-ink-600 mt-2">
              Here's everything happening at the hospital today.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-2 rounded-full bg-white border border-ink-100 px-4 py-2 text-sm text-ink-600">
              <Clock className="w-4 h-4 text-brand-600" />
              {new Date().toLocaleString([], {
                weekday: "short",
                month: "short",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              })}
            </div>
            <button
              onClick={() => setIsLoggedIn(false)}
              className="inline-flex items-center gap-2 rounded-full bg-white border border-ink-100 hover:bg-red-50 hover:border-red-200 hover:text-red-700 px-4 py-2 text-sm font-semibold text-ink-700 transition"
            >
              <LogOut className="w-4 h-4" /> Logout
            </button>
          </div>
        </div>

        {/* Stat cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-10">
          {[
            {
              label: "Total appointments",
              value: appointments.length,
              icon: Calendar,
              grad: "from-brand-400 to-brand-700",
            },
            {
              label: "Today",
              value: todayCount,
              icon: Clock,
              grad: "from-coral-400 to-coral-700",
            },
            {
              label: "Departments",
              value: departments.length,
              icon: Users,
              grad: "from-violet-400 to-purple-700",
            },
            {
              label: "Status",
              value: "Live",
              icon: Shield,
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
        <div className="mt-8 rounded-3xl bg-white border border-ink-100 p-4 md:p-5 flex flex-col md:flex-row md:items-center gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-ink-400" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by name, email, phone..."
              className="input-base pl-11"
            />
          </div>
          <div className="flex items-center gap-2 overflow-x-auto md:overflow-visible -mx-1 px-1">
            <button
              onClick={() => setFilter("all")}
              className={`shrink-0 px-3.5 py-2 rounded-full text-sm font-semibold transition ${
                filter === "all"
                  ? "bg-ink-900 text-white"
                  : "bg-ink-50 text-ink-700 hover:bg-ink-100"
              }`}
            >
              All
            </button>
            {departments.map((d) => (
              <button
                key={d}
                onClick={() => setFilter(d)}
                className={`shrink-0 px-3.5 py-2 rounded-full text-sm font-semibold transition ${
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
          <div className="px-5 md:px-7 py-5 border-b border-ink-100 flex items-center justify-between">
            <h2 className="font-display font-bold text-lg">
              Appointments{" "}
              <span className="text-ink-400 font-semibold">
                ({filtered.length})
              </span>
            </h2>
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
                      <th className="px-4 py-4 font-semibold">Date</th>
                      <th className="px-4 py-4 font-semibold">Department</th>
                      <th className="px-4 py-4 font-semibold">Message</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filtered.map((a, i) => {
                      const initial = a.name?.charAt(0)?.toUpperCase() ?? "?";
                      const deptClass =
                        deptColors[a.department] || "bg-ink-50 text-ink-700";
                      return (
                        <tr
                          key={a._id ?? i}
                          className="border-t border-ink-100 hover:bg-ink-50/60 transition-colors"
                        >
                          <td className="px-7 py-5 text-ink-400 font-mono text-sm">
                            {String(i + 1).padStart(2, "0")}
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
                            <div className="text-sm text-ink-700 flex items-center gap-1.5">
                              <Phone className="w-3.5 h-3.5 text-ink-400" />
                              {a.phone}
                            </div>
                            <div className="text-xs text-ink-500 flex items-center gap-1.5 mt-1">
                              <Mail className="w-3.5 h-3.5 text-ink-400" />
                              {a.email}
                            </div>
                          </td>
                          <td className="px-4 py-5">
                            <div className="font-semibold text-ink-900">
                              {a.date}
                            </div>
                          </td>
                          <td className="px-4 py-5">
                            <span
                              className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold ${deptClass}`}
                            >
                              {a.department}
                            </span>
                          </td>
                          <td className="px-4 py-5 max-w-sm">
                            <p className="text-sm text-ink-600 truncate">
                              {a.message}
                            </p>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              {/* Mobile cards */}
              <div className="lg:hidden divide-y divide-ink-100">
                {filtered.map((a, i) => {
                  const deptClass =
                    deptColors[a.department] || "bg-ink-50 text-ink-700";
                  return (
                    <div key={a._id ?? i} className="p-5">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-brand-400 to-brand-700 text-white font-bold grid place-items-center">
                          {a.name?.charAt(0)?.toUpperCase()}
                        </div>
                        <div className="flex-1">
                          <div className="font-semibold text-ink-900">
                            {a.name}
                          </div>
                          <div className="text-xs text-ink-500">{a.email}</div>
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
                          <div className="text-xs text-ink-500">Date</div>
                          <div className="font-medium">{a.date}</div>
                        </div>
                      </div>
                      {a.message && (
                        <p className="mt-3 text-sm text-ink-600 bg-ink-50 rounded-xl p-3">
                          {a.message}
                        </p>
                      )}
                    </div>
                  );
                })}
              </div>
            </>
          )}
        </div>
      </div>
    </main>
  );
}
