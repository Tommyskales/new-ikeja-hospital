import { Link } from "react-router-dom";
import PageHero from "../components/PageHero";
import {
  ArrowRight,
  Award,
  Calendar,
  Check,
  HeartPulse,
  Shield,
  Sparkles,
  Star,
  Stethoscope,
  Users,
} from "../components/Icons";

const values = [
  {
    icon: HeartPulse,
    title: "Compassion first",
    desc: "We treat every patient like family — because behind every chart is a story.",
  },
  {
    icon: Shield,
    title: "Excellence, always",
    desc: "JCI-aligned protocols, continuous training, peer-reviewed outcomes.",
  },
  {
    icon: Users,
    title: "Team medicine",
    desc: "Specialists, nurses and case managers working as one care unit.",
  },
  {
    icon: Sparkles,
    title: "Innovation",
    desc: "Modern equipment, digital records, and same-day diagnostics.",
  },
];

const milestones = [
  {
    year: "1989",
    title: "Founded in Ikeja",
    desc: "Opens as a 24-bed clinic on Allen Avenue with a mission for accessible care.",
  },
  {
    year: "2002",
    title: "Multi-specialty wing",
    desc: "Cardiology, pediatrics, surgery, and a fully equipped pathology lab launched.",
  },
  {
    year: "2014",
    title: "Maternity centre opens",
    desc: "Dedicated mother-and-child wing with neonatal ICU and birthing suites.",
  },
  {
    year: "2020",
    title: "Digital transformation",
    desc: "Electronic health records, telemedicine and online appointments rolled out.",
  },
  {
    year: "Today",
    title: "120,000+ lives served",
    desc: "A 240-bed teaching hospital with 80+ specialists and round-the-clock care.",
  },
];

const leadership = [
  {
    name: "Dr. Emmanuel Adeyemi",
    role: "Chief Medical Director",
    initials: "EA",
    grad: "from-brand-300 via-brand-500 to-brand-800",
  },
  {
    name: "Dr. Adaeze Okafor",
    role: "Director, Cardiology",
    initials: "AO",
    grad: "from-rose-400 via-coral-500 to-coral-700",
  },
  {
    name: "Dr. Tunde Bakare",
    role: "Head of Surgery",
    initials: "TB",
    grad: "from-violet-400 via-fuchsia-500 to-purple-700",
  },
  {
    name: "Mrs. Bisola Lawal",
    role: "Chief Nursing Officer",
    initials: "BL",
    grad: "from-emerald-300 via-teal-500 to-cyan-700",
  },
];

export default function About() {
  return (
    <main>
      <PageHero
        eyebrow="About New Ikeja"
        title="A hospital built on"
        highlight="people first."
        description="For over three decades, New Ikeja Hospital has been the trusted partner of Lagos families — delivering advanced medicine wrapped in genuine warmth."
        breadcrumbs={[{ label: "Home", to: "/" }, { label: "About" }]}
      />

      {/* STORY */}
      <section className="section bg-white">
        <div className="container-x grid lg:grid-cols-12 gap-14 items-start">
          <div className="lg:col-span-5 lg:sticky lg:top-32">
            <span className="eyebrow">Our story</span>
            <h2 className="heading-lg mt-3 text-balance">
              35 years of caring for{" "}
              <span className="font-serif italic font-medium text-brand-700">
                Lagos.
              </span>
            </h2>
            <p className="text-ink-600 mt-5 text-lg leading-relaxed">
              We started as a 24-bed clinic with one belief: that great
              healthcare belongs in your neighborhood, not just on a long
              referral letter.
            </p>

            <div className="mt-8 grid grid-cols-2 gap-4">
              {[
                { v: "240", l: "Beds" },
                { v: "80+", l: "Specialists" },
                { v: "120k+", l: "Patients" },
                { v: "98%", l: "Satisfaction" },
              ].map((s) => (
                <div key={s.l} className="rounded-2xl bg-ink-50 p-5">
                  <div className="font-display font-extrabold text-3xl text-ink-900">
                    {s.v}
                  </div>
                  <div className="text-sm text-ink-500 font-medium uppercase tracking-wider">
                    {s.l}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-7 space-y-6 text-ink-700 leading-relaxed text-[17px]">
            <p>
              When New Ikeja Hospital opened its doors in 1989 on Allen Avenue,
              the founders made a quiet, unbreakable promise: that no family in
              Lagos would have to choose between great medicine and being
              treated like a human being. That promise still drives us today.
            </p>
            <p>
              Over the years, we've grown from a small community clinic into a
              240-bed multi-specialty teaching hospital — but we've stubbornly
              refused to grow out of our values. You'll still find consultants
              who remember your name. Nurses who explain things twice without
              ever rolling their eyes. Case managers who follow up after
              you've gone home.
            </p>
            <p>
              Today our cardiology, neurology, pediatrics, surgical and
              maternity teams run JCI-aligned protocols on equipment that
              competes with the best in West Africa. Our same-day diagnostics
              lab turns around most reports before lunch. Our 24/7 emergency
              line picks up before the third ring.
            </p>
            <p>
              And we still send a real human being to walk you to your car
              after a hard day. That's what New Ikeja is. That's what we've
              always been.
            </p>

            <ul className="grid sm:grid-cols-2 gap-3 pt-4">
              {[
                "JCI-aligned clinical protocols",
                "ISO 9001 quality management",
                "Pan-HMO insurance partner",
                "Tertiary teaching hospital",
              ].map((c) => (
                <li
                  key={c}
                  className="flex items-center gap-3 rounded-xl bg-brand-50/60 border border-brand-100 px-4 py-3 text-sm font-semibold text-brand-800"
                >
                  <Check className="w-4 h-4 text-brand-600" /> {c}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* MISSION / VISION */}
      <section className="section bg-ink-50/60">
        <div className="container-x">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="rounded-3xl bg-white border border-ink-100 p-9 card-hover">
              <div className="w-12 h-12 rounded-xl bg-brand-100 text-brand-700 grid place-items-center">
                <Stethoscope className="w-6 h-6" />
              </div>
              <h3 className="heading-md mt-5">Our mission</h3>
              <p className="text-ink-600 mt-3 text-lg leading-relaxed">
                To deliver the best clinical outcomes in West Africa with
                radical empathy — making world-class healthcare feel personal,
                accessible and unrushed for every Lagos family.
              </p>
            </div>
            <div className="rounded-3xl bg-gradient-to-br from-ink-900 via-ink-950 to-brand-900 text-white p-9 relative overflow-hidden">
              <div className="absolute inset-0 grid-overlay opacity-30" />
              <div className="relative">
                <div className="w-12 h-12 rounded-xl bg-white/10 text-brand-300 border border-white/15 grid place-items-center">
                  <Award className="w-6 h-6" />
                </div>
                <h3 className="heading-md mt-5">Our vision</h3>
                <p className="text-white/75 mt-3 text-lg leading-relaxed">
                  To be the most trusted hospital brand in West Africa — known
                  not only for clinical excellence, but for the warmth our
                  patients carry home with them long after discharge.
                </p>
              </div>
            </div>
          </div>

          {/* Values */}
          <div className="mt-16">
            <span className="eyebrow">What we stand for</span>
            <h3 className="heading-md mt-3 text-balance">Our values</h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-8">
              {values.map((v, i) => {
                const Icon = v.icon;
                return (
                  <div
                    key={v.title}
                    className="rounded-3xl bg-white border border-ink-100 p-6 card-hover reveal"
                    style={{ animationDelay: `${i * 80}ms` }}
                  >
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-brand-400 to-brand-700 text-white grid place-items-center shadow-lg shadow-brand-500/25">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div className="font-display font-bold text-lg mt-4">
                      {v.title}
                    </div>
                    <div className="text-ink-600 mt-2 leading-relaxed text-[15px]">
                      {v.desc}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* TIMELINE */}
      <section className="section bg-white">
        <div className="container-x">
          <div className="max-w-2xl mb-14">
            <span className="eyebrow">Our journey</span>
            <h2 className="heading-lg mt-3 text-balance">
              Three decades.{" "}
              <span className="font-serif italic font-medium text-brand-700">
                Countless lives.
              </span>
            </h2>
          </div>

          <div className="relative">
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-brand-300 via-brand-500 to-coral-500" />
            <ul className="space-y-12">
              {milestones.map((m, i) => (
                <li
                  key={m.year}
                  className={`relative grid md:grid-cols-2 md:gap-12 reveal`}
                  style={{ animationDelay: `${i * 100}ms` }}
                >
                  <div
                    className={`md:text-right ${
                      i % 2 === 0 ? "md:col-start-1" : "md:col-start-2 md:row-start-1"
                    }`}
                  >
                    <div className="flex md:justify-end items-center gap-3">
                      <span className="font-display font-extrabold text-4xl bg-clip-text text-transparent bg-gradient-to-r from-brand-500 to-coral-500">
                        {m.year}
                      </span>
                    </div>
                    <h3 className="font-display font-bold text-2xl mt-2 ml-12 md:ml-0">
                      {m.title}
                    </h3>
                    <p className="text-ink-600 mt-2 ml-12 md:ml-0 max-w-md md:ml-auto leading-relaxed">
                      {m.desc}
                    </p>
                  </div>
                  {/* Dot */}
                  <span className="absolute left-4 md:left-1/2 top-3 -translate-x-1/2 w-3.5 h-3.5 rounded-full bg-white border-[3px] border-brand-500 shadow-[0_0_0_6px_rgba(34,211,238,0.18)]" />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* LEADERSHIP */}
      <section className="section bg-ink-50/60">
        <div className="container-x">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14">
            <div className="max-w-2xl">
              <span className="eyebrow">Leadership</span>
              <h2 className="heading-lg mt-3 text-balance">
                The team behind the{" "}
                <span className="font-serif italic font-medium text-brand-700">
                  trust.
                </span>
              </h2>
            </div>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 font-semibold text-brand-700 hover:gap-3 transition-all"
            >
              Get in touch <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {leadership.map((d, i) => (
              <div
                key={d.name}
                className="group relative rounded-3xl overflow-hidden bg-white border border-ink-100 card-hover reveal"
                style={{ animationDelay: `${i * 80}ms` }}
              >
                <div
                  className={`relative aspect-[4/5] bg-gradient-to-br ${d.grad} flex items-end justify-center overflow-hidden`}
                >
                  <div className="absolute inset-0 grid-overlay opacity-30" />
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/40" />
                  <div className="font-display font-extrabold text-white/90 text-[10rem] leading-none translate-y-6 select-none">
                    {d.initials}
                  </div>
                </div>
                <div className="p-5">
                  <div className="font-display font-bold text-lg">{d.name}</div>
                  <div className="text-sm text-ink-500">{d.role}</div>
                  <div className="flex items-center gap-1 text-amber-500 mt-2">
                    {[...Array(5)].map((_, j) => (
                      <Star key={j} className="w-3.5 h-3.5" />
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-white pb-24">
        <div className="container-x">
          <div className="relative overflow-hidden rounded-[36px] bg-gradient-to-br from-brand-600 via-brand-700 to-ink-900 p-10 md:p-16 text-white">
            <div className="absolute inset-0 grid-overlay opacity-30" />
            <div className="absolute -top-20 -right-20 w-96 h-96 rounded-full bg-coral-500/30 blur-3xl" />
            <div className="relative grid lg:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="heading-md text-balance">
                  Ready to experience the difference?
                </h2>
                <p className="text-white/75 mt-3 max-w-lg">
                  Book your first appointment today — and find out why so many
                  Lagos families trust us with their health.
                </p>
              </div>
              <div className="flex flex-wrap gap-3 lg:justify-end">
                <Link to="/appointment" className="btn-coral">
                  <Calendar className="w-4 h-4" /> Book appointment
                </Link>
                <Link to="/services" className="btn-ghost-light">
                  Explore services <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
