import Link from 'next/link';
import Image from 'next/image';
import { urlFor } from '@/utils/sanity/client';
import styles from './FeaturedProjects.module.css';

interface Project {
    _id: string;
    title: string;
    clientName: string;
    workDescription: string;
    workValue: string;
    location: string;
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
                    {projects.map((project) => (
                        <div key={project._id} className={styles.card}>
                            <div className={styles.imageContainer}>
                                {project.image && (
                                    <Image
                                        src={urlFor(project.image).url()}
                                        alt={project.title || project.clientName}
                                        fill
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
                                        {project.location && (
                                            <div className={styles.metaItem}>
                                                <span className={styles.metaLabel}>Location</span>
                                                <span className={styles.metaValue}>{project.location}</span>
                                            </div>
                                        )}

                                        {project.workValue && (
                                            <div className={styles.metaItem}>
                                                <span className={styles.metaLabel}>Value</span>
                                                <span className={styles.metaValue}>{project.workValue}</span>
                                            </div>
                                        )}

                                        <div className={styles.metaItem}>
                                            <span className={styles.metaLabel}>Duration</span>
                                            <span className={styles.metaValue}>
                                                {formatDate(project.startDate)} - {project.endDate ? formatDate(project.endDate) : 'Present'}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
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
