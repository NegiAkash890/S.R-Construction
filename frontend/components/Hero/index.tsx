"use client";
import { urlFor } from "@/utils/sanity/client";
import content from "../../data/siteContent.json";
import styles from './Hero.module.css';

interface HeroProps {
  data: {
    heroHeading?: string;
    heroSubheading?: string;
    heroImage?: any;
  }
}

export default function Hero({ data }: HeroProps) {
  const bgImage = data?.heroImage ? urlFor(data.heroImage).url() : '';
  const { defaultHeading, defaultSubheading, ctaPrimary, ctaPrimaryLink, ctaSecondary, ctaSecondaryLink } = content.hero;

  return (
    <section className={styles.hero} style={{ backgroundImage: bgImage ? `url(${bgImage})` : undefined }}>
      <div className={`container ${styles.heroContent}`}>
        <h1>{data?.heroHeading || defaultHeading}</h1>
        <p className={styles.subheading}>{data?.heroSubheading || defaultSubheading}</p>
        <div className={styles.ctaGroup}>
          <a href={ctaPrimaryLink} className="btn">{ctaPrimary}</a>
          <a href={ctaSecondaryLink} className="btn btn-outline">{ctaSecondary}</a>
        </div>
      </div>
      <div className={styles.overlay}></div>
    </section>
  );
}
