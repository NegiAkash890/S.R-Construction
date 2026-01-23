import { client as sanityClient } from "@/utils/sanity/client";
import ProjectsGallery from "@/components/ProjectsGallery";
import ProjectsHero from "@/components/ProjectsHero";

/* Fetching from the new project schema and page meta */
const query = `{
  "projects": *[_type == "project"] | order(_createdAt desc) {
    ...,
    industry->{
      title,
      slug
    }
  },
  "meta": *[_type == "projectsPage"][0]
}`;

export async function generateMetadata() {
  const { meta } = await sanityClient.fetch(query);
  return {
    title: meta?.heroTitle || 'Projects',
    description: meta?.heroSubtitle || 'Explore our portfolio of construction projects.',
  };
}

import { Suspense } from 'react';

export default async function ProjectsPage() {
  const data = await sanityClient.fetch(query);
  const projects = data?.projects || [];
  const meta = data?.meta || {};

  /* Calculated stats from real data */
  const totalProjects = projects.length;
  const completedProjects = projects.filter((p: any) => p?.status === 'completed').length;
  // Calculate total value in Crores (1 Cr = 10,000,000)
  const totalValueRaw = projects.reduce((acc: number, curr: any) => acc + (curr?.workValue || 0), 0);
  const totalValueCr = (totalValueRaw / 10000000).toFixed(1);

  const realStats = [
    { label: "Total Projects", value: `${totalProjects}+` },
    { label: "Completed Projects", value: `${completedProjects}+` },
    { label: "Total Value (INR)", value: `${totalValueCr}Cr+` }
  ];

  return (
    <main>
      <ProjectsHero data={{ ...meta, stats: realStats }} />
      <div>
        <Suspense fallback={<div className="container py-20 text-center">Loading Projects...</div>}>
          <ProjectsGallery data={projects} />
        </Suspense>
      </div>
    </main>
  );
}
