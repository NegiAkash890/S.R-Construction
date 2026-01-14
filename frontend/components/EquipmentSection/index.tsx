"use client";
import { useRef } from 'react';
import Image from 'next/image';
import { BsArrowLeft, BsArrowRight } from 'react-icons/bs';
import content from '../../data/siteContent.json';
import styles from './EquipmentSection.module.css';

const SCROLL_AMOUNT = 320;

const getImageForEquipment = (name: string) => {
    const n = name.toLowerCase();
    if (n.includes('hydra')) return '/images/equipment/hydra_crane.png';
    if (n.includes('dg set')) return '/images/equipment/dg_set.png';
    if (n.includes('compressor')) return '/images/equipment/air_compressor.png';
    if (n.includes('welding')) return '/images/equipment/welding_machine.png';

    // Fallbacks/Generic for others
    if (n.includes('cutting') || n.includes('grinding')) return '/images/equipment/welding_machine.png';
    return '/images/equipment/hydra_crane.png'; // Default to crane for general heavy machinery vibe
};

export default function EquipmentSection() {
    const { title, items } = content.sections.equipment;
    const scrollRef = useRef<HTMLDivElement>(null);

    const scroll = (direction: 'left' | 'right') => {
        if (scrollRef.current) {
            const targetScroll = scrollRef.current.scrollLeft + (direction === 'left' ? -SCROLL_AMOUNT : SCROLL_AMOUNT);
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
                            <BsArrowLeft />
                        </button>
                        <button onClick={() => scroll('right')} className={styles.navButton} aria-label="Scroll Right">
                            <BsArrowRight />
                        </button>
                    </div>
                </div>
                <div className={styles.scrollContainer} ref={scrollRef}>
                    <div className={styles.list}>
                        {items.map((item, index) => (
                            <div key={index} className={styles.card}>
                                <div className={styles.imagePlaceholder}>
                                    <Image
                                        src={getImageForEquipment(item.name)}
                                        alt={item.name}
                                        fill
                                        className={styles.equipmentImage}
                                        sizes="(max-width: 768px) 100vw, 300px"
                                    />
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
