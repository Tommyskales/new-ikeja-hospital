import { Link } from "react-router-dom";
import {
  ArrowRight,
  CrossPlus,
  Facebook,
  Instagram,
  LinkedIn,
  Mail,
  MapPin,
  Phone,
  Send,
  Twitter,
} from "./Icons";

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-ink-950 text-white">
      <div className="absolute inset-0 grid-overlay opacity-30" />
      <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[700px] h-[300px] rounded-full bg-brand-500/15 blur-3xl" />

      {/* Newsletter band */}
      <div className="relative container-x pt-20 pb-12">
        <div className="rounded-3xl overflow-hidden bg-gradient-to-br from-brand-600 via-brand-700 to-ink-900 p-8 md:p-12 relative">
          <div className="absolute inset-0 grid-overlay opacity-20" />
          <div className="absolute -top-20 -right-20 w-72 h-72 rounded-full bg-coral-500/30 blur-3xl" />
          <div className="relative grid md:grid-cols-2 gap-8 items-center">
            <div>
              <span className="pill bg-white/10 text-brand-100 border border-white/15">
                Health Insights
              </span>
              <h3 className="heading-md mt-4">
                Get monthly health tips from our specialists.
              </h3>
              <p className="text-white/70 mt-3 max-w-md">
                Practical, doctor-reviewed advice on wellness, prevention, and
                family care — straight to your inbox.
              </p>
            </div>
            <form
              onSubmit={(e) => {
                e.preventDefault();
              }}
              className="flex flex-col sm:flex-row gap-3"
            >
              <input
                type="email"
                required
                placeholder="your@email.com"
                className="flex-1 rounded-full bg-white/10 border border-white/20 placeholder-white/50 px-6 py-4 outline-none focus:bg-white/15 focus:border-white/40 transition"
              />
              <button type="submit" className="btn-coral !px-6">
                Subscribe
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      </div>

      <div className="relative container-x grid md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12">
        <div className="lg:col-span-4">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-brand-400 to-brand-700 grid place-items-center shadow-lg shadow-brand-500/30">
              <CrossPlus className="w-5 h-5" />
            </div>
            <div className="leading-tight">
              <div className="font-display font-extrabold text-white tracking-tight text-[17px]">
                New Ikeja
              </div>
              <div className="text-[11px] uppercase tracking-[0.18em] text-brand-300 font-semibold -mt-0.5">
                Hospital
              </div>
            </div>
          </Link>
          <p className="text-white/60 mt-5 leading-relaxed max-w-sm">
            A multi-specialty teaching hospital in the heart of Ikeja delivering
            advanced, compassionate, 24/7 healthcare for every family in Lagos.
          </p>
          <div className="flex items-center gap-3 mt-6">
            {[Twitter, Facebook, Instagram, LinkedIn].map((Icon, i) => (
              <a
                key={i}
                href="#"
                className="w-10 h-10 grid place-items-center rounded-full border border-white/15 text-white/70 hover:text-white hover:border-white/40 hover:bg-white/5 transition"
              >
                <Icon className="w-4 h-4" />
              </a>
            ))}
          </div>
        </div>

        <div className="lg:col-span-2">
          <h4 className="text-sm font-bold uppercase tracking-wider text-white/90 mb-4">
            Hospital
          </h4>
          <ul className="space-y-2.5 text-white/60">
            <li><Link to="/about" className="hover:text-brand-300 transition">About Us</Link></li>
            <li><Link to="/services" className="hover:text-brand-300 transition">Services</Link></li>
            <li><Link to="/appointment" className="hover:text-brand-300 transition">Book Appointment</Link></li>
            <li><Link to="/contact" className="hover:text-brand-300 transition">Contact</Link></li>
            <li><Link to="/admin" className="hover:text-brand-300 transition">Staff Portal</Link></li>
          </ul>
        </div>

        <div className="lg:col-span-3">
          <h4 className="text-sm font-bold uppercase tracking-wider text-white/90 mb-4">
            Specialties
          </h4>
          <ul className="space-y-2.5 text-white/60">
            <li><a href="#" className="hover:text-brand-300 transition">Cardiology</a></li>
            <li><a href="#" className="hover:text-brand-300 transition">Pediatrics</a></li>
            <li><a href="#" className="hover:text-brand-300 transition">Maternity & Obstetrics</a></li>
            <li><a href="#" className="hover:text-brand-300 transition">General Surgery</a></li>
            <li><a href="#" className="hover:text-brand-300 transition">Diagnostics & Imaging</a></li>
          </ul>
        </div>

        <div className="lg:col-span-3">
          <h4 className="text-sm font-bold uppercase tracking-wider text-white/90 mb-4">
            Contact
          </h4>
          <ul className="space-y-3 text-white/70">
            <li className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-brand-300 mt-0.5 shrink-0" />
              <span>12 Allen Avenue, Ikeja, Lagos, Nigeria</span>
            </li>
            <li className="flex items-start gap-3">
              <Phone className="w-5 h-5 text-brand-300 mt-0.5 shrink-0" />
              <a href="tel:+2348000000000" className="hover:text-brand-300">+234 800 000 0000</a>
            </li>
            <li className="flex items-start gap-3">
              <Mail className="w-5 h-5 text-brand-300 mt-0.5 shrink-0" />
              <a href="mailto:hello@newikejahospital.com" className="hover:text-brand-300">
                hello@newikejahospital.com
              </a>
            </li>
          </ul>

          <Link to="/appointment" className="inline-flex items-center gap-2 mt-6 text-brand-300 font-semibold hover:gap-3 transition-all">
            Book an appointment <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

      <div className="relative border-t border-white/10">
        <div className="container-x flex flex-col md:flex-row items-center justify-between gap-4 py-6 text-sm text-white/50">
          <p>© {new Date().getFullYear()} New Ikeja Hospital. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-white transition">Privacy</a>
            <a href="#" className="hover:text-white transition">Terms</a>
            <a href="#" className="hover:text-white transition">Accessibility</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
