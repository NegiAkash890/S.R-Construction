import Link from 'next/link';
import Image from 'next/image';
import { urlFor } from '@/utils/sanity/client';
import { formatIndianCurrency } from '@/utils/formatCurrency';
import styles from './FeaturedProjects.module.css';

interface Project {
  _id: string;
  title: string;
  clientName: string;
  workDescription: string;
  workValue: number;
  location: string[];
  startDate: string;
  endDate?: string;
  status: 'completed' | 'in-progress' | 'ongoing';
  image?: any;
  category?: string;
  gallery?: any[];
  industry?: { title: string };
}

interface FeaturedProjectsProps {
  projects: Project[];
  title?: string;
  className?: string;
  variant?: 'grid' | 'scroll';
}

export default function FeaturedProjects({ projects, title = "Featured Projects", className, variant = 'grid' }: FeaturedProjectsProps) {
  if (!projects || projects.length === 0) return null;

  return (
    <section className={`${styles.section} ${className || ''}`}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>{title}</h2>
        </div>

        <div className={`${styles.grid} ${variant === 'scroll' ? styles.horizontal : ''}`}>
          {projects.map((project) => (
            <Link href={`/projects?projectId=${project._id}`} key={project._id} className={styles.card}>
              <div className={styles.imageContainer}>
                {/* Image or Placeholder Logic */}
                {(project.gallery?.[0] || project.image) ? (
                  <Image
                    src={urlFor(project.gallery?.[0] || project.image).url()}
                    alt={project.title}
                    fill
                    className={styles.image}
                  />
                ) : (
                  <div className={styles.placeholderImage}>
                    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ opacity: 0.3 }}>
                      <rect x="3" y="3" width="18" height="18" rx="2" ry="2" stroke="currentColor" strokeWidth="2" />
                      <circle cx="8.5" cy="8.5" r="1.5" fill="currentColor" />
                      <path d="M21 15L16 10L5 21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                )}
                {/* Fallback pattern if no image? keeping simple for now */}

                {/* Mock Category/Industry if not present in Top Level or use a default */}
                <span className={styles.badge}>{project.industry?.title || project.category || 'Construction'}</span>
              </div>

              <div className={styles.content}>
                <div className={styles.meta}>
                  <span>{project.clientName || 'Client'}</span>
                  <span className={styles.dot}></span>
                  <span>{project.location ? (Array.isArray(project.location) ? project.location[0] : project.location) : 'Location'}</span>
                  <span className={styles.dot}></span>
                  <span>{project.endDate ? new Date(project.endDate).getFullYear() : (project.startDate ? new Date(project.startDate).getFullYear() : '2025')}</span>
                </div>

                <h3 className={styles.projectTitle}>{project.title}</h3>

                <span className={styles.link}>
                  See Details
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              </div>
            </Link>
          ))}
        </div>

        <div className={styles.footer}>
          <Link href="/projects" className={styles.viewAllButton}>
            View All Projects
          </Link>
        </div>
      </div>
    </section>
  );
}
