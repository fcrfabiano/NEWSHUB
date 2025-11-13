'use client';

import { cn } from '@/lib/utils';
import { ComponentProps } from 'react';

interface HtmlContentProps extends ComponentProps<'p'> {
    html: string;
}

export default function HtmlContent( {
    html,
    className,
    ...rest
}: HtmlContentProps ) {
    return (
        <p
            className={cn( 'prose prose-neutral max-w-none', className )}
            suppressHydrationWarning
            dangerouslySetInnerHTML={{ __html: html }}
            {...rest}
        />
    );
}
