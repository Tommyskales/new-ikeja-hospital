import { useMemo, useState } from "react";
import {
  ArrowDownToLine,
  CircleDollarSign,
  CreditCard,
  Filter,
  Search,
  TrendingDown,
  TrendingUp,
} from "lucide-react";
import Card from "../components/Card";
import StatusBadge from "../components/StatusBadge";
import { invoices } from "../data/mock";
import type { InvoiceStatus } from "../data/mock";

const statusFilters: ("All" | InvoiceStatus)[] = [
  "All",
  "Paid",
  "Pending",
  "Overdue",
];

function fmt(n: number) {
  return `₦${n.toLocaleString()}`;
}

export default function Billing() {
  const [statusFilter, setStatusFilter] = useState<"All" | InvoiceStatus>(
    "All"
  );
  const [query, setQuery] = useState("");

  const totals = useMemo(() => {
    const t = { paid: 0, pending: 0, overdue: 0 };
    for (const i of invoices) {
      if (i.status === "Paid") t.paid += i.amount;
      else if (i.status === "Pending") t.pending += i.amount;
      else if (i.status === "Overdue") t.overdue += i.amount;
    }
    return t;
  }, []);

  const grandTotal = totals.paid + totals.pending + totals.overdue;
  const collectionRate = grandTotal
    ? Math.round((totals.paid / grandTotal) * 100)
    : 0;

  const filtered = useMemo(() => {
    return invoices.filter((i) => {
      if (statusFilter !== "All" && i.status !== statusFilter) return false;
      if (!query) return true;
      const q = query.toLowerCase();
      return (
        i.id.toLowerCase().includes(q) ||
        i.patient.toLowerCase().includes(q) ||
        i.service.toLowerCase().includes(q)
      );
    });
  }, [statusFilter, query]);

  return (
    <div className="space-y-5">
      {/* Summary bar */}
      <Card padding={false}>
        <div className="grid md:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-ink-100">
          <div className="p-5 md:p-6">
            <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-ink-500 font-semibold">
              <CreditCard className="w-3.5 h-3.5" />
              Total billed (30d)
            </div>
            <div className="font-display font-extrabold text-3xl mt-2">
              {fmt(grandTotal)}
            </div>
            <div className="text-xs text-ink-500 mt-1">
              {invoices.length} invoices
            </div>
          </div>
          <div className="p-5 md:p-6">
            <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-ink-500 font-semibold">
              <TrendingUp className="w-3.5 h-3.5 text-emerald-600" />
              Paid
            </div>
            <div className="font-display font-extrabold text-3xl mt-2 text-emerald-700">
              {fmt(totals.paid)}
            </div>
            <div className="text-xs text-ink-500 mt-1">
              {collectionRate}% collection rate
            </div>
          </div>
          <div className="p-5 md:p-6">
            <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-ink-500 font-semibold">
              <CircleDollarSign className="w-3.5 h-3.5 text-amber-600" />
              Pending
            </div>
            <div className="font-display font-extrabold text-3xl mt-2 text-amber-700">
              {fmt(totals.pending)}
            </div>
            <div className="text-xs text-ink-500 mt-1">
              Awaiting settlement
            </div>
          </div>
          <div className="p-5 md:p-6">
            <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-ink-500 font-semibold">
              <TrendingDown className="w-3.5 h-3.5 text-red-600" />
              Overdue
            </div>
            <div className="font-display font-extrabold text-3xl mt-2 text-red-700">
              {fmt(totals.overdue)}
            </div>
            <div className="text-xs text-ink-500 mt-1">
              Past due date
            </div>
          </div>
        </div>

        {/* Stacked bar */}
        <div className="px-6 pb-5 pt-2">
          <div className="h-2.5 rounded-full bg-ink-100 overflow-hidden flex">
            {grandTotal > 0 && (
              <>
                <div
                  className="h-full bg-emerald-500"
                  style={{ width: `${(totals.paid / grandTotal) * 100}%` }}
                />
                <div
                  className="h-full bg-amber-500"
                  style={{ width: `${(totals.pending / grandTotal) * 100}%` }}
                />
                <div
                  className="h-full bg-red-500"
                  style={{ width: `${(totals.overdue / grandTotal) * 100}%` }}
                />
              </>
            )}
          </div>
          <div className="flex items-center gap-4 text-xs mt-3 text-ink-600">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500" /> Paid
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-amber-500" /> Pending
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-red-500" /> Overdue
            </span>
          </div>
        </div>
      </Card>

      {/* Filters */}
      <Card>
        <div className="flex flex-col lg:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-ink-400" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by invoice, patient or service..."
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
          <button className="btn-ghost-dark !py-3 !px-5 shrink-0">
            <ArrowDownToLine className="w-4 h-4" /> Export
          </button>
        </div>
      </Card>

      {/* Invoices table */}
      <Card padding={false}>
        <div className="px-6 py-4 border-b border-ink-100">
          <h3 className="font-display font-bold text-lg">
            Invoices{" "}
            <span className="text-ink-400 font-semibold">
              ({filtered.length})
            </span>
          </h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-ink-50 text-left text-xs uppercase tracking-wider text-ink-500">
                <th className="px-6 py-3.5 font-semibold">Invoice</th>
                <th className="px-4 py-3.5 font-semibold">Patient</th>
                <th className="px-4 py-3.5 font-semibold">Service</th>
                <th className="px-4 py-3.5 font-semibold text-right">Amount</th>
                <th className="px-4 py-3.5 font-semibold">Status</th>
                <th className="px-4 py-3.5 font-semibold">Issued</th>
                <th className="px-4 py-3.5 font-semibold">Due</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((inv) => (
                <tr
                  key={inv.id}
                  className="border-t border-ink-100 hover:bg-ink-50/50 transition"
                >
                  <td className="px-6 py-4 font-mono text-xs text-ink-700">
                    {inv.id}
                  </td>
                  <td className="px-4 py-4 font-semibold text-ink-900">
                    {inv.patient}
                  </td>
                  <td className="px-4 py-4 text-ink-700">{inv.service}</td>
                  <td className="px-4 py-4 text-right font-display font-bold text-ink-900">
                    {fmt(inv.amount)}
                  </td>
                  <td className="px-4 py-4">
                    <StatusBadge status={inv.status} />
                  </td>
                  <td className="px-4 py-4 text-ink-600 whitespace-nowrap">
                    {inv.issuedAt}
                  </td>
                  <td className="px-4 py-4 text-ink-600 whitespace-nowrap">
                    {inv.dueAt}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
