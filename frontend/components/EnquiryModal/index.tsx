"use client";
import { useState, FormEvent, useEffect } from 'react';
import { FaTimes } from 'react-icons/fa';
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
                <button className={styles.closeBtn} onClick={onClose}><FaTimes /></button>

                {isSuccess ? (
                    <div className={styles.success}>
                        <div className={styles.checkIcon}>✓</div>
                        <h3>Request Received!</h3>
                        <p>We'll be in touch shortly.</p>
                        <button onClick={onClose} className={styles.submitBtn}>Close</button>
                    </div>
                ) : (
                    <>
                        <h2 className={styles.title}>Start Your Project</h2>
                        <p className={styles.subtitle}>Fill in the details below and our team will contact you.</p>

                        <form onSubmit={handleSubmit} className={styles.form}>
                            <div className={styles.field}>
                                <label>Name</label>
                                <input type="text" name="name" className={styles.input} placeholder="Full Name" style={errors.name ? { borderColor: 'red' } : {}} />
                            </div>
                            <div className={styles.field}>
                                <label>Email</label>
                                <input type="email" name="email" className={styles.input} placeholder="Email Address" style={errors.email ? { borderColor: 'red' } : {}} />
                            </div>
                            <div className={styles.field}>
                                <label>Mobile</label>
                                <input type="tel" name="mobile" className={styles.input} placeholder="Phone Number" style={errors.mobile ? { borderColor: 'red' } : {}} />
                            </div>
                            <div className={styles.field}>
                                <label>Requirement</label>
                                <textarea name="message" className={styles.textarea} placeholder="Briefly describe your project..."></textarea>
                            </div>
                            <button type="submit" className={styles.submitBtn} disabled={isSubmitting}>
                                {isSubmitting ? 'Sending...' : 'Send Request'}
                            </button>
                        </form>
                    </>
                )}
            </div>
        </div>
    );
}
