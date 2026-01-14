import { client } from '@/utils/sanity/client';
import { urlFor } from '@/utils/sanity/client';
import Image from 'next/image';
import styles from './page.module.css';

interface StaffRole {
    _id: string;
    role: string;
    count: number;
    image?: any;
}

async function getTeamData() {
    return await client.fetch(`*[_type == "staffRole"] | order(order asc, _createdAt asc)`);
}

export default async function TeamPage() {
    const staff: StaffRole[] = await getTeamData();

    return (
        <main className={styles.main}>
            <section className={styles.hero}>
                <div className="container">
                    <h1 className={styles.title}>Qualified & Experienced Staffs</h1>
                    <p className={styles.subtitle}>Our strength lies in our dedicated team of professionals.</p>
                </div>
            </section>

            <section className={styles.gridSection}>
                <div className="container">
                    {staff.length > 0 ? (
                        <div className={styles.grid}>
                            {staff.map((role) => (
                                <div key={role._id} className={styles.card}>
                                    <div className={styles.imageWrapper}>
                                        {role.image ? (
                                            <Image
                                                src={urlFor(role.image).width(400).height(300).url()}
                                                alt={role.role}
                                                fill
                                                className={styles.image}
                                            />
                                        ) : (
                                            <div className={styles.placeholder}>
                                                <span>{role.role[0]}</span>
                                            </div>
                                        )}
                                        <div className={styles.countBadge}>
                                            <span className={styles.countNumber}>{role.count}</span>
                                            <span className={styles.countLabel}>Staff</span>
                                        </div>
                                    </div>
                                    <div className={styles.cardContent}>
                                        <h2 className={styles.roleTitle}>{role.role}</h2>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className={styles.emptyState}>
                            <p>No staff roles added yet. Please add them in Sanity Studio.</p>
                        </div>
                    )}
                </div>
            </section>
        </main>
    );
}
