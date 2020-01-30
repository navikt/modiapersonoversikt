import { FetchResult, hasData } from '@nutgaard/use-fetch';
import { parseTekst } from '../../../../../components/tag-input/tag-input';
import * as StandardTekster from './domain';
import { Tekst } from './domain';

interface Candidate {
    weight: number;
    tekst: Tekst;
    tags: string[];
    searchableText: string;
}

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
    const words = text
        .split(' ')
        .map(word => word.toLowerCase().replace('#', ''))
        .concat(tags)
        .filter(it => it);

    const candidates: Candidate[] = tekster
        .map(tekst => {
            const tags = tekst.tags.map(tag => tag.toLowerCase());
            const searchableText = `${tekst.overskrift} \u0000 ${Object.values(tekst.innhold).join(
                '\u0000'
            )} ${tags.join(' ')}`.toLowerCase();
            return {
                weight: 0,
                tekst: tekst,
                tags: tags,
                searchableText: searchableText
            };
        })
        .filter(candidate => {
            return tags.every(tag => candidate.tags.includes(tag));
        })
        .filter(candidate => {
            return words.every(word => candidate.searchableText.includes(word));
        });

    const weightedCandidates: Candidate[] = candidates.map(candidate => {
        const wordScore = words.reduce((acc, word) => {
            const regexp = new RegExp(word, 'g');
            const matches = candidate.searchableText.match(regexp)?.length;
            return acc + (matches || 0);
        }, 0);
        const tagScore = words.reduce((acc, word) => {
            const score = candidate.tags.includes(word) ? 100 : 0;
            return acc + score;
        }, 0);
        return {
            ...candidate,
            weight: wordScore + tagScore
        };
    });

    const sortedCandidates = weightedCandidates.sort((a, b) => b.weight - a.weight);

    return sortedCandidates.map(candidate => candidate.tekst);
}

export function erGyldigValg(tekst: StandardTekster.Tekst | undefined, locale: string): tekst is StandardTekster.Tekst {
    if (!tekst) {
        return false;
    }
    const locales = Object.keys(tekst.innhold);
    return locales.includes(locale);
}
