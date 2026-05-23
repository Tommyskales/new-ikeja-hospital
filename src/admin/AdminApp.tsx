import { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { Lock, Shield, ShieldCheck, User } from "lucide-react";
import AdminLayout from "./AdminLayout";
import Dashboard from "./pages/Dashboard";
import Patients from "./pages/Patients";
import Staff from "./pages/Staff";
import Appointments from "./pages/Appointments";
import Departments from "./pages/Departments";
import Billing from "./pages/Billing";
import Pharmacy from "./pages/Pharmacy";
import Reports from "./pages/Reports";
import Settings from "./pages/Settings";

export default function AdminApp() {
  const [authed, setAuthed] = useState(false);

  if (!authed) return <LoginScreen onLogin={() => setAuthed(true)} />;

  return (
    <Routes>
      <Route element={<AdminLayout onLogout={() => setAuthed(false)} />}>
        <Route index element={<Dashboard />} />
        <Route path="patients" element={<Patients />} />
        <Route path="staff" element={<Staff />} />
        <Route path="appointments" element={<Appointments />} />
        <Route path="departments" element={<Departments />} />
        <Route path="billing" element={<Billing />} />
        <Route path="pharmacy" element={<Pharmacy />} />
        <Route path="reports" element={<Reports />} />
        <Route path="settings" element={<Settings />} />
        <Route path="*" element={<Navigate to="/admin" replace />} />
      </Route>
    </Routes>
  );
}

function LoginScreen({ onLogin }: { onLogin: () => void }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === "admin" && password === "hospital123") {
      onLogin();
    } else {
      setError("Invalid username or password");
    }
  };

  return (
    <main className="min-h-screen mesh-bg text-white flex items-center relative overflow-hidden">
      <div className="absolute inset-0 grid-overlay opacity-40" />
      <div className="absolute -top-40 -right-32 w-[520px] h-[520px] rounded-full bg-brand-500/25 blur-3xl animate-float-slow" />
      <div className="absolute -bottom-40 -left-32 w-[420px] h-[420px] rounded-full bg-coral-500/20 blur-3xl animate-float-slow" />

      <div className="container-x relative grid lg:grid-cols-2 gap-12 items-center py-20">
        <div className="hidden lg:block">
          <div className="pill bg-white/10 border border-white/15 text-brand-200">
            <Shield className="w-3.5 h-3.5" />
            Hospital Operating System
          </div>
          <h1 className="heading-xl mt-5 text-balance">
            Run the hospital{" "}
            <span className="font-serif italic font-medium gradient-text">
              from one screen.
            </span>
          </h1>
          <p className="mt-6 text-lg text-white/75 max-w-md leading-relaxed">
            Sign in to monitor live operations, patients, staff, billing,
            pharmacy and more.
          </p>
        </div>

        <div className="rounded-3xl bg-white text-ink-900 p-8 md:p-10 shadow-2xl shadow-brand-900/30 border border-white/10">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-brand-400 to-brand-700 grid place-items-center text-white shadow-lg shadow-brand-500/30">
              <ShieldCheck className="w-5 h-5" />
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

          <form onSubmit={submit} className="space-y-4">
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
            Demo: <span className="font-mono">admin</span> /{" "}
            <span className="font-mono">hospital123</span>
          </p>
        </div>
      </div>
    </main>
  );
}
