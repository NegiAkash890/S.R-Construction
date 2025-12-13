"use client";
import { urlFor } from "@/utils/sanity/client";
import content from "../../data/siteContent.json";
import styles from './ClientLogos.module.css';


interface Props {
  data: any[];
}

export default function ClientLogos({ data }: Props) {
  if (!data || data.length === 0) return null;

  return (
    <section className={styles.clientsSection} id="clients">
      <div className="container">
        <h2 className={styles.sectionTitle}>{content.sections.clients.title}</h2>
        <div className={styles.logoGrid}>
          {data.map((client) => (
            client.logo && (
              <div key={client._id} className={styles.logoItem}>
                <img
                  src={urlFor(client.logo).width(200).url()}
                  alt={client.name}
                  title={client.name}
                />
              </div>
            )
          ))}
        </div>
      </div>
    </section>
  );
}
