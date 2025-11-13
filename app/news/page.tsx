import { NewsCard } from '@/components/NewsCard';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { NewsService } from '@/service/NewsService';
import { AlertCircle } from 'lucide-react';
import type { Article } from '@/types';

interface NewsPageProps {
    searchParams: Promise<Record<string, string | string[] | undefined>>;
}

export default async function NewsPage( { searchParams }: NewsPageProps ) {
    const resolvedSearchParams = await searchParams;
    const categoryParam = resolvedSearchParams?.category;
    const category = Array.isArray( categoryParam )
        ? categoryParam[ 0 ]
        : categoryParam;
    let news: Article[] = [];
    let hasError = false;

    try {
        news = await NewsService.fetchNews( category );
    } catch {
        hasError = true;
        news = [];
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
                {news.map( ( article ) => (
                    <NewsCard key={article.id} article={article} />
                ) )}
            </div>

            {!hasError && news.length === 0 && (
                <div className="text-center py-12">
                    <p className="text-muted-foreground">Nenhuma notícia encontrada.</p>
                </div>
            )}
        </>
    );
}
