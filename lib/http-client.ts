import { ApplicationSettings } from './application-settings';

export class HttpClient {
    static buildUrl( resource: string ) {
        const url = ApplicationSettings.API_URL + resource;

        return new URL( url );
    }

    static async get<T>( resource: string, params?: Record<string, string | number> ): Promise<T | undefined> {
        try {
            const url = this.buildUrl( resource );

            if ( params ) {
                for ( const [ key, value ] of Object.entries( params ) ) {
                    url.searchParams.append( key, value.toString() );
                }
            }

            const response = await fetch( url.toString() );

            if ( !response.ok ) {
                throw new Error( response.statusText );
            }

            return response.json();
        } catch ( error ) {
            throw error;
        }
    }
}
