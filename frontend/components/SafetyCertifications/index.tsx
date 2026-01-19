import { FaHardHat, FaAward, FaShieldAlt, FaLeaf } from 'react-icons/fa';
import styles from './SafetyCertifications.module.css';

const certifications = [
    {
        icon: <FaAward />,
        title: "ISO 9001:2015",
        description: "Certified Quality Management System"
    },
    {
        icon: <FaShieldAlt />,
        title: "OHSAS 18001",
        description: "Occupational Health & Safety Assessment"
    },
    {
        icon: <FaHardHat />,
        title: "Zero Accident Award",
        description: "National Safety Council 2024"
    },
    {
        icon: <FaLeaf />,
        title: "Green Building",
        description: "IGBC Member & Sustainability Partner"
    }
];

export default function SafetyCertifications() {
    return (
        <section className={styles.section}>
            <div className="container">
                <div className={styles.header}>
                    <h2 className={styles.title}>Safety & Standards</h2>
                    <p className={styles.subtitle}>Commitment to excellence and zero-compromise safety.</p>
                </div>

                <div className={styles.grid}>
                    {certifications.map((cert, index) => (
                        <div key={index} className={styles.card}>
                            <div className={styles.iconWrapper}>
                                {cert.icon}
                            </div>
                            <h3 className={styles.cardTitle}>{cert.title}</h3>
                            <p className={styles.cardDesc}>{cert.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
