// components/CTAButton.js
import Link from "next/link";

export default function CTAButton({ text, link }) {
  return (
    <Link
      href={link}
      className="px-8 py-4 text-lg font-semibold rounded-xl bg-gradient-to-r from-white to-gray-200 text-black shadow-lg hover:shadow-gray-500/50 cursor-pointer hover:scale-105 transition-all duration-600"
    >
      {text}
    </Link>
  );
}
