"use client";

import { useState, FormEvent, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  FaTimes, FaLinkedin, FaInstagram, FaTwitter, FaFacebook
} from 'react-icons/fa';
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
      projectType: formData.get('projectType') as string,
      message: formData.get('message') as string,
    };

    const newErrors: { [key: string]: string } = {};
    if (!data.name.trim()) newErrors.name = 'Required';
    if (!data.email.trim()) newErrors.email = 'Required';
    if (!data.mobile.trim()) newErrors.mobile = 'Required';
    if (!data.projectType || data.projectType === 'default') newErrors.projectType = 'Required';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!response.ok) throw new Error('Failed to submit');

      setIsSubmitting(false);
      setIsSuccess(true);
    } catch (err) {
      console.error(err);
      setErrors({ form: 'Something went wrong. Please try again.' });
      setIsSubmitting(false);
    }
  }

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeBtn} onClick={onClose} aria-label="Close modal">
          <FaTimes />
        </button>

        {/* Left Side - Image */}
        <div className={styles.imageSide}>
          <Image
            src="/form_bg.png"
            alt="Construction Excellence"
            fill
            className={styles.sidebarImage}
          />
          <div className={styles.imageOverlay}>
            <div className={styles.overlayContent}>
              <h3>S.R. Construction</h3>
              <p>Work with the most trusted infrastructure partner in the industry.</p>
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
          {isSuccess ? (
            <div className={styles.success}>
              <div className={styles.successIcon}>✓</div>
              <h3>Thank You!</h3>
              <p>Your inquiry has been received. Our team will contact you shortly.</p>
              <button onClick={onClose} className={styles.submitBtn} style={{ width: '100%' }}>
                Close Window
              </button>
            </div>
          ) : (
            <>
              <h2 className={styles.title}>Quick Enquiry</h2>
              <p className={styles.subtitle}>Fill out the form and we'll get back to you within 24 hours.</p>

              <form onSubmit={handleSubmit} className={styles.form}>
                <div className={styles.inputWrapper}>
                  <input
                    type="text"
                    name="name"
                    className={styles.input}
                    placeholder="Full Name*"
                    style={errors.name ? { borderColor: '#ef4444' } : {}}
                    required
                  />
                  {errors.name && <span className={styles.errorMsg}>{errors.name}</span>}
                </div>

                <div className={styles.inputWrapper}>
                  <input
                    type="email"
                    name="email"
                    className={styles.input}
                    placeholder="Email Address*"
                    style={errors.email ? { borderColor: '#ef4444' } : {}}
                    required
                  />
                  {errors.email && <span className={styles.errorMsg}>{errors.email}</span>}
                </div>

                <div className={styles.inputWrapper}>
                  <input
                    type="tel"
                    name="mobile"
                    className={styles.input}
                    placeholder="Mobile Number*"
                    style={errors.mobile ? { borderColor: '#ef4444' } : {}}
                    required
                  />
                  {errors.mobile && <span className={styles.errorMsg}>{errors.mobile}</span>}
                </div>

                <div className={styles.inputWrapper}>
                  <select
                    name="projectType"
                    className={styles.select}
                    style={errors.projectType ? { borderColor: '#ef4444' } : {}}
                    required
                    defaultValue=""
                  >
                    <option value="" disabled>Select Project Type*</option>
                    <option value="residential">Residential</option>
                    <option value="commercial">Commercial</option>
                    <option value="industrial">Industrial</option>
                    <option value="infrastructure">Infrastructure</option>
                    <option value="other">Other</option>
                  </select>
                  {errors.projectType && <span className={styles.errorMsg}>{errors.projectType}</span>}
                </div>

                <div className={styles.inputWrapper}>
                  <textarea
                    name="message"
                    className={styles.textarea}
                    placeholder="Message / Brief requirements*"
                    required
                  />
                </div>

                {errors.form && <div className={styles.errorMsg} style={{ position: 'static', marginBottom: '10px' }}>{errors.form}</div>}

                <button type="submit" className={styles.submitBtn} disabled={isSubmitting}>
                  {isSubmitting ? 'Sending Request...' : 'Submit'}
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

