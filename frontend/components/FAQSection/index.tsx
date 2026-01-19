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
}

// Fallback data if CMS is empty/loading
const fallbackFaqs: FAQ[] = [
    {
        question: "Do you handle industrial large-scale projects?",
        answer: "Yes, we specialize in large-scale industrial infrastructure including factories, warehouses, and processing plants. Our team has the equipment and expertise to handle projects over 100,000 sq. ft."
    },
    {
        question: "What is your safety record and protocol?",
        answer: "Safety is our core value. We maintain a 'Zero Accident' policy with strict adherence to ISO 45001 standards. All our sites have dedicated safety officers and mandatory daily briefings."
    },
    {
        question: "Do you provide turnkey construction solutions?",
        answer: "Absolutely. We offer end-to-end solutions from design and approval to construction and handover (EPC). This ensures a single point of responsibility and smoother project execution."
    },
    {
        question: "How do you handle quality control?",
        answer: "We follow a strict Quality Assurance Plan (QAP). Materials are tested in NABL-accredited labs, and we conduct stage-wise inspections for steel reinforcement, concrete mix, and finishing."
    }
];

export default function FAQSection({ faqs = [] }: FAQSectionProps) {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    // Use props if available, otherwise use fallback
    const displayFaqs = (faqs && faqs.length > 0) ? faqs : fallbackFaqs;

    const toggleFAQ = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    if (!displayFaqs || displayFaqs.length === 0) return null;

    return (
        <section className={styles.section}>
            <div className="container">
                <div className={styles.layout}>
                    <div className={styles.content}>
                        <h2 className={styles.title}>Frequently Asked Questions</h2>
                        <p className={styles.subtitle}>
                            Find answers to common questions about our construction services, safety standards, and project management.
                        </p>
                    </div>

                    <div className={styles.accordion}>
                        {displayFaqs.map((faq, index) => (
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
