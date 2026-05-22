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
  Shield,
  Sparkles,
  User,
} from "../components/Icons";

interface FormData {
  name: string;
  email: string;
  phone: string;
  date: string;
  department: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  phone?: string;
  date?: string;
  message?: string;
}

const departments = [
  "General Medicine",
  "Cardiology",
  "Pediatrics",
  "Maternity & Obstetrics",
  "Neurology",
  "Orthopaedics",
  "Surgery",
  "Diagnostics",
];

export default function Appointment() {
  const [form, setForm] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    date: "",
    department: "General Medicine",
    message: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const validate = (): boolean => {
    const newErrors: FormErrors = {};

    if (!form.name.trim()) newErrors.name = "Name is required";
    else if (form.name.trim().length < 3)
      newErrors.name = "Name must be at least 3 characters";

    if (!form.email.trim()) newErrors.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      newErrors.email = "Enter a valid email address";

    if (!form.phone.trim()) newErrors.phone = "Phone number is required";
    else if (!/^\d{7,15}$/.test(form.phone.replace(/\s/g, "")))
      newErrors.phone = "Enter a valid phone number";

    if (!form.date) newErrors.date = "Please select a date";
    else if (new Date(form.date) < new Date(new Date().toDateString()))
      newErrors.date = "Date cannot be in the past";

    if (!form.message.trim()) newErrors.message = "Please enter a message";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validate()) return;

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 30000);

    setLoading(true);
    try {
      const response = await fetch(
        "https://new-ikeja-hospital.onrender.com/appointment",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
          signal: controller.signal,
        }
      );
      clearTimeout(timeout);

      if (!response.ok) throw new Error("Server error");

      setSuccess(true);
      setForm({
        name: "",
        email: "",
        phone: "",
        date: "",
        department: "General Medicine",
        message: "",
      });
    } catch (error: unknown) {
      const err = error as { name?: string };
      if (err?.name === "AbortError") {
        alert("Server is waking up, please try again in 30 seconds.");
      } else {
        alert("Error sending appointment. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <main>
      <PageHero
        eyebrow="Book a visit"
        title="Care that fits"
        highlight="your schedule."
        description="Pick your specialty, choose a time, and a senior consultant will see you the same day. It's that simple."
        breadcrumbs={[{ label: "Home", to: "/" }, { label: "Book Appointment" }]}
      />

      <section className="section bg-white">
        <div className="container-x">
          <div className="grid lg:grid-cols-12 gap-10">
            {/* Form card */}
            <div className="lg:col-span-7">
              <div className="rounded-3xl bg-white border border-ink-100 shadow-soft-lg/30 overflow-hidden">
                {/* Form header */}
                <div className="relative bg-gradient-to-br from-ink-900 via-ink-950 to-brand-900 text-white p-8 md:p-10 overflow-hidden">
                  <div className="absolute inset-0 grid-overlay opacity-30" />
                  <div className="absolute -top-16 -right-16 w-48 h-48 rounded-full bg-brand-400/30 blur-3xl" />
                  <div className="relative flex items-start justify-between gap-4">
                    <div>
                      <span className="pill bg-white/10 border border-white/15 text-brand-200">
                        <Calendar className="w-3 h-3" />
                        Step 1 of 1
                      </span>
                      <h2 className="heading-md mt-4">Your appointment details</h2>
                      <p className="text-white/70 mt-2 max-w-md">
                        Fill in the form below — we'll confirm your slot by SMS
                        and email within 30 minutes.
                      </p>
                    </div>
                    <div className="hidden md:flex w-16 h-16 rounded-2xl bg-white/10 border border-white/15 grid-place-items-center items-center justify-center">
                      <Sparkles className="w-7 h-7 text-brand-300" />
                    </div>
                  </div>
                </div>

                {success && (
                  <div className="mx-8 md:mx-10 mt-8 flex items-center gap-3 rounded-2xl bg-emerald-50 border border-emerald-200 px-5 py-4 text-emerald-800">
                    <div className="w-9 h-9 rounded-full bg-emerald-500 text-white grid place-items-center shrink-0">
                      <Check className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="font-display font-bold">
                        Appointment received!
                      </div>
                      <div className="text-sm">
                        We'll confirm your slot within 30 minutes.
                      </div>
                    </div>
                  </div>
                )}

                <form
                  onSubmit={handleSubmit}
                  className="p-8 md:p-10 grid sm:grid-cols-2 gap-5"
                >
                  <div>
                    <label className="label-base">Full name</label>
                    <div className="relative">
                      <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-ink-400" />
                      <input
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        placeholder="Jane Doe"
                        className={`input-base pl-11 ${
                          errors.name
                            ? "!border-red-400 !ring-red-200/40 focus:!ring-red-200/60"
                            : ""
                        }`}
                      />
                    </div>
                    {errors.name && (
                      <p className="text-red-500 text-xs mt-1.5 font-medium">
                        {errors.name}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="label-base">Email address</label>
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-ink-400" />
                      <input
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        placeholder="jane@email.com"
                        className={`input-base pl-11 ${
                          errors.email
                            ? "!border-red-400"
                            : ""
                        }`}
                      />
                    </div>
                    {errors.email && (
                      <p className="text-red-500 text-xs mt-1.5 font-medium">
                        {errors.email}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="label-base">Phone number</label>
                    <div className="relative">
                      <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-ink-400" />
                      <input
                        name="phone"
                        value={form.phone}
                        onChange={handleChange}
                        placeholder="0801 234 5678"
                        className={`input-base pl-11 ${
                          errors.phone ? "!border-red-400" : ""
                        }`}
                      />
                    </div>
                    {errors.phone && (
                      <p className="text-red-500 text-xs mt-1.5 font-medium">
                        {errors.phone}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="label-base">Preferred date</label>
                    <div className="relative">
                      <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-ink-400" />
                      <input
                        name="date"
                        type="date"
                        value={form.date}
                        onChange={handleChange}
                        className={`input-base pl-11 ${
                          errors.date ? "!border-red-400" : ""
                        }`}
                      />
                    </div>
                    {errors.date && (
                      <p className="text-red-500 text-xs mt-1.5 font-medium">
                        {errors.date}
                      </p>
                    )}
                  </div>

                  <div className="sm:col-span-2">
                    <label className="label-base">Department</label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {departments.map((d) => {
                        const active = form.department === d;
                        return (
                          <button
                            key={d}
                            type="button"
                            onClick={() =>
                              setForm({ ...form, department: d })
                            }
                            className={`text-sm rounded-2xl px-3.5 py-3 font-semibold border transition-all text-left ${
                              active
                                ? "bg-gradient-to-br from-brand-400 to-brand-700 text-white border-transparent shadow-lg shadow-brand-500/30"
                                : "bg-white text-ink-700 border-ink-200 hover:border-brand-400 hover:text-brand-700"
                            }`}
                          >
                            {d}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div className="sm:col-span-2">
                    <label className="label-base">
                      Reason for visit / message
                    </label>
                    <textarea
                      name="message"
                      value={form.message}
                      onChange={handleChange}
                      placeholder="Brief description of your symptoms or reason for booking..."
                      rows={4}
                      className={`input-base resize-none ${
                        errors.message ? "!border-red-400" : ""
                      }`}
                    />
                    {errors.message && (
                      <p className="text-red-500 text-xs mt-1.5 font-medium">
                        {errors.message}
                      </p>
                    )}
                  </div>

                  <div className="sm:col-span-2 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pt-2">
                    <p className="text-xs text-ink-500 flex items-center gap-2">
                      <Shield className="w-4 h-4" />
                      Your information is encrypted and HIPAA-aligned.
                    </p>
                    <button
                      type="submit"
                      disabled={loading}
                      className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {loading ? (
                        <>
                          <span className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                          Submitting...
                        </>
                      ) : (
                        <>
                          Confirm appointment
                          <Send className="w-4 h-4" />
                        </>
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </div>

            {/* Sidebar */}
            <aside className="lg:col-span-5 space-y-6">
              {/* What to expect */}
              <div className="rounded-3xl bg-gradient-to-br from-ink-50 to-white border border-ink-100 p-7">
                <span className="eyebrow">What to expect</span>
                <h3 className="heading-md mt-3">After you book</h3>
                <ul className="mt-6 space-y-5">
                  {[
                    {
                      step: "01",
                      title: "Confirmation in 30 minutes",
                      desc: "By SMS and email — with your slot, doctor, and prep instructions.",
                    },
                    {
                      step: "02",
                      title: "Pre-visit reminder",
                      desc: "We'll send a reminder 24 hours before your appointment.",
                    },
                    {
                      step: "03",
                      title: "Arrive 10 minutes early",
                      desc: "Bring an ID and your HMO card. Walk-in to reception.",
                    },
                    {
                      step: "04",
                      title: "Meet your consultant",
                      desc: "On time, every time. Average wait under 12 minutes.",
                    },
                  ].map((s) => (
                    <li key={s.step} className="flex gap-4">
                      <div className="font-display font-extrabold text-2xl bg-clip-text text-transparent bg-gradient-to-br from-brand-500 to-coral-500 leading-none w-10 shrink-0">
                        {s.step}
                      </div>
                      <div>
                        <div className="font-display font-bold text-ink-900">
                          {s.title}
                        </div>
                        <div className="text-ink-600 mt-1 text-sm leading-relaxed">
                          {s.desc}
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Help / contact */}
              <div className="rounded-3xl mesh-bg text-white p-7 relative overflow-hidden">
                <div className="absolute inset-0 grid-overlay opacity-30" />
                <div className="relative">
                  <h3 className="font-display font-bold text-xl">
                    Need urgent care now?
                  </h3>
                  <p className="text-white/70 mt-2 text-sm">
                    Our 24/7 emergency line picks up before the third ring. We
                    can also dispatch an ambulance.
                  </p>
                  <a href="tel:+2348000000000" className="btn-coral w-full mt-5">
                    <Phone className="w-4 h-4" /> Call emergency
                  </a>
                </div>
              </div>

              {/* Location chip */}
              <div className="rounded-3xl bg-white border border-ink-100 p-6 flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-brand-50 text-brand-700 grid place-items-center shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <div className="font-display font-bold">12 Allen Avenue</div>
                  <div className="text-sm text-ink-500">Ikeja, Lagos · Nigeria</div>
                  <div className="flex items-center gap-2 mt-2 text-xs text-emerald-700 font-semibold">
                    <Clock className="w-3.5 h-3.5" /> Open 24/7
                  </div>
                </div>
                <Link
                  to="/contact"
                  className="text-sm font-semibold text-brand-700 hover:text-brand-900 transition flex items-center gap-1"
                >
                  Contact <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </main>
  );
}
