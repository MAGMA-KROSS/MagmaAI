// components/CTAButton.js
import Link from "next/link";

export default function CTAButton({ text, link }) {
  return (
    <Link
      href={link}
      className="px-8 py-4 text-lg font-semibold rounded-xl bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-lg hover:shadow-purple-500/50 hover:scale-105 transition-transform duration-300"
    >
      {text}
    </Link>
  );
}
