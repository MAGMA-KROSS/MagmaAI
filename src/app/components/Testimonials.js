// components/Testimonials.js
const testimonials = [
  {
    name: "Jane Doe",
    quote: "MagmaAI made job hunting stress-free. My resume finally stands out!",
  },
  {
    name: "John Smith",
    quote:
      "The LinkedIn optimizer gave me a professional edge. Recruiters noticed me fast.",
  },
  {
    name: "Sarah Lee",
    quote:
      "ATS checker showed me exactly what was missing. Got 3 interview calls in a week!",
  },
];

export default function Testimonials() {
  return (
    <section className="py-20 px-6 max-w-6xl mx-auto">
      <h2 className="text-3xl cursor-default md:text-4xl font-bold text-center mb-12">
        What Our Users Say
      </h2>
      <div className="grid gap-8 md:grid-cols-3">
        {testimonials.map((t, i) => (
          <div
            key={i}
            className="p-6 rounded-xl bg-white/5 backdrop-blur-md border border-white/10 shadow-md hover:shadow-gray-500/20 transition"
          >
            <p className="text-gray-300 cursor-default mb-4">“{t.quote}”</p>
            <h4 className="font-semibold cursor-default text-white">{t.name}</h4>
          </div>
        ))}
      </div>
    </section>
  );
}
