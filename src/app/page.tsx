"use client";

import Align from "./components/Align";

import HeroSection from "./components/HeroSection";
import NavBar from "./components/NavBar";
import PageTitle from "./components/PageTitle";

import Section from "./components/Section";

export default function HomePage() {
  return (
    <div>
      <PageTitle title="Vacation Planner">
        <NavBar loggedIn={true} className="mt-15" />
      </PageTitle>

      <HeroSection
        imageUrl="/backgrounds/coastal-overlook.jpg"
        title="Where to?"
        description="Discover beautiful destinations, track your journeys, and get inspired for your next escape."
        scrollEffect="sticky" // try "parallax", "fadeIn", etc.
      >
        <Align align="left">
          <button className="bg-accent mb-20 hover:bg-primary transition rounded-lg px-8 py-3 text-xl font-bold shadow-lg pointer-events-auto">
            Explore Dashboard
          </button>
        </Align>
      </HeroSection>
      {/* Main content scrolls up over the hero */}
      <Section color="bg-primary" height="min-h-[50vh]" rounded="top">
        <h2 className="text-3xl font-bold mb-8 text-accent">Your Dashboard</h2>
        <p>...More awesome travel content...</p>
      </Section>
      <HeroSection
        imageUrl="/backgrounds/waterfall.jpg"
        title="Plan Your Next Adventure"
        description="Discover beautiful destinations, track your journeys, and get inspired for your next escape."
        scrollEffect="static" // try "parallax", "fadeIn", etc.
        maskAngle={45}
        maskDirection="right"
        maskedBgColor="var(--color-primary)"
        maskedBgColor2="var(--color-secondary)"
      >
        <button className="bg-accent hover:bg-blue-700 transition rounded-lg px-8 py-3 text-xl font-bold shadow-lg pointer-events-auto">
          Explore Dashboard
        </button>
      </HeroSection>
      {/* Main content scrolls up over the hero */}
      <section className="relative z-10 bg-secondary min-h-[100vh] p-10">
        <h2 className="text-3xl font-bold mb-8">Your Dashboard</h2>
        <p>...More awesome travel content...</p>
      </section>
      <HeroSection
        imageUrl="/backgrounds/beach.jpg"
        // title="Plan Your Next Adventure"
        // description="Discover beautiful destinations, track your journeys, and get inspired for your next escape."
        scrollEffect="zoomOut" // try "parallax", "fadeIn", etc.
      >
        {/* <button className="bg-blue-500 hover:bg-blue-700 transition rounded-lg px-8 py-3 text-xl font-bold shadow-lg pointer-events-auto">
          Explore Dashboard
        </button> */}
      </HeroSection>
      {/* Main content scrolls up over the hero */}
      <section className="relative z-10 bg-accent min-h-[100vh] p-10">
        <h2 className="text-5xl font-bold mb-8 text-primary">Your Dashboard</h2>
        <p>...More awesome travel content...</p>
      </section>
      <HeroSection
        imageUrl="/backgrounds/sunset.jpg"
        title="Plan Your Next Adventure"
        description="Discover beautiful destinations, track your journeys, and get inspired for your next escape."
        scrollEffect="slideLeft" // try "parallax", "fadeIn", etc.
        imageScale={2}
      >
        <button className="bg-blue-500 hover:bg-blue-700 transition rounded-lg px-8 py-3 text-xl font-bold shadow-lg pointer-events-auto">
          Explore Dashboard
        </button>
      </HeroSection>
      {/* Main content scrolls up over the hero */}
      <section className="relative z-10 bg-bg min-h-[100vh] p-10">
        <h2 className="text-3xl font-bold mb-8">Your Dashboard</h2>
        <p>...More awesome travel content...</p>
      </section>
    </div>
  );
}
