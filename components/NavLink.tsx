import Link, { LinkProps } from 'next/link';
import { forwardRef } from 'react';
import { cn } from '@/lib/utils';
import { usePathname } from 'next/navigation';

export interface NavLinkProps extends Omit<LinkProps, 'className'> {
    className?: string;
    activeClassName?: string;
}

const NavLink = forwardRef<HTMLAnchorElement, NavLinkProps>( function NavLink(
    { className, activeClassName, href, ...props },
    ref
) {
    const pathname = usePathname();
    const stringHref = typeof href === 'string' ? href : href?.toString();
    const isActive = stringHref ? pathname === stringHref : false;

    return (
        <Link
            ref={ref}
            href={href}
            className={cn(
                className,
                isActive && activeClassName
            )}
            {...props}
        />
    );
} );

export default NavLink;
