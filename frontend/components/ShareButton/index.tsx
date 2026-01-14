"use client";
import { useState } from 'react';
import { BsShare, BsCheck } from 'react-icons/bs';
import styles from './ShareButton.module.css';

interface ShareButtonProps {
    title: string;
    text?: string;
    url?: string;
}

export default function ShareButton({ title, text, url }: ShareButtonProps) {
    const [copied, setCopied] = useState(false);

    const handleShare = async () => {
        const shareData = {
            title,
            text: text || title,
            url: url || (typeof window !== 'undefined' ? window.location.href : ''),
        };

        if (navigator.share) {
            try {
                await navigator.share(shareData);
            } catch (err) {
                console.log('Error sharing:', err);
            }
        } else {
            // Fallback to Clipboard
            try {
                await navigator.clipboard.writeText(shareData.url);
                setCopied(true);
                setTimeout(() => setCopied(false), 2000);
            } catch (err) {
                console.error('Failed to copy', err);
            }
        }
    };

    return (
        <button className={`${styles.shareBtn} ${copied ? styles.copied : ''}`} onClick={handleShare}>
            {copied ? <BsCheck size={18} /> : <BsShare size={14} />}
            {copied ? 'Copied Link' : 'Share'}
        </button>
    );
}
