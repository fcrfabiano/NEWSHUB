import { NewsCard } from '@/components/NewsCard';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { NewsService } from '@/service/NewsService';
import { AlertCircle } from 'lucide-react';

export default async function Home() {
    const news = await NewsService.fetchNews();
    const error = false;
    const category = 'story';

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

            {error && (
                <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>
                        Erro ao carregar notícias. Tente novamente mais tarde.
                    </AlertDescription>
                </Alert>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {news?.map( ( article ) => (
                    <NewsCard key={article.id} article={article} />
                ) )}
            </div>

            {news?.length === 0 && (
                <div className="text-center py-12">
                    <p className="text-muted-foreground">Nenhuma notícia encontrada.</p>
                </div>
            )}
        </>
    );
}
