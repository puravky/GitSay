import Groq from "groq-sdk";

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

export async function POST(request) {
  try {
    if (!process.env.GROQ_API_KEY) {
      return Response.json(
        { error: "GROQ_API_KEY is not configured on the server. Please check your environment variables." },
        { status: 500 }
      );
    }

    const { mode, input, type, scope, getAlternatives } = await request.json();

    if (!input || !input.trim()) {
      return Response.json({ error: "Input is required" }, { status: 400 });
    }

    const scopeStr = scope && scope.trim() ? `(${scope.trim()})` : "";

    const systemPrompt = `You are an expert git commit message generator that strictly follows the Conventional Commits specification.
Rules:
- Format: type(scope): imperative short description
- Use imperative mood: "add" not "added", "fix" not "fixed"
- Keep the subject line under 72 characters
- Be specific and precise — no vague words like "update" or "change" alone
- Always respond with valid raw JSON only. No explanation, no markdown, no code fences, no extra text.`;

    let userPrompt;

    if (!getAlternatives) {
      userPrompt = `Generate one precise git commit message.

Commit type: ${type}
Scope: ${scope || "none"}
Mode: ${mode === "diff" ? "git diff (analyze the actual code changes)" : "description (natural language)"}
Input:
${input}

Rules:
- Use type "${type}" and scope "${scope || "none"}" exactly as given
- Subject line must be imperative mood and under 72 chars
- Be specific to what was actually changed

Return ONLY this JSON (no extra keys):
{ "primary": "${type}${scopeStr}: imperative description of the change" }`;

    } else {
      userPrompt = `Generate 4 genuinely different commit messages for the same change. Each must use DIFFERENT wording, structure, and perspective — not the same message with minor tweaks.

Commit type: ${type}
Scope: ${scope || "none"}  
Mode: ${mode === "diff" ? "git diff (analyze the actual code changes)" : "description (natural language)"}
Input:
${input}

Requirements per style:
- "short": 4-6 words after the prefix, ultra-concise, bare imperative verb
- "detailed": one summary line + a blank line + 2-3 bullet points explaining what changed and why
- "descriptive": different verb choice and angle than the primary, describes the user-facing impact or technical motivation in a full but single-line subject
- "emoji": prepend the primary style message with an appropriate Gitmoji corresponding to the commit type. Map them as follows: feat: ✨, fix: 🐛, docs: 📝, chore: 🔧, refactor: ♻️, style: 💄, test: ✅, perf: ⚡, ci: 👷. Format MUST be: <emoji> ${type}${scopeStr}: <imperative description> (e.g. ✨ ${type}${scopeStr}: add authentication)

IMPORTANT: All 4 messages must describe the SAME change but with genuinely different wording and structure. The "short" must be noticeably shorter than the others. The "detailed" must have a body. The "emoji" must start with the correct emoji.

Return ONLY this JSON:
{
  "alternatives": [
    { "style": "short", "message": "${type}${scopeStr}: 4-6 word imperative phrase" },
    { "style": "detailed", "message": "${type}${scopeStr}: summary line\\n\\n- What: specific change made\\n- Why: reason or impact" },
    { "style": "descriptive", "message": "${type}${scopeStr}: alternative full description with different verb and framing" },
    { "style": "emoji", "message": "✨ ${type}${scopeStr}: descriptive description prefixed with emoji" }
  ]
}`;
    }

    const completion = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt },
      ],
      temperature: getAlternatives ? 0.85 : 0.4,
      max_tokens: getAlternatives ? 600 : 200,
    });

    const text = completion.choices[0].message.content;
    const clean = text.replace(/```json|```/g, "").trim();
    const parsed = JSON.parse(clean);

    return Response.json(parsed);
  } catch (error) {
    console.error("API error:", error);
    if (error instanceof SyntaxError) {
      return Response.json(
        { error: "Failed to parse AI response. Please try again." },
        { status: 500 }
      );
    }
    return Response.json(
      { error: error.message || "An unexpected error occurred" },
      { status: 500 }
    );
  }
}
