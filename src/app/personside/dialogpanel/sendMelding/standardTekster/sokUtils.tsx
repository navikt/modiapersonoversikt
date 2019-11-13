import { FetchResult, hasData } from '@nutgaard/use-fetch';
import { parseTekst } from '../../../../../components/tag-input/tag-input';
import * as StandardTekster from './domain';

export function sokEtterTekster(
    data: FetchResult<StandardTekster.Tekster>,
    query: string
): Array<StandardTekster.Tekst> {
    const tekster: Array<StandardTekster.Tekst> = hasData(data) ? Object.values(data.data) : [];
    if (query === '' || tekster.length === 0) {
        return tekster;
    }

    const { tags: queryTags, text } = parseTekst(query);

    const tags = queryTags.map(tag => tag.toLowerCase());
    const words = text.split(' ').map(word => word.toLowerCase());

    return tekster
        .filter(tekst => {
            const searchTags = tekst.tags.map(tag => tag.toLowerCase());
            return tags.every(tag => searchTags.includes(tag));
        })
        .filter(tekst => {
            const matchtext = `${tekst.overskrift} \u0000 ${Object.values(tekst.innhold).join('\u0000')}`.toLowerCase();
            return words.every(word => matchtext.includes(word));
        });
}

export function erGyldigValg(tekst: StandardTekster.Tekst | undefined, locale: string): tekst is StandardTekster.Tekst {
    if (!tekst) {
        return false;
    }
    const locales = Object.keys(tekst.innhold);
    return locales.includes(locale);
}
