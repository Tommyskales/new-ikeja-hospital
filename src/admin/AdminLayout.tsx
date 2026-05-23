import { useEffect, useState } from "react";
import { NavLink, Outlet, useLocation } from "react-router-dom";
import {
  Activity,
  Bell,
  CalendarDays,
  ChevronsLeft,
  CreditCard,
  FileBarChart2,
  Heart,
  LayoutDashboard,
  LogOut,
  Menu,
  Pill,
  Search,
  Settings,
  Stethoscope,
  Users,
  X,
} from "lucide-react";

const navItems = [
  { to: "/admin", label: "Dashboard", icon: LayoutDashboard, end: true },
  { to: "/admin/patients", label: "Patients", icon: Users },
  { to: "/admin/staff", label: "Staff", icon: Stethoscope },
  { to: "/admin/appointments", label: "Appointments", icon: CalendarDays },
  { to: "/admin/departments", label: "Departments", icon: Activity },
  { to: "/admin/billing", label: "Billing", icon: CreditCard },
  { to: "/admin/pharmacy", label: "Pharmacy", icon: Pill },
  { to: "/admin/reports", label: "Reports", icon: FileBarChart2 },
  { to: "/admin/settings", label: "Settings", icon: Settings },
];

const titleMap: Record<string, { title: string; subtitle: string }> = {
  "/admin": {
    title: "Dashboard",
    subtitle: "Real-time view of hospital operations.",
  },
  "/admin/patients": {
    title: "Patients",
    subtitle: "Manage admitted, outpatient and discharged records.",
  },
  "/admin/staff": {
    title: "Staff",
    subtitle: "Doctors, nurses, technicians and on-duty status.",
  },
  "/admin/appointments": {
    title: "Appointments",
    subtitle: "Today's schedule and upcoming bookings.",
  },
  "/admin/departments": {
    title: "Departments",
    subtitle: "Capacity and load across every clinical wing.",
  },
  "/admin/billing": {
    title: "Billing",
    subtitle: "Invoices, payments and outstanding balances.",
  },
  "/admin/pharmacy": {
    title: "Pharmacy",
    subtitle: "Inventory, dispensing and stock alerts.",
  },
  "/admin/reports": {
    title: "Reports",
    subtitle: "Operational, financial and clinical reports.",
  },
  "/admin/settings": {
    title: "Settings",
    subtitle: "Account, security, branding and notifications.",
  },
};

export default function AdminLayout({ onLogout }: { onLogout: () => void }) {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const meta = titleMap[location.pathname] ?? {
    title: "Dashboard",
    subtitle: "",
  };

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <div className="min-h-screen bg-ink-50/60">
      {/* ======= SIDEBAR ======= */}
      <aside
        className={`fixed top-0 left-0 z-40 h-screen w-[260px] bg-ink-950 text-white border-r border-white/5 transition-transform duration-300 lg:translate-x-0 ${
          open ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        <div className="absolute inset-0 grid-overlay opacity-20 pointer-events-none" />
        <div className="relative h-full flex flex-col">
          {/* Logo */}
          <div className="px-6 pt-6 pb-5 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-400 to-brand-700 grid place-items-center shadow-lg shadow-brand-500/30">
                <Heart className="w-5 h-5 text-white" />
              </div>
              <div className="leading-tight">
                <div className="font-display font-extrabold tracking-tight">
                  New Ikeja
                </div>
                <div className="text-[10px] uppercase tracking-[0.2em] text-brand-300 font-semibold -mt-0.5">
                  Hospital OS
                </div>
              </div>
            </div>
            <button
              onClick={() => setOpen(false)}
              className="lg:hidden w-9 h-9 rounded-lg grid place-items-center text-white/70 hover:bg-white/10"
              aria-label="Close menu"
            >
              <ChevronsLeft className="w-5 h-5" />
            </button>
          </div>

          <div className="px-3 pb-3 text-[10px] uppercase tracking-wider text-white/40 font-semibold">
            Main
          </div>

          {/* Nav */}
          <nav className="flex-1 overflow-y-auto px-3 pb-4 space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.end}
                  className={({ isActive }) =>
                    `relative flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-colors group ${
                      isActive
                        ? "bg-gradient-to-r from-brand-500/20 to-transparent text-white"
                        : "text-white/60 hover:text-white hover:bg-white/5"
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      {isActive && (
                        <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-7 rounded-r-full bg-brand-400" />
                      )}
                      <Icon
                        className={`w-[18px] h-[18px] ${
                          isActive ? "text-brand-300" : "text-white/60 group-hover:text-white"
                        }`}
                      />
                      <span>{item.label}</span>
                    </>
                  )}
                </NavLink>
              );
            })}
          </nav>

          {/* Profile + logout */}
          <div className="border-t border-white/5 p-4 m-3 rounded-2xl bg-white/5">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-coral-400 to-coral-600 text-white font-bold grid place-items-center">
                EA
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-semibold text-sm truncate">
                  Dr. Emmanuel A.
                </div>
                <div className="text-xs text-white/50 truncate">
                  Chief Medical Director
                </div>
              </div>
            </div>
            <button
              onClick={onLogout}
              className="w-full flex items-center justify-center gap-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 px-3 py-2 text-xs font-semibold text-white/80 hover:text-white transition"
            >
              <LogOut className="w-3.5 h-3.5" />
              Sign out
            </button>
          </div>
        </div>
      </aside>

      {/* Mobile backdrop */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="lg:hidden fixed inset-0 z-30 bg-ink-950/60 backdrop-blur-sm"
        />
      )}

      {/* ======= MAIN ======= */}
      <div className="lg:pl-[260px]">
        {/* Top bar */}
        <header className="sticky top-0 z-20 bg-white/85 backdrop-blur-xl border-b border-ink-100">
          <div className="flex items-center gap-3 h-16 px-4 sm:px-6 lg:px-8">
            <button
              onClick={() => setOpen(true)}
              className="lg:hidden w-10 h-10 rounded-lg grid place-items-center text-ink-700 hover:bg-ink-50"
              aria-label="Open menu"
            >
              <Menu className="w-5 h-5" />
            </button>

            <div className="hidden md:block">
              <div className="font-display font-bold text-ink-900 leading-none">
                {meta.title}
              </div>
              <div className="text-xs text-ink-500 mt-0.5">{meta.subtitle}</div>
            </div>

            <div className="flex-1 max-w-md ml-auto">
              <div className="relative">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-ink-400" />
                <input
                  placeholder="Search patients, staff, invoices..."
                  className="w-full rounded-full border border-ink-100 bg-ink-50/60 pl-10 pr-4 py-2 text-sm outline-none focus:bg-white focus:border-brand-300 transition"
                />
              </div>
            </div>

            <button className="relative w-10 h-10 rounded-lg grid place-items-center text-ink-700 hover:bg-ink-50">
              <Bell className="w-5 h-5" />
              <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-coral-500 ring-2 ring-white" />
            </button>

            <div className="hidden sm:flex items-center gap-2 pl-2 border-l border-ink-100">
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-brand-400 to-brand-700 text-white text-sm font-bold grid place-items-center">
                EA
              </div>
            </div>
          </div>

          {/* Mobile title */}
          <div className="md:hidden px-4 pb-3">
            <div className="font-display font-bold text-ink-900 text-lg leading-none">
              {meta.title}
            </div>
            <div className="text-xs text-ink-500 mt-0.5">{meta.subtitle}</div>
          </div>
        </header>

        {/* Page content */}
        <main className="p-4 sm:p-6 lg:p-8">
          <Outlet />
        </main>
      </div>

      {/* Floating mobile menu button - hidden when open */}
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="lg:hidden fixed bottom-5 right-5 z-30 w-12 h-12 rounded-full bg-gradient-to-br from-brand-400 to-brand-700 text-white grid place-items-center shadow-2xl shadow-brand-500/40"
          aria-label="Open menu"
        >
          <X className="w-5 h-5 hidden" />
          <Menu className="w-5 h-5" />
        </button>
      )}
    </div>
  );
}
