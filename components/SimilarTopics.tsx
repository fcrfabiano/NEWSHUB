'use client';

import { useEffect, useState } from 'react';
import { findSimilarTopics } from '@/lib/similarity';
import { storageService } from '@/lib/storage';
import { TopicCard } from '@/components/TopicCard';
import { Topic } from '@/types';

export function SimilarTopics( { articleTitle }: { articleTitle: string } ) {
    const [ topics, setTopics ] = useState<Topic[]>( [] );

    useEffect( () => {
        const allTopics = storageService.getTopics();
        const similarTopicsWithScore = articleTitle
            ? findSimilarTopics( articleTitle, allTopics, 5 )
            : [];
        console.log( similarTopicsWithScore );


        const similarTopics = similarTopicsWithScore.map( ( { similarity, ...topicData } ) => {
            const fullTopic = allTopics.find( t => t.id === topicData.id );
            return fullTopic ? { ...fullTopic, similarity } : null;
        } ).filter( ( t ) => t !== null );
    }, [ articleTitle ] );

    if ( !topics.length ) return null;

    return (
        <div className="space-y-6 mt-10">
            <h3 className="text-xl font-semibold">Tópicos Similares</h3>
            <div className="space-y-4">
                {topics.map( ( topic ) => (
                    <TopicCard
                        key={topic.id}
                        topic={topic}
                        similarity={topic.similarity}
                    />
                ) )}
            </div>
        </div>
    );
}
