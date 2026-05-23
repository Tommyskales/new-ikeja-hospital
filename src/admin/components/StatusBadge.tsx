import type { ReactNode } from "react";

const variants: Record<string, string> = {
  // Patient statuses
  Admitted: "bg-brand-50 text-brand-700 border-brand-100",
  Outpatient: "bg-violet-50 text-violet-700 border-violet-100",
  Discharged: "bg-ink-50 text-ink-700 border-ink-100",
  Critical: "bg-red-50 text-red-700 border-red-100",

  // Staff statuses
  "On Duty": "bg-emerald-50 text-emerald-700 border-emerald-100",
  "Off Duty": "bg-ink-50 text-ink-500 border-ink-100",
  "On Call": "bg-amber-50 text-amber-700 border-amber-100",

  // Appointment statuses
  Confirmed: "bg-emerald-50 text-emerald-700 border-emerald-100",
  Pending: "bg-amber-50 text-amber-700 border-amber-100",
  Cancelled: "bg-red-50 text-red-700 border-red-100",

  // Invoice statuses
  Paid: "bg-emerald-50 text-emerald-700 border-emerald-100",
  Overdue: "bg-red-50 text-red-700 border-red-100",

  // Pharmacy
  "In Stock": "bg-emerald-50 text-emerald-700 border-emerald-100",
  Low: "bg-amber-50 text-amber-700 border-amber-100",
  Out: "bg-red-50 text-red-700 border-red-100",
};

const dotVariants: Record<string, string> = {
  Admitted: "bg-brand-500",
  Outpatient: "bg-violet-500",
  Discharged: "bg-ink-400",
  Critical: "bg-red-500",
  "On Duty": "bg-emerald-500",
  "Off Duty": "bg-ink-400",
  "On Call": "bg-amber-500",
  Confirmed: "bg-emerald-500",
  Pending: "bg-amber-500",
  Cancelled: "bg-red-500",
  Paid: "bg-emerald-500",
  Overdue: "bg-red-500",
  "In Stock": "bg-emerald-500",
  Low: "bg-amber-500",
  Out: "bg-red-500",
};

export default function StatusBadge({
  status,
  children,
}: {
  status: string;
  children?: ReactNode;
}) {
  const cls = variants[status] || "bg-ink-50 text-ink-700 border-ink-100";
  const dot = dotVariants[status] || "bg-ink-400";
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border ${cls}`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${dot}`} />
      {children ?? status}
    </span>
  );
}
