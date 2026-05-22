import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { ArrowRight, Close, CrossPlus, Menu, Phone } from "./Icons";

const links = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/services", label: "Services" },
  { to: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 18);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

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
    <>
      {/* Top utility strip */}
      <div className="hidden md:block bg-ink-950 text-white/80 text-xs">
        <div className="container-x flex items-center justify-between h-9">
          <div className="flex items-center gap-5">
            <span className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse-soft" />
              24/7 Emergency Care
            </span>
            <span className="hidden lg:inline text-white/40">|</span>
            <span className="hidden lg:inline">Allen Avenue, Ikeja, Lagos</span>
          </div>
          <div className="flex items-center gap-4">
            <a href="tel:+2348000000000" className="hover:text-brand-300 transition">
              +234 800 000 0000
            </a>
            <span className="text-white/30">|</span>
            <Link to="/admin" className="hover:text-brand-300 transition">
              Staff Portal
            </Link>
          </div>
        </div>
      </div>

      <header
        className={`sticky top-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-white/85 backdrop-blur-xl border-b border-ink-100 shadow-sm"
            : "bg-transparent"
        }`}
      >
        <div className="container-x flex items-center justify-between h-[72px]">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="relative">
              <div className="absolute inset-0 rounded-xl bg-brand-400/30 blur-lg group-hover:blur-xl transition-all" />
              <div className="relative w-11 h-11 rounded-xl bg-gradient-to-br from-brand-400 to-brand-700 flex items-center justify-center text-white shadow-lg shadow-brand-500/30">
                <CrossPlus className="w-5 h-5" />
              </div>
            </div>
            <div className="leading-tight">
              <div
                className={`font-display font-extrabold tracking-tight text-[17px] transition-colors ${
                  scrolled ? "text-ink-900" : "text-white"
                }`}
              >
                New Ikeja
              </div>
              <div
                className={`text-[11px] uppercase tracking-[0.18em] font-semibold -mt-0.5 transition-colors ${
                  scrolled ? "text-brand-600" : "text-brand-300"
                }`}
              >
                Hospital
              </div>
            </div>
          </Link>

          {/* Desktop links */}
          <nav className="hidden lg:flex items-center gap-1">
            {links.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                end={l.to === "/"}
                className={({ isActive }) =>
                  `relative px-4 py-2 text-sm font-semibold transition-colors ${
                    scrolled
                      ? isActive
                        ? "text-ink-900"
                        : "text-ink-600 hover:text-ink-900"
                      : isActive
                      ? "text-white"
                      : "text-white/70 hover:text-white"
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    {l.label}
                    {isActive && (
                      <span
                        className={`absolute left-1/2 -translate-x-1/2 bottom-0 w-1.5 h-1.5 rounded-full ${
                          scrolled ? "bg-brand-500" : "bg-brand-300"
                        }`}
                      />
                    )}
                  </>
                )}
              </NavLink>
            ))}
          </nav>

          <div className="flex items-center gap-2 sm:gap-3">
            <a
              href="tel:+2348000000000"
              className={`hidden sm:flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold transition ${
                scrolled
                  ? "text-ink-700 hover:text-brand-700"
                  : "text-white/80 hover:text-white"
              }`}
            >
              <Phone className="w-4 h-4" />
              <span className="hidden md:inline">Emergency</span>
            </a>
            <Link
              to="/appointment"
              className="hidden sm:inline-flex btn-primary !px-5 !py-2.5 text-sm"
            >
              Book Appointment
              <ArrowRight className="w-4 h-4" />
            </Link>

            <button
              onClick={() => setOpen((v) => !v)}
              className={`lg:hidden w-11 h-11 grid place-items-center rounded-xl border transition ${
                scrolled
                  ? "border-ink-100 text-ink-800 hover:bg-ink-50"
                  : "border-white/20 text-white hover:bg-white/10"
              }`}
              aria-label="Open menu"
            >
              {open ? <Close className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile drawer */}
      <div
        className={`fixed inset-0 z-40 lg:hidden transition-opacity duration-300 ${
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        <div
          className="absolute inset-0 bg-ink-950/60 backdrop-blur-sm"
          onClick={() => setOpen(false)}
        />
        <aside
          className={`absolute right-0 top-0 h-full w-[88%] max-w-sm bg-white shadow-2xl transition-transform duration-500 ${
            open ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="px-6 pt-24 pb-6 h-full flex flex-col">
            <nav className="flex flex-col gap-1">
              {links.map((l, i) => (
                <NavLink
                  key={l.to}
                  to={l.to}
                  end={l.to === "/"}
                  style={{ animationDelay: `${i * 60}ms` }}
                  className={({ isActive }) =>
                    `reveal flex items-center justify-between px-4 py-4 rounded-2xl text-lg font-semibold transition ${
                      isActive
                        ? "bg-brand-50 text-brand-700"
                        : "text-ink-800 hover:bg-ink-50"
                    }`
                  }
                >
                  {l.label}
                  <ArrowRight className="w-4 h-4 opacity-60" />
                </NavLink>
              ))}
            </nav>

            <div className="mt-auto pt-6 border-t border-ink-100 space-y-3">
              <Link to="/appointment" className="btn-primary w-full">
                Book an Appointment
                <ArrowRight className="w-4 h-4" />
              </Link>
              <a
                href="tel:+2348000000000"
                className="btn-ghost-dark w-full"
              >
                <Phone className="w-4 h-4" />
                +234 800 000 0000
              </a>
              <Link to="/admin" className="block text-center text-sm text-ink-500 pt-2 hover:text-ink-800">
                Staff Portal
              </Link>
            </div>
          </div>
        </aside>
      </div>
    </>
  );
}
