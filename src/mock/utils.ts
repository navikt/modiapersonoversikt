import * as qs from 'query-string';

export function delayed(time: number, response: object) {
    return () => new Promise((resolve) => setTimeout(() => resolve(response), time));
}

interface Config {
    body: string;
}

export function respondWith(handler: (url: string, config: Config, request: object) => void) {
    return (url: string, config: Config, extra: object) => {
        const queryParams = qs.parse(qs.extract(url));
        const bodyParams = config && config.body && JSON.parse(config.body);

        let response;

        if (typeof handler === 'function') {
            response = handler(url, config, { queryParams, bodyParams, extra });
        } else {
            response = handler; // Trust me, its data
        }

        /* tslint:disable */
        if (console.groupCollapsed) {
            console.groupCollapsed(url);
            console.groupCollapsed('config');
            console.log('url', url);
            console.log('config', config);
            console.log('queryParams', queryParams);
            console.log('bodyParams', bodyParams);
            console.log('extra', extra);
            console.groupEnd();

            console.log('response', response);
            console.groupEnd();
        }
        /* tslint:enable */
        return response;
    };
}

let seed = 42;
export function seedRandom(newSeed: number) {
    seed = newSeed;
}

export function random(): number {
    const x = Math.sin(seed++) * 100000;
    return x - Math.floor(x);
}

export function randRange(fromInclusive: number, toExclusive: number): number {
    const range = toExclusive - fromInclusive;
    return (Math.floor(random() * 10000) % range) + fromInclusive;
}

export function getSeedFromString(text: string): number {
    return text.split('')
        .map((c: string) => c.charCodeAt(0))
        .reduce((sum: number, elem: number) => sum + elem, 0);
}

export function randomIssue(): string {
    const validPrefixes = ['FO', 'PUS'];
    const prefix = validPrefixes[randRange(0, validPrefixes.length)];
    return `${prefix}-${randRange(1, 200)}`;
}

export function shuffleList<T>(elems: T[]): T[] {
    const copy = [...elems];
    const newList: T[] = [];
    while (copy.length > 0) {
        newList.push(copy.splice(randRange(0, copy.length), 1)[0]);
    }
    return newList;
}

export function randomMessage(): string {
    const commitMessages = [
        'Fix tslint issues',
        'Ikke vis listevisning på veiledersiden',
        'Reduserer antall søyler i diagrammet',
        'Bruk slice i stede for splice',
        'Bytter sorteringsfelt til aapunntakukerigjen',
        'Sender med filter ved lasting av portefølje',
        'Fikser sonarfeil',
        'Bruker uker igjen i visningen av aap unntak',
        'Legg til listevisning på min oversikt',
        'Setter private=true i package.json',
        'Adding UU-definition file',
        'Må støtte at brukere kommer inn med ugyldig enhet i urlen',
        'Oppdaterer lockfile',
        'Legg til nyc',
        'Fjerner camel-casing da solr-feltene er lowercase',
        'Renaming - konsistent naming av aapUnntakDagerIgjen',
        'Viser feilmodal når bytte av enhet feiler pga kontekstholder',
        'Bugfiks der alertstripe er angitt med feil navn',
        'Fjerner ubrukt import',
        'Skriver litt flere tester',
        'Fikser bug i utledning av status på arbeidserfaring',
        'Må bruker Tom og ikke Fom for arbeidsperiode',
        'Fikser diverse feil',
        'la til policy som sjekker at vi har faste versjoner i package.json',
        'Kunne finnt og fordele nye brukere',
        'Legge til masse nye features',
        'Ta i bruk masse feature-toggles',
        'Slette masse feature-toggles',
        'Legge til rette for digitale brukere',
        'Gjøre masse designendinger',
        'Legge til animasjoner',
        'Fjerne en KVP-toggle'
    ];
    return commitMessages[randRange(0, commitMessages.length)];
}

export function randomAuthor(): string {
    const authors = [
        'Dummy the cat',
        'Ole Brumm',
        'Pusur',
        'Donald Duck',
        'Mikke Mus'
    ];
    return authors[randRange(0, authors.length)];
}
