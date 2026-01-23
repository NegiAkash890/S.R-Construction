
import Link from 'next/link';
import { BsChevronRight } from 'react-icons/bs';

interface BreadcrumbProps {
    items: {
        label: string,
        href?: string
    }[]
}

import styles from './Breadcrumb.module.css';

interface BreadcrumbProps {
    items: {
        label: string,
        href?: string
    }[]
}

export default function Breadcrumb({ items }: BreadcrumbProps) {
    return (
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
    );
}
