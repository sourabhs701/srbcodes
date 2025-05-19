import React from "react";
import Hero from "../components/home/Hero";
import Collaboration from "../components/home/Collaboration";
import LatestProjects from "../components/home/LatestProjects";
import RedditFeed from "../components/home/RedditFeed";

export const metadata = {
  title: "SRB CODES | Home",
  description: "Personal portfolio and project showcase of Sourabh S.",
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <Collaboration />
      <LatestProjects />
      <RedditFeed />
    </>
  );
}
