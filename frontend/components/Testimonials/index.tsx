"use client";
import { urlFor } from "@/utils/sanity/client";
import content from "../../data/siteContent.json";
import styles from './Testimonials.module.css';

interface Props {
  data: any[];
}

export default function Testimonials({ data }: Props) {
  return (
    <section className={styles.testimonialSection} id="testimonials">
      <div className="container">
        <h2 className={styles.sectionTitle}>{content.sections.testimonials.title}</h2>
        <div className={styles.testimonialGrid}>
          {data?.map((item) => (
            <div key={item._id} className={styles.testimonialCard}>
              <div className={styles.quoteIcon}>“</div>
              <p className={styles.quoteText}>{item.quote}</p>
              <div className={styles.author}>
                {item.photo && (
                  <img src={urlFor(item.photo).width(50).height(50).url()} alt={item.name} className={styles.authorImg} />
                )}
                <div className={styles.authorInfo}>
                  <h4>{item.name}</h4>
                  <span>{item.role}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
