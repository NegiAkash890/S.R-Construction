
'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './Loader.module.css';

export default function Loader() {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Hide loader after a short delay on mount
        const timer = setTimeout(() => {
            setLoading(false);
        }, 1500); // 1.5s initial load simulation

        return () => clearTimeout(timer);
    }, []);

    return (
        <AnimatePresence>
            {loading && (
                <motion.div
                    className={styles.loaderContainer}
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0, transition: { duration: 0.5 } }}
                >
                    <div className={styles.constructionLoader}>
                        <div className={styles.building}></div>
                        <div className={styles.building}></div>
                        <div className={styles.building}></div>
                        <div className={styles.crane}>
                            <div className={styles.craneTower}></div>
                            <div className={styles.craneArm}>
                                <div className={styles.craneCable}>
                                    <div className={styles.craneBlock}></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <motion.h2
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className={styles.loaderText}
                    >
                        S.R. CONSTRUCTION
                    </motion.h2>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
