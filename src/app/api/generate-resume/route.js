import { NextResponse } from "next/server";

// This function handles POST requests to the /api/generate-resume endpoint
export async function POST(request) {
  try {
    // 1. Extract the form data from the request body
    const formData = await request.json();

    // 2. Define the powerful system prompt for the AI
    const systemPrompt = `You are an expert resume writer trained on the Internshala Resume Guide. Your task is to create a 1-page professional resume tailored for internships or entry-level jobs.
Follow these rules:
- Keep resume 1 page (max 1.5 pages).
- Use reverse chronological order for education, internships, projects, achievements.
- Be specific, relevant, and concise. Avoid generic fluff (like “I am hardworking”).
- No photos, logos, or unnecessary design elements. Stick to clean, single-column format.
- Mention timelines, roles, and impact for internships/projects.
- Highlight skills relevant to the objective.
- Exclude irrelevant details (school competitions, Windows knowledge, etc.).
- Generate the resume in a clean, professional, and easily readable text format. Use markdown for structure (like headings and bullet points).
- **CRITICAL RULE: Under no circumstances should you invent information. Use ONLY the information provided by the user. If a section is empty or not provided, OMIT it from the resume entirely.**`;

    // 3. Conditionally build the user query to avoid sending empty sections
    let userQuery = `
      **Basic Details:**
      - Full Name: ${formData.fullName}
      - Phone: ${formData.phone}
      - Email: ${formData.email}
      - LinkedIn: ${formData.linkedin || "Not Provided"}
      - GitHub: ${formData.github || "Not Provided"}
      - Location: ${formData.location}

      **Career Objective:**
      - Applying for Role: ${formData.role}
      - Objective: ${formData.objective}

      **Education:**
      - Degree: ${formData.education.degree}, ${formData.education.university} (${
      formData.education.years
    })
      - CGPA: ${formData.education.cgpa}
      - 12th Percentage: ${formData.education.twelfth}
      - 10th Percentage: ${formData.education.tenth}
    `;

    if (formData.experience && formData.experience.length > 0) {
      userQuery += `\n\n**Work Experience:**\n${formData.experience
        .map(
          (exp) =>
            `- Role: ${exp.role} at ${exp.company} (${exp.duration})\n  Description: ${exp.description}`
        )
        .join("\n")}`;
    }

    if (formData.projects && formData.projects.length > 0) {
      userQuery += `\n\n**Projects:**\n${formData.projects
        .map(
          (proj) =>
            `- Title: ${proj.name} (${proj.year})\n  Description: ${proj.description}`
        )
        .join("\n")}`;
    }

    if (formData.skills) {
        userQuery += `\n\n**Skills:**\n- ${formData.skills}`;
    }

    if (formData.achievements && formData.achievements.length > 0) {
      userQuery += `\n\n**Achievements/Positions of Responsibility:**\n${formData.achievements
        .map((ach) => `- ${ach.description}`)
        .join("\n")}`;
    }

    if (formData.extraCurricular && formData.extraCurricular.length > 0) {
      userQuery += `\n\n**Extra/Co-Curricular Activities:**\n${formData.extraCurricular
        .map((extra) => `- ${extra.description}`)
        .join("\n")}`;
    }
    
    userQuery += "\n\nBased on all this information, please generate the professional resume."


    // 4. Set up the Gemini API call
    const apiKey = process.env.GEMINI_API_KEY; // Canvas will provide this automatically in runtime
    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-05-20:generateContent?key=${apiKey}`;

    const payload = {
      systemInstruction: {
        parts: [{ text: systemPrompt }],
      },
      contents: [{ parts: [{ text: userQuery }] }],
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
        { error: "Failed to generate resume from Gemini API." },
        { status: response.status }
      );
    }

    const result = await response.json();
    const generatedText =
      result.candidates?.[0]?.content?.parts?.[0]?.text ||
      "Sorry, I couldn't generate a resume. Please try again.";

    // 6. Send the generated resume text back to the frontend
    return NextResponse.json({ resume: generatedText });
  } catch (error) {
    console.error("Server Error:", error);
    return NextResponse.json(
      { error: "An internal server error occurred." },
      { status: 500 }
    );
  }
}

