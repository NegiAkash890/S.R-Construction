import { client } from '@/utils/sanity/client';
import EquipmentList from '@/components/EquipmentList';
import Breadcrumb from '@/components/Breadcrumb';
import styles from './equipment.module.css';

export const revalidate = 60; // Revalidate every minute

async function getData() {
    const equipment = await client.fetch(`
    *[_type == "equipment"] | order(name asc) {
      _id,
      name,
      quantity,
      image,
      description,
      features,
      specification
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
                <Breadcrumb items={[{ label: 'Equipment & Machinery' }]} />
                <div className={styles.header}>
                    <span className={styles.subtitle}>Our Fleet</span>
                    <h1 className={styles.title}>Machinery & Equipment Assets</h1>
                </div>

                <EquipmentList items={items} />
            </div>
        </main>
    );
}
