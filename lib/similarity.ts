function tokenize( text: string ) {
    return text
        .toLowerCase()
        .replace( /[^\w\s]/g, '' )
        .split( /\s+/ )
        .filter( Boolean );
}

function unique( array: string[] ) {
    return Array.from( new Set( array ) );
}

export function calculateSimilarity( a: string, b: string ) {
    const tokenA = unique( tokenize( a ) );
    const tokenB = unique( tokenize( b ) );
    const interCount = tokenA.filter( x => tokenB.includes( x ) ).length;
    const unionCount = unique( [ ...tokenA, ...tokenB ] ).length;

    if ( unionCount === 0 ) return 0;

    return interCount / unionCount;
}

export function findSimilarTopics(
    title: string,
    topics: { id: string; title: string }[],
    limit: number = 5
) {
    return topics
        .map( topic => ( {
            ...topic,
            similarity: calculateSimilarity( title, topic.title )
        } ) )
        .filter( t => t.similarity > 0 )
        .sort( ( a, b ) => b.similarity - a.similarity )
        .slice( 0, limit );
}
