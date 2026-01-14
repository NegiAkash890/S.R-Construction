"use client";

import { useEnquiry } from '@/context/EnquiryContext';
import styles from './CTASection.module.css';

export default function CTASection() {
    const { openEnquiry } = useEnquiry();

    return (
      <section className={styles.section}>
        <div className={`container ${styles.container}`}>
          <div className={styles.content}>
            <h2 className={styles.title}>Ready to Build Your Vision?</h2>
            <p className={styles.subtitle}>
              From concept to completion, we bring excellence to every project.
              Let's discuss how we can help you achieve your goals.
            </p>
            <button className={styles.ctaBtn} onClick={openEnquiry}>
              Enquire Now
            </button>
            <p className={styles.note}>
              Or call us at
              <a href="tel:+919065318052">+91 90653-18052</a>
            </p>
          </div>
        </div>
      </section>
    );
}
