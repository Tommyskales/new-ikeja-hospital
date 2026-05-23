import {
  Activity,
  Calendar,
  ChevronRight,
  CircleDollarSign,
  Download,
  FileBarChart2,
  FileSpreadsheet,
  HeartPulse,
  Stethoscope,
  Users,
} from "lucide-react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import Card from "../components/Card";

const monthlyRevenue = [
  { month: "Jan", revenue: 72, expenses: 51 },
  { month: "Feb", revenue: 78, expenses: 53 },
  { month: "Mar", revenue: 85, expenses: 56 },
  { month: "Apr", revenue: 81, expenses: 58 },
  { month: "May", revenue: 89, expenses: 60 },
  { month: "Jun", revenue: 94, expenses: 61 },
  { month: "Jul", revenue: 92, expenses: 63 },
  { month: "Aug", revenue: 98, expenses: 64 },
  { month: "Sep", revenue: 102, expenses: 67 },
  { month: "Oct", revenue: 110, expenses: 70 },
  { month: "Nov", revenue: 105, expenses: 72 },
  { month: "Dec", revenue: 118, expenses: 74 },
];

const ageDistribution = [
  { range: "0-12", count: 142 },
  { range: "13-24", count: 188 },
  { range: "25-39", count: 305 },
  { range: "40-59", count: 412 },
  { range: "60+", count: 237 },
];

const reportLinks = [
  {
    title: "Patient Demographics",
    desc: "Age, gender, condition breakdown by quarter.",
    icon: Users,
    grad: "from-brand-400 to-brand-700",
  },
  {
    title: "Clinical Outcomes",
    desc: "Recovery rates, readmissions, mortality across departments.",
    icon: HeartPulse,
    grad: "from-rose-400 to-coral-700",
  },
  {
    title: "Staff Performance",
    desc: "Caseload, ratings, hours, attendance metrics.",
    icon: Stethoscope,
    grad: "from-violet-400 to-purple-700",
  },
  {
    title: "Financial Summary",
    desc: "Revenue, expenses, AR aging, profitability.",
    icon: CircleDollarSign,
    grad: "from-emerald-400 to-teal-700",
  },
  {
    title: "Bed Utilization",
    desc: "Occupancy, average length of stay, turnover.",
    icon: Activity,
    grad: "from-amber-400 to-orange-600",
  },
  {
    title: "Appointment Trends",
    desc: "Booking volume, no-show rates, peak hours.",
    icon: Calendar,
    grad: "from-coral-400 to-coral-700",
  },
];

export default function Reports() {
  return (
    <div className="space-y-5">
      {/* Header card */}
      <Card>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-brand-400 to-brand-700 text-white grid place-items-center shadow-lg shadow-brand-500/30">
              <FileBarChart2 className="w-6 h-6" />
            </div>
            <div>
              <h2 className="font-display font-bold text-xl text-ink-900">
                Reports center
              </h2>
              <p className="text-sm text-ink-500">
                Generate, view and export reports across every domain.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button className="btn-ghost-dark !py-2.5 !px-5">
              <FileSpreadsheet className="w-4 h-4" /> XLSX
            </button>
            <button className="btn-primary !py-2.5 !px-5">
              <Download className="w-4 h-4" /> Export all
            </button>
          </div>
        </div>
      </Card>

      {/* Charts row */}
      <div className="grid lg:grid-cols-3 gap-4">
        <Card className="lg:col-span-2">
          <h3 className="font-display font-bold text-lg text-ink-900">
            Revenue vs Expenses
          </h3>
          <p className="text-sm text-ink-500">
            Last 12 months · in millions of ₦
          </p>
          <div className="h-72 mt-4 -mx-2">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={monthlyRevenue}
                margin={{ top: 10, right: 10, bottom: 0, left: 0 }}
              >
                <CartesianGrid stroke="#E5ECF5" vertical={false} />
                <XAxis
                  dataKey="month"
                  tick={{ fill: "#6B86AE", fontSize: 12 }}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis
                  tick={{ fill: "#6B86AE", fontSize: 12 }}
                  tickLine={false}
                  axisLine={false}
                  width={30}
                />
                <Tooltip
                  contentStyle={{
                    background: "white",
                    border: "1px solid #E5ECF5",
                    borderRadius: 12,
                    boxShadow: "0 10px 30px -10px rgba(10, 21, 48, 0.18)",
                  }}
                />
                <Legend
                  wrapperStyle={{ fontSize: 12, paddingTop: 10 }}
                  iconType="circle"
                />
                <Line
                  type="monotone"
                  dataKey="revenue"
                  stroke="#06B6D4"
                  strokeWidth={3}
                  dot={{ r: 3, strokeWidth: 0, fill: "#06B6D4" }}
                  activeDot={{ r: 5, stroke: "white", strokeWidth: 2 }}
                />
                <Line
                  type="monotone"
                  dataKey="expenses"
                  stroke="#FB5A3C"
                  strokeWidth={2.5}
                  strokeDasharray="6 4"
                  dot={{ r: 3, strokeWidth: 0, fill: "#FB5A3C" }}
                  activeDot={{ r: 5, stroke: "white", strokeWidth: 2 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card>
          <h3 className="font-display font-bold text-lg text-ink-900">
            Patient age distribution
          </h3>
          <p className="text-sm text-ink-500">All-time</p>
          <div className="h-72 mt-4 -mx-2">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={ageDistribution}
                margin={{ top: 10, right: 10, bottom: 0, left: 0 }}
              >
                <defs>
                  <linearGradient id="age" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#22D3EE" />
                    <stop offset="100%" stopColor="#0E7490" />
                  </linearGradient>
                </defs>
                <CartesianGrid stroke="#E5ECF5" vertical={false} />
                <XAxis
                  dataKey="range"
                  tick={{ fill: "#6B86AE", fontSize: 12 }}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis
                  tick={{ fill: "#6B86AE", fontSize: 11 }}
                  tickLine={false}
                  axisLine={false}
                  width={30}
                />
                <Tooltip
                  contentStyle={{
                    background: "white",
                    border: "1px solid #E5ECF5",
                    borderRadius: 12,
                  }}
                  cursor={{ fill: "rgba(34,211,238,0.08)" }}
                />
                <Bar
                  dataKey="count"
                  fill="url(#age)"
                  radius={[8, 8, 0, 0]}
                  maxBarSize={50}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      {/* Report cards */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {reportLinks.map((r) => {
          const Icon = r.icon;
          return (
            <Card
              key={r.title}
              className="group cursor-pointer hover:-translate-y-0.5 transition-transform"
            >
              <div className="flex items-start gap-4">
                <div
                  className={`w-12 h-12 rounded-xl bg-gradient-to-br ${r.grad} text-white grid place-items-center shadow-md shadow-black/10`}
                >
                  <Icon className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <div className="font-display font-bold text-ink-900">
                    {r.title}
                  </div>
                  <p className="text-sm text-ink-500 mt-1">{r.desc}</p>
                </div>
                <ChevronRight className="w-5 h-5 text-ink-400 group-hover:text-ink-700 transition" />
              </div>
              <div className="flex items-center gap-2 mt-4 pt-4 border-t border-ink-100 text-xs">
                <button className="px-2.5 py-1 rounded-md bg-ink-50 hover:bg-ink-100 text-ink-700 font-semibold transition">
                  PDF
                </button>
                <button className="px-2.5 py-1 rounded-md bg-ink-50 hover:bg-ink-100 text-ink-700 font-semibold transition">
                  CSV
                </button>
                <button className="px-2.5 py-1 rounded-md bg-ink-50 hover:bg-ink-100 text-ink-700 font-semibold transition">
                  XLSX
                </button>
                <span className="ml-auto text-ink-400">Updated daily</span>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
