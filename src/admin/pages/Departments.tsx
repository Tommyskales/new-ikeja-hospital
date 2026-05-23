import { ArrowDownRight, ArrowUpRight, BedDouble, Stethoscope, UserRound } from "lucide-react";
import Card from "../components/Card";
import { departmentList } from "../data/mock";

const colorMap: Record<string, { bg: string; ring: string; text: string; chip: string }> = {
  rose: { bg: "from-rose-400 to-coral-700", ring: "stroke-coral-500", text: "text-coral-700", chip: "bg-rose-50 text-coral-700" },
  violet: { bg: "from-violet-400 to-purple-700", ring: "stroke-violet-500", text: "text-violet-700", chip: "bg-violet-50 text-violet-700" },
  amber: { bg: "from-amber-400 to-orange-600", ring: "stroke-amber-500", text: "text-amber-700", chip: "bg-amber-50 text-amber-700" },
  pink: { bg: "from-pink-400 to-rose-600", ring: "stroke-pink-500", text: "text-pink-700", chip: "bg-pink-50 text-pink-700" },
  teal: { bg: "from-emerald-400 to-teal-700", ring: "stroke-teal-500", text: "text-teal-700", chip: "bg-emerald-50 text-teal-700" },
  brand: { bg: "from-brand-400 to-brand-700", ring: "stroke-brand-500", text: "text-brand-700", chip: "bg-brand-50 text-brand-700" },
  cyan: { bg: "from-cyan-400 to-brand-700", ring: "stroke-cyan-500", text: "text-cyan-700", chip: "bg-cyan-50 text-cyan-700" },
};

function Donut({
  pct,
  color,
}: {
  pct: number;
  color: string;
}) {
  const radius = 28;
  const circ = 2 * Math.PI * radius;
  const offset = circ - (pct / 100) * circ;
  return (
    <svg width="72" height="72" viewBox="0 0 72 72">
      <circle
        cx="36"
        cy="36"
        r={radius}
        strokeWidth="6"
        className="stroke-ink-100"
        fill="none"
      />
      <circle
        cx="36"
        cy="36"
        r={radius}
        strokeWidth="6"
        className={color}
        strokeLinecap="round"
        fill="none"
        strokeDasharray={circ}
        strokeDashoffset={offset}
        transform="rotate(-90 36 36)"
      />
      <text
        x="36"
        y="40"
        textAnchor="middle"
        className="font-display font-bold fill-ink-900"
        fontSize="14"
      >
        {pct}%
      </text>
    </svg>
  );
}

export default function Departments() {
  const totalPatients = departmentList.reduce((s, d) => s + d.patients, 0);
  const totalCapacity = departmentList.reduce((s, d) => s + d.capacity, 0);
  const occupancy = totalCapacity ? Math.round((totalPatients / totalCapacity) * 100) : 0;
  const totalDoctors = departmentList.reduce((s, d) => s + d.doctors, 0);
  const totalNurses = departmentList.reduce((s, d) => s + d.nurses, 0);

  return (
    <div className="space-y-5">
      {/* Top stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <Card className="!p-4">
          <div className="text-xs uppercase tracking-wider text-ink-500 font-semibold">
            Departments
          </div>
          <div className="font-display font-extrabold text-2xl mt-1">
            {departmentList.length}
          </div>
        </Card>
        <Card className="!p-4">
          <div className="text-xs uppercase tracking-wider text-ink-500 font-semibold">
            Bed occupancy
          </div>
          <div className="font-display font-extrabold text-2xl mt-1 text-brand-700">
            {occupancy}%
          </div>
        </Card>
        <Card className="!p-4">
          <div className="text-xs uppercase tracking-wider text-ink-500 font-semibold">
            Doctors
          </div>
          <div className="font-display font-extrabold text-2xl mt-1">
            {totalDoctors}
          </div>
        </Card>
        <Card className="!p-4">
          <div className="text-xs uppercase tracking-wider text-ink-500 font-semibold">
            Nurses
          </div>
          <div className="font-display font-extrabold text-2xl mt-1">
            {totalNurses}
          </div>
        </Card>
      </div>

      {/* Department cards */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {departmentList.map((d) => {
          const palette = colorMap[d.color] ?? colorMap.brand;
          const pct = d.capacity
            ? Math.min(100, Math.round((d.patients / d.capacity) * 100))
            : 0;
          return (
            <Card key={d.name} className="!p-0 overflow-hidden">
              <div
                className={`h-1.5 bg-gradient-to-r ${palette.bg}`}
              />
              <div className="p-5">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="font-display font-bold text-lg text-ink-900">
                      {d.name}
                    </div>
                    <div
                      className={`inline-flex items-center gap-1 mt-1 text-xs font-bold ${
                        d.trend >= 0 ? "text-emerald-700" : "text-red-700"
                      }`}
                    >
                      {d.trend >= 0 ? (
                        <ArrowUpRight className="w-3 h-3" />
                      ) : (
                        <ArrowDownRight className="w-3 h-3" />
                      )}
                      {Math.abs(d.trend)}% this week
                    </div>
                  </div>
                  <Donut pct={pct} color={palette.ring} />
                </div>

                <div className="grid grid-cols-3 gap-2 mt-5">
                  <div className="rounded-xl bg-ink-50 p-3">
                    <div className="text-[10px] uppercase tracking-wider text-ink-500 font-semibold flex items-center gap-1">
                      <UserRound className="w-3 h-3" /> Patients
                    </div>
                    <div className="font-display font-extrabold text-ink-900 mt-1">
                      {d.patients}
                    </div>
                  </div>
                  <div className="rounded-xl bg-ink-50 p-3">
                    <div className="text-[10px] uppercase tracking-wider text-ink-500 font-semibold flex items-center gap-1">
                      <BedDouble className="w-3 h-3" /> Beds
                    </div>
                    <div className="font-display font-extrabold text-ink-900 mt-1">
                      {d.capacity}
                    </div>
                  </div>
                  <div className="rounded-xl bg-ink-50 p-3">
                    <div className="text-[10px] uppercase tracking-wider text-ink-500 font-semibold flex items-center gap-1">
                      <Stethoscope className="w-3 h-3" /> Staff
                    </div>
                    <div className="font-display font-extrabold text-ink-900 mt-1">
                      {d.doctors + d.nurses}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 mt-4 text-xs">
                  <span className={`inline-flex items-center px-2 py-1 rounded-full font-semibold ${palette.chip}`}>
                    {d.doctors} doctors
                  </span>
                  <span className="inline-flex items-center px-2 py-1 rounded-full bg-ink-50 text-ink-700 font-semibold">
                    {d.nurses} nurses
                  </span>
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
