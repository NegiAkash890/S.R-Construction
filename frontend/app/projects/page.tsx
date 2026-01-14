import { client as sanityClient } from "@/utils/sanity/client";
import ProjectsGallery from "@/components/ProjectsGallery";
import ProjectsHero from "@/components/ProjectsHero";

/* Fetching from the new project schema and page meta */
const query = `{
  "projects": *[_type == "project"] | order(_createdAt desc),
  "meta": *[_type == "projectsPage"][0]
}`;

export async function generateMetadata() {
    const { meta } = await sanityClient.fetch(query);
    return {
        title: meta?.heroTitle || 'Projects',
        description: meta?.heroSubtitle || 'Explore our portfolio of construction projects.',
    };
}

export default async function ProjectsPage() {
    const { projects, meta } = await sanityClient.fetch(query);

    return (
      <main>
        <ProjectsHero data={meta} />
        <div>
          <ProjectsGallery data={projects} />
        </div>
      </main>
    );
}
