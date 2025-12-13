"use client";
import { urlFor } from "@/utils/sanity/client";
import content from "../../data/siteContent.json";
import styles from './Gallery.module.css';

interface Props {
  data: any[];
}

export default function Gallery({ data }: Props) {
  return (
    <section className={styles.gallerySection} id="gallery">
      <div className="container">
        <h2 className={styles.sectionTitle}>{content.sections.gallery.title}</h2>
        <div className={styles.galleryGrid}>
          {data?.map((item) => (
            <div key={item._id} className={styles.galleryItem}>
              {item.image && (
                <div className={styles.imgWrapper}>
                  <img src={urlFor(item.image).height(400).width(600).url()} alt={item.title} />
                  <div className={styles.overlay}>
                    <h3>{item.title}</h3>
                    <span className={styles.category}>{item.category}</span>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
