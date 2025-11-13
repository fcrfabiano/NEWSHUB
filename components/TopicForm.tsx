'use client';

import { useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import type { Topic } from '@/types';
import { topicSchema } from '@/schemas/topic.schema';
import type { z } from 'zod';

interface TopicFormProps {
    articleId: string;
    onTopicCreated: ( topic: Topic ) => void;
}

export function TopicForm( { articleId, onTopicCreated }: TopicFormProps ) {
    type TopicFormData = z.infer<typeof topicSchema>;

    const resolver = useMemo( () => zodResolver( topicSchema ), [] );

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting }
    } = useForm<TopicFormData>( {
        resolver,
        defaultValues: {
            author: '',
            title: '',
            content: ''
        }
    } );

    const onSubmit = handleSubmit( async ( data ) => {
        try {
            const newTopic: Topic = {
                id: crypto.randomUUID(),
                articleId,
                title: data.title.trim(),
                content: data.content.trim(),
                author: data.author.trim(),
                createdAt: new Date().toISOString()
            };

            onTopicCreated( newTopic );
            reset();
            toast.success( 'Tópico criado com sucesso!' );
        } catch {
            toast.error( 'Erro ao criar tópico' );
        }
    } );

    return (
        <Card>
            <CardHeader>
                <CardTitle>Criar Novo Tópico</CardTitle>
                <CardDescription>
                    Inicie uma discussão sobre esta notícia
                </CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={onSubmit} className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="author">Seu Nome</Label>
                        <Input
                            id="author"
                            placeholder="Digite seu nome"
                            {...register( 'author' )}
                        />
                        {errors.author && (
                            <p className="text-sm text-destructive">{errors.author.message}</p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="title">Título do Tópico</Label>
                        <Input
                            id="title"
                            placeholder="Digite o título"
                            {...register( 'title' )}
                        />
                        {errors.title && (
                            <p className="text-sm text-destructive">{errors.title.message}</p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="content">Conteúdo</Label>
                        <Textarea
                            id="content"
                            placeholder="Escreva sua opinião ou pergunta"
                            {...register( 'content' )}
                            rows={5}
                        />
                        {errors.content && (
                            <p className="text-sm text-destructive">{errors.content.message}</p>
                        )}
                    </div>

                    <Button
                        type="submit"
                        className="w-full"
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? 'Publicando...' : 'Publicar Tópico'}
                    </Button>
                </form>
            </CardContent>
        </Card>
    );
}
