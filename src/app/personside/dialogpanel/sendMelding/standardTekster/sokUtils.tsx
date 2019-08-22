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

    const { tags, text } = parseTekst(query);
    const words = text.split(' ');

    return tekster
        .filter(tekst => tags.every(tag => tekst.tags.includes(tag)))
        .filter(tekst => {
            const matchtext = `${tekst.overskrift} \u0000 ${Object.values(tekst.innhold).join('\u0000')}`;
            return words.every(word => matchtext.includes(word));
        });
}
