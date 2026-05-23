import {
  Activity,
  ArrowDownRight,
  ArrowUpRight,
  Banknote,
  BedDouble,
  CalendarCheck2,
  CalendarPlus,
  CircleDollarSign,
  ClipboardList,
  HeartPulse,
  Pill,
  Stethoscope,
  TriangleAlert,
  UserMinus,
  UserPlus,
  Users,
} from "lucide-react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import Card from "../components/Card";
import {
  departmentVisits,
  recentActivity,
  weeklyAdmissions,
} from "../data/mock";

const kpis = [
  {
    label: "Total Patients",
    value: "1,284",
    change: "+12.4%",
    up: true,
    icon: Users,
    grad: "from-brand-400 to-brand-700",
    sub: "Across all departments",
  },
  {
    label: "Beds Available",
    value: "47 / 240",
    change: "80% occupied",
    up: true,
    icon: BedDouble,
    grad: "from-violet-400 to-purple-700",
    sub: "12 critical care",
  },
  {
    label: "Today's Appointments",
    value: "86",
    change: "+8 since 8am",
    up: true,
    icon: CalendarCheck2,
    grad: "from-emerald-400 to-teal-700",
    sub: "14 pending confirmation",
  },
  {
    label: "Staff on Duty",
    value: "138",
    change: "5 on call",
    up: true,
    icon: Stethoscope,
    grad: "from-amber-400 to-orange-600",
    sub: "32 doctors · 88 nurses",
  },
  {
    label: "Monthly Revenue",
    value: "₦94.2M",
    change: "+6.1%",
    up: true,
    icon: Banknote,
    grad: "from-coral-400 to-coral-700",
    sub: "vs last month",
  },
];

const quickStats = [
  {
    icon: HeartPulse,
    label: "Critical patients",
    value: "9",
    color: "text-red-700",
    bg: "bg-red-50",
  },
  {
    icon: UserPlus,
    label: "New admissions today",
    value: "27",
    color: "text-emerald-700",
    bg: "bg-emerald-50",
  },
  {
    icon: UserMinus,
    label: "Discharges today",
    value: "18",
    color: "text-brand-700",
    bg: "bg-brand-50",
  },
  {
    icon: ClipboardList,
    label: "Pending lab results",
    value: "24",
    color: "text-violet-700",
    bg: "bg-violet-50",
  },
  {
    icon: Pill,
    label: "Pharmacy alerts",
    value: "3",
    color: "text-amber-700",
    bg: "bg-amber-50",
  },
  {
    icon: CircleDollarSign,
    label: "Pending invoices",
    value: "₦12.4M",
    color: "text-coral-700",
    bg: "bg-coral-50",
  },
];

const activityIcon: Record<string, { Icon: typeof CalendarPlus; cls: string }> =
  {
    admission: { Icon: UserPlus, cls: "bg-emerald-50 text-emerald-700" },
    discharge: { Icon: UserMinus, cls: "bg-brand-50 text-brand-700" },
    appointment: { Icon: CalendarPlus, cls: "bg-violet-50 text-violet-700" },
    invoice: { Icon: CircleDollarSign, cls: "bg-coral-50 text-coral-700" },
    alert: { Icon: TriangleAlert, cls: "bg-amber-50 text-amber-700" },
  };

export default function Dashboard() {
  return (
    <div className="space-y-6">
      {/* KPI cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-4">
        {kpis.map((k) => {
          const Icon = k.icon;
          return (
            <Card key={k.label}>
              <div className="flex items-start justify-between">
                <div
                  className={`w-11 h-11 rounded-xl bg-gradient-to-br ${k.grad} text-white grid place-items-center shadow-md shadow-black/10`}
                >
                  <Icon className="w-5 h-5" />
                </div>
                <span
                  className={`inline-flex items-center gap-1 text-xs font-bold ${
                    k.up ? "text-emerald-700" : "text-red-700"
                  }`}
                >
                  {k.up ? (
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  ) : (
                    <ArrowDownRight className="w-3.5 h-3.5" />
                  )}
                  {k.change}
                </span>
              </div>
              <div className="mt-4 text-xs uppercase tracking-wider text-ink-500 font-semibold">
                {k.label}
              </div>
              <div className="font-display font-extrabold text-2xl xl:text-3xl text-ink-900 mt-1">
                {k.value}
              </div>
              <div className="text-xs text-ink-500 mt-1.5">{k.sub}</div>
            </Card>
          );
        })}
      </div>

      {/* Charts */}
      <div className="grid lg:grid-cols-3 gap-4">
        {/* Line chart - Admissions */}
        <Card className="lg:col-span-2">
          <div className="flex items-start justify-between mb-1">
            <div>
              <h3 className="font-display font-bold text-lg text-ink-900">
                Weekly admissions
              </h3>
              <p className="text-sm text-ink-500">
                Admissions vs discharges (last 7 days)
              </p>
            </div>
            <div className="hidden sm:flex items-center gap-4 text-xs">
              <span className="flex items-center gap-1.5 text-ink-700 font-semibold">
                <span className="w-2.5 h-2.5 rounded-full bg-brand-500" />
                Admissions
              </span>
              <span className="flex items-center gap-1.5 text-ink-700 font-semibold">
                <span className="w-2.5 h-2.5 rounded-full bg-coral-400" />
                Discharges
              </span>
            </div>
          </div>

          <div className="h-72 mt-4 -mx-2">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={weeklyAdmissions}
                margin={{ top: 10, right: 10, bottom: 0, left: 0 }}
              >
                <defs>
                  <linearGradient id="adm" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#06B6D4" stopOpacity={0.4} />
                    <stop offset="100%" stopColor="#06B6D4" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="dis" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#FB5A3C" stopOpacity={0.3} />
                    <stop offset="100%" stopColor="#FB5A3C" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid stroke="#E5ECF5" vertical={false} />
                <XAxis
                  dataKey="day"
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
                  cursor={{ stroke: "#22D3EE", strokeWidth: 1, strokeDasharray: 4 }}
                />
                <Area
                  type="monotone"
                  dataKey="admissions"
                  stroke="#06B6D4"
                  strokeWidth={2.5}
                  fill="url(#adm)"
                  activeDot={{ r: 5, stroke: "white", strokeWidth: 2 }}
                />
                <Area
                  type="monotone"
                  dataKey="discharges"
                  stroke="#FB5A3C"
                  strokeWidth={2}
                  fill="url(#dis)"
                  activeDot={{ r: 4, stroke: "white", strokeWidth: 2 }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Bar chart - Department visits */}
        <Card>
          <h3 className="font-display font-bold text-lg text-ink-900">
            Department visits
          </h3>
          <p className="text-sm text-ink-500">This week, by department</p>

          <div className="h-72 mt-4 -mx-2">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={departmentVisits}
                margin={{ top: 10, right: 10, bottom: 0, left: 0 }}
              >
                <defs>
                  <linearGradient id="bar" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#22D3EE" />
                    <stop offset="100%" stopColor="#0E7490" />
                  </linearGradient>
                </defs>
                <CartesianGrid stroke="#E5ECF5" vertical={false} />
                <XAxis
                  dataKey="dept"
                  tick={{ fill: "#6B86AE", fontSize: 11 }}
                  tickLine={false}
                  axisLine={false}
                  interval={0}
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
                    boxShadow: "0 10px 30px -10px rgba(10, 21, 48, 0.18)",
                  }}
                  cursor={{ fill: "rgba(34,211,238,0.08)" }}
                />
                <Bar
                  dataKey="visits"
                  fill="url(#bar)"
                  radius={[8, 8, 0, 0]}
                  maxBarSize={40}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      {/* Activity + Quick stats */}
      <div className="grid lg:grid-cols-3 gap-4">
        <Card className="lg:col-span-2" padding={false}>
          <div className="px-6 pt-5 pb-3 flex items-center justify-between">
            <div>
              <h3 className="font-display font-bold text-lg text-ink-900">
                Recent activity
              </h3>
              <p className="text-sm text-ink-500">Latest events across the hospital</p>
            </div>
            <span className="pill bg-emerald-50 text-emerald-700 border border-emerald-100">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse-soft" />
              Live
            </span>
          </div>
          <ul className="divide-y divide-ink-100">
            {recentActivity.map((a) => {
              const config = activityIcon[a.type];
              const Icon = config.Icon;
              return (
                <li
                  key={a.id}
                  className="flex items-start gap-3 px-6 py-3.5 hover:bg-ink-50/50 transition"
                >
                  <div
                    className={`w-9 h-9 shrink-0 rounded-lg grid place-items-center ${config.cls}`}
                  >
                    <Icon className="w-4 h-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold text-ink-900 text-sm">
                      {a.title}
                    </div>
                    <div className="text-xs text-ink-500 mt-0.5">{a.meta}</div>
                  </div>
                  <span className="text-xs text-ink-400 shrink-0">
                    {a.time}
                  </span>
                </li>
              );
            })}
          </ul>
        </Card>

        <Card>
          <div className="flex items-center gap-2 mb-4">
            <div className="w-9 h-9 rounded-lg bg-brand-50 text-brand-700 grid place-items-center">
              <Activity className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-display font-bold text-lg text-ink-900">
                Quick stats
              </h3>
              <p className="text-xs text-ink-500">Today, at a glance</p>
            </div>
          </div>
          <ul className="space-y-2">
            {quickStats.map((s) => {
              const Icon = s.icon;
              return (
                <li
                  key={s.label}
                  className="flex items-center justify-between rounded-xl border border-ink-100 px-3.5 py-3 hover:bg-ink-50/50 transition"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-9 h-9 rounded-lg grid place-items-center ${s.bg} ${s.color}`}
                    >
                      <Icon className="w-4 h-4" />
                    </div>
                    <span className="text-sm font-semibold text-ink-700">
                      {s.label}
                    </span>
                  </div>
                  <span className={`font-display font-extrabold text-lg ${s.color}`}>
                    {s.value}
                  </span>
                </li>
              );
            })}
          </ul>
        </Card>
      </div>
    </div>
  );
}
