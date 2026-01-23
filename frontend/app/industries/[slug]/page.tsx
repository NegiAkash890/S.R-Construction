import { client, urlFor } from '@/utils/sanity/client';
import { formatIndianCurrency } from '@/utils/formatCurrency';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { BsArrowLeft, BsArrowRight } from 'react-icons/bs';
import FeaturedProjects from '@/components/FeaturedProjects';
import styles from './page.module.css';

// Revalidate every 60 seconds
export const revalidate = 60;

// Generate static params for all industries
export async function generateStaticParams() {
  const industries = await client.fetch(`*[_type == "industry"]{ "slug": slug.current }`);
  return industries.map((industry: any) => ({
    slug: industry.slug,
  }));
}

async function getIndustryData(slug: string) {
  const industry = await client.fetch(
    `*[_type == "industry" && slug.current == $slug][0]`,
    { slug }
  );
  // Fetch recent 3 posts for the news section filtered by industry
  const posts = await client.fetch(
    `*[_type == "blog" && references($id)] | order(publishedAt desc)[0...3]`,
    { id: industry._id }
  );

  // Fetch projects related to this industry
  const projects = await client.fetch(
    `*[_type == "project" && references($id)] | order(_createdAt desc)[0...6]`,
    { id: industry._id }
  );

  return { industry, posts, projects };
}

export default async function IndustryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const { industry, posts, projects } = await getIndustryData(slug);

  if (!industry) {
    notFound();
  }

  return (
    <main className={styles.main}>
      {/* Hero Section */}
      <div className={styles.hero}>
        <div className={styles.heroImageWrapper}>
          {/* Image removed as per user request to use default dark background */}
        </div>
        <div className="container" style={{ position: 'relative', height: '100%' }}>
          <div className={styles.heroContent}>
            {industry.heroSubtitle && (
              <h2 className={styles.heroSubtitle}>{industry.heroSubtitle}</h2>
            )}
            <h1 className={styles.heroTitle}>{industry.title}</h1>
          </div>
        </div>
      </div>

      {/* Statistics Section (High Impact) */}
      <section className={styles.statsSection}>
        <div className="container">
          <h2 className={styles.statsTitle}>PROVEN TRACK RECORD IN {industry.title.toUpperCase()}</h2>
          <div className={styles.statsGrid}>
            {[
              { label: 'Projects Delivered', value: `${projects.length > 0 ? projects.length : '5'}+` },
              { label: 'Total Project Value', value: projects.reduce((sum: number, p: any) => sum + (p.workValue || 0), 0) > 0 ? formatIndianCurrency(projects.reduce((sum: number, p: any) => sum + (p.workValue || 0), 0)) : '₹50 Cr+' },
              { label: 'On-Time Delivery', value: '100%' }
            ].map((stat: any, index: number) => (
              <div key={index} className={styles.statItem}>
                <span className={styles.statValue}>{stat.value}</span>
                <span className={styles.statLabel}>{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Industry Projects - Visual Proof */}
      <FeaturedProjects
        projects={projects}
        title={`Our Excellence in ${industry.title}`}
        className={styles.projectsSection}
        variant="scroll"
        showViewAll={false}
        showCategoryBadge={false}
      />

      {/* Intro Content - Context */}
      <div className={styles.introSection}>
        <div className="container">
          <p className={styles.introText}>
            {industry.description}
          </p>
        </div>
      </div>

      {/* Offerings Section - Services */}
      {industry.offerings && industry.offerings.length > 0 && (
        <section className={styles.section}>
          <div className="container">
            <h2 className={styles.sectionTitle}>Key Capabilities</h2>
            <div className={styles.offeringsGrid}>
              {industry.offerings.map((offering: any, index: number) => (
                <div key={index} className={styles.offeringCard}>
                  <div className={styles.offeringImageWrapper}>
                    {offering.image ? (
                      <Image
                        src={urlFor(offering.image).url()}
                        alt={offering.title}
                        fill
                        className={styles.offeringImage}
                      />
                    ) : (
                      <div className={styles.dummyImage}></div>
                    )}
                    <div className={styles.offeringOverlay}>
                      <span className={styles.offeringTitle}>{offering.title}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* News Section */}
      <section className={styles.section}>
        <div className="container">
          <div className={styles.newsHeader}>
            <h2 className={styles.sectionTitle}>Latest Updates</h2>
            <div className={styles.newsNav}>
              <button className={styles.navBtn}><BsArrowLeft /></button>
              <button className={styles.navBtn}><BsArrowRight /></button>
            </div>
          </div>
          <div className={styles.newsGrid}>
            {posts.map((post: any) => (
              <div key={post._id} className={styles.newsCard}>
                <div className={styles.newsImageWrapper}>
                  {post.mainImage && (
                    <Image
                      src={urlFor(post.mainImage).url()}
                      alt={post.title}
                      fill
                      className={styles.newsImage}
                    />
                  )}
                </div>
                <div className={styles.newsContent}>
                  <span className={styles.newsDate}>
                    {new Date(post.publishedAt).toLocaleDateString('en-GB', { day: '2-digit', month: 'long', year: 'numeric' })}
                  </span>
                  <h3 className={styles.newsTitle}>{post.title}</h3>
                  <Link href={`/news/${post.slug.current}`} className={styles.readMore}>
                    Read More <BsArrowRight className={styles.arrowIcon} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Breadcrumb Section */}
      <div className={styles.breadcrumbSection}>
        <div className="container">
          <nav aria-label="Breadcrumb">
            <ol className={styles.breadcrumbList}>
              <li className={styles.breadcrumbItem}>
                <Link href="/">Home</Link>
              </li>
              <li className={styles.breadcrumbSeparator}>/</li>
              <li className={styles.breadcrumbItem}>
                <Link href="/#industries">Industries</Link>
              </li>
              <li className={styles.breadcrumbSeparator}>/</li>
              <li className={`${styles.breadcrumbItem} ${styles.breadcrumbActive}`} aria-current="page">
                {industry.title}
              </li>
            </ol>
          </nav>
        </div>
      </div>
    </main>
  );
}
