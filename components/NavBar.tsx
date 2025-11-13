'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Newspaper, Search, MessageSquare } from 'lucide-react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';

export default function Navbar() {
    const [ searchQuery, setSearchQuery ] = useState( '' );
    const searchParams = useSearchParams();
    const currentCategory = searchParams.get( 'category' );
    const router = useRouter();

    const handleSearch = ( e: React.FormEvent ) => {
        e.preventDefault();

        if ( searchQuery.trim() ) {
            router.push( `/forum?q=${encodeURIComponent( searchQuery.trim() )}` );
            setSearchQuery( '' );
        }
    };

    return (
        <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
            <div className="container mx-auto flex h-16 items-center justify-between px-4">
                <div className="flex items-center gap-6">
                    <Link href="/" className="flex items-center gap-2">
                        <div className="rounded-lg bg-primary p-2">
                            <Newspaper className="h-5 w-5 text-primary-foreground" />
                        </div>
                        <span className="text-xl font-bold">NewsHub</span>
                    </Link>

                    <div className="hidden md:flex items-center gap-4">
                        <Link href="/news">
                            <Button
                                variant={!currentCategory ? 'default' : 'ghost'}
                                size="sm"
                            >
                                Todas
                            </Button>
                        </Link>
                        <Link href="/news?category=technology">
                            <Button
                                variant={currentCategory === 'technology' ? 'default' : 'ghost'}
                                size="sm"
                            >
                                Tecnologia
                            </Button>
                        </Link>
                        <Link href="/news?category=business">
                            <Button
                                variant={currentCategory === 'business' ? 'default' : 'ghost'}
                                size="sm"
                            >
                                Negócios
                            </Button>
                        </Link>
                    </div>
                </div>

                <div className="flex items-center gap-4">
                    <form onSubmit={handleSearch} className="hidden md:flex items-center gap-2">
                        <Input
                            type="search"
                            placeholder="Buscar tópicos..."
                            value={searchQuery}
                            onChange={( e ) => setSearchQuery( e.target.value )}
                            className="w-64"
                        />
                        <Button type="submit" size="icon" variant="secondary">
                            <Search className="h-4 w-4" />
                        </Button>
                    </form>

                    <Link href="/forum">
                        <Button variant="outline" size="sm" className="gap-2">
                            <MessageSquare className="h-4 w-4" />
                            <span className="hidden sm:inline">Fórum</span>
                        </Button>
                    </Link>
                </div>
            </div>
        </nav>
    );
}
