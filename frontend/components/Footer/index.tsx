"use client";
import content from '../../data/siteContent.json';
import styles from './Footer.module.css';
import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter, FaHardHat, FaAward } from 'react-icons/fa';

interface NavItem {
  label: string;
  href: string;
}

interface FooterProps {
  links: NavItem[];
}

export default function Footer({ links }: FooterProps) {
  const { brand, tagline, address, phone, email, copyright, social } = content.footer;

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
      <div className={styles.topBar}>
        <div className="container">
          <div className={styles.safetyBadge}>
            <FaHardHat className={styles.safetyIcon} />
            <span>Committed to Zero Accidents | Industry Leading Safety Standards</span>
          </div>
        </div>
      </div>

      <div className="container">
        <div className={styles.mainGrid}>
          {/* Brand Column */}
          <div className={styles.columnBrand}>
            <h2 className={styles.brandTitle}>{brand}</h2>
            <p className={styles.tagline}>{tagline}</p>
            <div className={styles.socialRow}>
              {social?.map((item: any, index: number) => (
                <a key={index} href={item.url} target="_blank" rel="noopener noreferrer" className={styles.socialLink}>
                  {getIcon(item.platform)}
                </a>
              ))}
            </div>
          </div>

          {/* Links Column */}
          <div className={styles.columnLinks}>
            <h4 className={styles.colTitle}>Quick Links</h4>
            <ul className={styles.linkList}>
              {links.map((link, index) => (
                <li key={index}><a href={link.href}>{link.label}</a></li>
              ))}
            </ul>
          </div>

          {/* Services/Certifications Column */}
          <div className={styles.columnCerts}>
            <h4 className={styles.colTitle}>Excellence</h4>
            <ul className={styles.iconList}>
              <li><FaAward className={styles.listIcon} /> ISO 9001:2015 Certified</li>
              <li><FaHardHat className={styles.listIcon} /> National Safety Council Member</li>
              <li><FaAward className={styles.listIcon} /> Best EPC Contractor 2024</li>
            </ul>
          </div>

          {/* Contact Column (Restored) */}
          <div className={styles.columnContact}>
            <h4 className={styles.colTitle}>Contact</h4>
            <div className={styles.contactItem}>
              <span className={styles.contactLabel}>Address</span>
              <p style={{ whiteSpace: 'pre-line' }}>{address}</p>
            </div>
            <div className={styles.contactItem}>
              <span className={styles.contactLabel}>Email</span>
              <p><a href={`mailto:${email}`}>{email}</a></p>
            </div>
            <div className={styles.contactItem}>
              <span className={styles.contactLabel}>Phone</span>
              <p><a href={`tel:${phone}`}>{phone}</a></p>
            </div>
          </div>
        </div>

        <div className={styles.bottomBar}>
          <p>© {new Date().getFullYear()} {copyright}. All rights reserved.</p>
          <div className={styles.legalLinks}>
            <a href="/privacy">Privacy Policy</a>
            <a href="/terms">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
