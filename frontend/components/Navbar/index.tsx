"use client";
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import content from '../../data/siteContent.json';
import styles from './Navbar.module.css';

import { useEnquiry } from '@/context/EnquiryContext';

// Define types for the navigation items
export interface NavItem {
  label: string;
  href: string;
}

interface NavbarProps {
  links: NavItem[];
}

export default function Navbar({ links }: NavbarProps) {
  const { logo } = content.navbar;
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

  const showBackground = scrolled || !isHome;

  return (
    <nav className={`${styles.navbar} ${showBackground ? styles.scrolled : ''}`}>
      <div className={`container ${styles.navContainer}`}>
        <Link href="/" className={styles.logo}>{logo}</Link>

        <button className={`${styles.hamburger} ${isOpen ? styles.active : ''}`} onClick={() => setIsOpen(!isOpen)}>
          <span className={styles.bar}></span>
          <span className={styles.bar}></span>
          <span className={styles.bar}></span>
        </button>

        <ul className={`${styles.navLinks} ${isOpen ? styles.active : ''}`}>
          {links.map((link, index) => (
            <li key={index}>
              <Link href={link.href} onClick={() => setIsOpen(false)}>{link.label}</Link>
            </li>
          ))}
          <li>
            <button
              className={styles.ctaButton}
              onClick={() => {
                setIsOpen(false);
                openEnquiry();
              }}
            >
              Enquire Now
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
}
