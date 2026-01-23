"use client";

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { useSearchParams, useRouter } from 'next/navigation';
import { urlFor } from "@/utils/sanity/client";
import { BsArrowUpRight } from 'react-icons/bs';
import styles from './ProjectsGallery.module.css';
import ProjectModal from '../ProjectModal';

interface Props {
  data: any[];
}

export default function ProjectsGallery({ data }: Props) {
  const [filter, setFilter] = useState<'all' | 'completed' | 'ongoing'>('all');
  const [selectedProject, setSelectedProject] = useState<any | null>(null);

  const [pillStyle, setPillStyle] = useState({});
  const tabsRef = useRef<{ [key: string]: HTMLButtonElement | null }>({});

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

  useEffect(() => {
    const activeTab = tabsRef.current[filter];
    if (activeTab) {
      setPillStyle({
        width: activeTab.offsetWidth,
        left: activeTab.offsetLeft,
      });
    }
  }, [filter]);

  const filteredData = data.filter((item) => {
    if (filter === 'all') return true;

    // Normalize status
    const status = item.status?.toLowerCase() || '';

    if (filter === 'completed') {
      return status === 'completed';
    }

    if (filter === 'ongoing') {
      // Treat various "active" states as ongoing
      return status === 'ongoing' || status === 'in-progress' || status === 'in progress';
    }

    return false;
  });

  return (
    <section className={styles.gallerySection}>
      <div className="container">

        <div className={styles.filterContainer}>
          <div
            className={styles.activePill}
            style={pillStyle}
          />
          {(['all', 'completed', 'ongoing'] as const).map((f) => (
            <button
              key={f}
              ref={(el) => { tabsRef.current[f] = el; }}
              className={`${styles.filterButton} ${filter === f ? styles.active : ''}`}
              onClick={() => setFilter(f)}
            >
              {f === 'all' ? 'All Projects' : f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>

        <div className={styles.galleryGrid}>
          {filteredData.map((item) => {
            const displayImageUrl = item.gallery?.[0]
              ? urlFor(item.gallery[0]).url()
              : (item.image ? urlFor(item.image).url() : null);

            return (
              <div
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
              </div>
            );
          })}
        </div>

        {
          filteredData.length === 0 && (
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
