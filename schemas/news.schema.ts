import { z } from 'zod';

export const NewsCategoryEnum = {
    story: 'story',
    ask_hn: 'ask_hn',
    show_hn: 'show_hn',
    poll: 'poll',
    pollopt: 'pollopt',
    comment: 'comment',
    launch_hn: 'launch_hn',
    job: 'job'
} as const;

export const newsCategorySchema = z.enum( [ 'story', 'ask_hn', 'show_hn', 'poll' ] );

export type NewsCategory = z.infer<typeof newsCategorySchema>;

export const categoryDisplayNames: Record<NewsCategory, string> = {
    story: 'Tecnologia',
    ask_hn: 'Discussão',
    show_hn: 'Show HN',
    poll: 'Enquete'
};

export function getCategoryTag( category?: string ): string {
    const categoryMap: Record<string, string> = {
        technology: 'story',
        discussion: 'ask_hn',
        show: 'show_hn',
        poll: 'poll'
    };

    return category ? categoryMap[category] || 'story' : 'story';
}
