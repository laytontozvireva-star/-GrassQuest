import { useState, useEffect } from "react";

// Dynamic API URL for local development and deployed environments
const API_BASE_URL =
  process.env.REACT_APP_API_URL ||
  (process.env.NODE_ENV === "production" ? "" : "http://localhost:5002");

// Client-side fallback mission generator for static deployments
function getClientFallbackMission(time, activity, energy) {
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

  const act = fallbackMissions[activity] || fallbackMissions["Nature"];
  const eng = act[energy] || act["Normal"];
  return {
    title: eng.title,
    duration: time || "30 min",
    steps: eng.steps,
    safety: eng.safety,
  };
}

function App() {
  const [time, setTime] = useState("30 min");
  const [activity, setActivity] = useState("Nature");
  const [energy, setEnergy] = useState("Normal");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const [missionStarted, setMissionStarted] = useState(false);
  const [missionComplete, setMissionComplete] = useState(false);
  const [reflection, setReflection] = useState("");
  const [rating, setRating] = useState(5);

  const [showJournal, setShowJournal] = useState(false);
  const [journal, setJournal] = useState([]);
  const [journalSearch, setJournalSearch] = useState("");
  const [copied, setCopied] = useState(false);

  // Live Timer State for Active Mission
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [timerActive, setTimerActive] = useState(false);

  // AI Connection Status
  const [aiConnected, setAiConnected] = useState(false);

  const timeOptions = ["15 min", "30 min", "45 min", "60 min"];

  const activityOptions = [
    { name: "Nature", icon: "🌲", desc: "Leaves, trees & open air" },
    { name: "Walking", icon: "🚶", desc: "Paced strides & strolls" },
    { name: "Photography", icon: "📸", desc: "Textures & natural light" },
    { name: "Mindfulness", icon: "🧘", desc: "5-sense grounding" },
    { name: "Exploration", icon: "🗺️", desc: "New paths & landmarks" },
  ];

  const energyOptions = [
    { name: "Relaxed", icon: "🌱", desc: "Calm & gentle" },
    { name: "Normal", icon: "⚡", desc: "Steady & balanced" },
    { name: "Active", icon: "🔥", desc: "Brisk & high energy" },
  ];

  useEffect(() => {
    fetch(`${API_BASE_URL}/api/health`)
      .then((res) => res.json())
      .then((data) => setAiConnected(!!data?.ollama))
      .catch(() => setAiConnected(false));
  }, []);

  // Timer effect during mission
  useEffect(() => {
    let interval = null;
    if (timerActive) {
      interval = setInterval(() => {
        setElapsedSeconds((prev) => prev + 1);
      }, 1000);
    } else if (!timerActive && elapsedSeconds !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [timerActive, elapsedSeconds]);

  const startQuestTimer = () => {
    setElapsedSeconds(0);
    setTimerActive(true);
    setMissionStarted(true);
  };

  const finishQuestTimer = () => {
    setTimerActive(false);
    setMissionStarted(false);
    setMissionComplete(true);
  };

  const formatTimer = (secs) => {
    const minutes = Math.floor(secs / 60);
    const remainingSecs = secs % 60;
    return `${minutes.toString().padStart(2, "0")}:${remainingSecs
      .toString()
      .padStart(2, "0")}`;
  };

  const generateMission = async () => {
    setLoading(true);
    setResult(null);

    try {
      const response = await fetch(`${API_BASE_URL}/api/missions`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          time,
          activity,
          energy,
        }),
      });

      if (!response.ok) {
        throw new Error(`API responded with status ${response.status}`);
      }

      const data = await response.json();
      setResult(data);
    } catch (error) {
      console.warn("Backend API unreachable or offline. Utilizing client-side quest engine:", error);
      // Fallback local mission generator for deployed static instances
      const localMission = getClientFallbackMission(time, activity, energy);
      setResult({
        success: true,
        isFallback: true,
        mission: localMission
      });
    } finally {
      setLoading(false);
    }
  };

  const finishReflection = () => {
    const durationMinutes = Math.max(1, Math.round(elapsedSeconds / 60)) || parseInt(time) || 30;

    const newReflection = {
      id: Date.now(),
      mission: result?.mission?.title || "GrassQuest Mission",
      activity: activity,
      reflection: reflection,
      rating: rating,
      durationMinutes: durationMinutes,
      date: new Date().toLocaleDateString(undefined, {
        weekday: 'short',
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      }),
    };

    const existingReflections =
      JSON.parse(localStorage.getItem("grassquest_reflections")) || [];

    existingReflections.push(newReflection);

    localStorage.setItem(
      "grassquest_reflections",
      JSON.stringify(existingReflections)
    );

    setReflection("");
    setRating(5);
    setMissionComplete(false);
    openJournal();
  };

  const openJournal = () => {
    const saved =
      JSON.parse(localStorage.getItem("grassquest_reflections")) || [];
    setJournal(saved);
    setShowJournal(true);
  };

  const deleteJournalEntry = (id) => {
    const updated = journal.filter((item) => item.id !== id);
    setJournal(updated);
    localStorage.setItem("grassquest_reflections", JSON.stringify(updated));
  };

  const copyMissionToClipboard = () => {
    if (!result?.mission) return;
    const text = `🌿 GrassQuest Mission: ${result.mission.title}\n⏱️ Duration: ${result.mission.duration}\n\nSteps:\n${result.mission.steps.map((s, i) => `${i + 1}. ${s}`).join('\n')}\n\n🛡️ Safety: ${result.mission.safety}`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const totalMinutesLog = journal.reduce((acc, curr) => acc + (curr.durationMinutes || 30), 0);

  const filteredJournal = journal.filter((entry) => {
    const q = journalSearch.toLowerCase();
    return (
      entry.mission?.toLowerCase().includes(q) ||
      entry.reflection?.toLowerCase().includes(q) ||
      entry.activity?.toLowerCase().includes(q)
    );
  });

  return (
    <div className="min-h-screen bg-[#F4F7F2] text-[#1F2D24] font-sans antialiased">
      {/* NAVBAR */}
      <header className="sticky top-0 z-40 border-b border-emerald-900/10 bg-white/90 backdrop-blur-md px-6 py-4">
        <div className="mx-auto flex max-w-6xl items-center justify-between">
          <div 
            onClick={() => { setShowJournal(false); setMissionStarted(false); setMissionComplete(false); }}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#2F6B45] text-xl shadow-md transition group-hover:scale-105">
              🌿
            </div>
            <div>
              <h1 className="text-xl font-extrabold tracking-tight text-[#1F2D24]">
                GrassQuest
              </h1>
              <p className="text-xs font-semibold text-[#2F6B45]">
                Screen-Free Outdoor AI
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="hidden sm:inline-flex items-center gap-1.5 rounded-full bg-[#DFEEDD] px-3 py-1 text-xs font-semibold text-[#2F6B45]">
              <span className={`h-2 w-2 rounded-full ${aiConnected ? "bg-green-500 animate-pulse" : "bg-emerald-600"}`}></span>
              {aiConnected ? "Local Gemma 3 AI Active" : "Smart Quest Engine"}
            </span>

            <button
              onClick={openJournal}
              className="flex items-center gap-2 rounded-xl bg-[#1F2D24] px-4 py-2.5 text-sm font-bold text-white shadow-sm hover:bg-[#2F6B45] transition"
            >
              📖 My Journal
              {journal.length > 0 && (
                <span className="rounded-full bg-[#DFEEDD] px-2 py-0.5 text-xs text-[#2F6B45]">
                  {journal.length}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* JOURNAL VIEW */}
      {showJournal ? (
        <div className="min-h-[calc(100vh-73px)] px-6 py-10">
          <div className="mx-auto max-w-4xl">
            <button
              onClick={() => setShowJournal(false)}
              className="mb-6 inline-flex items-center gap-2 rounded-xl bg-[#1F2D24] px-4 py-2.5 font-bold text-white hover:bg-[#2F6B45] transition"
            >
              ← Back to Mission Generator
            </button>

            <div className="rounded-3xl bg-white p-8 shadow-sm border border-emerald-900/10">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-gray-100 pb-6">
                <div>
                  <div className="flex items-center gap-3">
                    <h2 className="text-3xl font-extrabold tracking-tight">
                      📖 Outdoor Adventure Log
                    </h2>
                  </div>
                  <p className="mt-1 text-gray-600">
                    Memories, reflections, and moments collected under the open sky.
                  </p>
                </div>

                <div className="flex gap-4">
                  <div className="rounded-2xl bg-[#F4F7F2] p-4 text-center border border-emerald-900/5 min-w-[110px]">
                    <div className="text-2xl font-black text-[#2F6B45]">
                      {journal.length}
                    </div>
                    <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      Quests Completed
                    </div>
                  </div>

                  <div className="rounded-2xl bg-[#F4F7F2] p-4 text-center border border-emerald-900/5 min-w-[110px]">
                    <div className="text-2xl font-black text-[#2F6B45]">
                      {totalMinutesLog}m
                    </div>
                    <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      Time Outdoors
                    </div>
                  </div>
                </div>
              </div>

              {/* SEARCH & FILTER */}
              {journal.length > 0 && (
                <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="relative w-full sm:w-72">
                    <input
                      type="text"
                      placeholder="Search reflections..."
                      value={journalSearch}
                      onChange={(e) => setJournalSearch(e.target.value)}
                      className="w-full rounded-xl border border-gray-200 bg-[#F4F7F2] px-4 py-2.5 text-sm outline-none focus:border-[#2F6B45] focus:bg-white transition"
                    />
                  </div>
                  <span className="text-xs text-gray-500 font-medium">
                    Showing {filteredJournal.length} of {journal.length} reflections
                  </span>
                </div>
              )}

              {/* JOURNAL CARDS */}
              {journal.length === 0 ? (
                <div className="my-12 rounded-2xl bg-[#F4F7F2] p-10 text-center border border-dashed border-gray-300">
                  <div className="text-5xl mb-3">🌿</div>
                  <h3 className="text-xl font-bold text-[#1F2D24]">
                    Your journal is fresh and empty
                  </h3>
                  <p className="mt-2 text-gray-500 max-w-md mx-auto">
                    Complete your first outdoor quest, reflect on what you observed, and your notes will appear right here.
                  </p>
                  <button
                    onClick={() => setShowJournal(false)}
                    className="mt-6 rounded-xl bg-[#2F6B45] px-6 py-3 font-bold text-white hover:bg-[#245538] transition"
                  >
                    Start Your First Quest 🌱
                  </button>
                </div>
              ) : filteredJournal.length === 0 ? (
                <div className="my-8 rounded-2xl bg-[#F4F7F2] p-8 text-center">
                  <p className="text-gray-600">No reflections match your search.</p>
                </div>
              ) : (
                <div className="mt-6 space-y-4">
                  {filteredJournal
                    .slice()
                    .reverse()
                    .map((entry) => (
                      <div
                        key={entry.id || entry.date}
                        className="group relative rounded-2xl border border-gray-100 bg-white p-6 shadow-sm hover:shadow-md transition"
                      >
                        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-gray-100 pb-3">
                          <span className="text-xs font-semibold text-gray-500">
                            🗓️ {entry.date}
                          </span>
                          <div className="flex items-center gap-3">
                            <span className="rounded-full bg-[#DFEEDD] px-3 py-0.5 text-xs font-bold text-[#2F6B45]">
                              ⏱️ {entry.durationMinutes || 30} mins
                            </span>
                            <button
                              onClick={() => deleteJournalEntry(entry.id)}
                              className="text-xs text-gray-400 hover:text-red-600 font-semibold transition opacity-0 group-hover:opacity-100"
                              title="Delete entry"
                            >
                              🗑️ Delete
                            </button>
                          </div>
                        </div>

                        <div className="mt-4 flex items-start justify-between">
                          <div>
                            <h3 className="text-xl font-bold text-[#2F6B45] flex items-center gap-2">
                              🌿 {entry.mission}
                            </h3>
                          </div>
                          <div className="flex text-amber-400 text-sm">
                            {Array.from({ length: entry.rating || 5 }).map((_, i) => (
                              <span key={i}>★</span>
                            ))}
                          </div>
                        </div>

                        <p className="mt-3 leading-relaxed text-gray-700 whitespace-pre-wrap bg-[#F4F7F2] p-4 rounded-xl text-sm border border-emerald-900/5">
                          "{entry.reflection}"
                        </p>
                      </div>
                    ))}
                </div>
              )}
            </div>
          </div>
        </div>

      ) : missionComplete ? (

        /* MISSION COMPLETE & REFLECTION SCREEN */
        <div className="flex min-h-[calc(100vh-73px)] items-center justify-center bg-[#DFEEDD] px-6 py-12">
          <div className="w-full max-w-xl text-center">
            <div className="inline-flex h-20 w-20 items-center justify-center rounded-3xl bg-white text-4xl shadow-md mb-4 animate-bounce">
              🎉
            </div>

            <div className="mt-2 inline-flex rounded-full bg-white px-4 py-1.5 text-sm font-bold text-[#2F6B45] shadow-sm">
              🌿 Outdoor Quest Completed
            </div>

            <h2 className="mt-4 text-4xl font-black text-[#1F2D24]">
              Welcome Back!
            </h2>

            <p className="mt-2 text-lg text-gray-700">
              You logged <span className="font-bold text-[#2F6B45]">{Math.max(1, Math.round(elapsedSeconds / 60))} minutes</span> outdoors screen-free.
            </p>

            <div className="mt-8 rounded-3xl bg-white p-8 text-left shadow-xl border border-emerald-900/10">
              <h3 className="text-2xl font-bold text-[#1F2D24]">
                How was your experience?
              </h3>

              <p className="mt-1 text-sm text-gray-600">
                Rate your mission and capture what you noticed or felt outside.
              </p>

              {/* RATING */}
              <div className="mt-5">
                <label className="text-xs font-bold uppercase tracking-wider text-gray-500">
                  Rate your adventure:
                </label>
                <div className="mt-2 flex gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                      className={`h-10 w-10 rounded-xl text-xl font-bold transition ${
                        rating >= star
                          ? "bg-amber-400 text-white shadow-sm scale-105"
                          : "bg-gray-100 text-gray-400 hover:bg-gray-200"
                      }`}
                    >
                      ★
                    </button>
                  ))}
                </div>
              </div>

              {/* REFLECTION INPUT */}
              <div className="mt-5">
                <label className="text-xs font-bold uppercase tracking-wider text-gray-500">
                  Your Reflection Notes:
                </label>
                <textarea
                  value={reflection}
                  onChange={(e) => setReflection(e.target.value)}
                  placeholder="What did you see, hear, or feel? Any moments of calm or surprise?"
                  className="mt-2 h-36 w-full resize-none rounded-2xl border border-gray-200 bg-[#F4F7F2] p-4 text-sm text-gray-800 outline-none focus:border-[#2F6B45] focus:bg-white transition"
                />
              </div>

              <button
                onClick={finishReflection}
                disabled={!reflection.trim()}
                className="mt-6 w-full rounded-2xl bg-[#2F6B45] px-6 py-4 font-bold text-white shadow-md transition hover:bg-[#245538] disabled:cursor-not-allowed disabled:bg-gray-300"
              >
                Save to Journal 🌱
              </button>
            </div>
          </div>
        </div>

      ) : missionStarted ? (

        /* LIVE ACTIVE MISSION SCREEN */
        <div className="flex min-h-[calc(100vh-73px)] items-center justify-center bg-[#1F2D24] px-6 py-12 text-center text-white">
          <div className="w-full max-w-lg">
            <div className="inline-flex h-20 w-20 items-center justify-center rounded-3xl bg-[#2F6B45] text-4xl shadow-inner mb-4">
              🌿
            </div>

            <span className="inline-block rounded-full bg-emerald-900/60 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-emerald-300 border border-emerald-500/20">
              Live Outdoor Quest Active
            </span>

            <h2 className="mt-4 text-3xl font-extrabold tracking-tight">
              {result?.mission?.title || "Outdoor Mission"}
            </h2>

            {/* LIVE STOPWATCH TIMER */}
            <div className="my-8 rounded-3xl bg-emerald-950/60 p-8 border border-emerald-500/20 shadow-2xl backdrop-blur-sm">
              <div className="text-xs font-bold uppercase tracking-widest text-emerald-400">
                Time Spent Outdoors
              </div>
              <div className="mt-2 text-6xl font-black tracking-wider font-mono text-emerald-100">
                {formatTimer(elapsedSeconds)}
              </div>
              <p className="mt-3 text-sm text-emerald-300/80">
                Target duration: {result?.mission?.duration || time}
              </p>
            </div>

            <div className="rounded-2xl bg-white/5 p-6 border border-white/10 text-left text-sm space-y-3">
              <div className="flex items-center gap-2 text-emerald-400 font-bold">
                📱 Pocket Mode Advice
              </div>
              <p className="text-gray-300 leading-relaxed">
                Put your phone away in your pocket or bag. Focus your attention entirely on your immediate natural surroundings.
              </p>
            </div>

            <button
              onClick={finishQuestTimer}
              className="mt-8 w-full rounded-2xl bg-white px-6 py-4 text-lg font-extrabold text-[#1F2D24] shadow-lg transition hover:bg-gray-100"
            >
              I'm Back & Ready to Reflect 🌱
            </button>
          </div>
        </div>

      ) : (

        /* MAIN GENERATOR VIEW */
        <>
          {/* HERO SECTION WITH PUBLIC IMAGE */}
          <section className="relative overflow-hidden bg-[#1F2D24] text-white py-16 px-6 sm:py-20">
            {/* Background public image with overlay */}
            <div className="absolute inset-0 z-0">
              <img
                src="/hero.jpg"
                alt="GrassQuest Outdoor Nature Banner"
                className="h-full w-full object-cover opacity-25"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1F2D24] via-[#1F2D24]/80 to-transparent" />
            </div>

            <div className="relative z-10 mx-auto max-w-4xl text-center">
              <div className="mb-6 flex flex-wrap items-center justify-center gap-2">
                <span className="rounded-full bg-white/10 backdrop-blur-md px-4 py-1.5 text-xs font-bold text-emerald-300 border border-emerald-400/20">
                  🌿 GrassQuest 2.0
                </span>
                <span className="rounded-full bg-[#2F6B45] px-4 py-1.5 text-xs font-bold text-white shadow-sm">
                  Screen-Free Adventures
                </span>
                <span className="rounded-full bg-white/10 backdrop-blur-md px-4 py-1.5 text-xs font-bold text-emerald-200 border border-emerald-400/20">
                  {aiConnected ? "Ollama Gemma 3 Powered" : "Smart Outdoor Engine"}
                </span>
              </div>

              <h2 className="text-4xl font-black leading-tight sm:text-5xl md:text-6xl tracking-tight">
                Your AI mission <br className="hidden sm:inline" />
                starts outside.
              </h2>

              <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-gray-300">
                Choose your available time, activity preference, and energy level. We'll generate a safe, tailored outdoor mission to help you unplug and explore.
              </p>

              {/* HERO METRICS */}
              <div className="mt-10 grid grid-cols-3 gap-4 max-w-lg mx-auto rounded-2xl bg-white/5 p-4 border border-white/10 backdrop-blur-md">
                <div>
                  <div className="text-2xl font-black text-emerald-400">100%</div>
                  <div className="text-xs font-semibold text-gray-400">Outdoor Focus</div>
                </div>
                <div>
                  <div className="text-2xl font-black text-emerald-400">5 Step</div>
                  <div className="text-xs font-semibold text-gray-400">Guided Quests</div>
                </div>
                <div>
                  <div className="text-2xl font-black text-emerald-400">Zero</div>
                  <div className="text-xs font-semibold text-gray-400">Screen Time</div>
                </div>
              </div>
            </div>
          </section>

          {/* MAIN FORM */}
          <main className="mx-auto max-w-4xl px-4 py-12 sm:px-6">
            <div className="rounded-3xl bg-white p-8 sm:p-10 shadow-sm border border-emerald-900/10">
              <h3 className="mb-8 text-center text-3xl font-extrabold text-[#1F2D24]">
                Create Your Quest
              </h3>

              {/* TIME SELECTION */}
              <section className="mb-10">
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-xl">⏱️</span>
                  <h4 className="text-lg font-bold text-[#1F2D24]">
                    How much time do you have?
                  </h4>
                </div>

                <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                  {timeOptions.map((option) => (
                    <button
                      key={option}
                      type="button"
                      onClick={() => setTime(option)}
                      className={`rounded-2xl border p-4 font-bold text-sm transition-all duration-200 ${
                        time === option
                          ? "border-[#2F6B45] bg-[#2F6B45] text-white shadow-md scale-[1.02]"
                          : "border-gray-200 bg-[#F4F7F2] text-gray-700 hover:border-[#2F6B45]/50 hover:bg-[#DFEEDD]/50"
                      }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </section>

              {/* ACTIVITY SELECTION */}
              <section className="mb-10">
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-xl">🌱</span>
                  <h4 className="text-lg font-bold text-[#1F2D24]">
                    What kind of activity sounds best?
                  </h4>
                </div>

                <div className="grid grid-cols-1 gap-3 sm:grid-cols-3 md:grid-cols-5">
                  {activityOptions.map((item) => (
                    <button
                      key={item.name}
                      type="button"
                      onClick={() => setActivity(item.name)}
                      className={`flex flex-col items-center justify-center rounded-2xl border p-4 text-center transition-all duration-200 ${
                        activity === item.name
                          ? "border-[#2F6B45] bg-[#2F6B45] text-white shadow-md scale-[1.02]"
                          : "border-gray-200 bg-[#F4F7F2] text-gray-700 hover:border-[#2F6B45]/50 hover:bg-[#DFEEDD]/50"
                      }`}
                    >
                      <span className="text-2xl mb-1">{item.icon}</span>
                      <span className="font-bold text-sm">{item.name}</span>
                      <span className={`mt-1 text-[11px] ${activity === item.name ? "text-emerald-100" : "text-gray-500"}`}>
                        {item.desc}
                      </span>
                    </button>
                  ))}
                </div>
              </section>

              {/* ENERGY SELECTION */}
              <section className="mb-10">
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-xl">⚡</span>
                  <h4 className="text-lg font-bold text-[#1F2D24]">
                    What is your energy level?
                  </h4>
                </div>

                <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                  {energyOptions.map((item) => (
                    <button
                      key={item.name}
                      type="button"
                      onClick={() => setEnergy(item.name)}
                      className={`flex items-center gap-3 rounded-2xl border p-4 transition-all duration-200 ${
                        energy === item.name
                          ? "border-[#2F6B45] bg-[#2F6B45] text-white shadow-md scale-[1.02]"
                          : "border-gray-200 bg-[#F4F7F2] text-gray-700 hover:border-[#2F6B45]/50 hover:bg-[#DFEEDD]/50"
                      }`}
                    >
                      <span className="text-2xl">{item.icon}</span>
                      <div className="text-left">
                        <div className="font-bold text-sm">{item.name}</div>
                        <div className={`text-xs ${energy === item.name ? "text-emerald-100" : "text-gray-500"}`}>
                          {item.desc}
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </section>

              {/* GENERATE BUTTON */}
              <button
                onClick={generateMission}
                disabled={loading}
                className="w-full rounded-2xl bg-[#2F6B45] px-6 py-5 text-xl font-extrabold text-white shadow-lg transition-all duration-200 hover:bg-[#245538] hover:shadow-xl disabled:cursor-not-allowed disabled:bg-gray-400"
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="h-6 w-6 animate-spin text-white" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Crafting Your Outdoor Quest...
                  </span>
                ) : (
                  "Generate My Mission 🌿"
                )}
              </button>
            </div>

            {/* MISSION RESULT CARD */}
            {result?.success && result.mission && (
              <div className="mt-10 overflow-hidden rounded-3xl bg-white shadow-xl border border-emerald-900/10 animate-fade-in">
                {/* CARD HEADER */}
                <div className="relative bg-[#2F6B45] p-8 text-white">
                  <div className="flex items-center justify-between">
                    <span className="inline-flex rounded-full bg-white/20 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-emerald-100 backdrop-blur-md">
                      🌿 Outdoor Mission Ready
                    </span>
                    <span className="text-sm font-bold bg-black/20 px-3 py-1 rounded-full text-emerald-100">
                      ⏱️ {result.mission.duration}
                    </span>
                  </div>

                  <h3 className="mt-4 text-3xl sm:text-4xl font-extrabold tracking-tight">
                    {result.mission.title}
                  </h3>

                  {result.isFallback && (
                    <p className="mt-2 text-xs text-emerald-200 bg-emerald-900/40 inline-block px-3 py-1 rounded-lg">
                      ✨ Generated via GrassQuest Engine
                    </p>
                  )}
                </div>

                {/* CARD CONTENT */}
                <div className="p-8">
                  <div className="mb-6 flex items-center justify-between">
                    <h4 className="text-xl font-extrabold text-[#1F2D24]">
                      🗺️ Step-by-Step Quest Plan
                    </h4>
                    <button
                      onClick={copyMissionToClipboard}
                      className="text-xs font-bold text-[#2F6B45] hover:underline flex items-center gap-1"
                    >
                      {copied ? "✓ Copied!" : "📋 Copy Plan"}
                    </button>
                  </div>

                  <div className="space-y-4">
                    {result.mission.steps.map((step, index) => (
                      <div
                        key={index}
                        className="flex items-start gap-4 rounded-2xl bg-[#F4F7F2] p-4 border border-emerald-900/5 transition hover:bg-[#DFEEDD]/40"
                      >
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#2F6B45] font-black text-white text-sm shadow-sm">
                          {index + 1}
                        </div>
                        <p className="mt-1 text-sm font-medium leading-relaxed text-gray-800">
                          {step}
                        </p>
                      </div>
                    ))}
                  </div>

                  {/* SAFETY */}
                  <div className="mt-8 rounded-2xl bg-[#DFEEDD] p-5 border border-emerald-600/20">
                    <div className="flex items-center gap-2 font-bold text-[#2F6B45]">
                      <span>🛡️</span> Safety & Guidelines
                    </div>
                    <p className="mt-1 text-sm text-gray-700 leading-relaxed">
                      {result.mission.safety}
                    </p>
                  </div>

                  {/* ACTION BUTTONS */}
                  <div className="mt-8 flex flex-col sm:flex-row gap-4">
                    <button
                      onClick={startQuestTimer}
                      className="flex-1 rounded-2xl bg-[#1F2D24] px-6 py-4 text-lg font-bold text-white shadow-md transition hover:bg-[#2F6B45]"
                    >
                      Start Mission Now 🌿
                    </button>

                    <button
                      onClick={generateMission}
                      className="rounded-2xl border border-gray-300 bg-white px-6 py-4 font-bold text-gray-700 hover:bg-gray-50 transition"
                    >
                      🔄 Try Another
                    </button>
                  </div>
                </div>
              </div>
            )}
          </main>

          {/* FOOTER */}
          <footer className="mt-16 border-t border-gray-200 bg-white px-6 py-10 text-center">
            <div className="mx-auto max-w-4xl">
              <div className="flex items-center justify-center gap-2 text-[#2F6B45] font-extrabold text-lg">
                🌿 GrassQuest
              </div>
              <p className="mt-2 text-sm text-gray-500 max-w-xl mx-auto">
                Promoting digital balance and outdoor exploration using open-weight AI.
              </p>
              <p className="mt-4 text-xs text-gray-400">
                GrassQuest © 2026 • Designed for outdoor exploration
              </p>
            </div>
          </footer>
        </>
      )}
    </div>
  );
}

export default App;