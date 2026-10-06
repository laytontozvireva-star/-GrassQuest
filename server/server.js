const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 5001;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "GrassQuest API is running 🌿",
  });
});

function cleanGemmaResponse(text) {
  let cleaned = text.trim();

  // Remove markdown code fences
  cleaned = cleaned.replace(/^```json\s*/i, "");
  cleaned = cleaned.replace(/^```\s*/i, "");
  cleaned = cleaned.replace(/\s*```$/i, "");

  return JSON.parse(cleaned);
}

function validateMission(mission) {
  const dangerousWords = [
    "climb",
    "climbing",
    "swim",
    "swimming",
    "cross the road",
    "crossing the road",
    "private property",
    "touch wildlife",
    "touch animals",
    "handle wildlife",
    "eat wild plants",
    "unknown plants",
  ];

  const missionText = JSON.stringify(mission).toLowerCase();

  const unsafeInstruction = dangerousWords.find((word) =>
    missionText.includes(word)
  );

  if (unsafeInstruction) {
    return {
      safe: false,
      reason: `Mission contains an unsafe instruction: "${unsafeInstruction}"`,
    };
  }

  return {
    safe: true,
    reason: null,
  };
}

app.post("/api/missions", async (req, res) => {
  const { time, activity, energy } = req.body;

 const prompt = `
Create one safe outdoor mission based on these preferences.

Time: ${time}
Activity: ${activity}
Energy: ${energy}

Return ONLY valid JSON.
Do not use markdown.
Do not add explanations.

Use exactly this structure:

{
  "title": "Short mission title",
  "duration": "${time}",
  "steps": [
    "Step 1",
    "Step 2",
    "Step 3",
    "Step 4",
    "Step 5"
  ],
  "safety": "Short safety reminder"
}

Rules:
- Exactly 5 steps.
- Maximum 80 words total.
- Beginner-friendly.
- No dangerous activities.
- No climbing.
- No swimming.
- No crossing roads.
- Do not touch wildlife.
- Do not touch unknown plants.
- Do not enter private property.
- No special equipment.
- Encourage the user to put their phone away.
`;

  try {
    const response = await fetch("http://localhost:11434/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gemma3:1b",
        prompt: prompt,
        stream: false,
      }),
    });

    const data = await response.json();

    const mission = cleanGemmaResponse(data.response);

const safetyCheck = validateMission(mission);

if (!safetyCheck.safe) {
  return res.status(400).json({
    success: false,
    message: "Mission failed the safety check.",
    reason: safetyCheck.reason,
  });
}

res.json({
  success: true,
  mission,
});
  } catch (error) {
    console.error("Ollama error:", error);

    res.status(500).json({
      success: false,
      message: "Could not generate mission with Gemma.",
    });
  }
});

app.listen(PORT, () => {
  console.log(`GrassQuest API running on http://localhost:${PORT}`);
});