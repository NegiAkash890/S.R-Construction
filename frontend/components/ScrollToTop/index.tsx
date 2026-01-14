"use client";
import { useEffect, useState } from 'react';
import styles from './ScrollToTop.module.css';
import { BsArrowUp } from 'react-icons/bs';

export default function ScrollToTop() {
    const [isVisible, setIsVisible] = useState(false);

    const toggleVisibility = () => {
        if (window.scrollY > 300) {
            setIsVisible(true);
        } else {
            setIsVisible(false);
        }
    };

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    useEffect(() => {
        window.addEventListener('scroll', toggleVisibility);
        return () => window.removeEventListener('scroll', toggleVisibility);
    }, []);

    return (
        <>
            {isVisible && (
                <button onClick={scrollToTop} className={styles.scrollToTopBtn} aria-label="Scroll to top">
                    <BsArrowUp />
                </button>
            )}
        </>
    );
}
