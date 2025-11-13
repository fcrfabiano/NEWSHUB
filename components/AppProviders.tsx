'use client';

import type { PropsWithChildren } from 'react';
import { TooltipProvider } from '@radix-ui/react-tooltip';
import { Toaster } from '@/components/ui/toaster';
import { Toaster as Sonner } from '@/components/ui/sonner';

export function AppProviders( { children }: PropsWithChildren<object> ) {
    return (
        <TooltipProvider>
            <Toaster />
            <Sonner />
            {children}
        </TooltipProvider>
    );
}

