"use client";
import { urlFor } from "@/utils/sanity/client";
import content from "../../data/siteContent.json";
import styles from './BlogSection.module.css';

interface Props {
  data: any[];
}

export default function BlogSection({ data }: Props) {
  return (
    <section className={styles.blogSection} id="blog">
      <div className="container">
        <h2 className={styles.sectionTitle}>{content.sections.blog.title}</h2>
        <div className={styles.blogGrid}>
          {data?.map((post) => (
            <article key={post._id} className={styles.blogCard}>
              {post.mainImage && (
                <div className={styles.cardImg}>
                  <img src={urlFor(post.mainImage).width(400).height(250).url()} alt={post.title} />
                </div>
              )}
              <div className={styles.cardContent}>
                <span className={styles.date}>{new Date(post.publishedAt).toLocaleDateString()}</span>
                <h3>{post.title}</h3>
                <p>{post.excerpt}</p>
                <a href={`/blog/${post.slug?.current}`} className={styles.readMore}>Read More →</a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
