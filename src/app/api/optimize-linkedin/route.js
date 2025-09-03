import { NextResponse } from "next/server";

// This function handles POST requests to the /api/optimize-linkedin endpoint
export async function POST(request) {
  try {
    // 1. Extract the form data from the request body
    const formData = await request.json();

    // 2. Define a powerful system prompt specifically for a LinkedIn profile in JSON format
    const systemPrompt = `You are an expert LinkedIn profile writer and career coach. Your task is to generate an optimized, professional LinkedIn profile based on the user's provided information and return it as a JSON object.
Follow these rules:
- Create compelling and keyword-rich text for each section.
- The tone should be professional yet approachable and written in the first person ("I").
- **About Section Structure:** The "About" section must be an object with "narrative" and "skills" keys. The "narrative" should be a compelling paragraph, and "skills" should be an array of strings.
- **Experience and Projects:** If the user provides data for Experience or Projects, you MUST include them in the JSON output. Focus on achievements and impact.
- **Featured Section (Array):** The \`featured\` key must be an array of objects.
  - **First Item (Mandatory):** Always include an object for the resume with the \`title\` "My Professional Resume" and a compelling \`description\`.
  - **Second Item (Conditional):** If the user provides "Featured Links," add a second object to the array with a relevant \`title\` and \`description\` for the first link.
- **CRITICAL RULE:** Use ONLY the information provided by the user. If a section's data is not provided, OMIT that key from the JSON (except for the mandatory resume in the Featured section).
- **Note:** Include a note about the resume generator at the end.

Return the output as a single JSON object with the following COMPLETE structure, omitting keys only if no data is provided:
{
  "headline": "...",
  "about": {
      "narrative": "...",
      "skills": ["..."]
  },
  "experience": [
    {
      "title": "Software Engineer Intern",
      "organization": "Tech Company",
      "dates": "June 2025 - August 2025",
      "description": "Developed and maintained features for the main application..."
    }
  ],
  "projects": [
    {
        "name": "Magma Drive",
        "stack": "Next.js, Tailwind CSS, Supabase",
        "description": "A cloud storage application for students and freelancers.",
        "link": "https://github.com/user/magma-drive"
    }
  ],
  "featured": [
    {
      "title": "My Professional Resume",
      "description": "A comprehensive overview of my skills, experience, and achievements."
    },
    {
      "title": "My Web Development Portfolio",
      "description": "Explore a collection of my projects showcasing my skills in modern web technologies."
    }
  ],
  "note": "You can also generate a professional, ATS-friendly resume for free on our site!"
}
`;

    // 3. Conditionally build the user query to avoid sending empty sections to the AI
    let userQuery = `
      **Name:** ${formData.fullName}
      **Current Role:** ${formData.role}
      **Location:** ${formData.location}
      **Contact Info:**
      - Email: ${formData.email || "Not Provided"}
      - LinkedIn: ${formData.linkedin || "Not Provided"}
      - GitHub: ${formData.github || "Not Provided"}
    `;

    if (formData.headlineKeywords || formData.focus) {
        userQuery += `
        \n**Headline Generation Info:**
        - Keywords: ${formData.headlineKeywords}
        - Focus/Tagline: ${formData.focus}
        `;
    }

    if (formData.about && (formData.about.who || formData.about.what || formData.about.why)) {
        userQuery += `
        \n**About Section Content:**
        - Who I am: ${formData.about.who}
        - What I do/have done: ${formData.about.what}
        - Why I do it: ${formData.about.why}
        - Call to Action: ${formData.about.cta}
        `;
    }

    if (formData.experience && formData.experience.length > 0 && formData.experience[0].title) {
      userQuery += `\n\n**Experience:**\n${formData.experience
        .map(
          (exp) =>
            `- Title: ${exp.title} at ${exp.organization} (${exp.dates})\n  Description: ${exp.description}`
        )
        .join("\n")}`;
    }
    
    if (formData.projects && formData.projects.length > 0 && formData.projects[0].name) {
      userQuery += `\n\n**Projects:**\n${formData.projects
        .map(
          (proj) =>
            `- Name: ${proj.name}\n  - Stack: ${proj.stack}\n  - Description: ${proj.description}\n  - Link: ${proj.link}`
        )
        .join("\n")}`;
    }

    if (formData.education && formData.education.length > 0 && formData.education[0].degree) {
        userQuery += `\n\n**Education:**\n${formData.education
        .map(
          (edu) =>
            `- Degree: ${edu.degree} at ${edu.university} (${edu.years})\n  - Achievements: ${edu.achievements}`
        )
        .join("\n")}`;
    }

    if (formData.skills && (formData.skills.top || formData.skills.additional)) {
        userQuery += `
        \n**Skills:**
        - Top Skills: ${formData.skills.top}
        - Additional Skills: ${formData.skills.additional}
        `;
    }

    if (formData.certifications && formData.certifications.length > 0 && formData.certifications[0].name) {
        userQuery += `\n\n**Certifications:**\n${formData.certifications
        .map(
          (cert) =>
            `- Name: ${cert.name}\n  - Issuer: ${cert.issuer}\n  - Year: ${cert.year}`
        )
        .join("\n")}`;
    }
    
    if (formData.featured && formData.featured.length > 0 && formData.featured[0]) {
        userQuery += `\n\n**Featured Links:**\n${formData.featured
        .map((link) => `- ${link}`)
        .join("\n")}`;
    }

    userQuery += "\n\nBased on all this information, please generate the complete, optimized LinkedIn profile text as a JSON object.";

    // 4. Set up the Gemini API call
    const apiKey = process.env.GEMINI_API_KEY; 
    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${apiKey}`;

    const payload = {
      systemInstruction: {
        parts: [{ text: systemPrompt }],
      },
      contents: [{ parts: [{ text: userQuery }] }],
       generationConfig: {
        responseMimeType: "application/json",
    },
    };

    // 5. Make the API call to Gemini
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorBody = await response.text();
      console.error("Gemini API Error:", errorBody);
      return NextResponse.json(
        { error: "Failed to generate profile from Gemini API." },
        { status: response.status }
      );
    }

    const result = await response.json();
    const generatedText =
      result.candidates?.[0]?.content?.parts?.[0]?.text ||
      "{}";

    // 6. Send the generated profile text back to the frontend
    return NextResponse.json({ profile: JSON.parse(generatedText) });
  } catch (error) {
    console.error("Server Error:", error);
    return NextResponse.json(
      { error: "An internal server error occurred." },
      { status: 500 }
    );
  }
}