"use client";

import Typewriter from '@/components/Typewriter';
import { BsArrowDown } from "react-icons/bs";
import { urlFor } from "@/utils/sanity/client";

import styles from './Hero.module.css';

interface HeroProps {
  data: {
    heroHeading?: string;
    heroPhrases?: string[];
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
        <h1 style={{ viewTransitionName: 'hero-title', minHeight: '1.2em' } as React.CSSProperties}>
          <Typewriter
            words={data?.heroPhrases}
            text={data?.heroHeading}
            speed={40}
            delay={200}
            loop={true}
            pauseBeforeDelete={2000}
          />
        </h1>
        <p className={styles.subheading}>{data?.heroSubheading}</p>
      </div>
      <div className={styles.scrollIcon}>
        <BsArrowDown />
      </div>
      <div className={styles.overlay} />
    </section>
  );
}
