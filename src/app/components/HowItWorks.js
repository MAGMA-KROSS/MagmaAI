
const steps = [
  { step: "1", text: "Enter your details & preferences" },
  { step: "2", text: "AI generates your resume instantly" },
  { step: "3", text: "Download & optimize your career docs" },
];

export default function HowItWorks() {
  return (
    <section className="py-20 px-6 max-w-5xl mx-auto text-center">
      <h2 className="text-3xl md:text-4xl font-bold mb-12 cursor-default">How It Works</h2>
      <div className="grid gap-8 md:grid-cols-3">
        {steps.map((s, i) => (
          <div
            key={i}
            className="p-6 rounded-xl bg-black/30 border border-white/10 hover:shadow-lg hover:shadow-gray-500/30 transition"
          >
            <div className="text-3xl font-bold text-gray-300 mb-4">
              {s.step}
            </div>
            <p className="text-gray-300 cursor-default">{s.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
