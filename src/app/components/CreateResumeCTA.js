// components/CreateResumeCTA.js
import CTAButton from "./CTAButton";

export default function CreateResumeCTA() {
  return (
    <section className="relative py-20 px-6 text-center bg-black/30 backdrop-blur-md border border-white/10 rounded-xl max-w-5xl mx-auto my-20">
      <h2 className="text-3xl md:text-4xl font-bold mb-6">
        Ready to Optimize Your LinkedIn Profile?
      </h2>
      <p className="text-gray-400 max-w-2xl mx-auto mb-10">
        Let AI transform your LinkedIn into a recruiter magnet.  
        From headlines to summaries — stand out and attract the right opportunities.
      </p>
      <CTAButton text="Optimize Your LinkedIn Now" link="/linkedin" />
    </section>
  );
}
