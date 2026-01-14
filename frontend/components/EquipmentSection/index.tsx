"use client";
import { useRef } from 'react';
import { FiArrowLeft, FiArrowRight } from 'react-icons/fi';
import content from '../../data/siteContent.json';
import styles from './EquipmentSection.module.css';

export default function EquipmentSection() {
    const { title, items } = content.sections.equipment;
    const scrollRef = useRef<HTMLDivElement>(null);

    const scroll = (direction: 'left' | 'right') => {
        if (scrollRef.current) {
            const scrollAmount = 320; // Card width + gap
            const targetScroll = scrollRef.current.scrollLeft + (direction === 'left' ? -scrollAmount : scrollAmount);
            scrollRef.current.scrollTo({
                left: targetScroll,
                behavior: 'smooth'
            });
        }
    };

    return (
        <section className={styles.section} id="equipment">
            <div className="container">
                <div className={styles.header}>
                    <h2 className={styles.title}>{title}</h2>
                    <div className={styles.controls}>
                        <button onClick={() => scroll('left')} className={styles.navButton} aria-label="Scroll Left">
                            <FiArrowLeft />
                        </button>
                        <button onClick={() => scroll('right')} className={styles.navButton} aria-label="Scroll Right">
                            <FiArrowRight />
                        </button>
                    </div>
                </div>
                <div className={styles.scrollContainer} ref={scrollRef}>
                    <div className={styles.list}>
                        {items.map((item, index) => (
                            <div key={index} className={styles.card}>
                                <div className={styles.imagePlaceholder}>
                                    {/* Placeholder until images are generated */}
                                    <span>{item.name} Image</span>
                                </div>
                                <div className={styles.cardContent}>
                                    <h3 className={styles.itemName}>{item.name}</h3>
                                    <div className={styles.divider}></div>
                                    <div className={styles.quantityWrapper}>
                                        <span className={styles.qtyLabel}>Quantity</span>
                                        <span className={styles.qtyValue}>{item.quantity}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
