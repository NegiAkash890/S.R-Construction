import Image from 'next/image';
import { urlFor } from '@/utils/sanity/client';
import styles from './Testimonials.module.css';

interface Testimonial {
  _id: string;
  name: string;
  role: string;
  quote: string;
  photo: {
    asset: {
      _ref: string;
    };
  };
}

interface TestimonialsProps {
  data: Testimonial[];
}

export default function Testimonials({ data }: TestimonialsProps) {
  if (!data || data.length === 0) return null;

  // Duplicate string to ensure seamless loop
  // If we have few items, we might need to triple them to fill width
  const displayData = [...data, ...data, ...data];

  return (
    <section className={styles.section}>
      <div className="container">
        <h2 className={styles.title}>What Our Clients Say</h2>
      </div>

      <div className={styles.marqueeContainer}>
        <div className={styles.track}>
          {displayData.map((item, index) => (
            <div key={`${item._id}-duplicate-${index}`} className={styles.card}>
              {item.photo && (
                <div className={styles.imageContainer}>
                  <Image
                    src={urlFor(item.photo).url()}
                    alt={item.name}
                    fill
                    className={styles.image}
                  />
                </div>
              )}
              <div className={styles.content}>
                <p className={styles.quote}>{item.quote}</p>
                <h4 className={styles.name}>{item.name}</h4>
                {item.role && <span className={styles.role}>{item.role}</span>}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
