'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import { storageService } from '../../lib/storage';
import type { Article, Topic } from '@/types';
import { TopicCard } from '@/components/TopicCard';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { NewsService } from '@/service/NewsService';

export default function Forum() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const query = searchParams.get( 'q' ) || '';
    const inputRef = useRef<HTMLInputElement>( null );
    const [ articles, setArticles ] = useState<Record<string, Article | null>>( {} );

    useEffect( () => {
        if ( document.activeElement !== inputRef.current && inputRef.current ) {
            inputRef.current.value = query;
        }
    }, [ query ] );

    const topics = useMemo<Topic[]>( () => {
        return query
            ? storageService.searchTopics( query )
            : storageService.getTopics();
    }, [ query ] );

    const topicsByArticle = useMemo( () => {
        const map = new Map<string, Topic[]>();
        topics.forEach( ( topic ) => {
            if ( !map.has( topic.articleId ) ) {
                map.set( topic.articleId, [] );
            }
            map.get( topic.articleId )?.push( topic );
        } );
        return Array.from( map.entries() );
    }, [ topics ] );

    useEffect( () => {
        const uniqueArticleIds = topicsByArticle.map( ( [ articleId ] ) => articleId );
        let cancelled = false;

        if ( uniqueArticleIds.length === 0 ) {
            queueMicrotask( () => {
                setArticles( {} );
            } );
            return;
        }

        ( async () => {
            const entries = await Promise.all(
                uniqueArticleIds.map( async ( articleId ) => {
                    try {
                        const article = await NewsService.findById( articleId );
                        return [ articleId, article ] as const;
                    } catch {
                        return [ articleId, null ] as const;
                    }
                } )
            );

            if ( !cancelled ) {
                setArticles( Object.fromEntries( entries ) );
            }
        } )();

        return () => {
            cancelled = true;
        };
    }, [ topicsByArticle ] );

    const handleSearch = ( e: React.FormEvent ) => {
        e.preventDefault();
        const nextQuery = inputRef.current?.value.trim() ?? '';
        const nextUrl = nextQuery ? `/forum?q=${encodeURIComponent( nextQuery )}` : '/forum';
        router.push( nextUrl );
    };

    return (
        <>
            <div className="max-w-4xl mx-auto">
                <h1 className="text-4xl font-bold mb-2">Fórum de Discussões</h1>
                <p className="text-muted-foreground mb-8">
                    Busque e explore todos os tópicos da comunidade
                </p>

                <form onSubmit={handleSearch} className="flex gap-2 mb-8">
                    <Input
                        ref={inputRef}
                        type="search"
                        placeholder="Buscar tópicos por título ou conteúdo..."
                        defaultValue={query}
                        className="flex-1"
                    />
                    <Button type="submit" size="icon">
                        <Search className="h-4 w-4" />
                    </Button>
                </form>

                {query && (
                    <div className="mb-6">
                        <p className="text-muted-foreground">
                            Resultados para:{' '}
                            <span className="font-semibold text-foreground">
                                &ldquo;{query}&rdquo;
                            </span>{' '}
                            ({topics.length} {topics.length === 1 ? 'tópico' : 'tópicos'})
                        </p>
                    </div>
                )}

                {topicsByArticle.length === 0 ? (
                    <div className="text-center py-12">
                        <p className="text-muted-foreground">
                            {query
                                ? 'Nenhum tópico encontrado para sua busca.'
                                : 'Nenhum tópico criado ainda. Visite uma notícia e crie o primeiro!'}
                        </p>
                    </div>
                ) : (
                    <div className="space-y-8">
                        {topicsByArticle.map( ( [ articleId, articleTopics ] ) => {
                            const article = articles[ articleId ];

                            return (
                                <section key={articleId} className="space-y-4">
                                    <div className="flex flex-col gap-2 rounded-lg border p-4">
                                        <div className="flex items-center justify-between gap-4">
                                            <div>
                                                <h2 className="text-2xl font-semibold">
                                                    {article ? article.title : 'Notícia não encontrada'}
                                                </h2>
                                                {article?.source?.name && (
                                                    <p className="text-sm text-muted-foreground">
                                                        Fonte: {article.source.name}
                                                    </p>
                                                )}
                                            </div>
                                            <div>
                                                <Link href={`/news/${articleId}`}>
                                                    <Button
                                                        variant="secondary"
                                                        size="sm"
                                                        disabled={!article}
                                                    >
                                                        {article
                                                            ? 'Ver notícia'
                                                            : 'Notícia indisponível'}
                                                    </Button>
                                                </Link>
                                            </div>
                                        </div>
                                        {article?.description && (
                                            <p className="text-sm text-muted-foreground line-clamp-3">
                                                {article.description}
                                            </p>
                                        )}
                                    </div>

                                    <div className="space-y-4">
                                        {articleTopics.map( ( topic ) => (
                                            <TopicCard key={topic.id} topic={topic} />
                                        ) )}
                                    </div>
                                </section>
                            );
                        } )}
                    </div>
                )}
            </div>
        </>
    );
}
