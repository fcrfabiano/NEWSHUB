import { NewsCard } from '@/components/NewsCard';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { NewsService } from '@/service/NewsService';
import { AlertCircle, ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';
import type { PaginatedArticles } from '@/types';
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious
} from '@/components/ui/pagination';
import Link from 'next/link';

interface NewsPageProps {
    searchParams: Promise<Record<string, string | string[] | undefined>>;
}

const getDefaultNewsData = () => (
    {
        articles: [],
        hasNextPage: false,
        hasPrevPage: false,
        nbPages: 0,
        page: 0
    }
);

export default async function NewsPage( { searchParams }: NewsPageProps ) {
    const resolvedSearchParams = await searchParams;
    const categoryParam = resolvedSearchParams?.category;
    const pageParam = resolvedSearchParams?.page;
    const category = Array.isArray( categoryParam )
        ? categoryParam[0]
        : categoryParam;
    const page = pageParam ? Number( Array.isArray( pageParam ) ? pageParam[0] : pageParam ) : 0;
    let newsData: PaginatedArticles = getDefaultNewsData();
    let hasError = false;

    try {
        newsData = await NewsService.fetchNews( category, page );
    } catch {
        hasError = true;
        newsData = getDefaultNewsData();
    }

    return (
        <>
            <div className="mb-8">
                <h1 className="text-4xl font-bold mb-2">
                    {category ? `${category.charAt( 0 ).toUpperCase() + category.slice( 1 )}` : 'Todas as Notícias'}
                </h1>
                <p className="text-muted-foreground">
                    Últimas notícias e atualizações
                </p>
            </div>

            {hasError && (
                <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>
                        Erro ao carregar notícias. Tente novamente mais tarde.
                    </AlertDescription>
                </Alert>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {newsData.articles.map( ( article ) => (
                    <NewsCard key={article.id} article={article} />
                ) )}
            </div>

            {!hasError && newsData.articles.length === 0 && (
                <div className="text-center py-12">
                    <p className="text-muted-foreground">Nenhuma notícia encontrada.</p>
                </div>
            )}

            {newsData.articles.length > 0 && (
                <Pagination className="mt-8">
                    <PaginationContent>
                        {Array.from( { length: 5 } ).map( ( _, i ) => {
                            const startPage = Math.max( 1, page - 2 );
                            const pageNum = startPage + i;

                            if ( pageNum >= newsData.nbPages ) return null;

                            return (
                                <PaginationItem key={pageNum}>
                                    <PaginationLink
                                        asChild
                                        isActive={page === pageNum}
                                        className="cursor-pointer"
                                    >
                                        <Link
                                            href={{
                                                pathname: '/news',
                                                query: {
                                                    ...( category ? { category } : {} ),
                                                    page: pageNum
                                                }
                                            }}
                                        >
                                            {pageNum + 1}
                                        </Link>
                                    </PaginationLink>
                                </PaginationItem>
                            );
                        } )}
                    </PaginationContent>
                </Pagination>
            )}
        </>
    );
}
