
"use client";

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { urlFor } from "@/utils/sanity/client";
import { FaTimes } from 'react-icons/fa';
import styles from './EquipmentModal.module.css';

interface EquipmentModalProps {
    item: any | null;
    isOpen: boolean;
    onClose: () => void;
    fallbackImage: (name: string) => string;
}

export default function EquipmentModal({ item, isOpen, onClose, fallbackImage }: EquipmentModalProps) {
    const [isVisible, setIsVisible] = useState(false);
    const [animate, setAnimate] = useState(false);

    useEffect(() => {
        if (isOpen) {
            setIsVisible(true);
            document.body.style.overflow = 'hidden';
            const timer = setTimeout(() => setAnimate(true), 10);
            return () => clearTimeout(timer);
        } else {
            setAnimate(false);
            const timer = setTimeout(() => {
                setIsVisible(false);
                document.body.style.overflow = 'unset';
            }, 300);
            return () => clearTimeout(timer);
        }
    }, [isOpen]);

    if (!isVisible && !isOpen) return null;

    const displayImage = item?.image ? urlFor(item.image).url() : (item ? fallbackImage(item.name) : '');

    return (
        <div className={`${styles.backdrop} ${animate ? styles.open : ''}`} onClick={onClose}>
            <div className={`${styles.modal} ${animate ? styles.slideIn : ''}`} onClick={(e) => e.stopPropagation()}>
                <button className={styles.closeButton} onClick={onClose} aria-label="Close modal">
                    <FaTimes />
                </button>

                {item && (
                    <div className={styles.content}>
                        <div className={styles.imageWrapper}>
                            <Image
                                src={displayImage}
                                alt={item.name}
                                fill
                                className={styles.image}
                                sizes="(max-width: 768px) 100vw, 800px"
                            />
                        </div>

                        <div className={styles.details}>
                            <div className={styles.headerGroup}>
                                <h2 className={styles.title}>{item.name}</h2>
                                {item.quantity && <span className={styles.tagline}>Qty: {item.quantity}</span>}
                            </div>

                            <div className={styles.section}>
                                <h3 className={styles.sectionTitle}>Overview</h3>
                                <p className={styles.description}>
                                    {item.description || "Detailed description coming soon."}
                                </p>
                            </div>

                            {item.features && item.features.length > 0 && (
                                <div className={styles.section}>
                                    <h3 className={styles.sectionTitle}>Key Features</h3>
                                    <ul className={styles.featureList}>
                                        {item.features.map((feature: string, idx: number) => (
                                            <li key={idx} className={styles.featureItem}>{feature}</li>
                                        ))}
                                    </ul>
                                </div>
                            )}

                            {item.specification && (
                                <div className={styles.section}>
                                    <h3 className={styles.sectionTitle}>Technical Specifications</h3>
                                    <div className={styles.specs}>
                                        {item.specification}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
