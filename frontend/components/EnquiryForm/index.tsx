"use client";
import { useState, FormEvent } from 'react';
import styles from './EnquiryForm.module.css';

import Link from 'next/link';
import Image from 'next/image';
import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter } from 'react-icons/fa';

export default function EnquiryForm() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [errors, setErrors] = useState<{ [key: string]: string }>({});

    // ... (handler logic remains same)
    async function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setIsSubmitting(true);
        setErrors({});

        const formData = new FormData(event.currentTarget);
        const data = {
            name: formData.get('name') as string,
            email: formData.get('email') as string,
            mobile: formData.get('mobile') as string,
            message: formData.get('message') as string,
        };

        const newErrors: { [key: string]: string } = {};
        if (!data.name.trim()) newErrors.name = 'Required';
        if (!data.email.trim()) newErrors.email = 'Required';
        if (!data.mobile.trim()) newErrors.mobile = 'Required';

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            setIsSubmitting(false);
            return;
        }

        await new Promise(resolve => setTimeout(resolve, 1500));
        setIsSubmitting(false);
        setIsSuccess(true);
    }

    if (isSuccess) {
        return (
            <section className={styles.section}>
                <div className="container">
                    <div className={styles.success}>
                        <div className={styles.checkIcon}>✓</div>
                        <h2 className={styles.title}>Thank You!</h2>
                        <p className={styles.subtitle}>Your inquiry has been received. Our team will contact you shortly.</p>
                        <button
                            onClick={() => setIsSuccess(false)}
                            className={styles.submitBtn}
                            style={{ maxWidth: '200px', margin: '0 auto', display: 'block' }}
                        >
                            Send Another
                        </button>
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section className={styles.section} id="enquiry">
            <div className={`container ${styles.container}`}>
                <div className={styles.formWrapper}>
                    {/* Left Side - Image */}
                    <div className={styles.imageSide}>
                        <Image
                            src="/form_bg.png"
                            alt="Construction Site"
                            fill
                            className={styles.sidebarImage}
                        />
                        <div className={styles.imageOverlay}>
                            <div className={styles.overlayContent}>
                                <h3>Designed by S.R. Construction</h3>
                                <p>Building dreams with precision and excellence since 1995.</p>
                                <div className={styles.socialIcons}>
                                    <FaLinkedin />
                                    <FaInstagram />
                                    <FaTwitter />
                                    <FaFacebook />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Side - Form */}
                    <div className={styles.formSide}>
                        <h2 className={styles.formTitle}>GET IN TOUCH</h2>
                        <p className={styles.formSubtitle}>24/7 We will answer your questions and problems</p>

                        <form onSubmit={handleSubmit} className={styles.form}>
                            <div className={styles.row}>
                                <div className={styles.field}>

                                    <input
                                        id="name"
                                        type="text"
                                        name="name"
                                        className={styles.input}
                                        placeholder="First Name"
                                        style={errors.name ? { borderColor: '#ef4444' } : {}}
                                        required
                                    />
                                </div>
                                <div className={styles.field}>

                                    <input
                                        id="lastname" // Added for visual match, optional logic
                                        type="text"
                                        name="lastname"
                                        className={styles.input}
                                        placeholder="Last Name"
                                    />
                                </div>
                            </div>

                            <div className={styles.field}>
                                <input
                                    id="email"
                                    type="email"
                                    name="email"
                                    className={styles.input}
                                    placeholder="Email Id"
                                    style={errors.email ? { borderColor: '#ef4444' } : {}}
                                    required
                                />
                            </div>

                            <div className={styles.field}>
                                <input
                                    id="mobile"
                                    type="tel"
                                    name="mobile"
                                    className={styles.input}
                                    placeholder="Phone"
                                    style={errors.mobile ? { borderColor: '#ef4444' } : {}}
                                    required
                                />
                            </div>

                            <div className={styles.field}>
                                <textarea
                                    id="message"
                                    name="message"
                                    className={styles.textarea}
                                    placeholder="Describe your issue"
                                ></textarea>
                            </div>

                            <button type="submit" className={styles.submitBtn} disabled={isSubmitting}>
                                {isSubmitting ? 'Sending...' : 'Send'}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
}
