"use client";

import Image from 'next/image';
import { urlFor } from '@/utils/sanity/client';
import { BsArrowRight } from 'react-icons/bs';
import Link from 'next/link';
import styles from './Industries.module.css';

interface Industry {
  _id: string;
  title: string;
  image: any;
  description: string;
  slug: { current: string };
}

interface IndustriesProps {
  data: Industry[];
  title?: string;
}

function Industries({ data, title = "Industries We Serve" }: IndustriesProps) {
  if (!data || data.length === 0) return null;

  return (
    <section className={styles.section} id="industries">
      <div className="container">
        <div className={styles.header}>
          <h2 className={styles.title}>{title}</h2>
          <p className={styles.sectionDescription}>
            Powering progress across the energy spectrum — from hydrocarbons and offshore wind to clean energy and carbon solutions. L&T Energy delivers end-to-end EPC and technology-driven solutions that enable global energy transition with efficiency, reliability, and sustainability at the core.
          </p>
        </div>

        <div className={styles.grid}>
          {data.map((industry) => (
            <Link href={`/industries/${industry.slug?.current}`} key={industry._id} className={styles.cardLink}>
              <div className={styles.card}>
                <div className={styles.imageWrapper}>
                  {industry.image && (
                    <Image
                      src={urlFor(industry.image).url()}
                      alt={industry.title}
                      fill
                      className={styles.image}
                    />
                  )}
                  <div className={styles.overlay}>
                    <h3 className={styles.cardTitle}>{industry.title}</h3>
                    <div className={styles.iconWrapper}>
                      <BsArrowRight className={styles.icon} />
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Industries;
