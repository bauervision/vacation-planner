"use client";

import Align from "./components/Align";
import HeroSection from "./components/HeroSection";
import Section from "./components/Section";

export default function HomePage() {
  return (
    <div>
      <HeroSection
        imageUrl="/backgrounds/coastal-overlook.jpg"
        title="Plan Your Next Adventure"
        description="Discover beautiful destinations, track your journeys, and get inspired for your next escape."
        scrollEffect="sticky" // try "parallax", "fadeIn", etc.
        overlayGradient="from-black/80 to-black/40"
        contentAlign="left"
      >
        <Align align="left">
          <button className="bg-primary hover:bg-blue-700 transition rounded-lg px-8 py-3 text-xl font-bold shadow-lg pointer-events-auto">
            Explore Dashboard
          </button>
        </Align>
      </HeroSection>

      {/* Main content scrolls up over the hero */}
      <Section color="bg-primary" height="min-h-[50vh]" rounded="top">
        <h2 className="text-3xl font-bold mb-8">Your Dashboard</h2>
        <p>...More awesome travel content...</p>
      </Section>

      <HeroSection
        imageUrl="/backgrounds/waterfall.jpg"
        title="Plan Your Next Adventure"
        description="Discover beautiful destinations, track your journeys, and get inspired for your next escape."
        scrollEffect="static" // try "parallax", "fadeIn", etc.
        maskAngle={45}
        maskDirection="right"
        maskedBgColor="#3b82f6"
        //imageScale={3.3}
        overlayGradient="from-black/80 to-black/40"
      >
        <button className="bg-primary hover:bg-blue-700 transition rounded-lg px-8 py-3 text-xl font-bold shadow-lg pointer-events-auto">
          Explore Dashboard
        </button>
      </HeroSection>

      {/* Main content scrolls up over the hero */}
      <section className="relative z-10 bg-blue-900 min-h-[100vh] p-10">
        <h2 className="text-3xl font-bold mb-8">Your Dashboard</h2>
        <p>...More awesome travel content...</p>
      </section>

      <HeroSection
        imageUrl="/backgrounds/sunset.jpg"
        title="Plan Your Next Adventure"
        description="Discover beautiful destinations, track your journeys, and get inspired for your next escape."
        scrollEffect="fadeInOut" // try "parallax", "fadeIn", etc.
        overlayGradient="from-black/80 to-black/40"
      >
        <button className="bg-blue-500 hover:bg-blue-700 transition rounded-lg px-8 py-3 text-xl font-bold shadow-lg pointer-events-auto">
          Explore Dashboard
        </button>
      </HeroSection>

      {/* Main content scrolls up over the hero */}
      <section className="relative z-10 bg-blue-900 min-h-[100vh] p-10">
        <h2 className="text-3xl font-bold mb-8">Your Dashboard</h2>
        <p>...More awesome travel content...</p>
      </section>

      <HeroSection
        imageUrl="/backgrounds/sunset.jpg"
        title="Plan Your Next Adventure"
        description="Discover beautiful destinations, track your journeys, and get inspired for your next escape."
        scrollEffect="slideLeft" // try "parallax", "fadeIn", etc.
        imageScale={2}
        overlayGradient="from-black/80 to-black/40"
      >
        <button className="bg-blue-500 hover:bg-blue-700 transition rounded-lg px-8 py-3 text-xl font-bold shadow-lg pointer-events-auto">
          Explore Dashboard
        </button>
      </HeroSection>

      {/* Main content scrolls up over the hero */}
      <section className="relative z-10 bg-blue-900 min-h-[100vh] p-10">
        <h2 className="text-3xl font-bold mb-8">Your Dashboard</h2>
        <p>...More awesome travel content...</p>
      </section>
    </div>
  );
}
