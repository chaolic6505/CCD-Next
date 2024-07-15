'use client';
import React from 'react';
import ThemeProvider from './ThemeToggle/theme-provider';
export default function Providers({
    session,
    children
}: {
    session: SessionProviderProps['session'];
    children: React.ReactNode;
}) {
    return (
        <>
            <ThemeProvider
                enableSystem
                attribute='class'
                defaultTheme='system'
                disableTransitionOnChange
                themes={['light', 'dark', 'redLight', 'redDark']}
            >
                {children}
            </ThemeProvider>
        </>
    );
}
