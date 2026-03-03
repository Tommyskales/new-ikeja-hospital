export default function Home() {
  return (
    <div>
      {/* HERO */}
      <section className="bg-blue-700 text-white py-20 px-6 text-center">
        <h1 className="text-5xl font-bold">Quality Healthcare You Can Trust</h1>
        <p className="mt-4">24/7 Multi-specialty Hospital in Ikeja</p>

        <div className="mt-6 space-x-4">
          <a href="/appointment" className="bg-white text-blue-700 px-6 py-2 rounded">
            Book Appointment
          </a>
          <button className="bg-green-500 px-6 py-2 rounded">
            Call Now
          </button>
        </div>
      </section>

      {/* SERVICES */}
      <section className="bg-gray-100 py-16 text-center">
        <h2 className="text-3xl font-bold mb-10">Our Services</h2>

        <div className="grid md:grid-cols-3 gap-6 px-6">
          <div className="bg-white p-6 shadow rounded">
            <h3 className="font-bold text-lg">General Medicine</h3>
            <p className="text-gray-600 mt-2">Expert care with modern equipment.</p>
          </div>

          <div className="bg-white p-6 shadow rounded">
            <h3 className="font-bold text-lg">Pediatrics</h3>
            <p className="text-gray-600 mt-2">Expert care with modern equipment.</p>
          </div>

          <div className="bg-white p-6 shadow rounded">
            <h3 className="font-bold text-lg">Surgery</h3>
            <p className="text-gray-600 mt-2">Expert care with modern equipment.</p>
          </div>
        </div>
      </section>

      {/* TESTIMONIAL */}
      <section className="py-16 text-center">
        <h2 className="text-2xl font-bold">What Patients Say</h2>

        <div className="mt-6 grid md:grid-cols-2 gap-6 px-6">
          <div className="bg-white p-4 shadow rounded">
            Very good hospital with modern equipment.
          </div>

          <div className="bg-white p-4 shadow rounded">
            Professional and reliable service.
          </div>
        </div>
      </section>
    </div>
  );
}