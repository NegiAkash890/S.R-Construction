"use client";
import { useState, FormEvent, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FaTimes, FaLinkedin, FaInstagram, FaTwitter, FaFacebook } from 'react-icons/fa';
import styles from './EnquiryModal.module.css';

interface EnquiryModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function EnquiryModal({ isOpen, onClose }: EnquiryModalProps) {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [errors, setErrors] = useState<{ [key: string]: string }>({});

    // Prevent body scroll when modal is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => { document.body.style.overflow = 'unset'; };
    }, [isOpen]);

    if (!isOpen) return null;

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

        await new Promise(resolve => setTimeout(resolve, 1000));
        setIsSubmitting(false);
        setIsSuccess(true);
    }

    return (
        <div className={styles.overlay} onClick={onClose}>
            <div className={styles.modal} onClick={e => e.stopPropagation()}>

                {/* Left Side - Image (Hidden on mobile via CSS) */}
                <div className={styles.imageSide}>
                    <Image
                        src="/form_bg.png"
                        alt="Construction Site"
                        fill
                        className={styles.sidebarImage}
                    />
                    <div className={styles.imageOverlay}>
                        <div className={styles.overlayContent}>
                            <h3>S.R. Construction</h3>
                            <p>Let's build your vision together.</p>
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
                    <button className={styles.closeBtn} onClick={onClose}><FaTimes /></button>

                    {isSuccess ? (
                        <div className={styles.success}>
                            <h3>Request Received!</h3>
                            <p>We'll be in touch shortly.</p>
                            <button onClick={onClose} className={styles.submitBtn}>Close</button>
                        </div>
                    ) : (
                        <>
                            <h2 className={styles.title}>Get In Touch</h2>
                            <p className={styles.subtitle}>24/7 We will answer your questions</p>

                            <form onSubmit={handleSubmit} className={styles.form}>
                                <div className={styles.inputWrapper}>
                                    <input
                                        type="text"
                                        name="name"
                                        className={styles.input}
                                        placeholder="Full Name"
                                        style={errors.name ? { borderColor: '#ef4444' } : {}}
                                    />
                                    {errors.name && <span className={styles.errorMsg}>{errors.name}</span>}
                                </div>
                                <div className={styles.inputWrapper}>
                                    <input
                                        type="email"
                                        name="email"
                                        className={styles.input}
                                        placeholder="Email Address"
                                        style={errors.email ? { borderColor: '#ef4444' } : {}}
                                    />
                                    {errors.email && <span className={styles.errorMsg}>{errors.email}</span>}
                                </div>
                                <div className={styles.inputWrapper}>
                                    <input
                                        type="tel"
                                        name="mobile"
                                        className={styles.input}
                                        placeholder="Phone Number"
                                        style={errors.mobile ? { borderColor: '#ef4444' } : {}}
                                    />
                                    {errors.mobile && <span className={styles.errorMsg}>{errors.mobile}</span>}
                                </div>
                                <textarea
                                    name="message"
                                    className={styles.textarea}
                                    placeholder="Describe your issue"
                                ></textarea>
                                <button type="submit" className={styles.submitBtn} disabled={isSubmitting}>
                                    {isSubmitting ? 'Sending...' : 'Send Request'}
                                </button>
                            </form>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}
