// components/FeatureCard.js
export default function FeatureCard({ icon, title, desc }) {
  return (
    <div className="p-8 rounded-xl bg-black/30 backdrop-blur-md border border-white/10 hover:shadow-lg hover:shadow-gray-500/30 cursor-default transition transform hover:-translate-y-1 text-center">
      <div className="text-gray-300 mb-4">{icon}</div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-400">{desc}</p>
    </div>
  );
}
