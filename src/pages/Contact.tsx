import { useState } from "react";
import { Link } from "react-router-dom";
import PageHero from "../components/PageHero";
import {
  ArrowRight,
  Calendar,
  Check,
  Clock,
  Mail,
  MapPin,
  Phone,
  Send,
} from "../components/Icons";

const channels = [
  {
    icon: Phone,
    title: "Call us",
    details: ["+234 800 000 0000", "+234 800 000 0001"],
    note: "Available 24/7 for emergencies",
    grad: "from-emerald-50 to-teal-100",
    iconGrad: "from-emerald-400 to-teal-700",
  },
  {
    icon: Mail,
    title: "Email us",
    details: ["hello@newikejahospital.com", "care@newikejahospital.com"],
    note: "We respond within 2 working hours",
    grad: "from-sky-50 to-cyan-100",
    iconGrad: "from-sky-400 to-cyan-700",
  },
  {
    icon: MapPin,
    title: "Visit us",
    details: ["12 Allen Avenue, Ikeja", "Lagos, Nigeria"],
    note: "Open 24 hours, every day",
    grad: "from-rose-50 to-coral-100",
    iconGrad: "from-rose-400 to-coral-700",
  },
];

const faqs = [
  {
    q: "Do I need an appointment to visit?",
    a: "Walk-ins are welcome 24/7 for emergencies. For consultations, booking ahead helps us serve you faster — most slots open same-day.",
  },
  {
    q: "Which insurance plans do you accept?",
    a: "We accept all major HMOs including Hygeia, AXA Mansard, AIICO and more. Our billing team can confirm your coverage in minutes.",
  },
  {
    q: "Are there overnight rooms for relatives?",
    a: "Yes, our private suites include a companion bed. Family-friendly waiting lounges are available on every floor.",
  },
  {
    q: "How do I get my test results?",
    a: "Most diagnostics return same-day. You'll receive a secure link by SMS or email to download your report — and your consultant gets a copy automatically.",
  },
];

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "General enquiry",
    message: "",
  });
  const [sent, setSent] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    setForm({ name: "", email: "", subject: "General enquiry", message: "" });
    setTimeout(() => setSent(false), 5000);
  };

  return (
    <main>
      <PageHero
        eyebrow="Contact"
        title="We're here whenever"
        highlight="you need us."
        description="Reach out for appointments, second opinions, billing questions or just to say hello. We pick up before the third ring — promise."
        breadcrumbs={[{ label: "Home", to: "/" }, { label: "Contact" }]}
      />

      {/* CHANNELS */}
      <section className="section bg-white">
        <div className="container-x">
          <div className="grid md:grid-cols-3 gap-6">
            {channels.map((c, i) => {
              const Icon = c.icon;
              return (
                <div
                  key={c.title}
                  className="group relative rounded-3xl bg-white border border-ink-100 p-7 card-hover overflow-hidden reveal"
                  style={{ animationDelay: `${i * 80}ms` }}
                >
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${c.grad} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                  />
                  <div className="relative">
                    <div
                      className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${c.iconGrad} text-white grid place-items-center shadow-lg shadow-black/10`}
                    >
                      <Icon className="w-6 h-6" />
                    </div>
                    <h3 className="font-display font-bold text-xl mt-5">
                      {c.title}
                    </h3>
                    <ul className="mt-3 space-y-1">
                      {c.details.map((d) => (
                        <li
                          key={d}
                          className="font-semibold text-ink-800"
                        >
                          {d}
                        </li>
                      ))}
                    </ul>
                    <p className="text-sm text-ink-500 mt-3">{c.note}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* FORM + INFO */}
      <section className="section bg-ink-50/60">
        <div className="container-x">
          <div className="grid lg:grid-cols-12 gap-10">
            {/* Form */}
            <div className="lg:col-span-7">
              <div className="rounded-3xl bg-white border border-ink-100 p-8 md:p-10 shadow-soft-lg/30">
                <span className="eyebrow">Send a message</span>
                <h2 className="heading-md mt-3 text-balance">
                  Drop us a note and a real person will reply.
                </h2>

                {sent && (
                  <div className="mt-6 flex items-center gap-3 rounded-2xl bg-emerald-50 border border-emerald-200 px-4 py-3 text-emerald-800">
                    <Check className="w-5 h-5" />
                    <span className="font-semibold text-sm">
                      Message received! We'll be in touch shortly.
                    </span>
                  </div>
                )}

                <form onSubmit={submit} className="mt-8 grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="label-base">Full name</label>
                    <input
                      name="name"
                      required
                      value={form.name}
                      onChange={handleChange}
                      placeholder="Jane Doe"
                      className="input-base"
                    />
                  </div>
                  <div>
                    <label className="label-base">Email</label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={form.email}
                      onChange={handleChange}
                      placeholder="jane@email.com"
                      className="input-base"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="label-base">Subject</label>
                    <select
                      name="subject"
                      value={form.subject}
                      onChange={handleChange}
                      className="input-base"
                    >
                      <option>General enquiry</option>
                      <option>Appointment request</option>
                      <option>Billing & insurance</option>
                      <option>Medical records</option>
                      <option>Feedback</option>
                    </select>
                  </div>
                  <div className="sm:col-span-2">
                    <label className="label-base">Message</label>
                    <textarea
                      name="message"
                      required
                      rows={5}
                      value={form.message}
                      onChange={handleChange}
                      placeholder="How can we help?"
                      className="input-base resize-none"
                    />
                  </div>
                  <div className="sm:col-span-2 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <p className="text-sm text-ink-500 flex items-center gap-2">
                      <Clock className="w-4 h-4" /> Replies in under 2 working hours.
                    </p>
                    <button type="submit" className="btn-primary">
                      Send message <Send className="w-4 h-4" />
                    </button>
                  </div>
                </form>
              </div>
            </div>

            {/* Info side */}
            <div className="lg:col-span-5 space-y-6">
              {/* Map placeholder */}
              <div className="relative rounded-3xl overflow-hidden h-72 bg-gradient-to-br from-brand-700 to-ink-900">
                <div className="absolute inset-0 grid-overlay opacity-40" />
                <svg
                  className="absolute inset-0 w-full h-full"
                  viewBox="0 0 600 320"
                  preserveAspectRatio="xMidYMid slice"
                >
                  <defs>
                    <pattern
                      id="streets"
                      x="0"
                      y="0"
                      width="80"
                      height="80"
                      patternUnits="userSpaceOnUse"
                    >
                      <path
                        d="M0 40h80M40 0v80"
                        stroke="rgba(255,255,255,0.12)"
                        strokeWidth="1"
                      />
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill="url(#streets)" />
                  <path
                    d="M0 200 C150 180 250 240 600 160"
                    stroke="rgba(34,211,238,0.5)"
                    strokeWidth="3"
                    fill="none"
                  />
                  <path
                    d="M120 0 L160 320"
                    stroke="rgba(255,255,255,0.18)"
                    strokeWidth="2"
                    fill="none"
                  />
                </svg>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                  <div className="relative">
                    <span className="absolute inset-0 rounded-full bg-coral-500 animate-ping-soft" />
                    <span className="relative w-12 h-12 rounded-full bg-gradient-to-br from-coral-400 to-coral-600 grid place-items-center text-white shadow-lg shadow-coral-500/50">
                      <MapPin className="w-5 h-5" />
                    </span>
                  </div>
                </div>
                <div className="absolute bottom-4 left-4 right-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 p-4 text-white">
                  <div className="text-xs text-white/70 uppercase tracking-wider font-semibold">
                    Hospital location
                  </div>
                  <div className="font-display font-bold mt-1">
                    12 Allen Avenue, Ikeja, Lagos
                  </div>
                  <a
                    href="https://www.google.com/maps/search/?api=1&query=12+Allen+Avenue+Ikeja+Lagos"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 text-brand-300 text-sm font-semibold mt-2 hover:gap-2.5 transition-all"
                  >
                    Open in maps <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>

              {/* Hours card */}
              <div className="rounded-3xl bg-white border border-ink-100 p-7">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-brand-100 text-brand-700 grid place-items-center">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="font-display font-bold text-lg">Hours</div>
                    <div className="text-sm text-ink-500">
                      Outpatient & administrative
                    </div>
                  </div>
                </div>
                <ul className="mt-5 divide-y divide-ink-100">
                  {[
                    ["Emergency / A&E", "Open 24/7"],
                    ["Outpatient", "Mon – Sat · 8am – 8pm"],
                    ["Pharmacy", "Open 24/7"],
                    ["Admin office", "Mon – Fri · 9am – 5pm"],
                  ].map(([k, v]) => (
                    <li
                      key={k}
                      className="flex items-center justify-between py-3"
                    >
                      <span className="text-ink-700">{k}</span>
                      <span className="font-semibold text-ink-900">{v}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <Link
                to="/appointment"
                className="block rounded-3xl bg-gradient-to-br from-brand-600 via-brand-700 to-ink-900 p-7 text-white relative overflow-hidden group"
              >
                <div className="absolute inset-0 grid-overlay opacity-30" />
                <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-coral-500/40 blur-2xl" />
                <div className="relative flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-white/10 border border-white/20 grid place-items-center">
                    <Calendar className="w-6 h-6" />
                  </div>
                  <div className="flex-1">
                    <div className="font-display font-bold text-lg">
                      Book an appointment
                    </div>
                    <div className="text-white/70 text-sm">
                      Same-day slots usually available.
                    </div>
                  </div>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition" />
                </div>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section bg-white">
        <div className="container-x grid lg:grid-cols-12 gap-10">
          <div className="lg:col-span-4">
            <span className="eyebrow">FAQs</span>
            <h2 className="heading-lg mt-3 text-balance">
              Quick{" "}
              <span className="font-serif italic font-medium text-brand-700">
                answers.
              </span>
            </h2>
            <p className="text-ink-600 mt-4 leading-relaxed">
              Couldn't find what you needed? Reach out and we'll respond
              promptly.
            </p>
          </div>
          <div className="lg:col-span-8 space-y-3">
            {faqs.map((f) => (
              <details
                key={f.q}
                className="group rounded-2xl bg-ink-50/60 border border-ink-100 px-6 py-5 open:bg-white open:shadow-soft-lg transition-all"
              >
                <summary className="cursor-pointer list-none flex items-center justify-between gap-4">
                  <span className="font-display font-semibold text-ink-900 text-lg">
                    {f.q}
                  </span>
                  <span className="w-8 h-8 rounded-full bg-brand-50 text-brand-700 grid place-items-center group-open:rotate-45 transition-transform">
                    +
                  </span>
                </summary>
                <p className="text-ink-600 mt-3 leading-relaxed">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
