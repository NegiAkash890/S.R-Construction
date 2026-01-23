"use client";

import {
  FaFacebook, FaInstagram, FaLinkedin, FaTwitter, FaHardHat, FaAward, FaMapMarkerAlt, FaEnvelope, FaPhoneAlt, FaFilePdf
} from 'react-icons/fa';

import styles from './Footer.module.css';

interface NavItem {
  label: string;
  href: string;
}

interface FooterProps {
  links: NavItem[];
  data: any;
}

export default function Footer({ links, data }: FooterProps) {
  const {
    brand, tagline, address, phone, email, copyright, socialLinks
  } = data || {};

  const getIcon = (platform: string) => {
    switch (platform) {
      case 'facebook': return <FaFacebook />;
      case 'instagram': return <FaInstagram />;
      case 'linkedin': return <FaLinkedin />;
      case 'twitter': return <FaTwitter />;
      default: return null;
    }
  };

  return (
    <footer className={styles.footer}>
      {/* Top Section with Safety Badge */}
      {/* <div className={styles.topBar}>
        <div className="container">
          <div className={styles.safetyBadge}>
            <FaHardHat className={styles.safetyIcon} />
            <span>Committed to Zero Accidents | Industry Leading Safety Standards</span>
          </div>
        </div>
      </div> */}

      <div className="container">
        <div className={styles.mainGrid}>
          {/* Combined Brand & Excellence Column */}
          <div className={styles.columnBrand}>
            <h2 className={styles.brandTitle}>{brand}</h2>
            <p className={styles.tagline}>{tagline}</p>

            <div className={styles.socialRow}>
              {socialLinks?.map((item: any, index: number) => (
                <a key={index} href={item.url} target="_blank" rel="noopener noreferrer" className={styles.socialLink}>
                  {getIcon(item.platform)}
                </a>
              ))}
            </div>
          </div>

          {/* Links Column */}
          <div className={styles.columnLinks}>
            <h4 className={styles.colTitle}>Company</h4>
            <ul className={styles.linkList}>
              {links.map((link, index) => (
                <li key={index}><a href={link.href}>{link.label}</a></li>
              ))}
            </ul>
          </div>

          {/* Contact Column */}
          <div className={styles.columnContact}>
            <h4 className={styles.colTitle}>Get In Touch</h4>

            <div className={styles.contactItem}>
              <FaMapMarkerAlt className={styles.contactIcon} />
              <div className={styles.contactContent}>
                <p style={{ whiteSpace: 'pre-line' }}>{address}</p>
              </div>
            </div>

            <div className={styles.contactItem}>
              <FaEnvelope className={styles.contactIcon} />
              <div className={styles.contactContent}>
                <p><a href={`mailto:${email}`}>{email}</a></p>
              </div>
            </div>

            <div className={styles.contactItem}>
              <FaPhoneAlt className={styles.contactIcon} />
              <div className={styles.contactContent}>
                <p><a href={`tel:${phone}`}>{phone}</a></p>
              </div>
            </div>

            <a href="/company-profile.pdf" className={styles.downloadBtn} target="_blank" rel="noopener noreferrer">
              <FaFilePdf />
              Download Company Profile
            </a>
          </div>
        </div>

        <div className={styles.bottomBar}>
          <p className={styles.copyright}>
            ©
            {new Date().getFullYear()}
            {' '}
            {copyright}
            .
          </p>
          <div className={styles.legalLinks}>
            <a href="/privacy">Privacy</a>
            <a href="/terms">Terms</a>
            <a href="/sitemap">Sitemap</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
