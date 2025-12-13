"use client";
import { urlFor } from "@/utils/sanity/client";
import content from "../../data/siteContent.json";
import styles from './Awards.module.css';

interface Props {
  data: any[];
}

export default function Awards({ data }: Props) {
  return (
    <section className={styles.awardsSection} id="awards">
      <div className="container">
        <h2 className={styles.sectionTitle}>{content.sections.awards.title}</h2>
        <div className={styles.awardsList}>
          {data?.map((item) => (
            <div key={item._id} className={styles.awardItem}>
              {item.image && (
                <img src={urlFor(item.image).width(150).url()} alt={item.title} className={styles.awardImg} />
              )}
              <div className={styles.awardDetails}>
                <h3>{item.title}</h3>
                <span className={styles.year}>{item.year}</span>
                <p>{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
