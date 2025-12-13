"use client";
import { useEffect, useState, useRef } from 'react';
import content from '../../data/siteContent.json';
import styles from './ProjectsHero.module.css';

const CountUp = ({ end, duration = 2000, suffix = '' }: { end: number, duration?: number, suffix?: string }) => {
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

    return <span ref={countRef}>{count}{suffix}</span>;
};

export default function ProjectsHero() {
    const { title, subtitle, stats } = content.projectsPage.hero;

    const parseStat = (value: string) => {
        const number = parseInt(value, 10);
        const suffix = value.replace(number.toString(), '');
        return { number, suffix };
    };

    return (
        <section className={styles.hero}>
            <div className="container">
                <div className={styles.heroContent}>
                    <h1>{title}</h1>
                    <p className={styles.subtitle}>{subtitle}</p>

                    <div className={styles.statsGrid}>
                        {stats.map((stat, index) => {
                            const { number, suffix } = parseStat(stat.value);
                            return (
                                <div key={index} className={styles.statItem}>
                                    <div className={styles.statValue}>
                                        <CountUp end={number} suffix={suffix} />
                                    </div>
                                    <span className={styles.statLabel}>{stat.label}</span>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
}
