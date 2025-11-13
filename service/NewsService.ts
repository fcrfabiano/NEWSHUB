import { Article, ArticleResponse, PaginatedArticles } from '@/types';
import { HttpClient } from '@/lib/http-client';
import { HNSearchResponseSchema } from '@/schemas/hn-api.schema';
import { HNApiMapper } from '@/mappers/hn-api.mapper';
import { getCategoryTag } from '@/schemas/news.schema';

export class NewsService {
    static async fetchNews( category?: string, page: number = 1 ): Promise<PaginatedArticles> {
        try {
            const tags = getCategoryTag( category );

            const data = await HttpClient.get( '/search_by_date', {
                tags,
                page: page.toString(),
                hitsPerPage: '20'
            } );

            const validatedData = HNSearchResponseSchema.parse( data );

            return {
                articles: HNApiMapper.toArticles( validatedData.hits ),
                page: validatedData.page,
                nbPages: validatedData.nbPages,
                hasNextPage: validatedData.page < validatedData.nbPages - 1,
                hasPrevPage: validatedData.page > 0
            };
        } catch ( error ) {
            console.error( 'Error fetching news:', error );
            throw error;
        }
    }

    static async findById( id: string ): Promise<Article | null> {
        try {
            const data = await HttpClient.get<ArticleResponse>( `/items/${id}`, {} );

            if ( data === null
                || data === undefined )
            {
                return null;
            }

            return HNApiMapper.toArticle( {
                objectID: data.id?.toString() || id,
                created_at: data.created_at,
                author: data.author,
                title: data.title,
                url: data.url,
                points: data.points,
                num_comments: data.children?.length || 0,
                story_text: data.text,
                created_at_i: new Date( data.created_at ).getTime() / 1000,
                _tags: data.type ? [ data.type ] : [ 'story' ],
                parent_id: data.parent_id
            } );
        } catch ( error ) {
            console.error( 'Error fetching article:', error );
            return null;
        }
    }
}
