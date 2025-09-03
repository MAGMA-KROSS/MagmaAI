"use client";
import { useState } from "react";
import ReactMarkdown from 'react-markdown';



export default function ResumeBuilder() {
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    linkedin: "",
    github: "",
    location: "",
    role: "",
    objective: "",
    education: {
      degree: "",
      university: "",
      years: "",
    },
    experience: [],
    projects: [],
    skills: "",
    achievements: [],
    extraCurricular: [],
  });

  // State for the generated resume, loading status, and errors
  const [generatedResume, setGeneratedResume] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleEducationChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      education: { ...prev.education, [name]: value },
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

  // Updated handleSubmit function to call our API
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setGeneratedResume("");
    setError(null);

    try {
      const response = await fetch('/api/generate-resume', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      const data = await response.json();
      setGeneratedResume(data.resume);

    } catch (err) {
      setError("Failed to generate resume. Please try again later.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const inputClass =
    "w-full px-4 py-3 rounded-lg bg-[#111] border border-gray-700 text-white focus:ring-2 focus:ring-gray-500 focus:outline-none transition";
  const labelClass = "block text-sm font-medium text-gray-300 mb-2";
  const sectionClass =
    "bg-black/30 backdrop-blur-md p-8 rounded-xl border border-white/10 space-y-6";
  const buttonClass =
    "px-4 py-2 text-sm font-semibold rounded-lg bg-gray-700 hover:bg-gray-600 text-white transition";

  return (
    <main className="min-h-screen text-white p-4 sm:p-6 lg:p-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold text-white leading-tight">
            Create Your Resume
          </h1>
          <p className="mt-4 text-lg text-gray-400">
            Fill in your details to generate a professional, AI-optimized
            resume.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-12">
          {/* Basic Details */}
          <fieldset className={sectionClass}>
            <legend className="text-2xl font-bold mb-6 text-white cursor-default">
              Basic Details
            </legend>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="fullName" className={labelClass}>
                  Full Name
                </label>
                <input
                  type="text"
                  name="fullName"
                  id="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  className={inputClass}
                  placeholder="e.g., Abi Kumar"
                  required
                />
              </div>
              <div>
                <label htmlFor="phone" className={labelClass}>
                  Phone
                </label>
                <input
                  type="tel"
                  name="phone"
                  id="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className={inputClass}
                  placeholder="e.g., +91 9876543210"
                  required
                />
              </div>
              <div>
                <label htmlFor="email" className={labelClass}>
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={inputClass}
                  placeholder="e.g., abikumar@gmail.com"
                  required
                />
              </div>
              <div>
                <label htmlFor="location" className={labelClass}>
                  Location
                </label>
                <input
                  type="text"
                  name="location"
                  id="location"
                  value={formData.location}
                  onChange={handleChange}
                  className={inputClass}
                  placeholder="e.g., Noida, Uttar Pradesh"
                />
              </div>
              <div>
                <label htmlFor="linkedin" className={labelClass}>
                  LinkedIn
                </label>
                <input
                  type="text"
                  name="linkedin"
                  id="linkedin"
                  value={formData.linkedin}
                  onChange={handleChange}
                  className={inputClass}
                  placeholder="e.g., linkedin.com/in/abikumar"
                />
              </div>
              <div>
                <label htmlFor="github" className={labelClass}>
                  GitHub
                </label>
                <input
                  type="text"
                  name="github"
                  id="github"
                  value={formData.github}
                  onChange={handleChange}
                  className={inputClass}
                  placeholder="e.g., github.com/abi-dev"
                />
              </div>
            </div>
          </fieldset>

          {/* Career Objective */}
          <fieldset className={sectionClass}>
            <legend className="text-2xl font-bold mb-6 text-white cursor-default">
              Career Objective
            </legend>
            <div>
              <label htmlFor="role" className={labelClass}>
                Role You're Applying For
              </label>
              <input
                type="text"
                name="role"
                id="role"
                value={formData.role}
                onChange={handleChange}
                className={inputClass}
                placeholder="e.g., Web Development Internship"
              />
            </div>
            <div>
              <label htmlFor="objective" className={labelClass}>
                Objective
              </label>
              <textarea
                name="objective"
                id="objective"
                rows="4"
                value={formData.objective}
                onChange={handleChange}
                className={inputClass}
                placeholder="e.g., First-year B.Tech student passionate about building modern web applications..."
              ></textarea>
            </div>
          </fieldset>

          {/* Education */}
          <fieldset className={sectionClass}>
            <legend className="text-2xl font-bold mb-6 text-white cursor-default">
              Education
            </legend>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="degree" className={labelClass}>
                  Degree
                </label>
                <input
                  type="text"
                  name="degree"
                  id="degree"
                  value={formData.education.degree}
                  onChange={handleEducationChange}
                  className={inputClass}
                  placeholder="e.g., B.Tech in Computer Science"
                />
              </div>
              <div>
                <label htmlFor="university" className={labelClass}>
                  University/College
                </label>
                <input
                  type="text"
                  name="university"
                  id="university"
                  value={formData.education.university}
                  onChange={handleEducationChange}
                  className={inputClass}
                  placeholder="e.g., XYZ University"
                />
              </div>
              <div>
                <label htmlFor="years" className={labelClass}>
                  Years
                </label>
                <input
                  type="text"
                  name="years"
                  id="years"
                  value={formData.education.years}
                  onChange={handleEducationChange}
                  className={inputClass}
                  placeholder="e.g., 2024 - 2028"
                />
              </div>
            </div>
          </fieldset>

          {/* Internships/Work Experience */}
          <fieldset className={sectionClass}>
            <legend className="text-2xl font-bold mb-6 text-white cursor-default">
              Internships/Work Experience
            </legend>
            {formData.experience.length === 0 && (
              <p className="text-gray-400 text-center">
                No experience added yet. Click the button below to add one.
              </p>
            )}
            {formData.experience.map((exp, index) => (
              <div
                key={index}
                className="space-y-4 border-b border-gray-700 pb-6 mb-6"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className={labelClass}>Company Name</label>
                    <input
                      type="text"
                      name="company"
                      value={exp.company}
                      onChange={(e) =>
                        handleDynamicChange(e, index, "experience")
                      }
                      className={inputClass}
                      placeholder="e.g., Google"
                    />
                  </div>
                  <div>
                    <label className={labelClass}>Role/Position</label>
                    <input
                      type="text"
                      name="role"
                      value={exp.role}
                      onChange={(e) =>
                        handleDynamicChange(e, index, "experience")
                      }
                      className={inputClass}
                      placeholder="e.g., Software Engineering Intern"
                    />
                  </div>
                </div>
                <div>
                  <label className={labelClass}>Duration</label>
                  <input
                    type="text"
                    name="duration"
                    value={exp.duration}
                    onChange={(e) =>
                      handleDynamicChange(e, index, "experience")
                    }
                    className={inputClass}
                    placeholder="e.g., Jan 2025 - Mar 2025"
                  />
                </div>
                <div>
                  <label className={labelClass}>Description</label>
                  <textarea
                    name="description"
                    value={exp.description}
                    rows="3"
                    onChange={(e) =>
                      handleDynamicChange(e, index, "experience")
                    }
                    className={inputClass}
                    placeholder="Describe your responsibilities and achievements..."
                  ></textarea>
                </div>
                <div className="text-right">
                  <button
                    type="button"
                    onClick={() => removeDynamicField(index, "experience")}
                    className="text-red-500 hover:text-red-400 text-sm font-semibold"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
            <button
              type="button"
              onClick={() =>
                addDynamicField("experience", {
                  company: "",
                  role: "",
                  duration: "",
                  description: "",
                })
              }
              className={buttonClass}
            >
              Add Experience
            </button>
          </fieldset>

          {/* Projects */}
          <fieldset className={sectionClass}>
            <legend className="text-2xl font-bold mb-6 text-white cursor-default">
              Projects
            </legend>
            {formData.projects.length === 0 && (
              <p className="text-gray-400 text-center">
                No projects added yet. Click the button below to add one.
              </p>
            )}
            {formData.projects.map((project, index) => (
              <div
                key={index}
                className="space-y-4 border-b border-gray-700 pb-6 mb-6"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className={labelClass}>Project Name</label>
                    <input
                      type="text"
                      name="name"
                      value={project.name}
                      onChange={(e) => handleDynamicChange(e, index, "projects")}
                      className={inputClass}
                      placeholder="e.g., Magma Drive"
                    />
                  </div>
                  <div>
                    <label className={labelClass}>Year</label>
                    <input
                      type="text"
                      name="year"
                      value={project.year}
                      onChange={(e) => handleDynamicChange(e, index, "projects")}
                      className={inputClass}
                      placeholder="e.g., 2025"
                    />
                  </div>
                </div>
                <div>
                  <label className={labelClass}>Description</label>
                  <textarea
                    name="description"
                    value={project.description}
                    rows="3"
                    onChange={(e) => handleDynamicChange(e, index, "projects")}
                    className={inputClass}
                    placeholder="e.g., Built a cloud storage app with file hosting..."
                  ></textarea>
                </div>
                <div className="text-right">
                  <button
                    type="button"
                    onClick={() => removeDynamicField(index, "projects")}
                    className="text-red-500 hover:text-red-400 text-sm font-semibold"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
            <button
              type="button"
              onClick={() =>
                addDynamicField("projects", {
                  name: "",
                  year: "",
                  description: "",
                })
              }
              className={buttonClass}
            >
              Add Project
            </button>
          </fieldset>

          {/* Skills */}
          <fieldset className={sectionClass}>
            <legend className="text-2xl font-bold mb-6 text-white cursor-default">
              Skills
            </legend>
            <div>
              <label htmlFor="skills" className={labelClass}>
                Skills (comma-separated)
              </label>
              <textarea
                name="skills"
                id="skills"
                rows="4"
                value={formData.skills}
                onChange={handleChange}
                className={inputClass}
                placeholder="e.g., HTML, CSS, JavaScript, Tailwind, Next.js..."
              ></textarea>
            </div>
          </fieldset>

          {/* Achievements */}
          <fieldset className={sectionClass}>
            <legend className="text-2xl font-bold mb-6 text-white cursor-default">
              Achievements / Responsibilities
            </legend>
            {formData.achievements.map((item, index) => (
              <div key={index} className="flex items-center gap-4 mb-4">
                <input
                  type="text"
                  name="description"
                  value={item.description}
                  onChange={(e) =>
                    handleDynamicChange(e, index, "achievements")
                  }
                  className={`${inputClass} flex-grow`}
                  placeholder="e.g., Finalist in College Hackathon..."
                />
                <button
                  type="button"
                  onClick={() => removeDynamicField(index, "achievements")}
                  className="text-red-500 hover:text-red-400 text-sm font-semibold"
                >
                  Remove
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={() => addDynamicField("achievements", { description: "" })}
              className={buttonClass}
            >
              Add Achievement
            </button>
          </fieldset>

          {/* Extra-Curricular */}
          <fieldset className={sectionClass}>
            <legend className="text-2xl font-bold mb-6 text-white cursor-default">
              Extra/Co-Curricular Activities
            </legend>
            {formData.extraCurricular.map((item, index) => (
              <div key={index} className="flex items-center gap-4 mb-4">
                <input
                  type="text"
                  name="description"
                  value={item.description}
                  onChange={(e) =>
                    handleDynamicChange(e, index, "extraCurricular")
                  }
                  className={`${inputClass} flex-grow`}
                  placeholder="e.g., Fitness & Calisthenics..."
                />
                <button
                  type="button"
                  onClick={() => removeDynamicField(index, "extraCurricular")}
                  className="text-red-500 hover:text-red-400 text-sm font-semibold"
                >
                  Remove
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={() => addDynamicField("extraCurricular", { description: "" })}
              className={buttonClass}
            >
              Add Activity
            </button>
          </fieldset>

          <div className="text-center pt-8">
            <button
              type="submit"
              disabled={isLoading}
              className="px-12 py-4 text-lg font-semibold rounded-xl bg-gradient-to-r from-gray-200 to-gray-400 text-black shadow-lg hover:shadow-gray-500/50 hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? "Generating..." : "Generate Resume"}
            </button>
            
          </div>
        </form>

        {error && (
            <div className="mt-12 text-center p-4 bg-red-900/50 border border-red-500 text-red-300 rounded-lg">
                <p>{error}</p>
            </div>

        )}

        {generatedResume && (
          <div className="mt-16">
            <h2 className="text-3xl font-bold text-center mb-8">
              Your Generated Resume
            </h2>
            <div className="bg-black/50 backdrop-blur-md p-6 sm:p-8 rounded-xl border border-white/10 relative">
              
              <div className="resume-output text-gray-300">
                <ReactMarkdown>{generatedResume}</ReactMarkdown>
                
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}

