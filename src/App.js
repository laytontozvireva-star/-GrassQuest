import { useState } from "react";

function App() {
  const [time, setTime] = useState("");
  const [activity, setActivity] = useState("");
  const [energy, setEnergy] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const [missionStarted, setMissionStarted] = useState(false);
  const [missionComplete, setMissionComplete] = useState(false);
  const [reflection, setReflection] = useState("");

  const [showJournal, setShowJournal] = useState(false);
  const [journal, setJournal] = useState([]);

  const timeOptions = ["15 min", "30 min", "45 min", "60 min"];

  const activityOptions = [
    "Nature",
    "Walking",
    "Photography",
    "Mindfulness",
    "Exploration",
  ];

  const energyOptions = ["Relaxed", "Normal", "Active"];

  const generateMission = async () => {
    setLoading(true);
    setResult(null);

    try {
      const response = await fetch("http://localhost:5001/api/missions", {
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

      const data = await response.json();

      setResult(data);
    } catch (error) {
      console.error(error);

      setResult({
        message: "Could not connect to the GrassQuest server.",
      });
    } finally {
      setLoading(false);
    }
  };

  const finishReflection = () => {
    const newReflection = {
      mission: result?.mission?.title || "GrassQuest Mission",
      reflection: reflection,
      date: new Date().toLocaleString(),
    };

    const existingReflections =
      JSON.parse(localStorage.getItem("grassquest_reflections")) || [];

    existingReflections.push(newReflection);

    localStorage.setItem(
      "grassquest_reflections",
      JSON.stringify(existingReflections)
    );

    alert("Reflection saved! 🌿");

    setReflection("");
    setMissionComplete(false);
  };

  const openJournal = () => {
    const saved =
      JSON.parse(localStorage.getItem("grassquest_reflections")) || [];

    setJournal(saved);
    setShowJournal(true);
  };

  return (
    <div className="min-h-screen bg-[#F4F7F2] text-[#1F2D24]">

      {/* JOURNAL */}
      {showJournal ? (
        <div className="min-h-screen bg-[#F4F7F2] px-6 py-12">
          <div className="mx-auto max-w-3xl">

            <button
              onClick={() => setShowJournal(false)}
              className="mb-8 rounded-xl bg-[#1F2D24] px-5 py-3 font-bold text-white hover:bg-[#2F6B45]"
            >
              ← Back
            </button>

           <div>
  <div className="flex flex-wrap items-center gap-3">
    <h1 className="text-4xl font-bold">
      📖 My GrassQuest Journal
    </h1>

    <span className="rounded-full bg-[#DFEEDD] px-3 py-1 text-sm font-bold text-[#2F6B45]">
      Your Adventures
    </span>
  </div>

  <p className="mt-3 max-w-xl text-gray-600">
    Keep track of the moments, discoveries, and reflections
    from your outdoor adventures.
  </p>
</div>
            {journal.length === 0 ? (
              <div className="mt-8 rounded-2xl bg-white p-8 text-center shadow">
                <p className="text-lg text-gray-600">
                  No reflections yet.
                </p>

                <p className="mt-2 text-gray-500">
                  Complete your first GrassQuest mission!
                </p>
              </div>
            ) : (
              <div className="mt-8 space-y-5">
                {journal
                  .slice()
                  .reverse()
                  .map((entry, index) => (
                    <div
                      key={index}
                      className="rounded-2xl bg-white p-6 shadow-md"
                    >
                      <p className="text-sm text-gray-500">
                        {entry.date}
                      </p>

                      <h2 className="mt-2 text-2xl font-bold text-[#2F6B45]">
                        🌿 {entry.mission}
                      </h2>

                      <p className="mt-4 leading-relaxed text-gray-700">
                        {entry.reflection}
                      </p>
                    </div>
                  ))}
              </div>
            )}

          </div>
        </div>

      ) : missionComplete ? (

        /* MISSION COMPLETE */
        <div className="flex min-h-screen items-center justify-center bg-[#DFEEDD] px-6">
          <div className="w-full max-w-lg text-center">

            <div className="text-7xl">🎉</div>

<div className="mt-4 inline-flex rounded-full bg-white px-4 py-2 text-sm font-bold text-[#2F6B45] shadow-sm">
  🌿 Outdoor Mission Completed
</div>

<h1 className="mt-6 text-4xl font-bold">
              Mission Complete!
            </h1>

            <p className="mt-4 text-xl leading-relaxed text-gray-700">
              You did it. You chose the real world over the screen.
            </p>

            <div className="mt-8 rounded-2xl bg-white p-6 text-left shadow-md">

              <h2 className="text-2xl font-bold">
                How was your experience?
              </h2>

              <p className="mt-2 text-gray-600">
                Take a moment to reflect on your time outside.
              </p>

              <textarea
                value={reflection}
                onChange={(e) => setReflection(e.target.value)}
                placeholder="What did you notice? How did you feel?"
                className="mt-5 h-36 w-full resize-none rounded-xl border border-gray-300 p-4 outline-none focus:border-[#2F6B45]"
              />

              <button
                onClick={finishReflection}
                disabled={!reflection.trim()}
                className="mt-4 w-full rounded-xl bg-[#2F6B45] px-6 py-4 font-bold text-white transition hover:bg-[#245538] disabled:cursor-not-allowed disabled:bg-gray-400"
              >
                Save Reflection 🌱
              </button>

            </div>

          </div>
        </div>

      ) : missionStarted ? (

        /* GO OUTSIDE MODE */
        <div className="flex min-h-screen items-center justify-center bg-[#1F2D24] px-6 text-center text-white">
          <div className="max-w-lg">

            <div className="text-7xl">🌿</div>

            <h1 className="mt-6 text-4xl font-bold">
              Your mission has started.
            </h1>

            <p className="mt-6 text-xl leading-relaxed text-gray-300">
              Your adventure is waiting outside.
            </p>

            <p className="mt-4 text-lg leading-relaxed text-gray-400">
              Put your phone away and enjoy the real world.
            </p>

            <button
              onClick={() => {
                setMissionStarted(false);
                setMissionComplete(true);
              }}
              className="mt-10 rounded-xl bg-white px-6 py-3 font-bold text-[#1F2D24] transition hover:bg-gray-200"
            >
              I'm Back 🌱
            </button>

          </div>
        </div>

      ) : (

        /* NORMAL GRASSQUEST MODE */
        <>
          {/* JOURNAL BUTTON */}
          <div className="flex justify-end px-6 pt-6">
            <button
              onClick={openJournal}
              className="rounded-xl bg-[#1F2D24] px-5 py-3 font-bold text-white hover:bg-[#2F6B45]"
            >
              📖 My Journal
            </button>
          </div>

          {/* HERO */}
          <section className="bg-[#DFEEDD] px-6 py-12 text-center sm:py-16">

            <div className="mb-6 flex flex-wrap items-center justify-center gap-2">
  <span className="rounded-full bg-white px-4 py-2 text-sm font-bold text-[#2F6B45] shadow-sm">
    🌿 GrassQuest
  </span>

  <span className="rounded-full bg-[#1F2D24] px-4 py-2 text-sm font-bold text-white shadow-sm">
    🤖 AI-Powered
  </span>

  <span className="rounded-full bg-white px-4 py-2 text-sm font-bold text-[#2F6B45] shadow-sm">
    Open-Weight AI
  </span>
</div>

            <h1 className="mt-6 text-4xl font-bold leading-tight sm:text-5xl md:text-6xl">
              Your AI mission
              <br />
              starts outside.
            </h1>

            <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-gray-700">
              Tell us what kind of outdoor experience you want.
              We'll create a personalized mission for you.
            </p>

          </section>

          <main className="mx-auto max-w-3xl px-4 py-10 sm:px-6 sm:py-12">

            <h2 className="mb-10 text-center text-3xl font-bold">
              Create Your Mission
            </h2>

            {/* TIME */}
            <section className="mb-10">

              <h3 className="mb-4 text-xl font-semibold">
                ⏱️ How much time do you have?
              </h3>

              <div className="grid grid-cols-2 gap-3 md:grid-cols-4">

                {timeOptions.map((option) => (
                  <button
                    key={option}
                    onClick={() => setTime(option)}
                    className={`rounded-xl border p-4 font-medium transition ${
                      time === option
                        ? "border-[#2F6B45] bg-[#2F6B45] text-white"
                        : "border-gray-300 bg-white hover:border-[#2F6B45] hover:bg-[#DFEEDD]"
                    }`}
                  >
                    {option}
                  </button>
                ))}

              </div>

            </section>

            {/* ACTIVITY */}
            <section className="mb-10">

              <h3 className="mb-4 text-xl font-semibold">
                🌱 What sounds good?
              </h3>

              <div className="grid grid-cols-2 gap-3 md:grid-cols-3">

                {activityOptions.map((option) => (
                  <button
                    key={option}
                    onClick={() => setActivity(option)}
                    className={`rounded-xl border p-4 font-medium transition ${
                      activity === option
                        ? "border-[#2F6B45] bg-[#2F6B45] text-white"
                        : "border-gray-300 bg-white hover:border-[#2F6B45] hover:bg-[#DFEEDD]"
                    }`}
                  >
                    {option}
                  </button>
                ))}

              </div>

            </section>

            {/* ENERGY */}
            <section className="mb-10">

              <h3 className="mb-4 text-xl font-semibold">
                ⚡ What's your energy level?
              </h3>

              <div className="grid grid-cols-3 gap-3">

                {energyOptions.map((option) => (
                  <button
                    key={option}
                    onClick={() => setEnergy(option)}
                    className={`rounded-xl border p-4 font-medium transition ${
                      energy === option
                        ? "border-[#2F6B45] bg-[#2F6B45] text-white"
                        : "border-gray-300 bg-white hover:border-[#2F6B45] hover:bg-[#DFEEDD]"
                    }`}
                  >
                    {option}
                  </button>
                ))}

              </div>

            </section>

            {/* USER CHOICES */}
            <div className="mb-6 rounded-xl bg-white p-5 shadow-sm">

              <p className="font-semibold">
                Your choices:
              </p>

              <p className="mt-2 text-gray-600">
                Time: {time || "Not selected"}
              </p>

              <p className="text-gray-600">
                Activity: {activity || "Not selected"}
              </p>

              <p className="text-gray-600">
                Energy: {energy || "Not selected"}
              </p>

            </div>

            {/* GENERATE BUTTON */}
            <button
              onClick={generateMission}
              disabled={!time || !activity || !energy || loading}
              className="w-full rounded-xl bg-[#2F6B45] px-6 py-4 text-lg font-bold text-white shadow-md transition hover:bg-[#245538] disabled:cursor-not-allowed disabled:bg-gray-400"
            >
              {loading
                ? "Creating Mission..."
                : "Generate My Mission 🌿"}
            </button>

            {/* MISSION CARD */}
            {result?.success && result.mission && (
              <div className="mt-8 overflow-hidden rounded-2xl bg-white shadow-lg">

                <div className="bg-[#2F6B45] p-6 text-white">

                  <p className="text-sm font-semibold uppercase tracking-wider">
                    🌿 Your Mission
                  </p>

                  <h3 className="mt-2 text-3xl font-bold">
                    {result.mission.title}
                  </h3>

                  <p className="mt-2 text-green-100">
                    ⏱️ {result.mission.duration}
                  </p>

                </div>

                <div className="p-6">

                  <div className="mb-5">
  <p className="text-sm font-semibold uppercase tracking-wider text-[#2F6B45]">
    🗺️ Adventure Plan
  </p>

  <h4 className="mt-1 text-xl font-bold">
    Follow these steps
  </h4>
</div>

                  <div className="space-y-4">

                    {result.mission.steps.map((step, index) => (
                      <div
                        key={index}
                        className="flex gap-4 rounded-xl bg-[#F4F7F2] p-4"
                      >

                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#2F6B45] font-bold text-white">
                          {index + 1}
                        </div>

                        <p className="leading-relaxed text-gray-700">
                          {step}
                        </p>

                      </div>
                    ))}

                  </div>

                  {/* SAFETY */}
                  <div className="mt-6 rounded-xl bg-[#DFEEDD] p-4">

                    <p className="font-semibold text-[#2F6B45]">
                      🛡️ Safety
                    </p>

                    <p className="mt-1 text-sm leading-relaxed text-gray-700">
                      {result.mission.safety}
                    </p>

                  </div>

                  {/* START MISSION */}
                  <button
                    onClick={() => setMissionStarted(true)}
                    className="mt-6 w-full rounded-xl bg-[#1F2D24] px-6 py-4 text-lg font-bold text-white transition hover:bg-[#2F6B45]"
                  >
                    Start Mission 🌿
                  </button>

                </div>

              </div>
            )}

                    </main>

          {/* AI POWERED BY */}
          <section className="border-t border-gray-200 bg-white px-6 py-8 text-center">
            <p className="text-sm font-semibold text-[#2F6B45]">
              🤖 Powered by Gemma + Ollama
            </p>

            <p className="mx-auto mt-2 max-w-xl text-sm text-gray-500">
              GrassQuest uses open-weight AI to create personalized outdoor
              missions while keeping safety at the center of every adventure.
            </p>
          </section>
        </>
      )}

    </div>
  );
}

export default App;