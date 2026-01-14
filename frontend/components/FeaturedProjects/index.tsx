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
          <div className={styles.grid}>
            {projects.map((project) => {
                        const locations = Array.isArray(project.location) ? project.location : [];
                        const displayLocations = locations.slice(0, 1);
                        const extraLocations = locations.slice(1);

                        return (
                          <div key={project._id} className={styles.card}>
                            <div className={styles.imageContainer}>
                              {project.image && (
                                <Image
                                  src={urlFor(project.image).width(1200).quality(100).url()}
                                  alt={project.title || project.clientName}
                                  fill
                                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                  className={styles.projectImage}
                                />
                                    )}
                              <div className={styles.statusOverlay}>
                                <span
                                  className={`${styles.statusBadge} ${project.status === 'completed'
                                                ? styles.statusCompleted
                                                : styles.statusInProgress
                                                }`}
                                >
                                  {(project.status === 'in-progress' || project.status === 'ongoing')
                                                ? 'In Progress'
                                                : 'Completed'}
                                </span>
                              </div>
                            </div>
                            <div className={styles.cardContent}>
                              <div className={styles.cardHeader}>
                                <h3 className={styles.clientName}>{project.clientName || 'Client Name'}</h3>
                              </div>
                              <div className={styles.cardBody}>
                                <p className={styles.description}>{project.workDescription}</p>

                                <div className={styles.metaGrid}>
                                  <div className={styles.metaItem}>
                                    <span className={styles.metaLabel}>Location</span>
                                    <div className={styles.locationWrapper}>
                                      <span className={styles.metaValue}>
                                        {displayLocations.join(', ')}
                                      </span>
                                      {extraLocations.length > 0 && (
                                        <span className={styles.moreLocations}>
                                          +
                                          {extraLocations.length}
                                          <span className={styles.locationsTooltip}>
                                            {locations.join(', ')}
                                          </span>
                                        </span>
                                                    )}
                                    </div>
                                  </div>

                                  {project.workValue && (
                                    <div className={styles.metaItem}>
                                      <span className={styles.metaLabel}>Value</span>
                                      <span className={styles.metaValue}>
                                        {formatIndianCurrency(project.workValue)}
                                      </span>
                                    </div>
                                            )}

                                  <div className={styles.metaItem}>
                                    <span className={styles.metaLabel}>Duration</span>
                                    <span className={styles.metaValue}>
                                      {formatDate(project.startDate)}
                                      {' '}
                                      -
                                      {project.endDate ? formatDate(project.endDate) : 'Present'}
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                    })}
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
