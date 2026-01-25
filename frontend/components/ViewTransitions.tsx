"use client";

import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useRef } from 'react';

// Extend the Document interface to include startViewTransition
// declare global {
//     interface Document {
//         startViewTransition: (callback: () => void | Promise<void>) => {
//             finished: Promise<void>;
//             ready: Promise<void>;
//             updateCallbackDone: Promise<void>;
//         };
//     }
// }

export default function ViewTransitions() {
    const router = useRouter();
    const currentPathname = usePathname();

    useEffect(() => {
        const handleClick = (e: MouseEvent) => {
            const target = (e.target as HTMLElement).closest('a');
            if (!target) return;

            const href = target.getAttribute('href');
            // Basic checks: must be internal link, not new tab, etc.
            if (!href ||
                !href.startsWith('/') ||
                href.startsWith('#') ||
                target.target === '_blank' ||
                e.ctrlKey || e.metaKey || e.altKey || e.shiftKey ||
                e.defaultPrevented
            ) return;

            // Check if View Transition API is supported
            if (!document.startViewTransition) return;

            e.preventDefault();

            document.startViewTransition(async () => {
                router.push(href);
                // Wait for a small tick to allow React to process the state update
                await new Promise(resolve => setTimeout(resolve, 0));
            });
        };

        document.addEventListener('click', handleClick);
        return () => document.removeEventListener('click', handleClick);
    }, [router]);

    return null;
}
