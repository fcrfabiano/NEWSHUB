import { Article } from '@/types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, ExternalLink } from 'lucide-react';
import Link from 'next/link';
import { formatDistanceToNow } from '@/lib/utils';
import Image from 'next/image';
import HtmlContent from './HtmlContext';

interface NewsCardProps {
    article: Article;
}

export function NewsCard( { article }: NewsCardProps ) {
    return (
        <Link href={`/news/${article.id}`}>
            <Card className="h-full pt-0 overflow-hidden transition-all hover:shadow-card-hover hover:-translate-y-1 cursor-pointer">
                {article.urlToImage && (
                    <div className="aspect-video w-full overflow-hidden">
                        <Image
                            src={article.urlToImage}
                            alt={article.title}
                            className="w-full h-full object-cover transition-transform hover:scale-105"
                            width={390}
                            height={220}
                            objectFit="cover"
                        />
                    </div>
                )}
                <CardHeader>
                    <div className="flex items-center gap-2 mb-2">
                        <Badge variant="secondary" className="text-xs">
                            {article.source.name}
                        </Badge>
                        {article.category && (
                            <Badge variant="outline" className="text-xs capitalize">
                                {article.category}
                            </Badge>
                        )}
                    </div>
                    <CardTitle className="line-clamp-2 text-xl">{article.title}</CardTitle>
                    <CardDescription className="line-clamp-3 mt-2">
                        <HtmlContent html={article.description}/>
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            <span>
                                {
                                    formatDistanceToNow(
                                        new Date( article.publishedAt )
                                    )
                                }
                            </span>
                        </div>
                        <ExternalLink className="h-4 w-4" />
                    </div>
                </CardContent>
            </Card>
        </Link>
    );
}
