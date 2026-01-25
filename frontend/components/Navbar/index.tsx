"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEnquiry } from '@/context/EnquiryContext';
import { motion, AnimatePresence } from 'framer-motion';

import styles from './Navbar.module.css';

// Define types for the navigation items
export interface NavItem {
  label: string;
  href: string;
}

interface NavbarProps {
  links: NavItem[];
  logo: string;
}

export default function Navbar({ links, logo }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { openEnquiry } = useEnquiry();
  const pathname = usePathname();
  const isHome = pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  /* Force background if not home, or if scrolled */
  const showBackground = scrolled || !isHome;

  return (
    <nav className={`${styles.navbar} ${showBackground ? styles.scrolled : ''}`}>
      <div className={`container ${styles.navContainer}`}>
        <Link href="/" className={styles.logo}>{logo}</Link>

        {/* Hamburger */}
        <button className={`${styles.hamburger} ${isOpen ? styles.active : ''}`} onClick={() => setIsOpen(!isOpen)}>
          <span className={styles.bar} />
          <span className={styles.bar} />
          <span className={styles.bar} />
        </button>

        {/* Desktop Nav */}
        <ul className={styles.navLinks}>
          {links.map((link, index) => (
            <li key={index}>
              <Link href={link.href}>{link.label}</Link>
            </li>
          ))}
          <li>
            <button className={styles.ctaButton} onClick={openEnquiry}>
              Enquire Now
            </button>
          </li>
        </ul>

        {/* Mobile Nav (Framer Motion) */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              className={styles.mobileMenu}
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'tween', duration: 0.3, ease: 'easeInOut' }}
            >
              <div className={styles.mobileHeader}>
                <Link href="/" className={styles.mobileLogo} onClick={() => setIsOpen(false)}>{logo}</Link>
              </div>

              <ul className={styles.mobileMenuList}>
                {links.map((link, index) => (
                  <li key={index}>
                    <Link href={link.href} onClick={() => setIsOpen(false)}>{link.label}</Link>
                  </li>
                ))}
              </ul>

              <div className={styles.mobileFooter}>
                <button
                  className={styles.ctaButton}
                  onClick={() => {
                    setIsOpen(false);
                    openEnquiry();
                  }}
                >
                  Enquire Now
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
}
