"use client";
import { useState } from 'react';
import { urlFor } from "@/utils/sanity/client";
import styles from '../Gallery/Gallery.module.css'; // Reusing Gallery styles for grid
import filterStyles from './ProjectsGallery.module.css';

interface Props {
    data: any[];
}

export default function ProjectsGallery({ data }: Props) {
    const [filter, setFilter] = useState<'all' | 'completed' | 'ongoing'>('all');

    const filteredData = data.filter(item => {
        if (filter === 'all') return true;
        // Handle cases where projectStatus might be undefined by treating them as completed or filtering them out depending on preference.
        // Here we'll assume undefined = completed for backward compatibility or just check strict match
        return item.status === filter;
    });

    return (
        <section className={styles.gallerySection}>
            <div className="container">

                <div className={filterStyles.filterContainer}>
                    <button
                        className={`${filterStyles.filterButton} ${filter === 'all' ? filterStyles.active : ''}`}
                        onClick={() => setFilter('all')}
                    >
                        All Projects
                    </button>
                    <button
                        className={`${filterStyles.filterButton} ${filter === 'completed' ? filterStyles.active : ''}`}
                        onClick={() => setFilter('completed')}
                    >
                        Completed
                    </button>
                    <button
                        className={`${filterStyles.filterButton} ${filter === 'ongoing' ? filterStyles.active : ''}`}
                        onClick={() => setFilter('ongoing')}
                    >
                        Ongoing
                    </button>
                </div>

                <div className={styles.galleryGrid}>
                    {filteredData.map((item) => (
                        <div key={item._id} className={styles.galleryItem}>
                            {item.image && (
                                <div className={`${styles.imgWrapper} ${filterStyles.cardWrapper}`}>
                                    <img src={urlFor(item.image).height(400).width(600).url()} alt={item.title} />

                                    {/* Using a custom class for the overlay to override/extend defaults */}
                                    <div className={filterStyles.projectOverlay}>
                                        <h3 className={filterStyles.projectTitle}>{item.title}</h3>
                                        <span className={filterStyles.projectCategory}>{item.category}</span>

                                        <div className={filterStyles.metaGrid}>
                                            {item.clientName && (
                                                <div className={filterStyles.metaRow}>
                                                    <span className={filterStyles.metaLabel}>Client:</span>
                                                    <span>{item.clientName}</span>
                                                </div>
                                            )}
                                            {item.location && (
                                                <div className={filterStyles.metaRow}>
                                                    <span className={filterStyles.metaLabel}>Location:</span>
                                                    <span>{item.location}</span>
                                                </div>
                                            )}
                                            {(item.startDate || item.endDate) && (
                                                <div className={filterStyles.metaRow}>
                                                    <span className={filterStyles.metaLabel}>Date:</span>
                                                    <span>
                                                        {item.startDate ? new Date(item.startDate).getFullYear() : ''}
                                                        {item.endDate ? ` - ${new Date(item.endDate).getFullYear()}` : item.startDate ? ' - Present' : ''}
                                                    </span>
                                                </div>
                                            )}
                                        </div>

                                        {item.status && (
                                            <span className={filterStyles.projectStatusBadge}>
                                                {item.status}
                                            </span>
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                {filteredData.length === 0 && (
                    <p style={{ textAlign: 'center', opacity: 0.6, marginTop: '2rem' }}>No projects found for this category.</p>
                )}

            </div>
        </section>
    );
}
