"use client";
import React, { createContext, useContext, useState } from 'react';
import EnquiryModal from '@/components/EnquiryModal';

interface EnquiryContextType {
    openEnquiry: () => void;
    closeEnquiry: () => void;
}

const EnquiryContext = createContext<EnquiryContextType | undefined>(undefined);

export function EnquiryProvider({ children }: { children: React.ReactNode }) {
    const [isOpen, setIsOpen] = useState(false);

    const openEnquiry = () => setIsOpen(true);
    const closeEnquiry = () => setIsOpen(false);

    return (
        <EnquiryContext.Provider value={{ openEnquiry, closeEnquiry }}>
            {children}
            <EnquiryModal isOpen={isOpen} onClose={closeEnquiry} />
        </EnquiryContext.Provider>
    );
}

export function useEnquiry() {
    const context = useContext(EnquiryContext);
    if (context === undefined) {
        throw new Error('useEnquiry must be used within an EnquiryProvider');
    }
    return context;
}
