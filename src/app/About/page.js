// src/app/about.js
import Link from "next/link";

export default function About() {
  return (
    <main
      id="About"
      className="relative min-h-screen text-white "
    >
      <section className="py-20 px-6 max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-extrabold text-white leading-tight mb-4">
            About MagmaAI
          </h1>
          <p className="text-lg md:text-xl text-gray-300">
            Empowering job seekers with the tools to build their future.
          </p>
        </div>

        <div className="space-y-12">
          <div>
            <h2 className="text-3xl font-bold mb-4">Our Mission</h2>
            <p className="text-gray-400 leading-relaxed">
              At MagmaAI, our mission is to level the playing field for job
              seekers everywhere. We believe that everyone deserves a fair
              chance to land their dream job, regardless of their background or
              experience. That&apos;s why we&apos;ve created a suite of AI-powered tools
              designed to help you craft the perfect resume, optimize your
              LinkedIn profile, and navigate the complexities of modern job
              hunting with confidence.
            </p>
          </div>

          <div>
            <h2 className="text-3xl font-bold mb-4">Our Story</h2>
            <p className="text-gray-400 leading-relaxed mb-4">
              MagmaAI was born from a simple observation: the job search process
              is broken. Too often, talented candidates are overlooked because
              their resumes aren&apos;t optimized for Applicant Tracking Systems
              (ATS) or their online presence doesn&apos;t reflect their true
              potential. We knew there had to be a better way.
            </p>
            <p className="text-gray-400 leading-relaxed">
              Our team of developers, designers, and career experts came
              together to create a platform that leverages the power of
              artificial intelligence to provide actionable insights and
              data-driven recommendations. The result is MagmaAI, a comprehensive
              solution that empowers you to take control of your career narrative
              and put your best foot forward.
            </p>
          </div>

          <div>
            <h2 className="text-3xl font-bold mb-4">What We Do</h2>
            <p className="text-gray-400 leading-relaxed">
              MagmaAI offers a range of tools to help you succeed in your job
              search:
            </p>
            <ul className="list-disc list-inside text-gray-400 mt-4 space-y-2">
              <li>
                <strong>AI-Powered Resume Builder:</strong> Create polished,
                ATS-friendly resumes tailored to your specific career goals.
              </li>
              <li>
                <strong>LinkedIn Optimizer:</strong> Enhance your LinkedIn
                profile with AI-driven recommendations to attract recruiters
                and build your professional brand.
              </li>
              <li>
                <strong>ATS Checker:</strong> Analyze your resume&apos;s ATS score
                and get actionable tips for keyword optimization to ensure your
                application gets noticed.
              </li>
            </ul>
          </div>
        </div>
      </section>
    </main>
  );
}