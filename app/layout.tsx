import { Geist, Geist_Mono } from 'next/font/google';
import { AppProviders } from '@/components/AppProviders';
import Navbar from '@/components/NavBar';

import type { Metadata } from 'next';

import './globals.css';

const geistSans = Geist( {
    variable: '--font-geist-sans',
    subsets: [ 'latin' ]
} );

const geistMono = Geist_Mono( {
    variable: '--font-geist-mono',
    subsets: [ 'latin' ]
} );

export const metadata: Metadata = {
    title: 'NewsHub - Notícias e Fórum de Discussões',
    description: 'Portal de notícias atualizado com fórum integrado para discussões sobre tecnologia, negócios e mais'
};

export default function RootLayout( {
    children
}: Readonly<{
  children: React.ReactNode;
}> ) {
    return (
        <html lang="en">
            <body className={`${ geistSans.variable } ${ geistMono.variable } antialiased`}>
                <AppProviders>
                    <div className="min-h-screen bg-background">
                        <Navbar />

                        <main className="container mx-auto px-4 py-8">
                            { children }
                        </main>
                    </div>
                </AppProviders>
            </body>
        </html>
    );
}
