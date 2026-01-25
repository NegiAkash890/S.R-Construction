"use client";

// Remove hardcoded faqs array and use props
import { useState } from 'react';
import { FaPlus, FaMinus } from 'react-icons/fa';
import styles from './FAQSection.module.css';

interface FAQ {
    question: string;
    answer: string;
    _id?: string;
}

interface FAQSectionProps {
    faqs?: FAQ[];
    title?: string;
}

// Fallback data if CMS is empty/loading
export default function FAQSection({ faqs = [], title = "Frequently Asked Questions" }: FAQSectionProps) {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    const toggleFAQ = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    if (!faqs || faqs.length === 0) return null;

    return (
        <section className={styles.section}>
            <div className="container">
                <div className={styles.layout}>
                    <div className={styles.content}>
                        <h2 className={styles.title}>{title}</h2>
                        <p className={styles.subtitle}>
                            Find answers to common questions about our construction services, safety standards, and project management.
                        </p>
                    </div>

                    <div className={styles.accordion}>
                        {faqs.map((faq, index) => (
                            <div
                                key={index}
                                className={`${styles.item} ${openIndex === index ? styles.open : ''}`}
                                onClick={() => toggleFAQ(index)}
                            >
                                <div className={styles.question}>
                                    <span>{faq.question}</span>
                                    <span className={styles.icon}>
                                        {openIndex === index ? <FaMinus /> : <FaPlus />}
                                    </span>
                                </div>
                                <div
                                    className={styles.answer}
                                    style={{ maxHeight: openIndex === index ? '500px' : '0px' }} // Increased max height for safety
                                >
                                    <p>{faq.answer}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
