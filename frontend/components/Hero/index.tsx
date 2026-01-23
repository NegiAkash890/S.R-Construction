"use client";

import { BsArrowDown } from "react-icons/bs";
import { urlFor } from "@/utils/sanity/client";

import styles from './Hero.module.css';

interface HeroProps {
  data: {
    heroHeading?: string;
    heroSubheading?: string;
    heroImage?: any;
    ctaPrimary?: string;
    ctaPrimaryLink?: string;
    ctaSecondary?: string;
    ctaSecondaryLink?: string;
  }
}

export default function Hero({ data }: HeroProps) {
  const bgImage = data?.heroImage ? urlFor(data.heroImage).url() : '';

  return (
    <section className={styles.hero} style={{ '--hero-bg-image': bgImage ? `url(${bgImage})` : undefined } as React.CSSProperties}>
      <div className={`container ${styles.heroContent}`}>
        <h1 style={{ viewTransitionName: 'hero-title' } as React.CSSProperties}>{data?.heroHeading}</h1>
        <p className={styles.subheading}>{data?.heroSubheading}</p>
        <div className={styles.ctaGroup}>
          <a href={data?.ctaPrimaryLink || "#gallery"} className="btn">{data?.ctaPrimary || "View Our Work"}</a>
          <a href={data?.ctaSecondaryLink || "#contact"} className="btn btn-outline">{data?.ctaSecondary || "Contact Us"}</a>
        </div>
      </div>
      <div className={styles.scrollIcon}>
        <BsArrowDown />
      </div>
      <div className={styles.overlay} />
    </section>
  );
}
