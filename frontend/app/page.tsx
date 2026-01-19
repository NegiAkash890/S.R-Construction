import { client } from '@/utils/sanity/client';
import Hero from '@/components/Hero';
import ClientLogos from '@/components/ClientLogos';
import Process from '@/components/Process';
import BlogSection from '@/components/BlogSection';
import FeaturedProjects from '@/components/FeaturedProjects';
import EquipmentSection from '@/components/EquipmentSection';
import Industries from '@/components/Industries';
import SafetyCertifications from '@/components/SafetyCertifications';
import FAQSection from '@/components/FAQSection';

async function getData() {
  const homepage = await client.fetch(`*[_type == "homepage"][0]`);
  const clients = await client.fetch(`*[_type == "client"]`);
  const posts = await client.fetch(`*[_type == "blog"] | order(publishedAt desc)[0...3]`);
  const featuredProjects = await client.fetch(`*[_type == "project" && isFeatured == true] | order(_createdAt desc)[0...3]`);
  const industries = await client.fetch(`*[_type == "industry"] | order(_createdAt asc)`);
  const faqs = await client.fetch(`*[_type == "faq"] | order(order asc)`);

  return {
    homepage, clients, posts, featuredProjects, industries, faqs
  };
}

export default async function Home() {
  const data = await getData();

  return (
    <main>
      <Hero data={data.homepage} />
      <ClientLogos data={data.clients} />
      <Industries data={data.industries} />
      <FeaturedProjects projects={data.featuredProjects} />
      <EquipmentSection />
      <Process />
      <SafetyCertifications />
      <FAQSection faqs={data.faqs} />
      <BlogSection data={data.posts} />
    </main>
  );
}
