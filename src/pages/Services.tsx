import { Link } from "react-router-dom";
import PageHero from "../components/PageHero";
import {
  Ambulance,
  ArrowRight,
  Baby,
  Bone,
  Brain,
  Calendar,
  Check,
  Eye,
  HeartPulse,
  Microscope,
  Phone,
  Pill,
  Shield,
  Stethoscope,
  Tooth,
} from "../components/Icons";

const departments = [
  {
    icon: HeartPulse,
    title: "Cardiology",
    desc: "From routine ECGs to complex interventional cardiology.",
    bullets: ["ECG & ECHO", "Stress testing", "Cardiac catheterization", "Pacemaker fitting"],
    grad: "from-rose-50 to-coral-100",
    iconGrad: "from-coral-400 to-coral-700",
  },
  {
    icon: Brain,
    title: "Neurology",
    desc: "Comprehensive care for the brain, spine and nervous system.",
    bullets: ["Stroke care", "Epilepsy management", "EEG / EMG", "Neuropathy clinic"],
    grad: "from-violet-50 to-purple-100",
    iconGrad: "from-violet-400 to-purple-700",
  },
  {
    icon: Baby,
    title: "Maternity & Obstetrics",
    desc: "Pregnancy, birth and postnatal — every step beside you.",
    bullets: ["Antenatal care", "Birthing suites", "C-section theatre", "Neonatal ICU"],
    grad: "from-pink-50 to-rose-100",
    iconGrad: "from-rose-400 to-coral-700",
  },
  {
    icon: Stethoscope,
    title: "Pediatrics",
    desc: "From the first vaccine to the last teenage check-up.",
    bullets: ["Well-baby clinic", "Immunizations", "Growth tracking", "Pediatric A&E"],
    grad: "from-amber-50 to-orange-100",
    iconGrad: "from-amber-400 to-orange-700",
  },
  {
    icon: Bone,
    title: "Orthopaedics",
    desc: "Bone, joint and sports-injury care with rehab on-site.",
    bullets: ["Joint replacement", "Fracture clinic", "Arthroscopy", "Physiotherapy"],
    grad: "from-emerald-50 to-teal-100",
    iconGrad: "from-emerald-400 to-teal-700",
  },
  {
    icon: Eye,
    title: "Ophthalmology",
    desc: "Modern eye care from screening to surgical correction.",
    bullets: ["Refraction tests", "Cataract surgery", "Glaucoma management", "Retina clinic"],
    grad: "from-sky-50 to-cyan-100",
    iconGrad: "from-sky-400 to-cyan-700",
  },
  {
    icon: Tooth,
    title: "Dental & Oral",
    desc: "Routine to advanced dental care for the whole family.",
    bullets: ["Cleanings", "Orthodontics", "Implants", "Cosmetic dentistry"],
    grad: "from-blue-50 to-indigo-100",
    iconGrad: "from-blue-400 to-indigo-700",
  },
  {
    icon: Microscope,
    title: "Diagnostics & Imaging",
    desc: "MRI, CT, ultrasound, and a fully equipped pathology lab.",
    bullets: ["MRI / CT", "Ultrasound", "Histopathology", "Blood work"],
    grad: "from-cyan-50 to-brand-100",
    iconGrad: "from-cyan-400 to-brand-700",
  },
  {
    icon: Pill,
    title: "Pharmacy 24/7",
    desc: "Verified medications dispensed any time of day or night.",
    bullets: ["WHO-vetted stock", "Home delivery", "Chronic refills", "Drug counselling"],
    grad: "from-lime-50 to-emerald-100",
    iconGrad: "from-lime-400 to-emerald-700",
  },
  {
    icon: Ambulance,
    title: "24/7 Emergency",
    desc: "Always staffed, always ready. We dispatch in minutes.",
    bullets: ["Trauma bay", "Resuscitation", "Critical transport", "On-site senior MD"],
    grad: "from-red-50 to-coral-100",
    iconGrad: "from-red-500 to-coral-700",
  },
];

const featured = {
  icon: HeartPulse,
  title: "Heart & Vascular Centre",
  description:
    "Our flagship cardiac care unit brings together interventional cardiology, cardiothoracic surgery and cardiac rehab — under one roof, with a single multidisciplinary team.",
  features: [
    "24/7 cath-lab activation",
    "Door-to-balloon time under 60 minutes",
    "On-site cardiac rehab program",
    "Pediatric and adult cardiology",
    "Pacemaker & ICD implantation",
    "Heart failure clinic",
  ],
};

export default function Services() {
  return (
    <main>
      <PageHero
        eyebrow="Our services"
        title="Specialty care for"
        highlight="every season of life."
        description="From the first prenatal visit to advanced surgical procedures — discover the full range of services we offer under one roof in Ikeja."
        breadcrumbs={[{ label: "Home", to: "/" }, { label: "Services" }]}
      />

      {/* Featured department spotlight */}
      <section className="section bg-white">
        <div className="container-x">
          <div className="grid lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-5">
              <span className="eyebrow">Featured</span>
              <h2 className="heading-lg mt-3 text-balance">
                {featured.title.split(" ").slice(0, 2).join(" ")}{" "}
                <span className="font-serif italic font-medium text-brand-700">
                  {featured.title.split(" ").slice(2).join(" ")}
                </span>
              </h2>
              <p className="text-ink-600 mt-5 text-lg leading-relaxed">
                {featured.description}
              </p>

              <ul className="mt-7 grid sm:grid-cols-2 gap-2.5">
                {featured.features.map((f) => (
                  <li
                    key={f}
                    className="flex items-center gap-2.5 rounded-xl bg-brand-50/60 border border-brand-100 px-3.5 py-2.5 text-sm font-semibold text-brand-800"
                  >
                    <Check className="w-4 h-4 text-brand-600 shrink-0" /> {f}
                  </li>
                ))}
              </ul>

              <div className="mt-9 flex flex-wrap gap-3">
                <Link to="/appointment" className="btn-primary">
                  Book a consultation <ArrowRight className="w-4 h-4" />
                </Link>
                <a href="tel:+2348000000000" className="btn-ghost-dark">
                  <Phone className="w-4 h-4" /> Speak to a cardiologist
                </a>
              </div>
            </div>

            <div className="lg:col-span-7">
              <div className="relative">
                <div className="absolute inset-0 -m-6 rounded-[40px] bg-gradient-to-br from-brand-300/50 via-brand-500/20 to-coral-400/40 blur-2xl" />
                <div className="relative rounded-[36px] bg-gradient-to-br from-ink-900 via-ink-950 to-brand-900 text-white overflow-hidden">
                  <div className="absolute inset-0 grid-overlay opacity-40" />
                  <div className="absolute -top-24 -right-24 w-72 h-72 rounded-full bg-brand-400/30 blur-3xl animate-float-slow" />
                  <div className="relative p-8 md:p-12">
                    <div className="flex items-center justify-between">
                      <span className="pill bg-white/10 border border-white/15 text-brand-200">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse-soft" />
                        Cath-lab live
                      </span>
                      <span className="text-xs text-white/60">
                        {new Date().toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </span>
                    </div>

                    <svg viewBox="0 0 480 120" className="w-full mt-7 text-brand-300">
                      <defs>
                        <linearGradient id="ekg2" x1="0" x2="1">
                          <stop offset="0%" stopColor="#22D3EE" stopOpacity="0" />
                          <stop offset="50%" stopColor="#22D3EE" />
                          <stop offset="100%" stopColor="#FB5A3C" />
                        </linearGradient>
                      </defs>
                      <path
                        d="M0 60 L60 60 L80 60 L100 30 L120 90 L140 60 L220 60 L240 15 L260 105 L280 60 L380 60 L400 35 L420 80 L480 60"
                        fill="none"
                        stroke="url(#ekg2)"
                        strokeWidth="3"
                        strokeLinecap="round"
                      />
                    </svg>

                    <div className="grid grid-cols-3 gap-4 mt-8">
                      {[
                        { l: "Door-to-balloon", v: "< 60 min" },
                        { l: "Survival rate", v: "99.2%" },
                        { l: "Procedures/yr", v: "1,400+" },
                      ].map((m) => (
                        <div
                          key={m.l}
                          className="rounded-2xl bg-white/5 border border-white/10 p-4"
                        >
                          <div className="text-[10px] uppercase tracking-wider text-white/50">
                            {m.l}
                          </div>
                          <div className="font-display font-extrabold text-2xl mt-1">
                            {m.v}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* DEPARTMENTS GRID */}
      <section className="section bg-ink-50/60">
        <div className="container-x">
          <div className="max-w-2xl mb-12">
            <span className="eyebrow">All departments</span>
            <h2 className="heading-lg mt-3 text-balance">
              The full clinical{" "}
              <span className="font-serif italic font-medium text-brand-700">
                ecosystem.
              </span>
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {departments.map((d, i) => {
              const Icon = d.icon;
              return (
                <div
                  key={d.title}
                  className="group relative rounded-3xl overflow-hidden bg-white border border-ink-100 card-hover reveal"
                  style={{ animationDelay: `${i * 60}ms` }}
                >
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${d.grad} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                  />
                  <div className="relative p-7">
                    <div
                      className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${d.iconGrad} text-white grid place-items-center shadow-lg shadow-black/10`}
                    >
                      <Icon className="w-6 h-6" />
                    </div>
                    <h3 className="font-display font-bold text-xl mt-5">
                      {d.title}
                    </h3>
                    <p className="text-ink-600 mt-2 leading-relaxed">{d.desc}</p>

                    <ul className="mt-5 space-y-1.5">
                      {d.bullets.map((b) => (
                        <li
                          key={b}
                          className="flex items-center gap-2 text-sm text-ink-700"
                        >
                          <Check className="w-3.5 h-3.5 text-brand-600 shrink-0" />
                          {b}
                        </li>
                      ))}
                    </ul>

                    <div className="mt-6 flex items-center gap-2 text-sm font-semibold text-brand-700 opacity-80 group-hover:opacity-100 group-hover:gap-3 transition-all">
                      Book this department <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* INSURANCE / TRUST */}
      <section className="section bg-white">
        <div className="container-x">
          <div className="rounded-3xl bg-gradient-to-br from-ink-50 to-white border border-ink-100 p-10 md:p-14 grid lg:grid-cols-2 gap-10 items-center">
            <div>
              <span className="eyebrow">Insurance & accreditations</span>
              <h2 className="heading-md mt-3 text-balance">
                Covered by every major HMO. Trusted by every regulator.
              </h2>
              <p className="text-ink-600 mt-4 leading-relaxed">
                We work with all major HMOs and offer transparent self-pay
                billing with itemized invoices. Our protocols meet
                international standards.
              </p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {[
                { l: "JCI Aligned", icon: Shield },
                { l: "ISO 9001", icon: Shield },
                { l: "MDCN Accredited", icon: Shield },
                { l: "Hygeia HMO", icon: Check },
                { l: "AXA Mansard", icon: Check },
                { l: "AIICO HMO", icon: Check },
              ].map((b) => {
                const Ic = b.icon;
                return (
                  <div
                    key={b.l}
                    className="rounded-2xl bg-white border border-ink-100 px-4 py-4 flex items-center gap-3"
                  >
                    <div className="w-9 h-9 rounded-lg bg-brand-50 text-brand-700 grid place-items-center">
                      <Ic className="w-4 h-4" />
                    </div>
                    <div className="font-semibold text-ink-800 text-sm">
                      {b.l}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="mt-10 rounded-3xl mesh-bg text-white p-10 md:p-14 relative overflow-hidden">
            <div className="absolute inset-0 grid-overlay opacity-40" />
            <div className="relative grid lg:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="heading-md text-balance">
                  Not sure which department you need?
                </h3>
                <p className="text-white/75 mt-3">
                  Call us — we'll listen, route you to the right consultant,
                  and get you booked. Free of charge.
                </p>
              </div>
              <div className="flex flex-wrap gap-3 lg:justify-end">
                <Link to="/appointment" className="btn-primary">
                  <Calendar className="w-4 h-4" /> Book appointment
                </Link>
                <a href="tel:+2348000000000" className="btn-ghost-light">
                  <Phone className="w-4 h-4" /> Call us
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
