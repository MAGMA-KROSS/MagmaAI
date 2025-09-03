// components/Hero.js
export default function Hero() {
  return (
    <section className="relative flex flex-col items-center justify-center text-center py-28 px-6 overflow-hidden">
      {/* Background Glow */}
      <div className="absolute inset-0  blur-3xl" />

      <h1 className="text-5xl cursor-default md:text-6xl font-extrabold text-white leading-tight relative z-10">
        Build Your Future with MagmaAI
      </h1>
      <p className="mt-6 text-lg cursor-default md:text-xl text-gray-300 max-w-2xl relative z-10">
        Generate ATS-friendly resumes and optimize your LinkedIn profile using AI.  
        Fast, smart, and built for career growth.
      </p>

      <div className="mt-10 relative z-10">
        <a
          href="/resume"
          className="px-8 py-4 text-lg font-semibold rounded-xl bg-gradient-to-r from-white to-gray-200 text-black shadow-lg hover:shadow-gray-500/50 hover:scale-105 transition-all duration-600"
        >
          Start Building for Free
        </a>
      </div>
    </section>
  );
}
