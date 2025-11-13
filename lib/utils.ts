import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn( ...inputs: ClassValue[] ) {
    return twMerge( clsx( inputs ) );
}

export function formatDistanceToNow( date: Date | string | number ) {
    const now = new Date();
    const target = new Date( date );
    const differenceInMsCount = target.getTime() - now.getTime();

    const secondCount = Math.abs( differenceInMsCount ) / 1000;
    const minuteCount = Math.floor( secondCount / 60 );
    const hourCount = Math.floor( minuteCount / 60 );
    const dayCount = Math.floor( hourCount / 24 );
    const monthCount = Math.floor( dayCount / 30 );
    const yearCount = Math.floor( dayCount / 365 );

    const isFuture = differenceInMsCount > 0;

    let value: number;
    let unit: string;

    if ( secondCount < 60 ) {
        value = Math.floor( secondCount );
        unit = 'segundo';
    } else if ( minuteCount < 60 ) {
        value = minuteCount;
        unit = 'minuto';
    } else if ( hourCount < 24 ) {
        value = hourCount;
        unit = 'hora';
    } else if ( dayCount < 30 ) {
        value = dayCount;
        unit = 'dia';
    } else if ( monthCount < 12 ) {
        value = monthCount;
        unit = 'mês';
    } else {
        value = yearCount;
        unit = 'ano';
    }

    if ( value !== 1 && !unit.endsWith( 's' ) ) {
        if ( unit.endsWith( 'mês' ) ) unit = 'meses';
        else unit += 's';
    }

    return isFuture
        ? `em ${value} ${unit}`
        : `há ${value} ${unit}`;
}
