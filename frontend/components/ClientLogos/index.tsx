import Image from 'next/image';
import { urlFor } from "@/utils/sanity/client";
import content from "../../data/siteContent.json";
import styles from './ClientLogos.module.css';

interface Props {
  data: any[];
}

export default function ClientLogos({ data }: Props) {
  // Use Sanity data
  const allClients = data || [];

  if (allClients.length === 0) return null;

  // Duplicate data to create seamless loop
  const marqueeData = [...allClients, ...allClients];

  return (
    <section className={styles.clientsSection} id="clients">
      <div className="container">
        <h2 className={styles.sectionTitle}>{content.sections.clients.title}</h2>

        <div className={styles.marqueeWrapper}>
          <div className={styles.marqueeTrack}>
            {marqueeData.map((client, index) => {
              const logoSrc = typeof client.logo === 'string'
                ? client.logo
                : client.logo ? urlFor(client.logo).width(400).url() : null;

              if (!logoSrc) return null;

              return (
                <div key={`${client._id || client.name}-${index}`} className={styles.logoItem}>
                  <Image
                    src={logoSrc}
                    alt={client.name}
                    title={client.name}
                    className={styles.logoImage}
                    fill
                    sizes="(max-width: 768px) 150px, 220px"
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
