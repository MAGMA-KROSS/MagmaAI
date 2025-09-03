// components/Features.js
import FeatureCard from "./FeatureCard";
import { FaFileAlt, FaLinkedin, FaCheckCircle } from "react-icons/fa";

const features = [
  {
    icon: <FaFileAlt size={40} />,
    title: "Resume Builder",
    desc: "Generate polished, ATS-friendly resumes tailored for your career goals.",
  },
  {
    icon: <FaLinkedin size={40} />,
    title: "LinkedIn Optimizer",
    desc: "Enhance your LinkedIn profile with AI-driven recommendations.",
  },
  {
    icon: <FaCheckCircle size={40} />,
    title: "ATS Checker",
    desc: "Analyze resume ATS scores and get keyword optimization tips.",
  },
];

export default function Features() {
  return (
    <section className="py-20 px-6 max-w-6xl mx-auto">
      <h2 className="text-3xl cursor-default md:text-4xl font-bold text-center mb-12">
        Powerful Features
      </h2>
      <div className="grid gap-8 md:grid-cols-3">
        {features.map((f, i) => (
          <FeatureCard key={i} {...f} />
        ))}
      </div>
    </section>
  );
}
