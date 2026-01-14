"use client";
import styles from './Process.module.css';

const steps = [
    {
        number: "01",
        title: "Consultation",
        description: "We start by understanding your vision, requirements, and objectives to lay a solid foundation."
    },
    {
        number: "02",
        title: "Planning & Design",
        description: "Our engineers and architects create detailed blueprints and strategies tailored to your needs."
    },
    {
        number: "03",
        title: "Construction",
        description: "We execute the build with precision, safety, and quality management at every stage."
    },
    {
        number: "04",
        title: "Handover",
        description: "Final inspections and timely delivery ensure your project is ready for operation."
    }
];

export default function Process() {
    return (
        <section className={styles.section} id="process">
            <div className="container">
                <div className={styles.header}>
                    <h2 className={styles.title}>How We Work</h2>
                    <p className={styles.subtitle}>A streamlined process ensuring quality and efficiency from start to finish.</p>
                </div>
                <div className={styles.grid}>
                    {steps.map((step, index) => (
                        <div key={index} className={styles.card}>
                            <span className={styles.number}>{step.number}</span>
                            <h3 className={styles.cardTitle}>{step.title}</h3>
                            <p className={styles.description}>{step.description}</p>
                            {index < steps.length - 1 && <div className={styles.connector} />}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
