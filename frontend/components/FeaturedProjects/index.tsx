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
}

interface FeaturedProjectsProps {
  projects: Project[];
}

export default function FeaturedProjects({ projects }: FeaturedProjectsProps) {
  if (!projects || projects.length === 0) return null;

  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
  };

  return (
    <section className={styles.section}>
      <div className="container">
        <h2 className={styles.title}>Featured Projects</h2>
        <div className={styles.accordionContainer}>
          {projects.map((project, index) => (
            <div key={project._id} className={styles.accordionItem} tabIndex={0}>
              <Link href={`/projects`} className={styles.itemLink}>
                <div className={styles.projectCardBackground}>
                  <div className={styles.patternOverlay} />
                </div>
                <div className={styles.overlay}>
                  <div className={styles.content}>
                    <span className={styles.itemNumber}>0{index + 1}</span>
                    <div className={styles.textWrapper}>
                      <h3 className={styles.projectTitle}>{project.title}</h3>
                      <p className={styles.location}>
                        {Array.isArray(project.location) ? project.location[0] : 'Location'}
                      </p>
                    </div>
                    <span className={styles.iconButton}>
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M7 17L17 7M17 7H7M17 7V17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                  </div>
                </div>
              </Link>
            </div>
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
