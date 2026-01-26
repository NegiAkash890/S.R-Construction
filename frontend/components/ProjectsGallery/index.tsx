"use client";

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { useSearchParams, useRouter } from 'next/navigation';
import { urlFor } from "@/utils/sanity/client";
import { BsArrowUpRight } from 'react-icons/bs';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './ProjectsGallery.module.css';
import ProjectModal from '../ProjectModal';

interface Props {
  data: any[];
}

export default function ProjectsGallery({ data }: Props) {
  // Independent Filter States
  const [statusFilter, setStatusFilter] = useState<'all' | 'completed' | 'ongoing'>('all');
  const [industryFilter, setIndustryFilter] = useState<string>('all');

  const [sort, setSort] = useState<'date' | 'client' | 'value'>('date');
  const [selectedProject, setSelectedProject] = useState<any | null>(null);

  const searchParams = useSearchParams();
  const router = useRouter();
  const projectId = searchParams.get('projectId');

  useEffect(() => {
    if (projectId && data) {
      const foundProject = data.find(p => p._id === projectId);
      if (foundProject) {
        setSelectedProject(foundProject);
      }
    } else {
      setSelectedProject(null);
    }
  }, [projectId, data]);

  const handleProjectClick = (project: any) => {
    router.push(`/projects?projectId=${project._id}`, { scroll: false });
  };

  const handleCloseModal = () => {
    router.push('/projects', { scroll: false });
    setSelectedProject(null);
  };

  // 1. Filter Data
  const filteredData = data.filter((item) => {
    // Check Status
    let statusMatch = true;
    if (statusFilter !== 'all') {
      const status = item.status?.toLowerCase() || '';
      if (statusFilter === 'completed') {
        statusMatch = status === 'completed';
      } else if (statusFilter === 'ongoing') {
        statusMatch = status === 'ongoing' || status === 'in-progress' || status === 'in progress';
      }
    }

    // Check Industry
    let industryMatch = true;
    if (industryFilter !== 'all') {
      industryMatch = item.industry?.slug?.current === industryFilter;
    }

    // Combine checks independenty (AND logic)
    return statusMatch && industryMatch;
  });

  // 2. Sort Data
  const sortedData = [...filteredData].sort((a, b) => {
    if (sort === 'client') {
      return (a.clientName || '').localeCompare(b.clientName || '');
    }
    if (sort === 'value') {
      return (b.workValue || 0) - (a.workValue || 0); // Descending Value
    }
    // Default: Date (Newest First)
    const dateA = new Date(a.endDate || a.startDate || 0).getTime();
    const dateB = new Date(b.endDate || b.startDate || 0).getTime();
    return dateB - dateA;
  });

  return (
    <section className={styles.gallerySection}>
      <div className="container">

        {/* Control Bar Container */}
        <div className={styles.controlsContainer}>

          {/* Top Bar: Status + Sort */}
          <div className={styles.topBar}>
            {/* Status Filter */}
            {/* Desktop: Buttons */}
            <div className={`${styles.filterButtons} ${styles.desktopFilter}`}>
              <button
                className={`${styles.filterBtn} ${statusFilter === 'all' ? styles.active : ''}`}
                onClick={() => setStatusFilter('all')}
              >
                All
              </button>
              <button
                className={`${styles.filterBtn} ${statusFilter === 'completed' ? styles.active : ''}`}
                onClick={() => setStatusFilter('completed')}
              >
                Completed
              </button>
              <button
                className={`${styles.filterBtn} ${statusFilter === 'ongoing' ? styles.active : ''}`}
                onClick={() => setStatusFilter('ongoing')}
              >
                Ongoing
              </button>
            </div>

            {/* Mobile: Status Dropdown */}
            <div className={`${styles.selectWrapper} ${styles.mobileFilter}`}>
              <label className={styles.selectLabel}>Status:</label>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value as any)}
                className={styles.selectInput}
              >
                <option value="all">All Status</option>
                <option value="completed">Completed</option>
                <option value="ongoing">Ongoing</option>
              </select>
            </div>

            {/* Sort (Always Dropdown) */}
            <div className={styles.selectWrapper}>
              <label className={styles.selectLabel}>Sort:</label>
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value as any)}
                className={styles.selectInput}
              >
                <option value="date">Newest</option>
                <option value="client">Client</option>
                <option value="value">Value</option>
              </select>
            </div>
          </div>

          {/* Industry Bar (Row 2) */}
          <div className={styles.industryBar}>
            {/* Desktop: Buttons */}
            <div className={`${styles.filterButtons} ${styles.desktopFilter}`}>
              <button
                className={`${styles.filterBtn} ${industryFilter === 'all' ? styles.active : ''}`}
                onClick={() => setIndustryFilter('all')}
              >
                All Industries
              </button>
              <button
                className={`${styles.filterBtn} ${industryFilter === 'power-energy' ? styles.active : ''}`}
                onClick={() => setIndustryFilter('power-energy')}
              >
                Power
              </button>
              <button
                className={`${styles.filterBtn} ${industryFilter === 'oil-gas' ? styles.active : ''}`}
                onClick={() => setIndustryFilter('oil-gas')}
              >
                Oil & Gas
              </button>
              <button
                className={`${styles.filterBtn} ${industryFilter === 'fertilizers-chemicals' ? styles.active : ''}`}
                onClick={() => setIndustryFilter('fertilizers-chemicals')}
              >
                Fertilizers
              </button>
              <button
                className={`${styles.filterBtn} ${industryFilter === 'steel-metals' ? styles.active : ''}`}
                onClick={() => setIndustryFilter('steel-metals')}
              >
                Steel
              </button>
              <button
                className={`${styles.filterBtn} ${industryFilter === 'other-infrastructure' ? styles.active : ''}`}
                onClick={() => setIndustryFilter('other-infrastructure')}
              >
                Other Infra
              </button>
            </div>

            {/* Mobile: Industry Dropdown */}
            <div className={`${styles.selectWrapper} ${styles.mobileFilter}`}>
              <label className={styles.selectLabel}>Industry:</label>
              <select
                value={industryFilter}
                onChange={(e) => setIndustryFilter(e.target.value)}
                className={styles.selectInput}
              >
                <option value="all">All Industries</option>
                <option value="power-energy">Power & Energy</option>
                <option value="oil-gas">Oil & Gas</option>
                <option value="fertilizers-chemicals">Fertilizers & Chemicals</option>
                <option value="steel-metals">Steel & Metals</option>
                <option value="other-infrastructure">Other Infrastructure</option>
              </select>
            </div>
          </div>

        </div>

        <div className={styles.resultsCount} style={{ marginBottom: '1rem', color: 'var(--slate-500)', fontSize: '0.9rem', fontWeight: 500 }}>
          Showing {sortedData.length} project{sortedData.length !== 1 ? 's' : ''}
        </div>

        <motion.div layout className={styles.galleryGrid}>
          <AnimatePresence mode='popLayout'>
            {sortedData.map((item) => {
              const displayImageUrl = item.gallery?.[0]
                ? urlFor(item.gallery[0]).url()
                : (item.image ? urlFor(item.image).url() : null);

              return (
                <motion.div
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  key={item._id}
                  className={styles.galleryItem}
                  onClick={() => handleProjectClick(item)}
                >
                  <div className={styles.cardInner}>
                    <div className={styles.imageWrapper}>
                      {displayImageUrl ? (
                        <Image
                          src={displayImageUrl}
                          alt={item.title}
                          fill
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          className={styles.projectImage}
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
                    </div>

                    <div className={styles.cardContent}>
                      <div className={styles.textWrapper}>
                        <span className={styles.clientName}>{item.clientName || 'Client Name'}</span>
                        <h3 className={styles.projectTitle}>{item.title}</h3>
                      </div>
                      <div className={styles.actionIcon}>
                        <BsArrowUpRight />
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>

        {
          sortedData.length === 0 && (
            <p style={{ textAlign: 'center', opacity: 0.6, marginTop: '2rem' }}>No projects found for this category.</p>
          )
        }

        < ProjectModal
          project={selectedProject}
          isOpen={!!selectedProject}
          onClose={handleCloseModal}
        />

      </div >
    </section >
  );
}
