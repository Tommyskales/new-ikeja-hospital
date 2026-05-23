import { useMemo, useState } from "react";
import {
  Filter,
  Plus,
  Search,
  SlidersHorizontal,
  UserPlus,
} from "lucide-react";
import Card from "../components/Card";
import Modal from "../components/Modal";
import StatusBadge from "../components/StatusBadge";
import { patients as initialPatients } from "../data/mock";
import type { Patient, PatientStatus } from "../data/mock";

const statusFilters: ("All" | PatientStatus)[] = [
  "All",
  "Admitted",
  "Outpatient",
  "Critical",
  "Discharged",
];

const departmentOptions = [
  "All",
  "Cardiology",
  "Neurology",
  "Pediatrics",
  "Maternity",
  "Surgery",
  "Orthopaedics",
  "General Medicine",
  "Diagnostics",
];

export default function Patients() {
  const [patients, setPatients] = useState<Patient[]>(initialPatients);
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<"All" | PatientStatus>(
    "All"
  );
  const [deptFilter, setDeptFilter] = useState<string>("All");
  const [open, setOpen] = useState(false);

  const filtered = useMemo(() => {
    return patients.filter((p) => {
      if (statusFilter !== "All" && p.status !== statusFilter) return false;
      if (deptFilter !== "All" && p.department !== deptFilter) return false;
      if (!query) return true;
      const q = query.toLowerCase();
      return (
        p.name.toLowerCase().includes(q) ||
        p.id.toLowerCase().includes(q) ||
        p.condition.toLowerCase().includes(q) ||
        p.doctor.toLowerCase().includes(q)
      );
    });
  }, [patients, statusFilter, deptFilter, query]);

  const counts = useMemo(() => {
    const c: Record<string, number> = {
      Admitted: 0,
      Outpatient: 0,
      Critical: 0,
      Discharged: 0,
    };
    for (const p of patients) c[p.status]++;
    return c;
  }, [patients]);

  return (
    <div className="space-y-5">
      {/* Status pills row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          { label: "Admitted", value: counts.Admitted, color: "bg-brand-50 text-brand-700" },
          { label: "Outpatient", value: counts.Outpatient, color: "bg-violet-50 text-violet-700" },
          { label: "Critical", value: counts.Critical, color: "bg-red-50 text-red-700" },
          { label: "Discharged", value: counts.Discharged, color: "bg-ink-50 text-ink-700" },
        ].map((c) => (
          <Card key={c.label} className="!p-4">
            <div className="text-xs uppercase tracking-wider text-ink-500 font-semibold">
              {c.label}
            </div>
            <div className="flex items-center justify-between mt-1.5">
              <div className="font-display font-extrabold text-2xl text-ink-900">
                {c.value}
              </div>
              <span
                className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold ${c.color}`}
              >
                patients
              </span>
            </div>
          </Card>
        ))}
      </div>

      {/* Filters bar */}
      <Card>
        <div className="flex flex-col lg:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-ink-400" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by name, ID, condition, doctor..."
              className="input-base pl-11"
            />
          </div>
          <div className="flex items-center gap-2">
            <SlidersHorizontal className="w-4 h-4 text-ink-400 shrink-0" />
            <select
              value={deptFilter}
              onChange={(e) => setDeptFilter(e.target.value)}
              className="input-base !py-3"
            >
              {departmentOptions.map((d) => (
                <option key={d} value={d}>
                  {d === "All" ? "All departments" : d}
                </option>
              ))}
            </select>
          </div>
          <button
            onClick={() => setOpen(true)}
            className="btn-primary !py-3 shrink-0"
          >
            <Plus className="w-4 h-4" /> Add Patient
          </button>
        </div>
        <div className="flex items-center gap-2 mt-4 overflow-x-auto -mx-1 px-1">
          <Filter className="w-4 h-4 text-ink-400 shrink-0" />
          {statusFilters.map((s) => (
            <button
              key={s}
              onClick={() => setStatusFilter(s)}
              className={`shrink-0 px-3.5 py-1.5 rounded-full text-xs font-semibold transition ${
                statusFilter === s
                  ? "bg-ink-900 text-white"
                  : "bg-ink-50 text-ink-700 hover:bg-ink-100"
              }`}
            >
              {s}
              {s !== "All" && (
                <span className="ml-1.5 opacity-70">({counts[s]})</span>
              )}
            </button>
          ))}
        </div>
      </Card>

      {/* Table */}
      <Card padding={false}>
        <div className="px-6 py-4 border-b border-ink-100 flex items-center justify-between">
          <div>
            <h3 className="font-display font-bold text-lg">
              Patient records{" "}
              <span className="text-ink-400 font-semibold">
                ({filtered.length})
              </span>
            </h3>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-ink-50 text-left text-xs uppercase tracking-wider text-ink-500">
                <th className="px-6 py-3.5 font-semibold">Patient</th>
                <th className="px-4 py-3.5 font-semibold">ID</th>
                <th className="px-4 py-3.5 font-semibold">Age</th>
                <th className="px-4 py-3.5 font-semibold">Condition</th>
                <th className="px-4 py-3.5 font-semibold">Status</th>
                <th className="px-4 py-3.5 font-semibold">Doctor</th>
                <th className="px-4 py-3.5 font-semibold">Admitted</th>
                <th className="px-4 py-3.5 font-semibold">Bed</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={8} className="px-6 py-16 text-center">
                    <div className="w-14 h-14 mx-auto rounded-2xl bg-ink-50 grid place-items-center text-ink-400">
                      <UserPlus className="w-6 h-6" />
                    </div>
                    <p className="font-display font-bold mt-4">
                      No patients match your filters
                    </p>
                    <p className="text-ink-500 text-sm mt-1">
                      Try clearing the search or status filter.
                    </p>
                  </td>
                </tr>
              ) : (
                filtered.map((p) => (
                  <tr
                    key={p.id}
                    className="border-t border-ink-100 hover:bg-ink-50/50 transition"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-brand-400 to-brand-700 text-white text-xs font-bold grid place-items-center">
                          {p.name
                            .split(" ")
                            .map((s) => s[0])
                            .slice(0, 2)
                            .join("")
                            .toUpperCase()}
                        </div>
                        <div>
                          <div className="font-semibold text-ink-900">
                            {p.name}
                          </div>
                          <div className="text-xs text-ink-500">
                            {p.gender === "M" ? "Male" : "Female"} ·{" "}
                            {p.department}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4 font-mono text-xs text-ink-600">
                      {p.id}
                    </td>
                    <td className="px-4 py-4 text-ink-700">{p.age}</td>
                    <td className="px-4 py-4 text-ink-700">{p.condition}</td>
                    <td className="px-4 py-4">
                      <StatusBadge status={p.status} />
                    </td>
                    <td className="px-4 py-4 text-ink-700">{p.doctor}</td>
                    <td className="px-4 py-4 text-ink-600 whitespace-nowrap">
                      {p.admissionDate}
                    </td>
                    <td className="px-4 py-4">
                      {p.bed ? (
                        <span className="font-mono text-xs px-2 py-1 rounded-md bg-ink-50 text-ink-700">
                          {p.bed}
                        </span>
                      ) : (
                        <span className="text-ink-400 text-xs">—</span>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </Card>

      <AddPatientModal
        open={open}
        onClose={() => setOpen(false)}
        onCreate={(p) => setPatients((prev) => [p, ...prev])}
      />
    </div>
  );
}

function AddPatientModal({
  open,
  onClose,
  onCreate,
}: {
  open: boolean;
  onClose: () => void;
  onCreate: (p: Patient) => void;
}) {
  const [form, setForm] = useState({
    name: "",
    age: "",
    gender: "M" as "M" | "F",
    condition: "",
    department: "Cardiology",
    status: "Admitted" as PatientStatus,
    doctor: "Dr. Adaeze Okafor",
    bed: "",
  });

  const update = <K extends keyof typeof form>(key: K, value: (typeof form)[K]) =>
    setForm((f) => ({ ...f, [key]: value }));

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.age || !form.condition) return;
    const id = `NIH-${Math.floor(10000 + Math.random() * 89999)}`;
    onCreate({
      id,
      name: form.name,
      age: Number(form.age),
      gender: form.gender,
      condition: form.condition,
      department: form.department,
      status: form.status,
      doctor: form.doctor,
      admissionDate: new Date().toISOString().slice(0, 10),
      bed: form.bed || undefined,
    });
    setForm({
      name: "",
      age: "",
      gender: "M",
      condition: "",
      department: "Cardiology",
      status: "Admitted",
      doctor: "Dr. Adaeze Okafor",
      bed: "",
    });
    onClose();
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Add a new patient"
      subtitle="Enter the patient's clinical and admission details."
      size="lg"
      footer={
        <>
          <button onClick={onClose} className="btn-ghost-dark !py-2.5 !px-5">
            Cancel
          </button>
          <button onClick={submit} className="btn-primary !py-2.5 !px-5">
            <UserPlus className="w-4 h-4" /> Add Patient
          </button>
        </>
      }
    >
      <form onSubmit={submit} className="grid sm:grid-cols-2 gap-5">
        <div className="sm:col-span-2">
          <label className="label-base">Full name</label>
          <input
            value={form.name}
            onChange={(e) => update("name", e.target.value)}
            placeholder="e.g. Folashade Bello"
            className="input-base"
          />
        </div>
        <div>
          <label className="label-base">Age</label>
          <input
            type="number"
            value={form.age}
            onChange={(e) => update("age", e.target.value)}
            placeholder="e.g. 34"
            className="input-base"
          />
        </div>
        <div>
          <label className="label-base">Gender</label>
          <div className="grid grid-cols-2 gap-2">
            {(["M", "F"] as const).map((g) => (
              <button
                type="button"
                key={g}
                onClick={() => update("gender", g)}
                className={`rounded-2xl border px-4 py-3 text-sm font-semibold transition ${
                  form.gender === g
                    ? "bg-brand-600 text-white border-transparent"
                    : "bg-white text-ink-700 border-ink-200 hover:border-brand-400"
                }`}
              >
                {g === "M" ? "Male" : "Female"}
              </button>
            ))}
          </div>
        </div>
        <div className="sm:col-span-2">
          <label className="label-base">Condition / chief complaint</label>
          <input
            value={form.condition}
            onChange={(e) => update("condition", e.target.value)}
            placeholder="e.g. Chest pain (cardiac)"
            className="input-base"
          />
        </div>
        <div>
          <label className="label-base">Department</label>
          <select
            value={form.department}
            onChange={(e) => update("department", e.target.value)}
            className="input-base"
          >
            {departmentOptions
              .filter((d) => d !== "All")
              .map((d) => (
                <option key={d}>{d}</option>
              ))}
          </select>
        </div>
        <div>
          <label className="label-base">Initial status</label>
          <select
            value={form.status}
            onChange={(e) => update("status", e.target.value as PatientStatus)}
            className="input-base"
          >
            <option value="Admitted">Admitted</option>
            <option value="Outpatient">Outpatient</option>
            <option value="Critical">Critical</option>
          </select>
        </div>
        <div>
          <label className="label-base">Assigned doctor</label>
          <input
            value={form.doctor}
            onChange={(e) => update("doctor", e.target.value)}
            className="input-base"
          />
        </div>
        <div>
          <label className="label-base">Bed (optional)</label>
          <input
            value={form.bed}
            onChange={(e) => update("bed", e.target.value)}
            placeholder="e.g. C-204"
            className="input-base"
          />
        </div>
      </form>
    </Modal>
  );
}
