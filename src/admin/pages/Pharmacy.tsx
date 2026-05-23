import { useMemo, useState } from "react";
import { Filter, Package, Plus, Search, TriangleAlert } from "lucide-react";
import Card from "../components/Card";
import StatusBadge from "../components/StatusBadge";
import { medications } from "../data/mock";
import type { MedStatus } from "../data/mock";

const statusFilters: ("All" | MedStatus)[] = ["All", "In Stock", "Low", "Out"];

export default function Pharmacy() {
  const [statusFilter, setStatusFilter] = useState<"All" | MedStatus>("All");
  const [query, setQuery] = useState("");

  const counts = useMemo(() => {
    const c: Record<MedStatus, number> = { "In Stock": 0, Low: 0, Out: 0 };
    for (const m of medications) c[m.status]++;
    return c;
  }, []);

  const filtered = useMemo(
    () =>
      medications.filter((m) => {
        if (statusFilter !== "All" && m.status !== statusFilter) return false;
        if (!query) return true;
        const q = query.toLowerCase();
        return (
          m.name.toLowerCase().includes(q) ||
          m.category.toLowerCase().includes(q) ||
          m.id.toLowerCase().includes(q)
        );
      }),
    [statusFilter, query]
  );

  const lowOrOut = medications.filter(
    (m) => m.status === "Low" || m.status === "Out"
  );

  return (
    <div className="space-y-5">
      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          { label: "Total SKUs", value: medications.length, color: "text-ink-900" },
          { label: "In stock", value: counts["In Stock"], color: "text-emerald-700" },
          { label: "Low stock", value: counts.Low, color: "text-amber-700" },
          { label: "Out of stock", value: counts.Out, color: "text-red-700" },
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

      {/* Alerts */}
      {lowOrOut.length > 0 && (
        <Card className="!p-5 border-amber-200 bg-amber-50/40">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-700 grid place-items-center shrink-0">
              <TriangleAlert className="w-5 h-5" />
            </div>
            <div className="flex-1">
              <div className="font-display font-bold text-ink-900">
                {lowOrOut.length} medication{lowOrOut.length === 1 ? "" : "s"} need restocking
              </div>
              <div className="flex flex-wrap gap-2 mt-3">
                {lowOrOut.map((m) => (
                  <span
                    key={m.id}
                    className={`text-xs px-2.5 py-1 rounded-full font-semibold border ${
                      m.status === "Out"
                        ? "bg-red-50 text-red-700 border-red-100"
                        : "bg-amber-50 text-amber-700 border-amber-100"
                    }`}
                  >
                    {m.name} · {m.stock} {m.unit}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </Card>
      )}

      {/* Filters + Add */}
      <Card>
        <div className="flex flex-col lg:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-ink-400" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search medication name, category, SKU..."
              className="input-base pl-11"
            />
          </div>
          <div className="flex items-center gap-2 overflow-x-auto -mx-1 px-1">
            <Filter className="w-4 h-4 text-ink-400 shrink-0" />
            {statusFilters.map((s) => (
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
          <button className="btn-primary !py-3 !px-5 shrink-0">
            <Plus className="w-4 h-4" /> Add Medication
          </button>
        </div>
      </Card>

      {/* Inventory table */}
      <Card padding={false}>
        <div className="px-6 py-4 border-b border-ink-100">
          <h3 className="font-display font-bold text-lg">
            Inventory{" "}
            <span className="text-ink-400 font-semibold">
              ({filtered.length})
            </span>
          </h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-ink-50 text-left text-xs uppercase tracking-wider text-ink-500">
                <th className="px-6 py-3.5 font-semibold">Medication</th>
                <th className="px-4 py-3.5 font-semibold">SKU</th>
                <th className="px-4 py-3.5 font-semibold">Category</th>
                <th className="px-4 py-3.5 font-semibold">Stock level</th>
                <th className="px-4 py-3.5 font-semibold">Status</th>
                <th className="px-4 py-3.5 font-semibold">Expiry</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((m) => {
                const pct = m.reorderAt
                  ? Math.min(100, Math.round((m.stock / (m.reorderAt * 3)) * 100))
                  : 0;
                const barColor =
                  m.status === "Out"
                    ? "bg-red-500"
                    : m.status === "Low"
                    ? "bg-amber-500"
                    : "bg-emerald-500";
                return (
                  <tr
                    key={m.id}
                    className="border-t border-ink-100 hover:bg-ink-50/50 transition"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-lg bg-brand-50 text-brand-700 grid place-items-center">
                          <Package className="w-4 h-4" />
                        </div>
                        <div className="font-semibold text-ink-900">
                          {m.name}
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4 font-mono text-xs text-ink-600">
                      {m.id}
                    </td>
                    <td className="px-4 py-4">
                      <span className="inline-flex items-center px-2 py-1 rounded-full bg-ink-50 text-ink-700 text-xs font-semibold">
                        {m.category}
                      </span>
                    </td>
                    <td className="px-4 py-4 min-w-[200px]">
                      <div className="flex items-center justify-between text-xs mb-1">
                        <span className="font-semibold text-ink-700">
                          {m.stock.toLocaleString()} {m.unit}
                        </span>
                        <span className="text-ink-400 font-mono">
                          reorder @ {m.reorderAt}
                        </span>
                      </div>
                      <div className="h-1.5 rounded-full bg-ink-100 overflow-hidden">
                        <div
                          className={`h-full rounded-full ${barColor} transition-all duration-500`}
                          style={{ width: `${Math.max(pct, m.stock > 0 ? 4 : 0)}%` }}
                        />
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <StatusBadge status={m.status} />
                    </td>
                    <td className="px-4 py-4 text-ink-600 whitespace-nowrap">
                      {m.expiry}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
