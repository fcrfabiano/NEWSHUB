import { Article } from '@/types';
import { HNHit } from '@/schemas/hn-api.schema';

export class HNApiMapper {
    static toArticle( hit: HNHit ): Article {
        return {
            id: hit.objectID,
            title: hit.title || hit.story_title || 'No title',
            description: this.extractDescription( hit ),
            content: hit.story_text || hit.title || '',
            url: hit.url || hit.story_url || `https://news.ycombinator.com/item?id=${hit.objectID}`,
            urlToImage: this.getPlaceholderImage( hit ),
            publishedAt: hit.created_at,
            source: {
                id: 'hackernews',
                name: 'Hacker News'
            },
            category: this.extractCategory( hit._tags ),
            author: hit.author || 'Anonymous'
        };
    }

    static toArticles( hits: HNHit[] ): Article[] {
        const mapperHits = [];

        for ( const hit of hits )
        {
            mapperHits.push( this.toArticle( hit ) );
        }

        return mapperHits;
    }

    private static extractDescription( hit: HNHit ): string {
        if ( hit.story_text ) {
            return hit.story_text.substring( 0, 200 ) + ( hit.story_text.length > 200 ? '...' : '' );
        }

        const comments = hit.num_comments || 0;
        const points = hit.points || 0;

        return `${points} points • ${comments} comments`;
    }

    private static extractCategory( tags: string[] ): string {
        if ( tags.includes( 'ask_hn' ) ) return 'discussion';
        if ( tags.includes( 'show_hn' ) ) return 'show';
        if ( tags.includes( 'poll' ) ) return 'poll';
        if ( tags.includes( 'story' ) ) return 'technology';
        return 'technology';
    }

    private static getPlaceholderImage( hit: HNHit ): string {
        const category = this.extractCategory( hit._tags );

        const images: Record<string, string> = {
            discussion: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800',
            show: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800',
            poll: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800',
            technology: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=800'
        };

        return images[category] || images.technology;
    }
}
