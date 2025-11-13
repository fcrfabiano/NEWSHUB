'use client';

import { useCallback, useEffect, useState } from 'react';
import Link from 'next/link';
import type { Article, Topic } from '@/types';
import { storageService } from '../lib/storage';
import { findSimilarTopics } from '@/lib/similarity';
import { TopicCard } from '@/components/TopicCard';
import { TopicForm } from '@/components/TopicForm';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Calendar, ExternalLink, ArrowLeft } from 'lucide-react';
import { formatDistanceToNow } from '@/lib/utils';
import Image from 'next/image';
import HtmlContent from './HtmlContent';

type SimilarTopic = Topic & { similarity: number };

interface NewsDetailContentProps {
    article: Article;
}

export function NewsDetailContent( { article }: NewsDetailContentProps ) {
    const [ topics, setTopics ] = useState<Topic[]>( [] );
    const [ similarTopics, setSimilarTopics ] = useState<SimilarTopic[]>( [] );
    const [ showForm, setShowForm ] = useState( false );

    const refreshTopics = useCallback( () => {
        const allTopics = storageService.getTopics();
        setTopics( allTopics.filter( topic => topic.articleId === article.id ) );

        const similarWithScore = findSimilarTopics( article.title, allTopics );
        const hydratedSimilar = similarWithScore
            .map( similarTopic => {
                const fullTopic = allTopics.find( topic => topic.id === similarTopic.id );
                return fullTopic ? { ...fullTopic, similarity: similarTopic.similarity } : null;
            } )
            .filter( ( topic ): topic is SimilarTopic => topic !== null );

        setSimilarTopics( hydratedSimilar );
    }, [ article.id, article.title ] );

    useEffect( () => {
        queueMicrotask( () => refreshTopics() );
    }, [ refreshTopics ] );

    const handleTopicCreated = ( newTopic: Topic ) => {
        storageService.saveTopic( newTopic );
        refreshTopics();
        setShowForm( false );
    };

    return (
        <div>
            <div className="mb-6">
                <Link href="/news">
                    <Button variant="ghost" className="gap-2">
                        <ArrowLeft className="h-4 w-4" />
                        Voltar
                    </Button>
                </Link>
            </div>

            <article className="max-w-4xl mx-auto mb-12">
                {article.urlToImage && (
                    <Image
                        src={article.urlToImage}
                        alt={article.title}
                        className="w-full aspect-video rounded-lg mb-8 object-cover"
                        width={736}
                        height={414}
                    />
                )}

                <div className="flex items-center gap-2 mb-4">
                    <Badge variant="secondary">{article.source.name}</Badge>
                    {article.category && (
                        <Badge variant="outline" className="capitalize">
                            {article.category}
                        </Badge>
                    )}
                </div>

                <h1 className="text-4xl font-bold mb-4">{article.title}</h1>

                <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-8">
                    {article.author && <span>Por {article.author}</span>}
                    <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        <span>{formatDistanceToNow( new Date( article.publishedAt ) )}</span>
                    </div>
                </div>

                <div className="prose prose-lg max-w-none mb-8">
                    <HtmlContent html={article.description}/>

                    <HtmlContent html={article.content}/>
                </div>

                <a href={article.url} target="_blank" rel="noopener noreferrer">
                    <Button className="gap-2">
                        Ler notícia completa
                        <ExternalLink className="h-4 w-4" />
                    </Button>
                </a>
            </article>

            <Separator className="my-12" />

            <div className="max-w-4xl mx-auto">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-3xl font-bold">Discussões</h2>
                    <Button onClick={() => setShowForm( !showForm )}>
                        {showForm ? 'Cancelar' : 'Criar Tópico'}
                    </Button>
                </div>

                {showForm && (
                    <div className="mb-8">
                        <TopicForm articleId={article.id} onTopicCreated={handleTopicCreated} />
                    </div>
                )}

                <div className="space-y-6 mb-12">
                    <h3 className="text-xl font-semibold">
                        Tópicos sobre esta notícia ({topics.length})
                    </h3>
                    {topics.length > 0 ? (
                        <div className="space-y-4">
                            {topics.map( ( topic ) => (
                                <TopicCard key={topic.id} topic={topic} />
                            ) )}
                        </div>
                    ) : (
                        <p className="text-muted-foreground text-center py-8">
                            Nenhum tópico ainda. Seja o primeiro a iniciar uma discussão!
                        </p>
                    )}
                </div>

                {similarTopics.length > 0 && (
                    <div className="space-y-6">
                        <h3 className="text-xl font-semibold">
                            Tópicos Similares
                        </h3>
                        <div className="space-y-4">
                            {similarTopics.map( ( topic ) => (
                                <TopicCard
                                    key={topic.id}
                                    topic={topic}
                                    similarity={topic.similarity}
                                />
                            ) )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

