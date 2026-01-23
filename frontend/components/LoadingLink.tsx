
'use client';

import { useState, useTransition } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

// A wrapper component that handles loading state for links
interface LoadingLinkProps {
    href: string;
    className?: string;
    children: React.ReactNode;
}

export default function LoadingLink({ href, className, children }: LoadingLinkProps) {
    const router = useRouter();
    const [isPending, startTransition] = useTransition();

    const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        startTransition(() => {
            router.push(href);
        });
    };

    return (
        <Link href={href} className={`${className} ${isPending ? 'opacity-70 cursor-wait' : ''}`} onClick={handleClick}>
            {children}
            {isPending && <span style={{ marginLeft: '8px', fontSize: '0.8em' }}>...</span>}
        </Link>
    );
}
