import { useMemo, useState } from "react";
import { Award, Mail, MessageSquare, Phone, Search, Star } from "lucide-react";
import Card from "../components/Card";
import StatusBadge from "../components/StatusBadge";
import { staff } from "../data/mock";
import type { StaffMember } from "../data/mock";

const roleFilters: ("All" | StaffMember["role"])[] = [
  "All",
  "Doctor",
  "Nurse",
  "Technician",
  "Admin",
];

export default function Staff() {
  const [role, setRole] = useState<"All" | StaffMember["role"]>("All");
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    return staff.filter((s) => {
      if (role !== "All" && s.role !== role) return false;
      if (!query) return true;
      const q = query.toLowerCase();
      return (
        s.name.toLowerCase().includes(q) ||
        s.department.toLowerCase().includes(q) ||
        s.specialization.toLowerCase().includes(q)
      );
    });
  }, [role, query]);

  const counts = useMemo(() => {
    const c: Record<string, number> = { Doctor: 0, Nurse: 0, Technician: 0, Admin: 0 };
    for (const s of staff) c[s.role]++;
    return c;
  }, []);

  const onDuty = staff.filter((s) => s.status === "On Duty").length;

  return (
    <div className="space-y-5">
      {/* Stat strip */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          { label: "Total staff", value: staff.length, color: "text-ink-900" },
          { label: "On duty", value: onDuty, color: "text-emerald-700" },
          { label: "Doctors", value: counts.Doctor, color: "text-brand-700" },
          { label: "Nurses", value: counts.Nurse, color: "text-coral-700" },
        ].map((c) => (
          <Card key={c.label} className="!p-4">
            <div className="text-xs uppercase tracking-wider text-ink-500 font-semibold">
              {c.label}
            </div>
            <div
              className={`font-display font-extrabold text-2xl mt-1 ${c.color}`}
            >
              {c.value}
            </div>
          </Card>
        ))}
      </div>

      {/* Filters */}
      <Card>
        <div className="flex flex-col lg:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-ink-400" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by name, specialty, department..."
              className="input-base pl-11"
            />
          </div>
          <div className="flex items-center gap-2 overflow-x-auto -mx-1 px-1">
            {roleFilters.map((r) => (
              <button
                key={r}
                onClick={() => setRole(r)}
                className={`shrink-0 px-3.5 py-2 rounded-full text-xs font-semibold transition ${
                  role === r
                    ? "bg-ink-900 text-white"
                    : "bg-ink-50 text-ink-700 hover:bg-ink-100"
                }`}
              >
                {r}
                {r !== "All" && (
                  <span className="ml-1.5 opacity-70">({counts[r]})</span>
                )}
              </button>
            ))}
          </div>
        </div>
      </Card>

      {/* Staff cards */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filtered.map((s) => (
          <Card key={s.id} className="!p-0 overflow-hidden group">
            <div
              className={`relative h-28 bg-gradient-to-br ${s.grad} flex items-end justify-end p-3`}
            >
              <div className="absolute inset-0 grid-overlay opacity-30" />
              <StatusBadge status={s.status} />
            </div>
            <div className="px-5 pb-5 -mt-8 relative">
              <div className="w-16 h-16 rounded-2xl bg-white border-4 border-white shadow-md grid place-items-center font-display font-extrabold text-xl bg-gradient-to-br text-ink-900 from-ink-50 to-white">
                {s.initials}
              </div>
              <div className="mt-3">
                <div className="font-display font-bold text-ink-900 text-lg leading-tight">
                  {s.name}
                </div>
                <div className="text-sm text-ink-500">{s.specialization}</div>
              </div>
              <div className="mt-3 flex items-center gap-2 text-xs">
                <span className="inline-flex items-center px-2 py-1 rounded-full bg-brand-50 text-brand-700 font-semibold">
                  {s.role}
                </span>
                <span className="inline-flex items-center px-2 py-1 rounded-full bg-ink-50 text-ink-700 font-semibold">
                  {s.department}
                </span>
              </div>
              <div className="mt-4 flex items-center justify-between border-t border-ink-100 pt-4">
                <div className="flex items-center gap-1 text-xs text-ink-600">
                  <Award className="w-3.5 h-3.5 text-amber-500" />
                  <span className="font-semibold">{s.experienceYears}y</span>
                  <span className="text-ink-400">exp</span>
                </div>
                <div className="flex items-center gap-1 text-xs text-ink-600">
                  <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-400" />
                  <span className="font-semibold">{s.rating.toFixed(1)}</span>
                </div>
                <div className="flex items-center gap-1">
                  <button className="w-8 h-8 rounded-lg bg-ink-50 hover:bg-ink-100 grid place-items-center text-ink-700 transition">
                    <Phone className="w-3.5 h-3.5" />
                  </button>
                  <button className="w-8 h-8 rounded-lg bg-ink-50 hover:bg-ink-100 grid place-items-center text-ink-700 transition">
                    <Mail className="w-3.5 h-3.5" />
                  </button>
                  <button className="w-8 h-8 rounded-lg bg-ink-50 hover:bg-ink-100 grid place-items-center text-ink-700 transition">
                    <MessageSquare className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {filtered.length === 0 && (
        <Card className="text-center py-14">
          <p className="font-display font-bold text-lg text-ink-900">
            No staff match your filters
          </p>
          <p className="text-sm text-ink-500 mt-1">
            Try a different role or clear the search.
          </p>
        </Card>
      )}
    </div>
  );
}
