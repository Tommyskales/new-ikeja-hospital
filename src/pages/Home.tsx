import { Link } from "react-router-dom";
import {
  Ambulance,
  ArrowRight,
  ArrowUpRight,
  Award,
  Baby,
  Brain,
  Calendar,
  Check,
  Clock,
  CrossPlus,
  HeartPulse,
  Microscope,
  Phone,
  Pill,
  Quote,
  Shield,
  Sparkles,
  Star,
  Stethoscope,
  Users,
} from "../components/Icons";

const stats = [
  { value: "35+", label: "Years of Service" },
  { value: "120k+", label: "Patients Cared For" },
  { value: "80+", label: "Specialist Doctors" },
  { value: "24/7", label: "Emergency Response" },
];

const specialties = [
  {
    icon: HeartPulse,
    title: "Cardiology",
    desc: "Advanced cardiac diagnostics, intervention and rehabilitation.",
    tag: "Heart",
  },
  {
    icon: Brain,
    title: "Neurology",
    desc: "Comprehensive care for stroke, epilepsy and neurological disorders.",
    tag: "Brain & Nerve",
  },
  {
    icon: Baby,
    title: "Maternity & Pediatrics",
    desc: "From prenatal to postnatal — and the first decade of childhood.",
    tag: "Mother & Child",
  },
  {
    icon: Stethoscope,
    title: "General Medicine",
    desc: "Everyday consultations with senior physicians, on your schedule.",
    tag: "Family",
  },
  {
    icon: Microscope,
    title: "Diagnostics & Imaging",
    desc: "MRI, CT, ultrasound and a fully equipped pathology lab on-site.",
    tag: "Lab",
  },
  {
    icon: Pill,
    title: "Pharmacy 24/7",
    desc: "In-house pharmacy with verified medication and home delivery.",
    tag: "Meds",
  },
];

const doctors = [
  {
    name: "Dr. Adaeze Okafor",
    role: "Chief Cardiologist",
    initials: "AO",
    grad: "from-rose-400 via-coral-500 to-coral-700",
    rating: 4.9,
  },
  {
    name: "Dr. Tunde Bakare",
    role: "Head of Surgery",
    initials: "TB",
    grad: "from-brand-300 via-brand-500 to-brand-800",
    rating: 4.8,
  },
  {
    name: "Dr. Ngozi Eze",
    role: "Pediatrics Lead",
    initials: "NE",
    grad: "from-emerald-300 via-teal-500 to-cyan-700",
    rating: 5.0,
  },
  {
    name: "Dr. Ifeoluwa Ade",
    role: "Senior Neurologist",
    initials: "IA",
    grad: "from-violet-400 via-fuchsia-500 to-purple-700",
    rating: 4.9,
  },
];

const testimonials = [
  {
    quote:
      "From the moment I walked in, I felt seen. The cardiology team didn't just treat my condition — they gave me a plan to live better.",
    name: "Mrs. Folashade A.",
    role: "Cardiology patient",
  },
  {
    quote:
      "We had our baby here. The midwives, the suite, the after-care — everything was top tier. We felt held the whole way through.",
    name: "Mr. & Mrs. Eze",
    role: "Maternity",
  },
  {
    quote:
      "The diagnostics turnaround is unreal. MRI in the morning, full report by lunch. This is the standard of care Lagos deserves.",
    name: "Engr. Kunle O.",
    role: "Diagnostics patient",
  },
];

export default function Home() {
  return (
    <main>
      {/* ===== HERO ===== */}
      <section className="relative overflow-hidden mesh-bg text-white -mt-[72px] md:-mt-[calc(72px+36px)] pt-[72px] md:pt-[calc(72px+36px)]">
        <div className="absolute inset-0 grid-overlay opacity-50" />
        <div className="absolute -top-40 -left-32 w-[520px] h-[520px] rounded-full bg-brand-500/25 blur-3xl animate-float-slow" />
        <div className="absolute top-1/3 -right-20 w-[420px] h-[420px] rounded-full bg-coral-500/20 blur-3xl animate-float-slow" />

        <div className="container-x relative pt-20 pb-28 md:pt-28 md:pb-36">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            {/* Left content */}
            <div className="lg:col-span-7">
              <div className="reveal pill bg-white/10 border border-white/15 text-brand-200">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse-soft" />
                Now accepting new patients · 24/7
              </div>

              <h1 className="reveal delay-100 heading-xl mt-6 text-balance">
                Healing lives.{" "}
                <span className="font-serif italic font-medium gradient-text">
                  Building trust.
                </span>{" "}
                Every single day.
              </h1>

              <p className="reveal delay-200 mt-7 text-lg md:text-xl text-white/75 leading-relaxed max-w-xl">
                A multi-specialty teaching hospital in the heart of Ikeja —
                where world-class medicine meets warm, attentive,
                family-centered care.
              </p>

              <div className="reveal delay-300 mt-9 flex flex-col sm:flex-row gap-3">
                <Link to="/appointment" className="btn-primary">
                  Book an appointment
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <a href="tel:+2348000000000" className="btn-ghost-light">
                  <Phone className="w-4 h-4" />
                  Call emergency line
                </a>
              </div>

              {/* Trust badges */}
              <div className="reveal delay-400 mt-10 flex flex-wrap items-center gap-x-8 gap-y-3 text-sm text-white/60">
                <span className="flex items-center gap-2">
                  <Shield className="w-4 h-4 text-brand-300" /> ISO 9001 Certified
                </span>
                <span className="flex items-center gap-2">
                  <Award className="w-4 h-4 text-brand-300" /> JCI Accredited
                </span>
                <span className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-brand-300" /> 80+ Specialists
                </span>
              </div>
            </div>

            {/* Right visual */}
            <div className="lg:col-span-5 relative">
              <div className="relative reveal delay-300">
                {/* Floating glow card */}
                <div className="relative aspect-[4/5] max-w-md mx-auto">
                  <div className="absolute inset-0 rounded-[36px] bg-gradient-to-br from-brand-400/30 via-transparent to-coral-500/30 blur-2xl" />
                  <div className="relative h-full rounded-[36px] glass overflow-hidden p-7 flex flex-col justify-between">
                    {/* Top heart-pulse motif */}
                    <div className="flex items-center justify-between">
                      <span className="pill bg-white/10 text-white border border-white/15">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse-soft" />
                        Vitals Live
                      </span>
                      <div className="text-xs text-white/60">
                        Today · {new Date().toLocaleDateString()}
                      </div>
                    </div>

                    {/* Pulse waveform */}
                    <div>
                      <svg viewBox="0 0 320 80" className="w-full h-24 text-brand-300">
                        <defs>
                          <linearGradient id="ekg" x1="0" x2="1">
                            <stop offset="0%" stopColor="#22D3EE" stopOpacity="0" />
                            <stop offset="50%" stopColor="#22D3EE" />
                            <stop offset="100%" stopColor="#FB5A3C" />
                          </linearGradient>
                        </defs>
                        <path
                          d="M0 40 L40 40 L60 40 L75 20 L90 60 L110 40 L160 40 L175 10 L190 70 L210 40 L260 40 L275 25 L290 55 L320 40"
                          fill="none"
                          stroke="url(#ekg)"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                        />
                      </svg>

                      <div className="grid grid-cols-3 gap-3 mt-4">
                        {[
                          { label: "BPM", value: "72" },
                          { label: "SpO₂", value: "99%" },
                          { label: "BP", value: "118/76" },
                        ].map((m) => (
                          <div key={m.label} className="rounded-2xl bg-white/5 border border-white/10 p-3">
                            <div className="text-[10px] uppercase tracking-wider text-white/50">
                              {m.label}
                            </div>
                            <div className="font-display font-bold text-xl mt-0.5">
                              {m.value}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Doctor card */}
                    <div className="rounded-2xl bg-gradient-to-br from-white/10 to-white/5 border border-white/10 p-4 flex items-center gap-3">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-brand-300 to-brand-700 grid place-items-center font-bold text-white">
                        AO
                      </div>
                      <div className="flex-1">
                        <div className="font-semibold text-sm">Dr. Adaeze Okafor</div>
                        <div className="text-xs text-white/60">
                          Cardiology · Available now
                        </div>
                      </div>
                      <ArrowUpRight className="w-4 h-4 text-brand-300" />
                    </div>
                  </div>

                  {/* Floating mini-stat */}
                  <div className="hidden md:flex absolute -left-10 top-12 w-44 rounded-2xl bg-white text-ink-900 shadow-2xl shadow-brand-900/20 p-4 items-center gap-3 animate-float">
                    <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 grid place-items-center">
                      <Check className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-xs text-ink-500">Appointment</div>
                      <div className="font-bold text-sm">Confirmed</div>
                    </div>
                  </div>

                  <div
                    className="hidden md:flex absolute -right-8 bottom-16 w-48 rounded-2xl bg-ink-900 text-white shadow-2xl p-4 items-center gap-3 animate-float"
                    style={{ animationDelay: "1.2s" }}
                  >
                    <div className="w-10 h-10 rounded-xl bg-coral-500/20 text-coral-400 grid place-items-center">
                      <Ambulance className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-xs text-white/60">Emergency</div>
                      <div className="font-bold text-sm">Arrival ~6 min</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Curved divider */}
        <svg className="block w-full text-white" viewBox="0 0 1440 70" preserveAspectRatio="none">
          <path fill="currentColor" d="M0,70 C240,30 480,55 720,40 C960,25 1200,55 1440,15 L1440,70 Z" />
        </svg>
      </section>

      {/* ===== STATS STRIP ===== */}
      <section className="bg-white">
        <div className="container-x py-16 md:py-20">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-10">
            {stats.map((s, i) => (
              <div key={s.label} className="reveal" style={{ animationDelay: `${i * 80}ms` }}>
                <div className="font-display text-4xl md:text-5xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-ink-900 to-brand-700">
                  {s.value}
                </div>
                <div className="mt-1 text-sm font-semibold text-ink-500 uppercase tracking-wider">
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== SPECIALTIES ===== */}
      <section className="relative section bg-ink-50/60">
        <div className="absolute inset-0 bg-grid-dark opacity-40 [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]" />
        <div className="container-x relative">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14">
            <div className="max-w-2xl">
              <span className="eyebrow">What we do</span>
              <h2 className="heading-lg mt-3 text-balance">
                Specialty care, <span className="font-serif italic font-medium text-brand-700">all under one roof.</span>
              </h2>
              <p className="text-ink-600 mt-4 text-lg leading-relaxed">
                From routine checkups to complex procedures, our consultants
                deliver personalized treatment with the latest technology.
              </p>
            </div>
            <Link
              to="/services"
              className="inline-flex items-center gap-2 font-semibold text-brand-700 hover:gap-3 transition-all"
            >
              See all services <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {specialties.map((s, i) => {
              const Icon = s.icon;
              return (
                <div
                  key={s.title}
                  className="group relative rounded-3xl bg-white border border-ink-100 p-7 card-hover overflow-hidden reveal"
                  style={{ animationDelay: `${i * 70}ms` }}
                >
                  <div className="absolute -top-16 -right-16 w-40 h-40 rounded-full bg-brand-100/0 group-hover:bg-brand-100/80 transition-all duration-500 blur-2xl" />
                  <div className="relative">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-brand-400 to-brand-700 text-white grid place-items-center shadow-lg shadow-brand-500/25">
                      <Icon className="w-6 h-6" />
                    </div>
                    <div className="mt-5 flex items-center gap-2">
                      <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-brand-600">
                        {s.tag}
                      </span>
                    </div>
                    <h3 className="font-display font-bold text-xl mt-1">{s.title}</h3>
                    <p className="text-ink-600 mt-2.5 leading-relaxed">{s.desc}</p>
                    <div className="mt-6 flex items-center gap-2 text-sm font-semibold text-brand-700 opacity-80 group-hover:opacity-100 group-hover:gap-3 transition-all">
                      Learn more <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ===== WHY US ===== */}
      <section className="section bg-white">
        <div className="container-x grid lg:grid-cols-2 gap-14 items-center">
          <div className="relative">
            {/* Visual collage */}
            <div className="relative aspect-square max-w-lg">
              <div className="absolute inset-6 rounded-[36px] bg-gradient-to-br from-brand-400 via-brand-600 to-ink-900 shadow-soft-lg" />
              <div className="absolute inset-6 rounded-[36px] grid-overlay opacity-40" />
              <div className="absolute inset-6 rounded-[36px] flex items-end p-8">
                <div className="text-white">
                  <div className="font-serif italic text-xl">"</div>
                  <p className="font-display font-bold text-2xl leading-tight">
                    The standard of care your family deserves.
                  </p>
                </div>
              </div>

              {/* Floating chip cards */}
              <div className="absolute -top-4 -left-4 bg-white rounded-2xl shadow-soft-lg p-4 flex items-center gap-3 animate-float">
                <div className="w-11 h-11 rounded-xl bg-emerald-100 text-emerald-700 grid place-items-center">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-[11px] uppercase tracking-wider text-ink-500 font-semibold">
                    Patient Score
                  </div>
                  <div className="font-display font-extrabold text-2xl text-ink-900">
                    98.4%
                  </div>
                </div>
              </div>

              <div
                className="absolute -bottom-6 -right-2 bg-white rounded-2xl shadow-soft-lg p-4 w-56 animate-float"
                style={{ animationDelay: "1s" }}
              >
                <div className="flex items-center gap-2 text-amber-500">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4" />
                  ))}
                </div>
                <p className="text-sm text-ink-700 mt-2 font-medium">
                  "Best hospital experience I've had in Lagos."
                </p>
                <p className="text-[11px] text-ink-500 mt-1">— Verified patient</p>
              </div>
            </div>
          </div>

          <div>
            <span className="eyebrow">Why New Ikeja</span>
            <h2 className="heading-lg mt-3 text-balance">
              Modern medicine,{" "}
              <span className="underline-grad">human warmth.</span>
            </h2>
            <p className="text-ink-600 mt-5 text-lg leading-relaxed">
              We combine cutting-edge equipment with consultants who actually
              listen — so every visit feels less like a hospital trip and more
              like care from a friend who happens to be a doctor.
            </p>

            <ul className="mt-8 space-y-4">
              {[
                {
                  icon: Clock,
                  title: "On-time appointments",
                  desc: "Average wait time under 12 minutes — we respect your schedule.",
                },
                {
                  icon: Microscope,
                  title: "On-site advanced diagnostics",
                  desc: "MRI, CT, ultrasound and pathology — same-day reports for most tests.",
                },
                {
                  icon: Shield,
                  title: "Insurance-friendly billing",
                  desc: "We work with all major HMOs and offer transparent self-pay rates.",
                },
                {
                  icon: Users,
                  title: "Family-centered care",
                  desc: "Dedicated case managers who keep you informed at every step.",
                },
              ].map((it) => {
                const Icon = it.icon;
                return (
                  <li key={it.title} className="flex items-start gap-4">
                    <div className="w-11 h-11 shrink-0 rounded-xl bg-brand-50 text-brand-700 grid place-items-center">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="font-display font-bold text-ink-900">
                        {it.title}
                      </div>
                      <div className="text-ink-600 mt-1">{it.desc}</div>
                    </div>
                  </li>
                );
              })}
            </ul>

            <div className="mt-10 flex flex-wrap gap-3">
              <Link to="/about" className="btn-ghost-dark">
                Learn about us
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link to="/services" className="btn-primary">
                Explore services
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ===== DOCTORS ===== */}
      <section className="section bg-ink-50/60">
        <div className="container-x">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14">
            <div className="max-w-2xl">
              <span className="eyebrow">Our consultants</span>
              <h2 className="heading-lg mt-3 text-balance">
                Meet the people behind your{" "}
                <span className="font-serif italic font-medium text-brand-700">
                  best care.
                </span>
              </h2>
            </div>
            <Link to="/about" className="inline-flex items-center gap-2 font-semibold text-brand-700 hover:gap-3 transition-all">
              View full directory <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {doctors.map((d, i) => (
              <div
                key={d.name}
                className="group relative rounded-3xl overflow-hidden bg-white border border-ink-100 card-hover reveal"
                style={{ animationDelay: `${i * 80}ms` }}
              >
                <div className={`relative aspect-[4/5] bg-gradient-to-br ${d.grad} flex items-end justify-center overflow-hidden`}>
                  <div className="absolute inset-0 grid-overlay opacity-30" />
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/40" />
                  <div className="font-display font-extrabold text-white/90 text-[10rem] leading-none translate-y-6 select-none">
                    {d.initials}
                  </div>
                  <div className="absolute top-4 left-4 pill bg-white/15 text-white border border-white/25 backdrop-blur">
                    <Star className="w-3 h-3 text-amber-300" />
                    {d.rating}
                  </div>
                  <div className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/15 backdrop-blur grid place-items-center text-white border border-white/25 group-hover:bg-white group-hover:text-ink-900 transition">
                    <ArrowUpRight className="w-4 h-4" />
                  </div>
                </div>
                <div className="p-5">
                  <div className="font-display font-bold text-lg">{d.name}</div>
                  <div className="text-sm text-ink-500">{d.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== TESTIMONIALS ===== */}
      <section className="section bg-white">
        <div className="container-x">
          <div className="max-w-2xl mb-14">
            <span className="eyebrow">Patient stories</span>
            <h2 className="heading-lg mt-3 text-balance">
              Real moments.{" "}
              <span className="font-serif italic font-medium text-brand-700">
                Real recoveries.
              </span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <figure
                key={i}
                className="relative rounded-3xl bg-gradient-to-br from-ink-50 to-white border border-ink-100 p-7 card-hover reveal"
                style={{ animationDelay: `${i * 100}ms` }}
              >
                <Quote className="w-9 h-9 text-brand-500/30 absolute top-6 right-6" />
                <div className="flex items-center gap-1.5 text-amber-500">
                  {[...Array(5)].map((_, j) => (
                    <Star key={j} className="w-4 h-4" />
                  ))}
                </div>
                <blockquote className="mt-5 text-ink-800 leading-relaxed text-[15px]">
                  "{t.quote}"
                </blockquote>
                <figcaption className="mt-6 pt-5 border-t border-ink-100 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-brand-400 to-brand-700 text-white font-bold grid place-items-center">
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <div className="font-display font-bold text-ink-900 text-sm">
                      {t.name}
                    </div>
                    <div className="text-xs text-ink-500">{t.role}</div>
                  </div>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section className="relative pb-24 pt-8 bg-white">
        <div className="container-x">
          <div className="relative overflow-hidden rounded-[36px] mesh-bg p-10 md:p-16 text-white">
            <div className="absolute inset-0 grid-overlay opacity-50" />
            <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-coral-500/25 blur-3xl animate-float-slow" />
            <div className="absolute -bottom-32 -left-24 w-96 h-96 rounded-full bg-brand-400/25 blur-3xl animate-float-slow" />

            <div className="relative grid lg:grid-cols-2 gap-10 items-center">
              <div>
                <span className="pill bg-white/10 border border-white/15 text-brand-200">
                  <CrossPlus className="w-3 h-3" />
                  Same-day appointments
                </span>
                <h2 className="heading-lg mt-5 text-balance">
                  Don't wait on your health.{" "}
                  <span className="font-serif italic font-medium text-brand-200">
                    Book today.
                  </span>
                </h2>
                <p className="text-white/75 mt-5 text-lg max-w-lg">
                  Pick a time that works, choose your specialty, and one of our
                  consultants will see you the same day. It's that simple.
                </p>
              </div>

              <div className="lg:pl-10 space-y-3">
                <Link to="/appointment" className="btn-coral w-full sm:w-auto">
                  <Calendar className="w-4 h-4" />
                  Book an appointment
                </Link>
                <a href="tel:+2348000000000" className="btn-ghost-light w-full sm:w-auto sm:ml-3">
                  <Phone className="w-4 h-4" />
                  +234 800 000 0000
                </a>

                <div className="flex flex-wrap items-center gap-x-6 gap-y-2 pt-5 text-sm text-white/65">
                  <span className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-400" /> Free first
                    consultation
                  </span>
                  <span className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-400" /> All HMOs
                    accepted
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
