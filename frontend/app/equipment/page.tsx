import { client, urlFor } from '@/utils/sanity/client';
import Image from 'next/image';
import styles from './equipment.module.css';

export const revalidate = 60; // Revalidate every minute

async function getData() {
    const equipment = await client.fetch(`
    *[_type == "equipment"] | order(name asc) {
      _id,
      name,
      quantity,
      image
    }
  `);

    return equipment;
}

export const metadata = {
    title: 'Equipment & Machinery | S.R. Construction',
    description: 'Our extensive fleet of heavy construction machinery and equipment.',
};

export default async function EquipmentPage() {
    const items = await getData();

    return (
        <main className={styles.section}>
            <div className="container">
                <div className={styles.header}>
                    <span className={styles.subtitle}>Our Fleet</span>
                    <h1 className={styles.title}>Machinery & Equipment Assets</h1>
                </div>

                <div className={styles.equipmentGrid}>
                    {items.map((item: any, index: number) => (
                        <div key={item._id || index} className={styles.card}>
                            <div className={styles.imageContainer}>
                                {item.image ? (
                                    <Image
                                        src={urlFor(item.image).url()}
                                        alt={item.name}
                                        fill
                                        className={styles.equipmentImage}
                                        sizes="(max-width: 768px) 100vw, 400px"
                                    />
                                ) : (
                                    <div className={styles.imageContainer} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#666' }}>
                                        {/* Placeholder */}
                                        No Image
                                    </div>
                                )}
                                {item.quantity && (
                                    <div className={styles.badge}>
                                        <span className={styles.badgeLabel}>Qty</span>
                                        <span className={styles.badgeValue}>{item.quantity}</span>
                                    </div>
                                )}
                            </div>
                            <div className={styles.cardContent}>
                                <h3 className={styles.itemName}>{item.name}</h3>
                                <div className={styles.techLine} />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </main>
    );
}
