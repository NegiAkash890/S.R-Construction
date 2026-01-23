"use client";

import { useEffect, useState, useRef } from 'react';

import styles from './ProjectsHero.module.css';

function CountUp({ end, duration = 2000, suffix = '' }: { end: number, duration?: number, suffix?: string }) {
  const [count, setCount] = useState(0);
  const countRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        let start = 0;
        const increment = end / (duration / 16); // 60fps

        const timer = setInterval(() => {
          start += increment;
          if (start >= end) {
            setCount(end);
            clearInterval(timer);
          } else {
            setCount(Math.floor(start));
          }
        }, 16);

        observer.disconnect();
      }
    });

    if (countRef.current) {
      observer.observe(countRef.current);
    }

    return () => observer.disconnect();
  }, [end, duration]);

  return (
    <span ref={countRef}>
      {count}
      {suffix}
    </span>
  );
}

interface HeroProps {
  data: {
    heroTitle?: string;
    heroSubtitle?: string;
    stats?: Array<{ label: string; value: string }>;
  }
}

export default function ProjectsHero({ data }: HeroProps) {
  // Use data from props if available
  const heroTitle = data?.heroTitle || "Our Projects";
  const heroSubtitle = data?.heroSubtitle || "Delivering excellence across residential, commercial, and industrial sectors.";
  const heroStats = data?.stats || [
    { label: "Years of Experience", value: "25+" },
    { label: "Projects Completed", value: "500+" },
    { label: "Happy Clients", value: "1200+" }
  ];

  const parseStat = (value: string) => {
    const number = parseInt(value, 10);
    const suffix = value.replace(number.toString(), '');
    return { number, suffix };
  };

  return (
    <section className={styles.hero}>
      <div className="container">
        <div className={styles.heroContent}>
          <div className={styles.titleColumn}>
            <h1 style={{ viewTransitionName: 'hero-title' } as React.CSSProperties} className={styles.heroTitle}>
              {heroTitle}
            </h1>
            <p className={styles.subtitle}>{heroSubtitle}</p>
          </div>

          <div className={styles.statsColumn}>
            {heroStats && heroStats.map((stat: any, index: number) => {
              const { number, suffix } = parseStat(stat.value);
              return (
                <div key={index} className={styles.statItem}>
                  <span className={styles.statLabel}>{stat.label}</span>
                  <div className={styles.statValue}>
                    <CountUp end={number} suffix={suffix} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
