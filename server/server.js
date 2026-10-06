const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 5002;

app.use(cors());
app.use(express.json());

// Serve static React build files when deployed
const buildPath = path.join(__dirname, "../build");
app.use(express.static(buildPath));

// Dynamic offline fallback generator in case Ollama AI is offline or unreachable
function getFallbackMission(time, activity, energy) {
  const fallbackMissions = {
    Nature: {
      Relaxed: {
        title: "Mindful Tree & Leaf Observation",
        steps: [
          "Find a comfortable spot near trees or grass in a nearby park or yard.",
          "Observe 3 different leaves up close, noting their vein patterns and textures.",
          "Listen quietly for 2 minutes to the rustle of leaves or wind.",
          "Collect one interesting fallen acorn, leaf, or small pinecone to admire.",
          "Take three deep breaths of fresh outdoor air before wrapping up."
        ],
        safety: "Stay on public paths and avoid touching wild animals or unknown berries."
      },
      Normal: {
        title: "Nature Trail Discovery Walk",
        steps: [
          "Walk at a steady pace along a green trail or neighborhood park.",
          "Identify 4 different shades of green in trees, plants, or grass.",
          "Find a spot to pause and feel the texture of tree bark.",
          "Spot two different birds or insects moving in their natural habitat.",
          "Reflect on how being outside changed your energy and mood."
        ],
        safety: "Stick to designated walkways and keep a safe distance from wildlife."
      },
      Active: {
        title: "Green Explorer Quest",
        steps: [
          "Briskly walk or jog towards the greenest nearby park or open trail.",
          "Locate the tallest tree in sight and observe its canopy from below.",
          "Find 5 distinct natural textures (smooth pebble, rough bark, soft moss, leaf, twig).",
          "Perform 10 outdoor stretches while taking in the fresh air.",
          "Walk back along a path you haven't taken today."
        ],
        safety: "Watch your step on uneven ground and stay hydrated."
      }
    },
    Walking: {
      Relaxed: {
        title: "Scenic Slow Stroll",
        steps: [
          "Step outside and walk at a calm, unhurried pace.",
          "Focus on the sound of your footsteps on pavement or grass.",
          "Look up at the sky and note the cloud shapes and light quality.",
          "Pause for 1 minute at a quiet bench or shady spot.",
          "Slowly return home feeling refreshed and grounded."
        ],
        safety: "Use pedestrian walkways and pay attention when crossing crosswalks."
      },
      Normal: {
        title: "Neighborhood Landmark Explorer",
        steps: [
          "Pick a direction you rarely walk down in your neighborhood.",
          "Count 10 interesting architectural or natural details along the route.",
          "Maintain a steady, comfortable walking pace for the duration.",
          "Find a vantage point to take in a wide view of your surroundings.",
          "Head back with a renewed sense of connection to your surroundings."
        ],
        safety: "Stay on sidewalks and stay aware of your surroundings."
      },
      Active: {
        title: "Power Walk Quest",
        steps: [
          "Begin with a brisk 5-minute walk to warm up.",
          "Alternate between 2 minutes of fast walking and 1 minute of relaxed pace.",
          "Choose a route with slight inclines or open green stretches.",
          "Focus on deep rhythmic breathing as you move.",
          "Cool down with a gentle 3-minute stroll back."
        ],
        safety: "Wear comfortable shoes and stick to safe, lit pedestrian paths."
      }
    },
    Photography: {
      Relaxed: {
        title: "Macro & Color Photo Hunt",
        steps: [
          "Step outside with a camera or phone set strictly to camera mode.",
          "Find three vibrant colors in nature and frame close-up shots.",
          "Capture the interplay of light and shadow on grass or foliage.",
          "Find a reflection in a quiet puddle or glass surface.",
          "Put your camera away for the final 5 minutes to enjoy the view directly."
        ],
        safety: "Look where you are stepping, not just through the camera lens."
      },
      Normal: {
        title: "Angles of Nature Photo Quest",
        steps: [
          "Walk to an outdoor spot with varied greenery and structures.",
          "Take a low-angle photo looking up at trees or sky.",
          "Take a high-angle photo looking down at path details or flora.",
          "Capture a framing shot where branches frame a distant object.",
          "Select your favorite mental image of the day before heading back."
        ],
        safety: "Be mindful of terrain and pedestrians while composing photos."
      },
      Active: {
        title: "Golden Hour Motion & Panorama Hunt",
        steps: [
          "Walk briskly to a scenic viewpoint or open field.",
          "Capture 3 dynamic shots of nature in motion (swaying grass, flying birds).",
          "Find a wide horizon to frame a sweeping natural landscape shot.",
          "Document 3 unique plant species with crisp focus.",
          "Walk back at a swift pace while storing your device away."
        ],
        safety: "Stay on safe public paths while searching for viewpoints."
      }
    },
    Mindfulness: {
      Relaxed: {
        title: "5-4-3-2-1 Grounding Outdoor Session",
        steps: [
          "Find a calm outdoor bench or patch of grass to stand or sit.",
          "Notice 5 things you can see around you in nature.",
          "Notice 4 things you can physically feel (breeze, sun warmth, ground beneath feet).",
          "Listen closely for 3 distinct outdoor sounds.",
          "Notice 2 scents in the outdoor air and take 1 deep calming breath."
        ],
        safety: "Choose a safe, peaceful location free from traffic."
      },
      Normal: {
        title: "Silent Walking Meditation",
        steps: [
          "Begin walking slowly in silence without checking your phone.",
          "Sync your breathing with your steps (e.g. inhale for 4 steps, exhale for 4).",
          "Focus full attention on the sensation of air against your skin.",
          "Notice how thoughts pass like clouds while keeping focus on nature.",
          "End with a moment of gratitude for taking time outdoors."
        ],
        safety: "Remain aware of path obstacles and surrounding activity."
      },
      Active: {
        title: "Rhythmic Stride & Breath Focus",
        steps: [
          "Walk briskly while maintaining deep, centered diaphragmatic breathing.",
          "Release any shoulder or neck tension with gentle arm rolls as you walk.",
          "Notice the energy flow throughout your body as you move outdoors.",
          "Pause mid-way for 3 full body stretches facing the sun.",
          "Finish your workout walk with a quiet 2-minute cooldown."
        ],
        safety: "Stay hydrated and stick to smooth footpaths."
      }
    },
    Exploration: {
      Relaxed: {
        title: "Curiosity Path Wander",
        steps: [
          "Walk down a street or park path you rarely explore.",
          "Look for 3 hidden details (a birdhouse, vintage gate, unusual tree form).",
          "Pause at a point of interest and admire its details for 60 seconds.",
          "Notice how light shifts through the trees along the way.",
          "Return using a slightly different sub-path."
        ],
        safety: "Stay in public open areas and respect private property boundaries."
      },
      Normal: {
        title: "Compass Direction Adventure",
        steps: [
          "Pick a direction (e.g., North or East) and walk 100 paces.",
          "Turn right at the next safe corner or fork and walk 100 more paces.",
          "Identify 3 unique flora or landmarks in this new spot.",
          "Find the most peaceful tree or bench in the vicinity.",
          "Navigate your way back to your starting point."
        ],
        safety: "Keep track of your location and stay in safe public zones."
      },
      Active: {
        title: "Urban Nature Expedition",
        steps: [
          "Set off at a swift pace toward an unexplored park or green area.",
          "Locate a trail or path you've never walked before.",
          "Chalk up 500 steps of active exploration along green spaces.",
          "Find a high point or landmark to observe the surrounding area.",
          "Power-walk back taking a fresh route."
        ],
        safety: "Pay attention to traffic and stay on marked public trails."
      }
    }
  };

  const selectedActivity = fallbackMissions[activity] || fallbackMissions["Nature"];
  const selectedEnergy = selectedActivity[energy] || selectedActivity["Normal"];

  return {
    title: selectedEnergy.title,
    duration: time || "30 min",
    steps: selectedEnergy.steps,
    safety: selectedEnergy.safety,
  };
}

app.get("/api/health", async (req, res) => {
  try {
    const response = await fetch("http://localhost:11434/api/tags", {
      method: "GET"
    });
    if (response.ok) {
      return res.json({ ollama: true, message: "Ollama AI connected" });
    }
  } catch (err) {
    // ignore error
  }
  res.json({ ollama: false, message: "Offline template mode active" });
});

function cleanGemmaResponse(text) {
  let cleaned = text.trim();
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

    if (!response.ok) {
      throw new Error(`Ollama returned status ${response.status}`);
    }

    const data = await response.json();
    const mission = cleanGemmaResponse(data.response);
    const safetyCheck = validateMission(mission);

    if (!safetyCheck.safe) {
      const fallback = getFallbackMission(time, activity, energy);
      return res.json({
        success: true,
        mission: fallback,
        isFallback: true,
        fallbackReason: safetyCheck.reason
      });
    }

    return res.json({
      success: true,
      mission,
      isFallback: false
    });
  } catch (error) {
    console.log("Ollama offline or error, serving smart fallback mission:", error.message);
    const fallback = getFallbackMission(time, activity, energy);
    return res.json({
      success: true,
      mission: fallback,
      isFallback: true,
      notice: "Serving outdoor quest via offline engine"
    });
  }
});

// Serve index.html for all non-API routes (Single Page Application fallback)
app.get("*", (req, res) => {
  const indexPath = path.join(buildPath, "index.html");
  if (require("fs").existsSync(indexPath)) {
    res.sendFile(indexPath);
  } else {
    res.json({
      message: "GrassQuest API is running 🌿",
      status: "active"
    });
  }
});

app.listen(PORT, () => {
  console.log(`GrassQuest server running on port ${PORT}`);
});