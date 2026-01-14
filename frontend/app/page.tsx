import { client } from '@/utils/sanity/client';
import Hero from '@/components/Hero';
import ClientLogos from '@/components/ClientLogos';
import Process from '@/components/Process';
import BlogSection from '@/components/BlogSection';
import FeaturedProjects from '@/components/FeaturedProjects';
import EquipmentSection from '@/components/EquipmentSection';
import Industries from '@/components/Industries';

async function getData() {
  const homepage = await client.fetch(`*[_type == "homepage"][0]`);
  const clients = await client.fetch(`*[_type == "client"]`);
  const posts = await client.fetch(`*[_type == "blog"] | order(publishedAt desc)[0...3]`);
  const featuredProjects = await client.fetch(`*[_type == "project" && isFeatured == true] | order(_createdAt desc)[0...3]`);
  const industries = await client.fetch(`*[_type == "industry"] | order(_createdAt asc)`);

  return {
 homepage, clients, posts, featuredProjects, industries
};
}

export default async function Home() {
  const data = await getData();

  return (
    <main>
      <Hero data={data.homepage} />
      <ClientLogos data={data.clients} />
      <Industries data={data.industries} />
      <Process />
      <FeaturedProjects projects={data.featuredProjects} />
      <EquipmentSection />
      <BlogSection data={data.posts} />
    </main>
  );
}
