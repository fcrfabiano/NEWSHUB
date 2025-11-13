'use client';

import type { Topic } from '@/types';

const TOPICS_KEY = 'forum_topics';

export const storageService = {
    getTopics: (): Topic[] => {
        try {
            const stored = localStorage.getItem( TOPICS_KEY );
            return stored ? JSON.parse( stored ) : [];
        } catch {
            return [];
        }
    },

    saveTopic: ( topic: Topic ): Topic => {
        const topics = storageService.getTopics();
        topics.unshift( topic );
        localStorage.setItem( TOPICS_KEY, JSON.stringify( topics ) );
        return topic;
    },

    getTopicsByArticle: ( articleId: string ): Topic[] => {
        return storageService.getTopics().filter( topic => topic.articleId === articleId );
    },

    searchTopics: ( query: string ): Topic[] => {
        const topics = storageService.getTopics();
        const lowerQuery = query.toLowerCase();
        return topics.filter(
            topic => topic.title.toLowerCase().includes( lowerQuery ) ||
                topic.content.toLowerCase().includes( lowerQuery )
        );
    }
};
