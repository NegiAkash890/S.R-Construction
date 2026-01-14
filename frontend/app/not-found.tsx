"use client";

import React from 'react';
import Link from 'next/link';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

export default function NotFound() {
    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '100vh',
            backgroundColor: '#0B1121', // Dark Hero Background
            padding: '2rem',
            textAlign: 'center'
        }}>
            <div style={{ width: '400px', maxWidth: '100%', marginBottom: '2rem' }}>
                <DotLottieReact
                    src="https://lottie.host/a6705f8f-8eef-4de6-96c4-248c851ddcef/JVZ2EKBdh1.lottie"
                    loop
                    autoplay
                />
            </div>

            <h1 style={{
                fontSize: '2rem',
                fontWeight: '700',
                color: 'white',
                marginBottom: '1rem'
            }}>
                Page Not Found
            </h1>

            <p style={{
                color: '#94a3b8', // slate-400
                marginBottom: '2rem'
            }}>
                Sorry, we couldn't find the page you're looking for.
            </p>

            <Link
                href="/"
                style={{
                    display: 'inline-block',
                    padding: '0.75rem 2rem',
                    backgroundColor: '#f97316', // Orange Accent
                    color: 'white',
                    fontWeight: '600',
                    borderRadius: '9999px',
                    textDecoration: 'none',
                    transition: 'opacity 0.2s ease'
                }}
            >
                Go Back Home
            </Link>
        </div>
    );
}
