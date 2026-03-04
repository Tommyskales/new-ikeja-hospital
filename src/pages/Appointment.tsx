
import { useState } from "react";

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
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const validate = (): boolean => {
    const newErrors: FormErrors = {};

    if (!form.name.trim()) newErrors.name = "Name is required";
    else if (form.name.trim().length < 3) newErrors.name = "Name must be at least 3 characters";

    if (!form.email.trim()) newErrors.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) newErrors.email = "Enter a valid email address";

    if (!form.phone.trim()) newErrors.phone = "Phone number is required";
    else if (!/^\d{7,15}$/.test(form.phone.replace(/\s/g, ""))) newErrors.phone = "Enter a valid phone number";

    if (!form.date) newErrors.date = "Please select a date";
    else if (new Date(form.date) < new Date()) newErrors.date = "Date cannot be in the past";

    if (!form.message.trim()) newErrors.message = "Please enter a message";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validate()) return;

    setLoading(true);
    try {
      const response = await fetch("https://new-ikeja-hospital.onrender.com/appointment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!response.ok) throw new Error("Server error");

      setSuccess(true);
      setForm({ name: "", email: "", phone: "", date: "", department: "General Medicine", message: "" });
    } catch (error) {
      alert("Error sending appointment. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-10 max-w-xl mx-auto">
      <h1 className="text-3xl font-bold mb-2">Book Appointment</h1>
      <p className="text-gray-500 mb-6">Fill in the form below and we'll confirm your appointment shortly.</p>

      {success && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-6">
          ✅ Appointment booked successfully! We'll contact you shortly.
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <input name="name" value={form.name} onChange={handleChange} placeholder="Full Name" className={`border p-3 w-full rounded ${errors.name ? "border-red-500" : ""}`} />
          {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
        </div>

        <div>
          <input name="email" value={form.email} onChange={handleChange} placeholder="Email Address" className={`border p-3 w-full rounded ${errors.email ? "border-red-500" : ""}`} />
          {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
        </div>

        <div>
          <input name="phone" value={form.phone} onChange={handleChange} placeholder="Phone Number" className={`border p-3 w-full rounded ${errors.phone ? "border-red-500" : ""}`} />
          {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
        </div>

        <div>
          <input name="date" type="date" value={form.date} onChange={handleChange} className={`border p-3 w-full rounded ${errors.date ? "border-red-500" : ""}`} />
          {errors.date && <p className="text-red-500 text-sm mt-1">{errors.date}</p>}
        </div>

        <div>
          <select name="department" value={form.department} onChange={handleChange} className="border p-3 w-full rounded">
            <option>General Medicine</option>
            <option>Pediatrics</option>
            <option>Surgery</option>
            <option>Maternity</option>
            <option>Diagnostics</option>
          </select>
        </div>

        <div>
          <textarea name="message" value={form.message} onChange={handleChange} placeholder="Message / Reason for visit" className={`border p-3 w-full rounded ${errors.message ? "border-red-500" : ""}`} rows={4} />
          {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message}</p>}
        </div>

        <button
          type="submit"
          disabled={loading}
          className="bg-blue-700 text-white px-6 py-3 rounded w-full hover:bg-blue-800 transition disabled:opacity-50"
        >
          {loading ? "Submitting..." : "Book Appointment"}
        </button>
      </form>
    </div>
  );
}