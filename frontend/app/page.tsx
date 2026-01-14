import { client } from '@/utils/sanity/client';
import Hero from '@/components/Hero';
import ClientLogos from '@/components/ClientLogos';
import Gallery from '@/components/Gallery';
import BlogSection from '@/components/BlogSection';
import Testimonials from '@/components/Testimonials';
import Awards from '@/components/Awards';
import EnquiryForm from '@/components/EnquiryForm';
import FeaturedProjects from '@/components/FeaturedProjects';
import Industries from '@/components/Industries';

async function getData() {
  const homepage = await client.fetch(`*[_type == "homepage"][0]`);
  const clients = await client.fetch(`*[_type == "client"]`);
  const gallery = await client.fetch(`*[_type == "gallery"]`);
  const posts = await client.fetch(`*[_type == "blog"] | order(publishedAt desc)[0...3]`);
  const testimonials = await client.fetch(`*[_type == "testimonial"]`);
  const awards = await client.fetch(`*[_type == "award"] | order(year desc)`);
  const featuredProjects = await client.fetch(`*[_type == "project" && isFeatured == true] | order(_createdAt desc)[0...3]`);
  const industries = await client.fetch(`*[_type == "industry"] | order(_createdAt asc)`);

  return { homepage, clients, gallery, posts, testimonials, awards, featuredProjects, industries };
}

export default async function Home() {
  const data = await getData();

  return (
    <main>
      <Hero data={data.homepage} />
      <ClientLogos data={data.clients} />
      <Industries data={data.industries} />
      <Gallery data={data.gallery} />
      <FeaturedProjects projects={data.featuredProjects} />
      <BlogSection data={data.posts} />
      <Testimonials data={data.testimonials} />
      <Awards data={data.awards} />
      <EnquiryForm />
    </main>
  );
}
