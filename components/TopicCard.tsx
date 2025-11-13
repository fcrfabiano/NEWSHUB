import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MessageSquare, User } from 'lucide-react';
import type { Topic } from '@/types';
import { formatDistanceToNow } from '@/lib/utils';

interface TopicCardProps {
    topic: Topic;
    similarity?: number;
}

export function TopicCard( { topic, similarity }: TopicCardProps ) {
    return (
        <Card className="transition-all hover:shadow-md">
            <CardHeader>
                <div className="flex items-start justify-between gap-2">
                    <CardTitle className="text-lg line-clamp-2 flex-1">{topic.title}</CardTitle>
                    {similarity && similarity > 0 && (
                        <Badge variant="secondary" className="text-xs">
                            {Math.round( similarity * 100 )}% similar
                        </Badge>
                    )}
                </div>
                <CardDescription className="line-clamp-3">{topic.content}</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                        <User className="h-4 w-4" />
                        <span>{topic.author}</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <MessageSquare className="h-4 w-4" />
                        <span>
                            {formatDistanceToNow( new Date( topic.createdAt ) )}
                        </span>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
