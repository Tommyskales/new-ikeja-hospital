import { useState } from "react";
import {
  Bell,
  Building2,
  CreditCard,
  Globe,
  KeyRound,
  Mail,
  Palette,
  Save,
  Shield,
  User,
} from "lucide-react";
import Card from "../components/Card";

const sections = [
  { id: "profile", label: "Profile", icon: User },
  { id: "hospital", label: "Hospital", icon: Building2 },
  { id: "security", label: "Security", icon: Shield },
  { id: "notifications", label: "Notifications", icon: Bell },
  { id: "billing", label: "Billing", icon: CreditCard },
  { id: "branding", label: "Branding", icon: Palette },
];

export default function Settings() {
  const [active, setActive] = useState<string>("profile");
  const [emailNotif, setEmailNotif] = useState(true);
  const [smsNotif, setSmsNotif] = useState(true);
  const [pushNotif, setPushNotif] = useState(false);
  const [dailyDigest, setDailyDigest] = useState(true);
  const [saved, setSaved] = useState(false);

  const onSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="grid lg:grid-cols-12 gap-5">
      {/* Sidenav */}
      <Card className="lg:col-span-3 !p-3 self-start">
        <ul className="space-y-1">
          {sections.map((s) => {
            const Icon = s.icon;
            const isActive = active === s.id;
            return (
              <li key={s.id}>
                <button
                  onClick={() => setActive(s.id)}
                  className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-semibold transition ${
                    isActive
                      ? "bg-brand-50 text-brand-700"
                      : "text-ink-700 hover:bg-ink-50"
                  }`}
                >
                  <Icon
                    className={`w-4 h-4 ${
                      isActive ? "text-brand-600" : "text-ink-400"
                    }`}
                  />
                  {s.label}
                </button>
              </li>
            );
          })}
        </ul>
      </Card>

      {/* Content */}
      <div className="lg:col-span-9 space-y-5">
        {active === "profile" && (
          <>
            <Card>
              <SectionTitle
                title="Profile"
                desc="How you appear inside the hospital OS."
              />
              <div className="grid sm:grid-cols-3 gap-5 items-start">
                <div className="flex flex-col items-center">
                  <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-brand-400 to-brand-700 text-white font-display font-extrabold text-3xl grid place-items-center shadow-lg shadow-brand-500/30">
                    EA
                  </div>
                  <button className="mt-3 text-xs font-semibold text-brand-700 hover:text-brand-900">
                    Change photo
                  </button>
                </div>
                <div className="sm:col-span-2 grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="label-base">First name</label>
                    <input defaultValue="Emmanuel" className="input-base" />
                  </div>
                  <div>
                    <label className="label-base">Last name</label>
                    <input defaultValue="Adeyemi" className="input-base" />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="label-base">Job title</label>
                    <input
                      defaultValue="Chief Medical Director"
                      className="input-base"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="label-base">Email</label>
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-ink-400" />
                      <input
                        defaultValue="emmanuel@newikejahospital.com"
                        className="input-base pl-11"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </>
        )}

        {active === "hospital" && (
          <Card>
            <SectionTitle
              title="Hospital details"
              desc="Public info shown to patients."
            />
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="sm:col-span-2">
                <label className="label-base">Hospital name</label>
                <input defaultValue="New Ikeja Hospital" className="input-base" />
              </div>
              <div className="sm:col-span-2">
                <label className="label-base">Address</label>
                <input
                  defaultValue="13 Gbajobi Street, Allen, Ikeja, Lagos"
                  className="input-base"
                />
              </div>
              <div>
                <label className="label-base">Phone</label>
                <input defaultValue="+234 814 430 7147" className="input-base" />
              </div>
              <div>
                <label className="label-base">Website</label>
                <div className="relative">
                  <Globe className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-ink-400" />
                  <input
                    defaultValue="newikejahospital.com"
                    className="input-base pl-11"
                  />
                </div>
              </div>
            </div>
          </Card>
        )}

        {active === "security" && (
          <Card>
            <SectionTitle
              title="Security"
              desc="Password, two-factor and session settings."
            />
            <div className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="label-base">Current password</label>
                  <div className="relative">
                    <KeyRound className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-ink-400" />
                    <input
                      type="password"
                      placeholder="••••••••"
                      className="input-base pl-11"
                    />
                  </div>
                </div>
                <div>
                  <label className="label-base">New password</label>
                  <div className="relative">
                    <KeyRound className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-ink-400" />
                    <input
                      type="password"
                      placeholder="At least 12 characters"
                      className="input-base pl-11"
                    />
                  </div>
                </div>
              </div>

              <div className="rounded-2xl border border-ink-100 p-4 flex items-center justify-between">
                <div>
                  <div className="font-semibold text-ink-900">
                    Two-factor authentication
                  </div>
                  <div className="text-sm text-ink-500">
                    Require an authenticator app on every login.
                  </div>
                </div>
                <Toggle defaultOn />
              </div>

              <div className="rounded-2xl border border-ink-100 p-4 flex items-center justify-between">
                <div>
                  <div className="font-semibold text-ink-900">
                    Audit log access
                  </div>
                  <div className="text-sm text-ink-500">
                    Log all data access by admin staff.
                  </div>
                </div>
                <Toggle defaultOn />
              </div>
            </div>
          </Card>
        )}

        {active === "notifications" && (
          <Card>
            <SectionTitle
              title="Notifications"
              desc="Choose how you want to be alerted."
            />
            <div className="space-y-3">
              <ToggleRow
                title="Email notifications"
                desc="New bookings, urgent alerts and daily reports."
                value={emailNotif}
                onChange={setEmailNotif}
              />
              <ToggleRow
                title="SMS alerts"
                desc="Critical alerts only — ICU, emergencies."
                value={smsNotif}
                onChange={setSmsNotif}
              />
              <ToggleRow
                title="Push notifications"
                desc="Browser pushes for live activity."
                value={pushNotif}
                onChange={setPushNotif}
              />
              <ToggleRow
                title="Daily digest"
                desc="A summary of yesterday, every morning at 7am."
                value={dailyDigest}
                onChange={setDailyDigest}
              />
            </div>
          </Card>
        )}

        {active === "billing" && (
          <Card>
            <SectionTitle
              title="Billing"
              desc="Invoicing defaults and payment integrations."
            />
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="label-base">Currency</label>
                <select className="input-base">
                  <option>NGN — Nigerian Naira (₦)</option>
                  <option>USD — US Dollar ($)</option>
                  <option>GBP — British Pound (£)</option>
                </select>
              </div>
              <div>
                <label className="label-base">Tax / VAT rate</label>
                <input defaultValue="7.5%" className="input-base" />
              </div>
              <div className="sm:col-span-2">
                <label className="label-base">Default payment terms</label>
                <select className="input-base">
                  <option>Due on receipt</option>
                  <option>Net 7 days</option>
                  <option selected>Net 14 days</option>
                  <option>Net 30 days</option>
                </select>
              </div>
            </div>
            <div className="rounded-2xl border border-ink-100 p-4 mt-4 flex items-center justify-between">
              <div>
                <div className="font-semibold text-ink-900">
                  Auto-charge HMOs on discharge
                </div>
                <div className="text-sm text-ink-500">
                  Submit claims automatically after patient discharge.
                </div>
              </div>
              <Toggle defaultOn />
            </div>
          </Card>
        )}

        {active === "branding" && (
          <Card>
            <SectionTitle
              title="Branding"
              desc="How patient-facing pages look."
            />
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="label-base">Primary color</label>
                <div className="grid grid-cols-6 gap-2">
                  {[
                    "#06B6D4",
                    "#0E7490",
                    "#0A1530",
                    "#FB5A3C",
                    "#10B981",
                    "#7C3AED",
                  ].map((c, i) => (
                    <button
                      key={c}
                      className={`h-12 rounded-xl border-2 transition ${
                        i === 0
                          ? "border-ink-900 ring-2 ring-ink-300"
                          : "border-transparent hover:border-ink-200"
                      }`}
                      style={{ background: c }}
                      aria-label={c}
                    />
                  ))}
                </div>
              </div>
              <div>
                <label className="label-base">Accent color</label>
                <div className="grid grid-cols-6 gap-2">
                  {[
                    "#FB5A3C",
                    "#F59E0B",
                    "#EC4899",
                    "#8B5CF6",
                    "#10B981",
                    "#06B6D4",
                  ].map((c, i) => (
                    <button
                      key={c + i}
                      className={`h-12 rounded-xl border-2 transition ${
                        i === 0
                          ? "border-ink-900 ring-2 ring-ink-300"
                          : "border-transparent hover:border-ink-200"
                      }`}
                      style={{ background: c }}
                      aria-label={c}
                    />
                  ))}
                </div>
              </div>
              <div className="sm:col-span-2">
                <label className="label-base">Tagline</label>
                <input
                  defaultValue="Advanced care, human warmth."
                  className="input-base"
                />
              </div>
            </div>
          </Card>
        )}

        {/* Save bar */}
        <div className="flex items-center justify-end gap-3">
          {saved && (
            <span className="text-sm text-emerald-700 font-semibold">
              Settings saved
            </span>
          )}
          <button onClick={onSave} className="btn-primary !py-2.5 !px-5">
            <Save className="w-4 h-4" /> Save changes
          </button>
        </div>
      </div>
    </div>
  );
}

function SectionTitle({ title, desc }: { title: string; desc: string }) {
  return (
    <div className="mb-5 pb-4 border-b border-ink-100">
      <h3 className="font-display font-bold text-lg text-ink-900">{title}</h3>
      <p className="text-sm text-ink-500 mt-0.5">{desc}</p>
    </div>
  );
}

function Toggle({ defaultOn = false }: { defaultOn?: boolean }) {
  const [on, setOn] = useState(defaultOn);
  return (
    <button
      onClick={() => setOn(!on)}
      className={`w-11 h-6 rounded-full relative transition ${
        on ? "bg-brand-600" : "bg-ink-200"
      }`}
      aria-pressed={on}
    >
      <span
        className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform ${
          on ? "translate-x-5" : "translate-x-0.5"
        }`}
      />
    </button>
  );
}

function ToggleRow({
  title,
  desc,
  value,
  onChange,
}: {
  title: string;
  desc: string;
  value: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <div className="rounded-2xl border border-ink-100 p-4 flex items-center justify-between">
      <div>
        <div className="font-semibold text-ink-900">{title}</div>
        <div className="text-sm text-ink-500">{desc}</div>
      </div>
      <button
        onClick={() => onChange(!value)}
        className={`w-11 h-6 rounded-full relative transition ${
          value ? "bg-brand-600" : "bg-ink-200"
        }`}
        aria-pressed={value}
      >
        <span
          className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform ${
            value ? "translate-x-5" : "translate-x-0.5"
          }`}
        />
      </button>
    </div>
  );
}
