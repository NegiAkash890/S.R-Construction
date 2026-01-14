"use client";
import { urlFor } from "@/utils/sanity/client";
import content from "../../data/siteContent.json";
import styles from './ClientLogos.module.css';

interface Props {
  data: any[];
}

export default function ClientLogos({ data }: Props) {
  if (!data || data.length === 0) return null;

  // Duplicate data to create seamless loop
  const marqueeData = [...data, ...data, ...data];

  return (
    <section className={styles.clientsSection} id="clients">
      <div className="container">
        <h2 className={styles.sectionTitle}>{content.sections.clients.title}</h2>

        <div className={styles.marqueeWrapper}>
          <div className={styles.marqueeTrack}>
            {marqueeData.map((client, index) => (
              client.logo && (
                <div key={`${client._id}-${index}`} className={styles.logoItem}>
                  <img
                    src={urlFor(client.logo).width(400).url()}
                    alt={client.name}
                    title={client.name}
                    className={styles.logoImage}
                  />
                </div>
              )
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
