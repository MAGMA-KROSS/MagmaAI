"use client";
import { useState } from "react";
import ReactMarkdown from "react-markdown";

export default function LinkedIn() {
  const [formData, setFormData] = useState({
    fullName: "",
    role: "", // Current role/status
    location: "",
    phone: "",
    email: "",
    linkedin: "",
    github: "",
    portfolio: "",

    // Headline
    headlineKeywords: "",
    focus: "",

    // About
    about: {
      who: "",
      what: "",
      why: "",
      cta: "",
    },

    // Education
    education: [
      {
        degree: "",
        university: "",
        years: "",
        achievements: "",
      },
    ],

    // Experience
    experience: [
      {
        title: "",
        organization: "",
        dates: "",
        description: "",
      },
    ],

    // Projects
    projects: [
      {
        name: "",
        stack: "",
        description: "",
        link: "",
      },
    ],

    // Skills
    skills: {
      top: "",
      additional: "",
    },

    // Certifications
    certifications: [
      {
        name: "",
        issuer: "",
        year: "",
      },
    ],

    // Featured
    featured: [""],
  });


  const [generatedProfile, setGeneratedProfile] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleNestedChange = (e, section) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [section]: { ...prev[section], [name]: value },
    }));
  };

  const handleDynamicChange = (e, index, section) => {
    const { name, value } = e.target;
    const list = [...formData[section]];
    list[index][name] = value;
    setFormData((prev) => ({ ...prev, [section]: list }));
  };

  const addDynamicField = (section, fields) => {
    setFormData((prev) => ({
      ...prev,
      [section]: [...prev[section], fields],
    }));
  };

  const removeDynamicField = (index, section) => {
    const list = [...formData[section]];
    list.splice(index, 1);
    setFormData((prev) => ({ ...prev, [section]: list }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setGeneratedProfile("");
    setError(null);

    try {
      // This URL must exactly match the path of your API route file.
      // The file at /src/app/api/generate-linkedin/route.js corresponds to this URL.
      const response = await fetch("/api/generate-linkedin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      const data = await response.json();
      setGeneratedProfile(data.profile);
    } catch (err) {
      setError("Failed to generate LinkedIn profile. Please try again later.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  // Styling
  const inputClass =
    "w-full px-4 py-3 rounded-lg bg-[#111] border border-gray-700 text-white focus:ring-2 focus:ring-gray-500 focus:outline-none transition";
  const labelClass = "block text-sm font-medium text-gray-300 mb-2";
  const sectionClass =
    "bg-black/30 backdrop-blur-md p-8 rounded-xl border border-white/10 space-y-6";
  const buttonClass =
    "px-4 py-2 text-sm font-semibold rounded-lg bg-gray-700 hover:bg-gray-600 text-white transition";
  const removeButtonClass = "px-4 py-2 text-sm font-semibold rounded-lg bg-red-800 hover:bg-red-700 text-white transition";


  return (
    <main className="min-h-screen text-white p-4 sm:p-6 lg:p-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold text-white leading-tight">
            Create Your LinkedIn Profile
          </h1>
          <p className="mt-4 text-lg text-gray-400">
            Fill in your details to generate a professional, AI-optimized LinkedIn
            profile.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-12">
          {/* Basic Info */}
          <fieldset className={sectionClass}>
            <legend className="text-2xl font-bold mb-6 text-white">Basic Info</legend>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="fullName" className={labelClass}>Full Name</label>
                <input id="fullName" type="text" name="fullName" placeholder="eg: Abi Kumar" value={formData.fullName} onChange={handleChange} className={inputClass} />
              </div>
              <div>
                <label htmlFor="role" className={labelClass}>Current Role</label>
                <input id="role" type="text" name="role" placeholder="eg: B.Tech Student" value={formData.role} onChange={handleChange} className={inputClass} />
              </div>
              <div>
                <label htmlFor="location" className={labelClass}>Location</label>
                <input id="location" type="text" name="location" placeholder="eg: New Delhi, India" value={formData.location} onChange={handleChange} className={inputClass} />
              </div>
              <div>
                <label htmlFor="email" className={labelClass}>Email Address</label>
                <input id="email" type="email" name="email" placeholder="eg: you@example.com" value={formData.email} onChange={handleChange} className={inputClass} />
              </div>
              <div>
                <label htmlFor="linkedin" className={labelClass}>LinkedIn URL</label>
                <input id="linkedin" type="text" name="linkedin" placeholder="eg: https://linkedin.com/in/yourprofile" value={formData.linkedin} onChange={handleChange} className={inputClass} />
              </div>
              <div>
                <label htmlFor="github" className={labelClass}>GitHub URL</label>
                <input id="github" type="text" name="github" placeholder="eg: https://github.com/abi" value={formData.github} onChange={handleChange} className={inputClass} />
              </div>
            </div>
          </fieldset>

          {/* Headline */}
          <fieldset className={sectionClass}>
            <legend className="text-2xl font-bold mb-6 text-white">Headline</legend>
            <div>
              <label htmlFor="headlineKeywords" className={labelClass}>Headline Keywords</label>
              <input id="headlineKeywords" type="text" name="headlineKeywords" placeholder="eg: Web Development | AI | Cybersecurity" value={formData.headlineKeywords} onChange={handleChange} className={inputClass} />
            </div>
            <div>
              <label htmlFor="focus" className={labelClass}>Focus / Tagline</label>
              <input id="focus" type="text" name="focus" placeholder="eg: Building Next-Gen Tech Solutions" value={formData.focus} onChange={handleChange} className={inputClass} />
            </div>
          </fieldset>

          {/* About */}
          <fieldset className={sectionClass}>
            <legend className="text-2xl font-bold mb-6 text-white">About</legend>
            <div>
              <label htmlFor="who" className={labelClass}>Who are you?</label>
              <textarea id="who" name="who" placeholder="eg: I’m Abi, a B.Tech student passionate about..." value={formData.about.who} onChange={(e) => handleNestedChange(e, "about")} className={inputClass} rows="3" />
            </div>
            <div>
              <label htmlFor="what" className={labelClass}>What have you built/done?</label>
              <textarea id="what" name="what" placeholder="eg: I’ve built multiple projects including a Netflix clone..." value={formData.about.what} onChange={(e) => handleNestedChange(e, "about")} className={inputClass} rows="3" />
            </div>
            <div>
              <label htmlFor="why" className={labelClass}>Why do you do it?</label>
              <textarea id="why" name="why" placeholder="eg: I love solving real-world problems with technology." value={formData.about.why} onChange={(e) => handleNestedChange(e, "about")} className={inputClass} rows="3" />
            </div>
            <div>
              <label htmlFor="cta" className={labelClass}>Call to Action</label>
              <textarea id="cta" name="cta" placeholder="eg: Always open to opportunities, collaborations..." value={formData.about.cta} onChange={(e) => handleNestedChange(e, "about")} className={inputClass} rows="3" />
            </div>
          </fieldset>

          {/* Education */}
          <fieldset className={sectionClass}>
            <legend className="text-2xl font-bold mb-6 text-white">Education</legend>
            {formData.education.map((edu, i) => (
              <div key={i} className="space-y-4 p-4 border border-gray-800 rounded-lg">
                <div>
                    <label htmlFor={`degree-${i}`} className={labelClass}>Degree</label>
                    <input id={`degree-${i}`} type="text" name="degree" placeholder="eg: B.Tech in Computer Science" value={edu.degree} onChange={(e) => handleDynamicChange(e, i, "education")} className={inputClass} />
                </div>
                <div>
                    <label htmlFor={`university-${i}`} className={labelClass}>University</label>
                    <input id={`university-${i}`} type="text" name="university" placeholder="eg: XYZ University" value={edu.university} onChange={(e) => handleDynamicChange(e, i, "education")} className={inputClass} />
                </div>
                <div>
                    <label htmlFor={`years-${i}`} className={labelClass}>Years Attended</label>
                    <input id={`years-${i}`} type="text" name="years" placeholder="eg: 2024–2028" value={edu.years} onChange={(e) => handleDynamicChange(e, i, "education")} className={inputClass} />
                </div>
                <div>
                    <label htmlFor={`achievements-${i}`} className={labelClass}>Key Achievements (comma separated)</label>
                    <input id={`achievements-${i}`} type="text" name="achievements" placeholder="eg: Hackathon Winner, Open Source Contributions" value={edu.achievements} onChange={(e) => handleDynamicChange(e, i, "education")} className={inputClass} />
                </div>
              </div>
            ))}
          </fieldset>

          {/* Experience */}
          <fieldset className={sectionClass}>
            <legend className="text-2xl font-bold mb-6 text-white">Experience</legend>
            {formData.experience.map((exp, i) => (
              <div key={i} className="space-y-4 p-4 border border-gray-800 rounded-lg relative">
                 <div>
                    <label htmlFor={`title-${i}`} className={labelClass}>Job Title</label>
                    <input id={`title-${i}`} type="text" name="title" placeholder="eg: Frontend Developer Intern" value={exp.title} onChange={(e) => handleDynamicChange(e, i, "experience")} className={inputClass} />
                 </div>
                 <div>
                    <label htmlFor={`organization-${i}`} className={labelClass}>Organization / Project</label>
                    <input id={`organization-${i}`} type="text" name="organization" placeholder="eg: Spotify Clone (Personal Project)" value={exp.organization} onChange={(e) => handleDynamicChange(e, i, "experience")} className={inputClass} />
                 </div>
                 <div>
                    <label htmlFor={`dates-${i}`} className={labelClass}>Dates</label>
                    <input id={`dates-${i}`} type="text" name="dates" placeholder="eg: June 2025 - August 2025" value={exp.dates} onChange={(e) => handleDynamicChange(e, i, "experience")} className={inputClass} />
                 </div>
                 <div>
                    <label htmlFor={`description-${i}`} className={labelClass}>Description</label>
                    <textarea id={`description-${i}`} name="description" placeholder="Describe your impact. Problem you solved -> Solution you built -> Impact it had." value={exp.description} onChange={(e) => handleDynamicChange(e, i, "experience")} className={inputClass} rows="4" />
                 </div>
                 {formData.experience.length > 1 && <button type="button" onClick={() => removeDynamicField(i, "experience")} className={`${removeButtonClass} absolute -top-4 -right-4`}>Remove</button>}
              </div>
            ))}
            <button type="button" onClick={() => addDynamicField("experience", { title: "", organization: "", dates: "", description: "" })} className={buttonClass}>Add Experience</button>
          </fieldset>
          
          {/* Projects */}
          <fieldset className={sectionClass}>
            <legend className="text-2xl font-bold mb-6 text-white">Projects</legend>
            {formData.projects.map((proj, i) => (
              <div key={i} className="space-y-4 p-4 border border-gray-800 rounded-lg relative">
                 <div>
                    <label htmlFor={`proj-name-${i}`} className={labelClass}>Project Name</label>
                    <input id={`proj-name-${i}`} type="text" name="name" placeholder="eg: Magma Drive" value={proj.name} onChange={(e) => handleDynamicChange(e, i, "projects")} className={inputClass} />
                 </div>
                 <div>
                    <label htmlFor={`proj-stack-${i}`} className={labelClass}>Tech Stack (comma separated)</label>
                    <input id={`proj-stack-${i}`} type="text" name="stack" placeholder="eg: Express.js, Supabase, Next.js" value={proj.stack} onChange={(e) => handleDynamicChange(e, i, "projects")} className={inputClass} />
                 </div>
                 <div>
                    <label htmlFor={`proj-desc-${i}`} className={labelClass}>Description</label>
                    <textarea id={`proj-desc-${i}`} name="description" placeholder="eg: A free hosting and storage app for students and freelancers." value={proj.description} onChange={(e) => handleDynamicChange(e, i, "projects")} className={inputClass} rows="3" />
                 </div>
                 <div>
                    <label htmlFor={`proj-link-${i}`} className={labelClass}>Project Link</label>
                    <input id={`proj-link-${i}`} type="text" name="link" placeholder="eg: https://github.com/abi/magma-drive" value={proj.link} onChange={(e) => handleDynamicChange(e, i, "projects")} className={inputClass} />
                 </div>
                 {formData.projects.length > 1 && <button type="button" onClick={() => removeDynamicField(i, "projects")} className={`${removeButtonClass} absolute -top-4 -right-4`}>Remove</button>}
              </div>
            ))}
            <button type="button" onClick={() => addDynamicField("projects", { name: "", stack: "", description: "", link: "" })} className={buttonClass}>Add Project</button>
          </fieldset>

          {/* Skills */}
          <fieldset className={sectionClass}>
            <legend className="text-2xl font-bold mb-6 text-white">Skills</legend>
            <div>
                <label htmlFor="top-skills" className={labelClass}>Top 3 Skills</label>
                <input id="top-skills" type="text" name="top" placeholder="eg: Next.js, Tailwind CSS, Cybersecurity" value={formData.skills.top} onChange={(e) => handleNestedChange(e, "skills")} className={inputClass} />
            </div>
            <div>
                <label htmlFor="additional-skills" className={labelClass}>Additional Skills</label>
                <input id="additional-skills" type="text" name="additional" placeholder="eg: MongoDB, Express.js, AI/ML, Content Creation" value={formData.skills.additional} onChange={(e) => handleNestedChange(e, "skills")} className={inputClass} />
            </div>
          </fieldset>

          {/* Certifications */}
          <fieldset className={sectionClass}>
            <legend className="text-2xl font-bold mb-6 text-white">Certifications</legend>
            {formData.certifications.map((cert, i) => (
              <div key={i} className="space-y-4 p-4 border border-gray-800 rounded-lg relative">
                <div>
                    <label htmlFor={`cert-name-${i}`} className={labelClass}>Certification Name</label>
                    <input id={`cert-name-${i}`} type="text" name="name" placeholder="eg: Introduction to Cybersecurity" value={cert.name} onChange={(e) => handleDynamicChange(e, i, "certifications")} className={inputClass} />
                </div>
                <div>
                    <label htmlFor={`cert-issuer-${i}`} className={labelClass}>Issuer</label>
                    <input id={`cert-issuer-${i}`} type="text" name="issuer" placeholder="eg: Cisco" value={cert.issuer} onChange={(e) => handleDynamicChange(e, i, "certifications")} className={inputClass} />
                </div>
                <div>
                    <label htmlFor={`cert-year-${i}`} className={labelClass}>Year</label>
                    <input id={`cert-year-${i}`} type="text" name="year" placeholder="eg: 2025" value={cert.year} onChange={(e) => handleDynamicChange(e, i, "certifications")} className={inputClass} />
                </div>
                {formData.certifications.length > 1 && <button type="button" onClick={() => removeDynamicField(i, "certifications")} className={`${removeButtonClass} absolute -top-4 -right-4`}>Remove</button>}
              </div>
            ))}
             <button type="button" onClick={() => addDynamicField("certifications", { name: "", issuer: "", year: "" })} className={buttonClass}>Add Certification</button>
          </fieldset>

          {/* Featured */}
          <fieldset className={sectionClass}>
            <legend className="text-2xl font-bold mb-6 text-white">Featured Links</legend>
            {formData.featured.map((link, i) => (
               <div key={i} className="relative">
                 <label htmlFor={`featured-link-${i}`} className={labelClass}>Link #{i + 1}</label>
                 <input id={`featured-link-${i}`} type="text" name="link" placeholder="eg: https://portfolio.abi.dev" value={link} onChange={(e) => {
                     const list = [...formData.featured];
                     list[i] = e.target.value;
                     setFormData((prev) => ({ ...prev, featured: list }));
                   }} className={inputClass} />
               </div>
            ))}
            <button type="button" onClick={() => addDynamicField("featured", "")} className={buttonClass}>
              Add Featured Link
            </button>
          </fieldset>

          {/* Submit */}
          <div className="text-center pt-8">
            <button
              type="submit"
              disabled={isLoading}
              className="px-12 py-4 text-lg font-semibold rounded-xl bg-gradient-to-r from-gray-200 to-gray-400 text-black shadow-lg hover:shadow-gray-500/50 hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? "Generating..." : "Generate Profile"}
            </button>
          </div>
        </form>

        {/* Output */}
        {error && (
          <div className="mt-12 text-center p-4 bg-red-900/50 border border-red-500 text-red-300 rounded-lg">
            <p>{error}</p>
          </div>
        )}

        {generatedProfile && (
          <div className="mt-16">
            <h2 className="text-3xl font-bold text-center mb-8">
              Your Optimized LinkedIn Profile
            </h2>
            <div className="bg-black/50 backdrop-blur-md p-6 sm:p-8 rounded-xl border border-white/10 relative">
              <div className="prose prose-invert max-w-none">
                <ReactMarkdown>{generatedProfile}</ReactMarkdown>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
