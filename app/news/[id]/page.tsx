import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { NewsService } from '@/service/NewsService';
import { NewsDetailContent } from '@/components/NewsDetailContent';
import { SimilarTopics } from '@/components/SimilarTopics';

interface NewsDetailPageProps {
    params: Promise<{
        id: string;
    }>;
}

export default async function NewsDetailPage( { params }: NewsDetailPageProps ) {
    const { id } = await params;
    const article = await NewsService.findById( id );

    if ( !article ) {
        return (
            <>
                <div className="text-center">
                    <h1 className="text-4xl font-bold mb-4">Notícia não encontrada</h1>
                    <Link href="/news">
                        <Button>Voltar para notícias</Button>
                    </Link>
                </div>
            </>
        );
    }

    return (
        <NewsDetailContent article={article} />
    );
}
