
import { client } from '@/utils/sanity/client';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import ClientLogos from '@/components/ClientLogos';
import Gallery from '@/components/Gallery';
import BlogSection from '@/components/BlogSection';
import Testimonials from '@/components/Testimonials';
import Awards from '@/components/Awards';
import Footer from '@/components/Footer';

async function getData() {
  const homepage = await client.fetch(`*[_type == "homepage"][0]`);
  const clients = await client.fetch(`*[_type == "client"]`);
  const gallery = await client.fetch(`*[_type == "gallery"]`);
  const posts = await client.fetch(`*[_type == "blog"] | order(publishedAt desc)[0...3]`);
  const testimonials = await client.fetch(`*[_type == "testimonial"]`);
  const awards = await client.fetch(`*[_type == "award"] | order(year desc)`);

  return { homepage, clients, gallery, posts, testimonials, awards };
}

export default async function Home() {
  const data = await getData();

  return (
    <main>
      <Navbar />
      <Hero data={data.homepage} />
      <ClientLogos data={data.clients} />
      <Gallery data={data.gallery} />
      <BlogSection data={data.posts} />
      <Testimonials data={data.testimonials} />
      <Awards data={data.awards} />
      <Footer />
    </main>
  );
}
