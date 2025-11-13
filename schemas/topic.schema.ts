import z from 'zod';

export const topicSchema = z.object( {
    author: z
        .string()
        .trim()
        .min( 2, { message: 'Nome deve ter pelo menos 2 caracteres' } )
        .max( 100, { message: 'Nome deve ter no máximo 100 caracteres' } ),
    title: z
        .string()
        .trim()
        .min( 5, { message: 'Título deve ter pelo menos 5 caracteres' } )
        .max( 200, { message: 'Título deve ter no máximo 200 caracteres' } ),
    content: z
        .string()
        .trim()
        .min( 10, { message: 'Conteúdo deve ter pelo menos 10 caracteres' } )
        .max( 2000, { message: 'Conteúdo deve ter no máximo 2000 caracteres' } )
} );

export type Topic = z.infer<typeof topicSchema>;
