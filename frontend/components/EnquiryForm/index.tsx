"use client";
import { useState, FormEvent } from 'react';
import styles from './EnquiryForm.module.css';

export default function EnquiryForm() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [errors, setErrors] = useState<{ [key: string]: string }>({});

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

        // Simulate API call
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
        <section className={styles.section}>
            <div className="container">
                <h2 className={styles.title}>Partner With Us</h2>
                <p className={styles.subtitle}>Ready to discuss your next project? Fill out the form below and let's build something exceptional together.</p>

                <form onSubmit={handleSubmit} className={styles.form}>
                    <div className={styles.field}>
                        <label htmlFor="name">Full Name</label>
                        <input
                            id="name"
                            type="text"
                            name="name"
                            className={styles.input}
                            placeholder="John Doe"
                            style={errors.name ? { borderColor: '#ef4444' } : {}}
                            required
                        />
                        {errors.name && <span style={{ color: '#ef4444', fontSize: '0.75rem' }}>{errors.name}</span>}
                    </div>
                    <div className={styles.field}>
                        <label htmlFor="email">Email Address</label>
                        <input
                            id="email"
                            type="email"
                            name="email"
                            className={styles.input}
                            placeholder="john@example.com"
                            style={errors.email ? { borderColor: '#ef4444' } : {}}
                            required
                        />
                        {errors.email && <span style={{ color: '#ef4444', fontSize: '0.75rem' }}>{errors.email}</span>}
                    </div>
                    <div className={styles.field}>
                        <label htmlFor="mobile">Mobile Number</label>
                        <input
                            id="mobile"
                            type="tel"
                            name="mobile"
                            className={styles.input}
                            placeholder="+91 98765 43210"
                            style={errors.mobile ? { borderColor: '#ef4444' } : {}}
                            required
                        />
                        {errors.mobile && <span style={{ color: '#ef4444', fontSize: '0.75rem' }}>{errors.mobile}</span>}
                    </div>
                    <div className={styles.field}>
                        <label htmlFor="subject">Subject / Project Type</label>
                        <input
                            id="subject"
                            type="text"
                            name="subject"
                            className={styles.input}
                            placeholder="e.g. Industrial Construction"
                        />
                    </div>
                    <div className={`${styles.field} ${styles.fullWidth}`}>
                        <label htmlFor="message">Your Requirements</label>
                        <textarea
                            id="message"
                            name="message"
                            className={styles.textarea}
                            placeholder="Tell us about your project or specific requirements..."
                        ></textarea>
                    </div>
                    <button type="submit" className={styles.submitBtn} disabled={isSubmitting}>
                        {isSubmitting ? 'Submitting...' : 'Send Inquiry'}
                    </button>
                </form>
            </div>
        </section>
    );
}
