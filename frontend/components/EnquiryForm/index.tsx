"use client";

// Imports Need to check if BsArrowRight is imported.
// I will replace the whole component content from return statement ideally, or just the form side.
// Let's replace the Logic + Return to catch imports.

import { useState, FormEvent } from 'react';
import Image from 'next/image';
import {
  FaFacebook, FaInstagram, FaLinkedin, FaTwitter
} from 'react-icons/fa';
import { BsArrowRight } from 'react-icons/bs';
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
      projectType: formData.get('projectType') as string,
      message: formData.get('message') as string,
    };

    const newErrors: { [key: string]: string } = {};
    if (!data.name.trim()) newErrors.name = 'Required';
    if (!data.email.trim()) newErrors.email = 'Required';
    if (!data.mobile.trim()) newErrors.mobile = 'Required';
    if (!data.projectType || data.projectType === 'default') newErrors.projectType = 'Required'; // Basic check
    if (!data.message.trim()) newErrors.message = 'Required';

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

      if (!response.ok) {
        throw new Error('Submission failed');
      }

      setIsSubmitting(false);
      setIsSuccess(true);
    } catch (error) {
      console.error('Error submitting form:', error);
      setErrors({ ...newErrors, form: 'Something went wrong. Please try again later.' });
      setIsSubmitting(false);
    }
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
            <h2 className={styles.formTitle}>Send Us Message!</h2>

            <form onSubmit={handleSubmit} className={styles.form}>

              <div className={styles.field}>
                <label className={styles.label} htmlFor="name">Full Name*</label>
                <input
                  id="name"
                  type="text"
                  name="name"
                  className={styles.input}
                  placeholder="Your name"
                  style={errors.name ? { borderColor: '#ef4444' } : {}}
                  required
                />
              </div>

              <div className={styles.field}>
                <label className={styles.label} htmlFor="email">Email Address*</label>
                <input
                  id="email"
                  type="email"
                  name="email"
                  className={styles.input}
                  placeholder="Your email"
                  style={errors.email ? { borderColor: '#ef4444' } : {}}
                  required
                />
              </div>

              <div className={styles.row}>
                <div className={styles.field}>
                  <label className={styles.label} htmlFor="mobile">Phone Number*</label>
                  <input
                    id="mobile"
                    type="tel"
                    name="mobile"
                    className={styles.input}
                    placeholder="Your phone number"
                    style={errors.mobile ? { borderColor: '#ef4444' } : {}}
                    required
                  />
                </div>
                <div className={styles.field}>
                  <label className={styles.label} htmlFor="projectType">Project Type*</label>
                  <div className={styles.selectWrapper}>
                    <select
                      id="projectType"
                      name="projectType"
                      className={styles.select}
                      defaultValue=""
                      required
                    >
                      <option value="" disabled>Select project type</option>
                      <option value="residential">Residential</option>
                      <option value="commercial">Commercial</option>
                      <option value="industrial">Industrial</option>
                      <option value="renovation">Renovation</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className={styles.field}>
                <label className={styles.label} htmlFor="message">Message*</label>
                <textarea
                  id="message"
                  name="message"
                  className={styles.textarea}
                  placeholder="Tell us about your project..."
                  style={errors.message ? { borderColor: '#ef4444' } : {}}
                  required
                />
              </div>

              <div className={styles.submitWrapper}>
                <button type="submit" className={styles.submitBtn} disabled={isSubmitting}>
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                  {!isSubmitting && <BsArrowRight className={styles.btnIcon} />}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
