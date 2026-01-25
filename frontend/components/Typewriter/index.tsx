"use client";

import { useState, useEffect } from 'react';

interface TypewriterProps {
    text?: string;
    speed?: number;
    delay?: number;
}
import styles from './Typewriter.module.css';

interface TypewriterProps {
    text?: string;
    words?: string[];
    speed?: number;
    deleteSpeed?: number;
    delay?: number;
    showCursor?: boolean;
    loop?: boolean;
    pauseBeforeDelete?: number;
    pauseBeforeType?: number;
}

export default function Typewriter({
    text,
    words = [],
    speed = 100,
    deleteSpeed = 50,
    delay = 0,
    showCursor = true,
    loop = true,
    pauseBeforeDelete = 2000,
    pauseBeforeType = 500
}: TypewriterProps) {
    // If text provided, use it as single word. Favor words array if both exist (or merge).
    const phrases = words.length > 0 ? words : (text ? [text] : []);

    const [displayedText, setDisplayedText] = useState("");
    const [isDeleting, setIsDeleting] = useState(false);
    const [started, setStarted] = useState(false);
    const [phraseIndex, setPhraseIndex] = useState(0);

    // Initial start delay
    useEffect(() => {
        const timeout = setTimeout(() => {
            setStarted(true);
        }, delay);
        return () => clearTimeout(timeout);
    }, [delay]);

    useEffect(() => {
        if (!started || phrases.length === 0) return;

        let timer: NodeJS.Timeout;
        const currentPhrase = phrases[phraseIndex];

        const handleTyping = () => {
            setDisplayedText((current) => {
                if (isDeleting) {
                    // Deleting
                    if (current.length > 0) {
                        return current.substring(0, current.length - 1);
                    } else {
                        // Finished deleting
                        setIsDeleting(false);
                        // Move to next phrase
                        setPhraseIndex((prev) => (prev + 1) % phrases.length);
                        return "";
                    }
                } else {
                    // Typing
                    if (current.length < currentPhrase.length) {
                        return currentPhrase.substring(0, current.length + 1);
                    } else {
                        // Finished typing
                        if (loop) {
                            setIsDeleting(true);
                        }
                        return current;
                    }
                }
            });
        };

        // Determine speed
        let currentSpeed = isDeleting ? deleteSpeed : speed;

        if (!isDeleting && displayedText === currentPhrase) {
            currentSpeed = pauseBeforeDelete;
        } else if (isDeleting && displayedText === "") {
            currentSpeed = pauseBeforeType;
        }

        timer = setTimeout(handleTyping, currentSpeed);

        return () => clearTimeout(timer);
    }, [
        phrases, phraseIndex, speed, deleteSpeed, started,
        isDeleting, displayedText, loop, pauseBeforeDelete, pauseBeforeType
    ]);

    return (
        <span>
            {displayedText}
            {showCursor && <span className={styles.cursor}>&nbsp;</span>}
        </span>
    );
}
