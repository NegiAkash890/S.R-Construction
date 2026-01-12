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

        // Validation
        const newErrors: { [key: string]: string } = {};
        if (!data.name.trim()) newErrors.name = 'Name is required';
        if (!data.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
            newErrors.email = 'Invalid email format';
        }
        if (!data.mobile.trim()) {
            newErrors.mobile = 'Mobile number is required';
        } else if (!/^\+?[\d\s-]{10,}$/.test(data.mobile)) {
            newErrors.mobile = 'Invalid mobile number (min 10 digits)';
        }
        if (!data.message.trim()) newErrors.message = 'Message is required';

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            setIsSubmitting(false);
            return;
        }

        // Simulate API call
        console.log('Form Submitted:', data);
        await new Promise(resolve => setTimeout(resolve, 1000));

        setIsSubmitting(false);
        setIsSuccess(true);
    }

    if (isSuccess) {
        return (
            <section className={styles.section}>
                <div className="container">
                    <div className={styles.formContainer}>
                        <div className={styles.successMessage}>
                            <h3>Thank you for your enquiry!</h3>
                            <p>We will get back to you shortly.</p>
                            <button
                                onClick={() => setIsSuccess(false)}
                                className={styles.submitButton}
                                style={{ maxWidth: '200px', margin: '1rem auto' }}
                            >
                                Send Another
                            </button>
                        </div>
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section className={styles.section} id="enquiry">
            <div className="container">
                <h2 className={styles.title}>Drop an Enquiry</h2>
                <div className={styles.formContainer}>
                    <form onSubmit={handleSubmit} noValidate>
                        <div className={styles.formGroup}>
                            <label htmlFor="name" className={styles.label}>Name</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                className={styles.input}
                                placeholder="John Doe"
                                style={errors.name ? { borderColor: '#ef4444' } : {}}
                            />
                            {errors.name && <p className={styles.errorText}>{errors.name}</p>}
                        </div>

                        <div className={styles.formGroup}>
                            <label htmlFor="email" className={styles.label}>Email</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                className={styles.input}
                                placeholder="john@example.com"
                                style={errors.email ? { borderColor: '#ef4444' } : {}}
                            />
                            {errors.email && <p className={styles.errorText}>{errors.email}</p>}
                        </div>

                        <div className={styles.formGroup}>
                            <label htmlFor="mobile" className={styles.label}>Mobile Number</label>
                            <input
                                type="tel"
                                id="mobile"
                                name="mobile"
                                className={styles.input}
                                placeholder="+1 234 567 8900"
                                style={errors.mobile ? { borderColor: '#ef4444' } : {}}
                            />
                            {errors.mobile && <p className={styles.errorText}>{errors.mobile}</p>}
                        </div>

                        <div className={styles.formGroup}>
                            <label htmlFor="message" className={styles.label}>Message</label>
                            <textarea
                                id="message"
                                name="message"
                                className={styles.textarea}
                                placeholder="Tell us about your project..."
                                style={errors.message ? { borderColor: '#ef4444' } : {}}
                            ></textarea>
                            {errors.message && <p className={styles.errorText}>{errors.message}</p>}
                        </div>

                        <button type="submit" className={styles.submitButton} disabled={isSubmitting}>
                            {isSubmitting ? 'Sending...' : 'Send Enquiry'}
                        </button>
                    </form>
                </div>
            </div>
        </section>
    );
}
