"use client";

import React from 'react';
import Link from 'next/link';
import styles from './not-found.module.css';

export default function NotFound() {
    return (
        <div className={styles.container}>
            {/* Marquee Background */}
            <div className={styles.marqueeContainer}>
                <div className={styles.marqueeContent}>
                    <span>PAGE NOT FOUND — CONSTRUCTION HALTED — BLUEPRINT MISSING — SAFETY HAZARD — </span>
                    <span>PAGE NOT FOUND — CONSTRUCTION HALTED — BLUEPRINT MISSING — SAFETY HAZARD — </span>
                </div>
            </div>

            <div className={styles.content}>
                {/* <h1 className={styles.glitch} data-text="404">404</h1> */}

                <div className={styles.messageBox}>
                    <p className={styles.description}>
                        The page you are looking for has been moved, removed, or possibly never existed.
                        Proceed with caution back to the main site.
                    </p>

                    <Link href="/" className={styles.homeBtn}>
                        RETURN TO SAFETY
                    </Link>
                </div>
            </div>
        </div>
    );
}
