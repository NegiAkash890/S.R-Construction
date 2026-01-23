"use client";

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { BsArrowLeft, BsArrowRight } from 'react-icons/bs';
import { urlFor } from "@/utils/sanity/client";

import styles from './EquipmentSection.module.css';

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

interface Props {
  data: any[];
  title?: string;
}

export default function EquipmentSection({ data = [], title }: Props) {

  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  // Use passed data
  const items = data;

  const checkScrollButtons = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 5); // 5px tolerance
    }
  };

  useEffect(() => {
    checkScrollButtons();
    window.addEventListener('resize', checkScrollButtons);
    return () => window.removeEventListener('resize', checkScrollButtons);
  }, [items]);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const container = scrollRef.current;
      const scrollAmount = container.clientWidth / (window.innerWidth < 768 ? 1 : 3); // Scroll 1 item width

      container.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  const getDisplayImage = (item: any) => {
    if (item.image) return urlFor(item.image).url();
    return getImageForEquipment(item.name);
  };

  return (
    <section className={styles.section} id="equipment">
      <div className="container">
        <div className={styles.header}>
          <h2 className={styles.title}>{title || "Machinery & Equipment Assets"}</h2>
          <div className={styles.navArrows}>
            <button
              onClick={() => scroll('left')}
              className={`${styles.arrowBtn} ${!canScrollLeft ? styles.disabled : ''}`}
              disabled={!canScrollLeft}
              aria-label="Previous"
            >
              <BsArrowLeft />
            </button>
            <button
              onClick={() => scroll('right')}
              className={`${styles.arrowBtn} ${!canScrollRight ? styles.disabled : ''}`}
              disabled={!canScrollRight}
              aria-label="Next"
            >
              <BsArrowRight />
            </button>
          </div>
        </div>
        <div
          className={styles.sliderContainer}
          ref={scrollRef}
          onScroll={checkScrollButtons}
        >
          {items.map((item: any, index: number) => (
            <div key={item._id || index} className={styles.card}>
              <div className={styles.imageContainer}>
                <Image
                  src={getDisplayImage(item)}
                  alt={item.name}
                  fill
                  className={styles.equipmentImage}
                  sizes="(max-width: 768px) 100vw, 300px"
                />
                {/* Placeholder logic removed in favor of helper method which covers all cases */}
                {item.quantity && (
                  <div className={styles.badge}>
                    <span className={styles.badgeLabel}>Qty</span>
                    <span className={styles.badgeValue}>{item.quantity}</span>
                  </div>
                )}
              </div>
              <div className={styles.cardContent}>
                <h3 className={styles.itemName}>{item.name}</h3>
                <div className={styles.techLine} />
              </div>
            </div>
          ))}

          {/* See More Card - Only show if 3 or more items */}
          {items.length >= 3 && (
            <Link href="/equipments" className={styles.seeMoreCard}>
              <div className={styles.seeMoreContent}>
                <span className={styles.seeMoreText}>View All<br />Equipment</span>
                <div className={styles.seeMoreIconWrapper}>
                  <BsArrowRight className={styles.seeMoreIcon} />
                </div>
              </div>
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}
