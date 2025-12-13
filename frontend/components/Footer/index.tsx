"use client";
import content from '../../data/siteContent.json';
import styles from './Footer.module.css';
import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter } from 'react-icons/fa';

export default function Footer() {
  const { brand, tagline, address, phone, email, copyright, social } = content.footer;
  const { links } = content.navbar;

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
      <div className="container">
        <div className={styles.footerContent}>
          <div className={styles.footerBrand}>
            <h2>{brand}</h2>
            <p>{tagline}</p>
            <div className={styles.socialLinks}>
              {social?.map((item: any, index: number) => (
                <a key={index} href={item.url} target="_blank" rel="noopener noreferrer" className={styles.socialIcon}>
                  {getIcon(item.platform)}
                </a>
              ))}
            </div>
          </div>
          <div className={styles.footerLinks}>
            <h4>Links</h4>
            {links.map((link, index) => (
              <a key={index} href={link.href}>{link.label}</a>
            ))}
          </div>
          <div className={styles.footerContact}>
            <h4>Contact</h4>
            <p style={{ whiteSpace: 'pre-line' }}>{address}</p>
            <p>{phone}</p>
            <p>{email}</p>
          </div>
        </div>
        <div className={styles.copyright}>
          © {new Date().getFullYear()} {copyright}. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
