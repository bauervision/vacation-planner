"use client";

import HeroSection from "./components/HeroSection";

export default function HomePage() {
  return (
    <div>
      <HeroSection
        imageUrl="/backgrounds/coastal-overlook.jpg"
        title="Plan Your Next Adventure"
        description="Discover beautiful destinations, track your journeys, and get inspired for your next escape."
        scrollEffect="sticky" // try "parallax", "fadeIn", etc.
        overlayGradient="from-black/80 to-black/40"
      >
        <button className="bg-blue-500 hover:bg-blue-700 transition rounded-lg px-8 py-3 text-xl font-bold shadow-lg pointer-events-auto">
          Explore Dashboard
        </button>
      </HeroSection>

      {/* Main content scrolls up over the hero */}
      <section className="relative z-10 bg-blue-900 min-h-[200vh] p-10">
        <h2 className="text-3xl font-bold mb-8">Your Dashboard</h2>
        <p>...More awesome travel content...</p>
      </section>

      <HeroSection
        imageUrl="/backgrounds/sunset.jpg"
        title="Plan Your Next Adventure"
        description="Discover beautiful destinations, track your journeys, and get inspired for your next escape."
        scrollEffect="static" // try "parallax", "fadeIn", etc.
        overlayGradient="from-black/80 to-black/40"
      >
        <button className="bg-blue-500 hover:bg-blue-700 transition rounded-lg px-8 py-3 text-xl font-bold shadow-lg pointer-events-auto">
          Explore Dashboard
        </button>
      </HeroSection>
    </div>
  );
}
