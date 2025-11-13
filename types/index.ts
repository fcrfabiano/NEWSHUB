export interface Article {
    id: string;
    title: string;
    description: string;
    content: string;
    url: string;
    urlToImage: string;
    publishedAt: string;
    source: {
        id: string | null;
        name: string;
    };
    category?: string;
    author?: string;
}

export interface PaginatedArticles {
    articles: Article[];
    page: number;
    nbPages: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
}

export interface Topic {
    id: string;
    articleId: string;
    title: string;
    content: string;
    createdAt: string;
    author: string;
    similarity?: number;
}

export interface NewsApiResponse {
    status: string;
    totalResults: number;
    articles: Article[];
}

export interface ArticleResponse {
    id: number;
    created_at: string;
    author: string;
    title: string;
    url: string;
    points: number;
    children: string[];
    text: string;
    type: string;
    parent_id: number;
}
