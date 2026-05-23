import { useEffect, useMemo, useState } from "react";
import {
  CalendarPlus,
  Check,
  Clock,
  Filter,
  Mail,
  Phone,
  RefreshCw,
  Search,
} from "lucide-react";
import Card from "../components/Card";
import Modal from "../components/Modal";
import StatusBadge from "../components/StatusBadge";
import { mockAppointments } from "../data/mock";
import type { ApptStatus, MockAppointment } from "../data/mock";

const API_BASE = "https://new-ikeja-hospital.onrender.com";

interface ApiAppointment {
  _id?: string;
  name: string;
  email: string;
  phone: string;
  date: string;
  department: string;
  message: string;
  createdAt?: string;
}

const statusOptions: ("All" | ApptStatus)[] = [
  "All",
  "Confirmed",
  "Pending",
  "Cancelled",
];

export default function Appointments() {
  const [tab, setTab] = useState<"live" | "scheduled">("live");
  const [open, setOpen] = useState(false);

  // Live data from backend
  const [live, setLive] = useState<ApiAppointment[]>([]);
  const [liveLoading, setLiveLoading] = useState(true);
  const [liveError, setLiveError] = useState<string | null>(null);

  // Scheduled (mock) data
  const [scheduled, setScheduled] = useState<MockAppointment[]>(mockAppointments);
  const [statusFilter, setStatusFilter] = useState<"All" | ApptStatus>("All");
  const [query, setQuery] = useState("");

  const fetchLive = async () => {
    setLiveLoading(true);
    try {
      const res = await fetch(`${API_BASE}/appointments`);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      setLive(Array.isArray(data) ? data : []);
      setLiveError(null);
    } catch (err: unknown) {
      const e = err as { message?: string };
      setLiveError(e?.message ?? "Could not reach the API.");
    } finally {
      setLiveLoading(false);
    }
  };

  useEffect(() => {
    fetchLive();
    const id = window.setInterval(fetchLive, 30000);
    return () => window.clearInterval(id);
  }, []);

  const filteredScheduled = useMemo(() => {
    return scheduled.filter((a) => {
      if (statusFilter !== "All" && a.status !== statusFilter) return false;
      if (!query) return true;
      const q = query.toLowerCase();
      return (
        a.patient.toLowerCase().includes(q) ||
        a.doctor.toLowerCase().includes(q) ||
        a.department.toLowerCase().includes(q)
      );
    });
  }, [scheduled, statusFilter, query]);

  return (
    <div className="space-y-5">
      {/* Tabs + Book button */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="inline-flex bg-white border border-ink-100 rounded-full p-1 self-start">
          <button
            onClick={() => setTab("live")}
            className={`px-4 py-2 rounded-full text-sm font-semibold transition ${
              tab === "live"
                ? "bg-ink-900 text-white"
                : "text-ink-600 hover:text-ink-900"
            }`}
          >
            Live bookings
            <span className="ml-2 inline-flex w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse-soft" />
          </button>
          <button
            onClick={() => setTab("scheduled")}
            className={`px-4 py-2 rounded-full text-sm font-semibold transition ${
              tab === "scheduled"
                ? "bg-ink-900 text-white"
                : "text-ink-600 hover:text-ink-900"
            }`}
          >
            Scheduled
          </button>
        </div>

        <div className="flex items-center gap-2">
          {tab === "live" && (
            <button
              onClick={fetchLive}
              disabled={liveLoading}
              className="inline-flex items-center gap-2 rounded-full bg-white border border-ink-100 hover:bg-ink-50 px-4 py-2 text-sm font-semibold text-ink-700 transition disabled:opacity-50"
            >
              <RefreshCw
                className={`w-4 h-4 ${liveLoading ? "animate-spin" : ""}`}
              />
              Refresh
            </button>
          )}
          <button onClick={() => setOpen(true)} className="btn-primary !py-2.5 !px-5">
            <CalendarPlus className="w-4 h-4" /> Book Appointment
          </button>
        </div>
      </div>

      {tab === "live" ? (
        <LiveTable
          live={live}
          loading={liveLoading}
          error={liveError}
          onRetry={fetchLive}
        />
      ) : (
        <>
          <Card>
            <div className="flex flex-col lg:flex-row gap-3">
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-ink-400" />
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search by patient, doctor or department..."
                  className="input-base pl-11"
                />
              </div>
              <div className="flex items-center gap-2 overflow-x-auto -mx-1 px-1">
                <Filter className="w-4 h-4 text-ink-400 shrink-0" />
                {statusOptions.map((s) => (
                  <button
                    key={s}
                    onClick={() => setStatusFilter(s)}
                    className={`shrink-0 px-3.5 py-2 rounded-full text-xs font-semibold transition ${
                      statusFilter === s
                        ? "bg-ink-900 text-white"
                        : "bg-ink-50 text-ink-700 hover:bg-ink-100"
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          </Card>

          <Card padding={false}>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-ink-50 text-left text-xs uppercase tracking-wider text-ink-500">
                    <th className="px-6 py-3.5 font-semibold">Patient</th>
                    <th className="px-4 py-3.5 font-semibold">Doctor</th>
                    <th className="px-4 py-3.5 font-semibold">Department</th>
                    <th className="px-4 py-3.5 font-semibold">When</th>
                    <th className="px-4 py-3.5 font-semibold">Status</th>
                    <th className="px-4 py-3.5 font-semibold w-32">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredScheduled.map((a) => (
                    <tr
                      key={a.id}
                      className="border-t border-ink-100 hover:bg-ink-50/50 transition"
                    >
                      <td className="px-6 py-4">
                        <div className="font-semibold text-ink-900">
                          {a.patient}
                        </div>
                        <div className="text-xs text-ink-500 font-mono">
                          {a.id}
                        </div>
                      </td>
                      <td className="px-4 py-4 text-ink-700">{a.doctor}</td>
                      <td className="px-4 py-4">
                        <span className="inline-flex items-center px-2 py-1 rounded-full bg-brand-50 text-brand-700 text-xs font-semibold">
                          {a.department}
                        </span>
                      </td>
                      <td className="px-4 py-4 text-ink-700">
                        <div className="font-semibold">{a.date}</div>
                        <div className="text-xs text-ink-500 flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {a.time}
                        </div>
                      </td>
                      <td className="px-4 py-4">
                        <StatusBadge status={a.status} />
                      </td>
                      <td className="px-4 py-4">
                        <div className="flex items-center gap-1.5">
                          {a.status !== "Confirmed" && (
                            <button
                              onClick={() =>
                                setScheduled((p) =>
                                  p.map((x) =>
                                    x.id === a.id
                                      ? { ...x, status: "Confirmed" }
                                      : x
                                  )
                                )
                              }
                              className="text-xs px-2.5 py-1 rounded-md bg-emerald-50 text-emerald-700 hover:bg-emerald-100 font-semibold transition flex items-center gap-1"
                            >
                              <Check className="w-3 h-3" />
                              Confirm
                            </button>
                          )}
                          {a.status !== "Cancelled" && (
                            <button
                              onClick={() =>
                                setScheduled((p) =>
                                  p.map((x) =>
                                    x.id === a.id
                                      ? { ...x, status: "Cancelled" }
                                      : x
                                  )
                                )
                              }
                              className="text-xs px-2.5 py-1 rounded-md bg-red-50 text-red-700 hover:bg-red-100 font-semibold transition"
                            >
                              Cancel
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </>
      )}

      <BookModal
        open={open}
        onClose={() => setOpen(false)}
        onCreate={(a) => setScheduled((p) => [a, ...p])}
      />
    </div>
  );
}

function LiveTable({
  live,
  loading,
  error,
  onRetry,
}: {
  live: ApiAppointment[];
  loading: boolean;
  error: string | null;
  onRetry: () => void;
}) {
  return (
    <Card padding={false}>
      <div className="px-6 py-4 border-b border-ink-100 flex items-center justify-between">
        <div>
          <h3 className="font-display font-bold text-lg">
            Live bookings{" "}
            <span className="text-ink-400 font-semibold">({live.length})</span>
          </h3>
          <p className="text-xs text-ink-500">
            Real-time data from the public booking form. Auto-refreshes every 30s.
          </p>
        </div>
      </div>

      {error && (
        <div className="mx-6 mt-4 rounded-2xl bg-red-50 border border-red-200 p-4 flex items-center gap-3">
          <div className="flex-1">
            <div className="font-display font-bold text-red-900">
              Couldn't load live bookings
            </div>
            <p className="text-sm text-red-800 mt-1">{error}</p>
          </div>
          <button
            onClick={onRetry}
            className="rounded-full bg-red-600 hover:bg-red-700 text-white px-4 py-2 text-sm font-semibold flex items-center gap-2 shrink-0"
          >
            <RefreshCw className="w-4 h-4" /> Retry
          </button>
        </div>
      )}

      {loading && live.length === 0 ? (
        <div className="p-12 text-center">
          <div className="w-10 h-10 rounded-full border-4 border-brand-200 border-t-brand-600 animate-spin mx-auto" />
          <p className="text-ink-500 mt-4 text-sm">Loading live bookings...</p>
        </div>
      ) : live.length === 0 && !error ? (
        <div className="p-12 text-center">
          <p className="font-display font-bold">No live bookings yet</p>
          <p className="text-sm text-ink-500 mt-1">
            New form submissions will appear here automatically.
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-ink-50 text-left text-xs uppercase tracking-wider text-ink-500">
                <th className="px-6 py-3.5 font-semibold">Patient</th>
                <th className="px-4 py-3.5 font-semibold">Contact</th>
                <th className="px-4 py-3.5 font-semibold">Department</th>
                <th className="px-4 py-3.5 font-semibold">Appt date</th>
                <th className="px-4 py-3.5 font-semibold">Submitted</th>
              </tr>
            </thead>
            <tbody>
              {live.slice(0, 25).map((a, i) => (
                <tr
                  key={a._id ?? i}
                  className="border-t border-ink-100 hover:bg-ink-50/50 transition"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-gradient-to-br from-brand-400 to-brand-700 text-white text-xs font-bold grid place-items-center">
                        {(a.name?.[0] ?? "?").toUpperCase()}
                      </div>
                      <div>
                        <div className="font-semibold text-ink-900">
                          {a.name}
                        </div>
                        <div className="text-xs text-ink-500">
                          {a.message?.slice(0, 40)}
                          {(a.message?.length ?? 0) > 40 ? "…" : ""}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <a
                      href={`tel:${a.phone}`}
                      className="text-xs flex items-center gap-1.5 text-ink-700 hover:text-brand-700"
                    >
                      <Phone className="w-3 h-3 text-ink-400" />
                      {a.phone}
                    </a>
                    <a
                      href={`mailto:${a.email}`}
                      className="text-xs flex items-center gap-1.5 text-ink-500 hover:text-brand-700 mt-0.5"
                    >
                      <Mail className="w-3 h-3 text-ink-400" />
                      {a.email}
                    </a>
                  </td>
                  <td className="px-4 py-4">
                    <span className="inline-flex items-center px-2 py-1 rounded-full bg-brand-50 text-brand-700 text-xs font-semibold">
                      {a.department}
                    </span>
                  </td>
                  <td className="px-4 py-4 text-ink-700 whitespace-nowrap">
                    {a.date || "—"}
                  </td>
                  <td className="px-4 py-4 text-xs text-ink-500 whitespace-nowrap">
                    {a.createdAt
                      ? new Date(a.createdAt).toLocaleString([], {
                          month: "short",
                          day: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        })
                      : "—"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </Card>
  );
}

function BookModal({
  open,
  onClose,
  onCreate,
}: {
  open: boolean;
  onClose: () => void;
  onCreate: (a: MockAppointment) => void;
}) {
  const [form, setForm] = useState({
    patient: "",
    doctor: "Dr. Adaeze Okafor",
    department: "Cardiology",
    date: "Today",
    time: "09:00",
    status: "Confirmed" as ApptStatus,
  });

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.patient.trim()) return;
    onCreate({
      id: `APT-${Math.floor(80000 + Math.random() * 9999)}`,
      ...form,
    });
    setForm({
      patient: "",
      doctor: "Dr. Adaeze Okafor",
      department: "Cardiology",
      date: "Today",
      time: "09:00",
      status: "Confirmed",
    });
    onClose();
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Book a new appointment"
      subtitle="Schedule a slot with one of our consultants."
      footer={
        <>
          <button onClick={onClose} className="btn-ghost-dark !py-2.5 !px-5">
            Cancel
          </button>
          <button onClick={submit} className="btn-primary !py-2.5 !px-5">
            <CalendarPlus className="w-4 h-4" /> Book
          </button>
        </>
      }
    >
      <form onSubmit={submit} className="grid sm:grid-cols-2 gap-5">
        <div className="sm:col-span-2">
          <label className="label-base">Patient name</label>
          <input
            value={form.patient}
            onChange={(e) => setForm((f) => ({ ...f, patient: e.target.value }))}
            placeholder="e.g. Folashade Bello"
            className="input-base"
          />
        </div>
        <div>
          <label className="label-base">Doctor</label>
          <select
            value={form.doctor}
            onChange={(e) => setForm((f) => ({ ...f, doctor: e.target.value }))}
            className="input-base"
          >
            {[
              "Dr. Adaeze Okafor",
              "Dr. Tunde Bakare",
              "Dr. Ngozi Eze",
              "Dr. Ifeoluwa Ade",
              "Dr. Chinedu Obi",
              "Dr. Yetunde Adebayo",
            ].map((d) => (
              <option key={d}>{d}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="label-base">Department</label>
          <select
            value={form.department}
            onChange={(e) =>
              setForm((f) => ({ ...f, department: e.target.value }))
            }
            className="input-base"
          >
            {[
              "Cardiology",
              "Neurology",
              "Pediatrics",
              "Maternity",
              "Surgery",
              "Orthopaedics",
              "General Medicine",
              "Diagnostics",
            ].map((d) => (
              <option key={d}>{d}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="label-base">Date</label>
          <select
            value={form.date}
            onChange={(e) => setForm((f) => ({ ...f, date: e.target.value }))}
            className="input-base"
          >
            {["Today", "Tomorrow", "Wed", "Thu", "Fri"].map((d) => (
              <option key={d}>{d}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="label-base">Time</label>
          <input
            type="time"
            value={form.time}
            onChange={(e) => setForm((f) => ({ ...f, time: e.target.value }))}
            className="input-base"
          />
        </div>
        <div className="sm:col-span-2">
          <label className="label-base">Status</label>
          <div className="grid grid-cols-3 gap-2">
            {(["Confirmed", "Pending", "Cancelled"] as ApptStatus[]).map((s) => (
              <button
                type="button"
                key={s}
                onClick={() => setForm((f) => ({ ...f, status: s }))}
                className={`rounded-2xl border px-4 py-3 text-sm font-semibold transition ${
                  form.status === s
                    ? "bg-brand-600 text-white border-transparent"
                    : "bg-white text-ink-700 border-ink-200 hover:border-brand-400"
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      </form>
    </Modal>
  );
}
