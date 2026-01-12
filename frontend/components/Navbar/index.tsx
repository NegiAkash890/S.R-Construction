"use client";
import { useState, useEffect } from 'react';
import Link from 'next/link';
import content from '../../data/siteContent.json';
import styles from './Navbar.module.css';

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

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`${styles.navbar} ${scrolled ? styles.scrolled : ''}`}>
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
        </ul>
      </div>
    </nav>
  );
}
