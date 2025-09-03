import Image from "next/image";
import Link from "next/link";
import Hero from "./components/Hero";
import Features from "./components/Features";
import HowItWorks from "./components/HowItWorks";
import Testimonials from "./components/Testimonials";
import ContactForm from "./components/ContactForm";
import CreateResumeCTA from "./components/CreateResumeCTA";

export default function Home() {
  return (
    <>
      <Hero />
      <Features />
      <CreateResumeCTA/>
      <HowItWorks />
      <Testimonials />
      <main id="Contact" className="relative min-h-screen text-white">
        <section className="py-20 px-6 max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-center cursor-default mb-6">Get in Touch</h1>
          <p className="text-gray-400 text-center cursor-default mb-12">
            Have questions, feedback, or collaboration ideas? Drop a message and
            we&apos;ll get back to you soon.
          </p>
          <ContactForm />
        </section>
      </main>
    </>
  );
}
