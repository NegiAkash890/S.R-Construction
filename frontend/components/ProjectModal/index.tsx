import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { urlFor } from "@/utils/sanity/client";
import { formatIndianCurrency } from "@/utils/formatCurrency";
import styles from './ProjectModal.module.css';

interface ProjectModalProps {
    project: any | null;
    isOpen: boolean;
    onClose: () => void;
}

export default function ProjectModal({ project, isOpen, onClose }: ProjectModalProps) {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    // Lock body scroll when open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
            setCurrentImageIndex(0);
        } else {
            document.body.style.overflow = 'unset';
        }
    }, [isOpen]);

    // Only use gallery images for the carousel (Main image is treated as logo)
    const carouselImages = project ? (project.gallery || []).filter(Boolean) : [];

    const nextImage = (e: React.MouseEvent) => {
        e.stopPropagation();
        setCurrentImageIndex((prev) => (prev + 1) % carouselImages.length);
    };

    const prevImage = (e: React.MouseEvent) => {
        e.stopPropagation();
        setCurrentImageIndex((prev) => (prev - 1 + carouselImages.length) % carouselImages.length);
    };

    return (
        <AnimatePresence>
            {isOpen && project && (
                <motion.div
                    className={styles.backdrop}
                    onClick={onClose}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                >
                    <motion.div
                        className={styles.modal}
                        onClick={(e) => e.stopPropagation()}
                        initial={{ y: 100, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: 100, opacity: 0 }}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    >
                        <button className={styles.closeButton} onClick={onClose}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                        </button>

                        <div className={styles.content}>
                            {/* Hero Section (Carousel) */}
                            <div className={styles.heroImageWrapper}>
                                {carouselImages.length > 0 && (
                                    <Image
                                        key={currentImageIndex}
                                        src={urlFor(carouselImages[currentImageIndex]).url()}
                                        alt={`${project.title} - view ${currentImageIndex + 1}`}
                                        fill
                                        className={styles.heroImage}
                                        priority
                                    />
                                )}

                                {/* Carousel Controls */}
                                {carouselImages.length > 1 && (
                                    <>
                                        <button className={`${styles.carouselBtn} ${styles.prevBtn}`} onClick={prevImage}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
                                        </button>
                                        <button className={`${styles.carouselBtn} ${styles.nextBtn}`} onClick={nextImage}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
                                        </button>

                                        <div className={styles.carouselIndicators}>
                                            {carouselImages.map((_: any, idx: number) => (
                                                <span
                                                    key={idx}
                                                    className={`${styles.indicator} ${idx === currentImageIndex ? styles.activeIndicator : ''}`}
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        setCurrentImageIndex(idx);
                                                    }}
                                                />
                                            ))}
                                        </div>
                                    </>
                                )}
                                <div className={styles.heroOverlay}>
                                    <h2 className={styles.projectTitle}>{project.title}</h2>
                                </div>
                            </div>

                            {/* Details Grid */}
                            <div className={styles.detailsBody}>
                                <div className={styles.statsGrid}>
                                    <div className={styles.statItem}>
                                        <span className={styles.statLabel}>Location</span>
                                        <span className={styles.statValue}>
                                            {Array.isArray(project.location)
                                                ? project.location.join(', ')
                                                : (project.location || 'N/A')}
                                        </span>
                                    </div>
                                    <div className={styles.statItem}>
                                        <span className={styles.statLabel}>Value</span>
                                        <span className={styles.statValue}>{project.workValue ? formatIndianCurrency(project.workValue) : 'N/A'}</span>
                                    </div>
                                    <div className={styles.statItem}>
                                        <span className={styles.statLabel}>Year</span>
                                        <span className={styles.statValue}>{project.startDate ? new Date(project.startDate).getFullYear() : 'N/A'}</span>
                                    </div>
                                    <div className={styles.statItem}>
                                        <span className={styles.statLabel}>Client</span>
                                        <div className={styles.clientWrapper}>
                                            {project.image && (
                                                <div className={styles.clientLogoWrapper}>
                                                    <Image
                                                        src={urlFor(project.image).url()}
                                                        alt={project.clientName || 'Client'}
                                                        width={40}
                                                        height={40}
                                                        className={styles.clientLogo}
                                                    />
                                                </div>
                                            )}
                                            <span className={styles.statValue}>{project.clientName || 'N/A'}</span>
                                        </div>
                                    </div>
                                </div>

                                <div className={styles.description}>
                                    <h4 className={styles.sectionTitle}>Project Overview</h4>
                                    <p className={styles.descriptionText}>
                                        {project.description || "No specific description available for this project."}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
