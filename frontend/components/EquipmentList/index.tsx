
"use client";

import { useState } from 'react';
import Image from 'next/image';
import { urlFor } from '@/utils/sanity/client';
import EquipmentModal from '../EquipmentModal';
import styles from './EquipmentList.module.css';

interface EquipmentItem {
    _id: string;
    name: string;
    quantity?: string;
    image?: any;
    description?: string;
    features?: string[];
    specification?: string;
}

interface EquipmentListProps {
    items: EquipmentItem[];
}

// Fallback image logic moved here
const getImageForEquipment = (name: string) => {
    const n = name.toLowerCase();
    if (n.includes('hydra')) return '/images/equipment/hydra_crane.png';
    if (n.includes('dg set')) return '/images/equipment/dg_set.png';
    if (n.includes('compressor')) return '/images/equipment/air_compressor.png';
    if (n.includes('welding')) return '/images/equipment/welding_machine.png';

    if (n.includes('cutting') || n.includes('grinding')) return '/images/equipment/welding_machine.png';
    return '/images/equipment/hydra_crane.png';
};

export default function EquipmentList({ items }: EquipmentListProps) {
    const [selectedItem, setSelectedItem] = useState<EquipmentItem | null>(null);

    const getDisplayImage = (item: EquipmentItem) => {
        if (item.image) return urlFor(item.image).url();
        return getImageForEquipment(item.name);
    };

    return (
        <>
            <div className={styles.equipmentGrid}>
                {items.map((item, index) => (
                    <div
                        key={item._id || index}
                        className={styles.card}
                        onClick={() => setSelectedItem(item)}
                        role="button"
                        tabIndex={0}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter' || e.key === ' ') {
                                setSelectedItem(item);
                            }
                        }}
                    >
                        <div className={styles.imageContainer}>
                            <Image
                                src={getDisplayImage(item)}
                                alt={item.name}
                                fill
                                className={styles.equipmentImage}
                                sizes="(max-width: 768px) 100vw, 400px"
                            />
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
                            <span className={styles.viewMore}>Click for details</span>
                        </div>
                    </div>
                ))}
            </div>

            <EquipmentModal
                item={selectedItem}
                isOpen={!!selectedItem}
                onClose={() => setSelectedItem(null)}
                fallbackImage={getImageForEquipment}
            />
        </>
    );
}
