export type PatientStatus = "Admitted" | "Outpatient" | "Discharged" | "Critical";

export interface Patient {
  id: string;
  name: string;
  age: number;
  gender: "M" | "F";
  condition: string;
  department: string;
  status: PatientStatus;
  doctor: string;
  admissionDate: string;
  bed?: string;
}

export interface StaffMember {
  id: string;
  name: string;
  role: "Doctor" | "Nurse" | "Technician" | "Admin";
  department: string;
  specialization: string;
  status: "On Duty" | "Off Duty" | "On Call";
  experienceYears: number;
  initials: string;
  grad: string;
  rating: number;
}

export type InvoiceStatus = "Paid" | "Pending" | "Overdue";

export interface Invoice {
  id: string;
  patient: string;
  service: string;
  amount: number;
  status: InvoiceStatus;
  issuedAt: string;
  dueAt: string;
}

export interface Department {
  name: string;
  patients: number;
  capacity: number;
  doctors: number;
  nurses: number;
  trend: number;
  color: string;
}

export type MedStatus = "In Stock" | "Low" | "Out";

export interface Medication {
  id: string;
  name: string;
  category: string;
  stock: number;
  reorderAt: number;
  unit: string;
  status: MedStatus;
  expiry: string;
}

export interface ActivityItem {
  id: string;
  type: "admission" | "discharge" | "appointment" | "invoice" | "alert";
  title: string;
  meta: string;
  time: string;
}

/* =============== PATIENTS =============== */
const conditions = [
  "Hypertension",
  "Type II Diabetes",
  "Acute Appendicitis",
  "Chest Pain (Cardiac)",
  "Asthma Exacerbation",
  "Pneumonia",
  "Fractured Femur",
  "Migraine",
  "UTI",
  "Pre-eclampsia",
  "Cataract",
  "Stroke (Ischemic)",
  "Sickle Cell Crisis",
  "Malaria",
  "Typhoid Fever",
];

const doctorNames = [
  "Dr. Adaeze Okafor",
  "Dr. Tunde Bakare",
  "Dr. Ngozi Eze",
  "Dr. Ifeoluwa Ade",
  "Dr. Chinedu Obi",
  "Dr. Yetunde Adebayo",
  "Dr. Bola Owolabi",
  "Dr. Sade Adesina",
];

const departments = [
  "Cardiology",
  "Neurology",
  "Pediatrics",
  "Maternity",
  "Surgery",
  "Orthopaedics",
  "General Medicine",
  "Diagnostics",
];

const firstNamesM = [
  "Adewale",
  "Chinedu",
  "Tobi",
  "Femi",
  "Kunle",
  "Emeka",
  "Segun",
  "Ifeanyi",
  "Olumide",
  "Bayo",
];
const firstNamesF = [
  "Folashade",
  "Ngozi",
  "Aisha",
  "Yetunde",
  "Chioma",
  "Adaeze",
  "Funmi",
  "Bisola",
  "Halima",
  "Tolu",
];
const lastNames = [
  "Okafor",
  "Adebayo",
  "Bello",
  "Olawale",
  "Ibrahim",
  "Eze",
  "Lawal",
  "Adeyemi",
  "Onyeka",
  "Salami",
  "Bakare",
  "Adesina",
  "Hassan",
  "Obi",
  "Ojo",
];

function pick<T>(arr: T[], i: number): T {
  return arr[i % arr.length];
}

function buildPatient(i: number): Patient {
  const isMale = i % 2 === 0;
  const first = isMale
    ? pick(firstNamesM, i + 3)
    : pick(firstNamesF, i + 7);
  const last = pick(lastNames, i * 7 + 1);
  const dept = pick(departments, i * 3 + 2);
  const statuses: PatientStatus[] = [
    "Admitted",
    "Outpatient",
    "Discharged",
    "Critical",
    "Admitted",
    "Admitted",
    "Outpatient",
    "Discharged",
  ];
  const daysAgo = (i % 14) + 1;
  const date = new Date();
  date.setDate(date.getDate() - daysAgo);
  return {
    id: `NIH-${(7421 + i).toString().padStart(5, "0")}`,
    name: `${first} ${last}`,
    age: 18 + ((i * 7) % 65),
    gender: isMale ? "M" : "F",
    condition: pick(conditions, i + 1),
    department: dept,
    status: pick(statuses, i),
    doctor: pick(doctorNames, i + 2),
    admissionDate: date.toISOString().slice(0, 10),
    bed:
      pick(statuses, i) === "Admitted" || pick(statuses, i) === "Critical"
        ? `${pick(["A", "B", "C", "D"], i)}-${100 + ((i * 13) % 60)}`
        : undefined,
  };
}

export const patients: Patient[] = Array.from({ length: 32 }, (_, i) =>
  buildPatient(i)
);

/* =============== STAFF =============== */
const staffSeed: Omit<StaffMember, "id" | "initials" | "grad">[] = [
  { name: "Dr. Adaeze Okafor", role: "Doctor", department: "Cardiology", specialization: "Interventional Cardiology", status: "On Duty", experienceYears: 14, rating: 4.9 },
  { name: "Dr. Tunde Bakare", role: "Doctor", department: "Surgery", specialization: "General Surgery", status: "On Call", experienceYears: 18, rating: 4.8 },
  { name: "Dr. Ngozi Eze", role: "Doctor", department: "Pediatrics", specialization: "Neonatology", status: "On Duty", experienceYears: 11, rating: 5.0 },
  { name: "Dr. Ifeoluwa Ade", role: "Doctor", department: "Neurology", specialization: "Stroke & Epilepsy", status: "Off Duty", experienceYears: 9, rating: 4.9 },
  { name: "Dr. Chinedu Obi", role: "Doctor", department: "Orthopaedics", specialization: "Sports Injury", status: "On Duty", experienceYears: 13, rating: 4.7 },
  { name: "Dr. Yetunde Adebayo", role: "Doctor", department: "Maternity", specialization: "Obstetrics", status: "On Duty", experienceYears: 16, rating: 4.9 },
  { name: "Dr. Bola Owolabi", role: "Doctor", department: "General Medicine", specialization: "Internal Medicine", status: "On Duty", experienceYears: 8, rating: 4.6 },
  { name: "Dr. Sade Adesina", role: "Doctor", department: "Diagnostics", specialization: "Radiology", status: "On Duty", experienceYears: 10, rating: 4.8 },

  { name: "Bisola Lawal", role: "Nurse", department: "Cardiology", specialization: "ICU", status: "On Duty", experienceYears: 7, rating: 4.8 },
  { name: "Halima Bello", role: "Nurse", department: "Maternity", specialization: "Midwifery", status: "On Duty", experienceYears: 9, rating: 4.9 },
  { name: "Chioma Okeke", role: "Nurse", department: "Pediatrics", specialization: "Pediatric Nursing", status: "Off Duty", experienceYears: 5, rating: 4.7 },
  { name: "Tolu Adeyemi", role: "Nurse", department: "Surgery", specialization: "Theatre", status: "On Duty", experienceYears: 12, rating: 4.8 },
  { name: "Funmi Salami", role: "Nurse", department: "General Medicine", specialization: "Triage", status: "On Duty", experienceYears: 6, rating: 4.6 },
  { name: "Aisha Hassan", role: "Nurse", department: "Neurology", specialization: "Stroke Unit", status: "On Call", experienceYears: 8, rating: 4.7 },

  { name: "David Ojo", role: "Technician", department: "Diagnostics", specialization: "MRI / CT", status: "On Duty", experienceYears: 6, rating: 4.5 },
  { name: "Samuel Ibrahim", role: "Technician", department: "Pharmacy", specialization: "Pharmacy Tech", status: "On Duty", experienceYears: 4, rating: 4.4 },
  { name: "Grace Onyeka", role: "Admin", department: "Front Desk", specialization: "Patient Coordination", status: "On Duty", experienceYears: 5, rating: 4.5 },
  { name: "Kunle Olawale", role: "Admin", department: "Billing", specialization: "Insurance Claims", status: "On Duty", experienceYears: 7, rating: 4.6 },
];

const grads = [
  "from-brand-300 via-brand-500 to-brand-800",
  "from-rose-400 via-coral-500 to-coral-700",
  "from-emerald-300 via-teal-500 to-cyan-700",
  "from-violet-400 via-fuchsia-500 to-purple-700",
  "from-amber-300 via-orange-500 to-red-600",
  "from-sky-300 via-blue-500 to-indigo-700",
];

export const staff: StaffMember[] = staffSeed.map((s, i) => {
  const parts = s.name.replace(/^Dr\.\s*/, "").trim().split(" ");
  const initials =
    (parts[0]?.[0] ?? "") + (parts[parts.length - 1]?.[0] ?? "");
  return {
    ...s,
    id: `STF-${(2110 + i).toString().padStart(4, "0")}`,
    initials: initials.toUpperCase(),
    grad: grads[i % grads.length],
  };
});

/* =============== INVOICES =============== */
const services = [
  "Consultation – Cardiology",
  "MRI Brain (with contrast)",
  "Caesarean Section",
  "Comprehensive Lab Panel",
  "Pediatric Vaccination",
  "ECG + Echocardiogram",
  "Appendectomy",
  "X-Ray, Chest",
  "Physiotherapy session",
  "Orthopaedic surgery",
  "Inpatient ward (3 nights)",
  "Pharmacy bill",
];

export const invoices: Invoice[] = Array.from({ length: 28 }, (_, i) => {
  const issued = new Date();
  issued.setDate(issued.getDate() - (i % 30));
  const due = new Date(issued);
  due.setDate(due.getDate() + 14);
  const statuses: InvoiceStatus[] = [
    "Paid",
    "Paid",
    "Pending",
    "Paid",
    "Overdue",
    "Pending",
    "Paid",
    "Paid",
  ];
  const amount =
    Math.round((45_000 + ((i * 13_777) % 1_550_000)) / 1000) * 1000;
  return {
    id: `INV-${(9051 + i).toString().padStart(5, "0")}`,
    patient: patients[(i * 3) % patients.length].name,
    service: pick(services, i + 5),
    amount,
    status: pick(statuses, i),
    issuedAt: issued.toISOString().slice(0, 10),
    dueAt: due.toISOString().slice(0, 10),
  };
});

/* =============== DEPARTMENTS =============== */
export const departmentList: Department[] = [
  { name: "Cardiology", patients: 38, capacity: 50, doctors: 6, nurses: 14, trend: 8.2, color: "rose" },
  { name: "Neurology", patients: 22, capacity: 30, doctors: 4, nurses: 10, trend: 3.4, color: "violet" },
  { name: "Pediatrics", patients: 41, capacity: 60, doctors: 7, nurses: 18, trend: 12.1, color: "amber" },
  { name: "Maternity", patients: 27, capacity: 35, doctors: 5, nurses: 16, trend: 6.5, color: "pink" },
  { name: "Surgery", patients: 18, capacity: 24, doctors: 9, nurses: 12, trend: -2.1, color: "violet" },
  { name: "Orthopaedics", patients: 24, capacity: 30, doctors: 4, nurses: 9, trend: 4.0, color: "teal" },
  { name: "General Medicine", patients: 56, capacity: 70, doctors: 8, nurses: 22, trend: 1.7, color: "brand" },
  { name: "Diagnostics", patients: 0, capacity: 0, doctors: 5, nurses: 6, trend: 9.0, color: "cyan" },
];

/* =============== PHARMACY =============== */
const meds: Omit<Medication, "id" | "status">[] = [
  { name: "Paracetamol 500mg", category: "Analgesic", stock: 1240, reorderAt: 400, unit: "tablets", expiry: "2027-03-12" },
  { name: "Amoxicillin 250mg", category: "Antibiotic", stock: 380, reorderAt: 400, unit: "capsules", expiry: "2026-11-08" },
  { name: "Insulin (Mixtard)", category: "Endocrine", stock: 24, reorderAt: 30, unit: "vials", expiry: "2026-08-04" },
  { name: "Lisinopril 10mg", category: "Cardiology", stock: 612, reorderAt: 200, unit: "tablets", expiry: "2027-01-22" },
  { name: "Atorvastatin 20mg", category: "Cardiology", stock: 290, reorderAt: 200, unit: "tablets", expiry: "2026-12-03" },
  { name: "Salbutamol Inhaler", category: "Respiratory", stock: 78, reorderAt: 60, unit: "inhalers", expiry: "2027-05-19" },
  { name: "Metformin 500mg", category: "Endocrine", stock: 1502, reorderAt: 500, unit: "tablets", expiry: "2027-09-10" },
  { name: "Artemether/Lumefantrine", category: "Antimalarial", stock: 0, reorderAt: 200, unit: "doses", expiry: "2026-09-30" },
  { name: "Ceftriaxone 1g", category: "Antibiotic", stock: 142, reorderAt: 100, unit: "vials", expiry: "2027-02-15" },
  { name: "Diazepam 5mg", category: "Sedative", stock: 88, reorderAt: 100, unit: "tablets", expiry: "2026-10-04" },
  { name: "Folic Acid 5mg", category: "Vitamin", stock: 980, reorderAt: 300, unit: "tablets", expiry: "2027-04-27" },
  { name: "Heparin", category: "Anticoagulant", stock: 18, reorderAt: 25, unit: "vials", expiry: "2026-07-19" },
];

export const medications: Medication[] = meds.map((m, i) => ({
  ...m,
  id: `MED-${(3041 + i).toString().padStart(4, "0")}`,
  status:
    m.stock === 0 ? "Out" : m.stock < m.reorderAt ? "Low" : "In Stock",
}));

/* =============== CHART DATA =============== */
export const weeklyAdmissions = [
  { day: "Mon", admissions: 38, discharges: 22 },
  { day: "Tue", admissions: 45, discharges: 30 },
  { day: "Wed", admissions: 52, discharges: 28 },
  { day: "Thu", admissions: 61, discharges: 41 },
  { day: "Fri", admissions: 49, discharges: 37 },
  { day: "Sat", admissions: 35, discharges: 26 },
  { day: "Sun", admissions: 27, discharges: 18 },
];

export const departmentVisits = [
  { dept: "Card.", visits: 142 },
  { dept: "Neuro", visits: 96 },
  { dept: "Peds", visits: 188 },
  { dept: "Mat.", visits: 124 },
  { dept: "Surg.", visits: 78 },
  { dept: "Ortho", visits: 88 },
  { dept: "GenMed", visits: 232 },
  { dept: "Diag.", visits: 168 },
];

/* =============== ACTIVITY FEED =============== */
export const recentActivity: ActivityItem[] = [
  { id: "1", type: "admission", title: "Folashade Bello admitted", meta: "Cardiology · Bed C-204", time: "2 min ago" },
  { id: "2", type: "appointment", title: "New booking: Tunde Salami", meta: "Pediatrics · Tomorrow 9:30 AM", time: "11 min ago" },
  { id: "3", type: "invoice", title: "Invoice INV-09071 paid", meta: "₦185,000 · Lisinopril prescription", time: "23 min ago" },
  { id: "4", type: "alert", title: "Low stock alert", meta: "Insulin (Mixtard) — 24 vials left", time: "38 min ago" },
  { id: "5", type: "discharge", title: "Aisha Ibrahim discharged", meta: "Maternity · Stay: 4 nights", time: "1 hr ago" },
  { id: "6", type: "appointment", title: "Dr. Adaeze Okafor's clinic full", meta: "All slots booked for today", time: "1 hr ago" },
  { id: "7", type: "admission", title: "Emergency: Adewale Onyeka", meta: "Surgery · Trauma bay 2", time: "2 hr ago" },
];

/* =============== APPOINTMENTS (mock) =============== */
export type ApptStatus = "Confirmed" | "Pending" | "Cancelled";
export interface MockAppointment {
  id: string;
  patient: string;
  doctor: string;
  department: string;
  time: string;
  date: string;
  status: ApptStatus;
}

export const mockAppointments: MockAppointment[] = Array.from(
  { length: 12 },
  (_, i) => {
    const dates = [
      "Today",
      "Today",
      "Today",
      "Today",
      "Tomorrow",
      "Tomorrow",
      "Tomorrow",
      "Wed",
      "Wed",
      "Thu",
      "Fri",
      "Fri",
    ];
    const times = [
      "08:30",
      "09:00",
      "09:45",
      "10:15",
      "11:00",
      "11:30",
      "12:15",
      "13:30",
      "14:15",
      "15:00",
      "15:45",
      "16:30",
    ];
    const stat: ApptStatus[] = [
      "Confirmed",
      "Confirmed",
      "Pending",
      "Confirmed",
      "Cancelled",
      "Confirmed",
      "Pending",
      "Confirmed",
      "Confirmed",
      "Pending",
      "Cancelled",
      "Confirmed",
    ];
    return {
      id: `APT-${(8801 + i).toString().padStart(5, "0")}`,
      patient: patients[(i * 5) % patients.length].name,
      doctor: pick(doctorNames, i),
      department: pick(departments, i + 1),
      time: times[i],
      date: dates[i],
      status: stat[i],
    };
  }
);
