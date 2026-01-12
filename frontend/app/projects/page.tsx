import { client as sanityClient } from "@/utils/sanity/client";
import ProjectsGallery from "@/components/ProjectsGallery";
import ProjectsHero from "@/components/ProjectsHero";

/* Fetching from the new project schema */
const query = `*[_type == "project"] | order(_createdAt desc)`;

export default async function ProjectsPage() {
    const projects = await sanityClient.fetch(query);

    return (
        <main>
            <ProjectsHero />
            <div>
                <ProjectsGallery data={projects} />
            </div>
        </main>
    );
}
