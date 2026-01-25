"use client";

import { useEffect, useState } from 'react';
import { BsArrowUp, BsEnvelope } from 'react-icons/bs';
import styles from './ScrollToTop.module.css';
import { useEnquiry } from '@/context/EnquiryContext';

export default function ScrollToTop() {
    const [isVisible, setIsVisible] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const { openEnquiry } = useEnquiry();

    const toggleVisibility = () => {
        if (window.scrollY > 300) {
            setIsVisible(true);
        } else {
            setIsVisible(false);
        }
    };

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth <= 768);
        };

        checkMobile();
        window.addEventListener('resize', checkMobile);
        window.addEventListener('scroll', toggleVisibility);

        return () => {
            window.removeEventListener('resize', checkMobile);
            window.removeEventListener('scroll', toggleVisibility);
        };
    }, []);

    if (!isVisible) return null;

    return (
        <>
            {isMobile ? (
                <button
                    onClick={openEnquiry}
                    className={styles.enquiryFab}
                    aria-label="Enquire Now"
                >
                    <BsEnvelope />
                </button>
            ) : (
                <button
                    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                    className={styles.scrollToTopBtn}
                    aria-label="Scroll to top"
                >
                    <BsArrowUp />
                </button>
            )}
        </>
    );
}
