"use client";

import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import styles from './Breadcrumb.module.css';
import Link from 'next/link';
import { BsChevronRight } from 'react-icons/bs';

interface BreadcrumbProps {
    items: {
        label: string,
        href?: string
    }[]
}

export default function Breadcrumb({ items }: BreadcrumbProps) {
    const [mounted, setMounted] = useState(false);
    const [footerSlot, setFooterSlot] = useState<HTMLElement | null>(null);

    useEffect(() => {
        setMounted(true);
        const findSlot = () => {
            const slot = document.getElementById('footer-breadcrumb-slot');
            if (slot) {
                setFooterSlot(slot);
            } else {
                // Retry once if not found immediately (hydration timing)
                setTimeout(() => {
                    const retrySlot = document.getElementById('footer-breadcrumb-slot');
                    setFooterSlot(retrySlot);
                }, 500);
            }
        };
        findSlot();
    }, []);

    if (!mounted || !footerSlot) return null;

    return createPortal(
        <div className="container">
            <nav aria-label="Breadcrumb" className={styles.nav}>
                <ol className={styles.list}>
                    <li className={styles.item}>
                        <Link href="/" className={styles.link}>Home</Link>
                    </li>
                    {items.map((item, index) => (
                        <li key={index} className={styles.item}>
                            <BsChevronRight className={styles.icon} />
                            {item.href ? (
                                <Link href={item.href} className={styles.link}>
                                    {item.label}
                                </Link>
                            ) : (
                                <span className={styles.current}>
                                    {item.label}
                                </span>
                            )}
                        </li>
                    ))}
                </ol>
            </nav>
        </div>,
        footerSlot
    );
}
