// components/ContactForm.js
"use client";

export default function ContactForm() {
  return (
    <form
      
      action="https://formspree.io/f/xnnzgbko" 
      method="POST"
      className="bg-black/40 backdrop-blur-md p-8 rounded-xl border border-gray-800 shadow-lg space-y-6"
    >
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
          Name
        </label>
        <input
          type="text"
          name="name"
          id="name"
          required
          className="w-full px-4 py-3 rounded-lg bg-[#111] border border-gray-700 text-white focus:ring-2 focus:ring-gray-500 focus:outline-none transition"
        />
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
          Email
        </label>
        <input
          type="email"
          name="email"
          id="email"
          required
          className="w-full px-4 py-3 rounded-lg bg-[#111] border border-gray-700 text-white focus:ring-2 focus:ring-gray-500 focus:outline-none transition"
        />
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
          Message
        </label>
        <textarea
          name="message"
          id="message"
          rows="5"
          required
          className="w-full px-4 py-3 rounded-lg bg-[#111] border border-gray-700 text-white focus:ring-2 focus:ring-gray-500 focus:outline-none transition"
        ></textarea>
      </div>

      <button
        type="submit"
        className="w-full py-3 px-6 rounded-lg bg-gradient-to-r from-white to-gray-200 text-black font-semibold hover:shadow-lg hover:shadow-gray-600/40 hover:scale-[1.02] transition"
      >
        Send Message
      </button>
    </form>
  );
}
