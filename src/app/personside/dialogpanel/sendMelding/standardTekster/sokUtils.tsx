import { parseTekst } from '@navikt/tag-input';
import type * as StandardTekster from './domain';
import type { Tekster } from './domain';

export function rapporterBruk(tekst: StandardTekster.Tekst): void {
    fetch(`${import.meta.env.BASE_URL}/proxy/modia-skrivestotte/skrivestotte/statistikk/${tekst.id}`, {
        method: 'POST'
    });
}

export function sokEtterTekster(data: Tekster | undefined, query: string): Array<StandardTekster.Tekst> {
    const tekster: Array<StandardTekster.Tekst> = data ? Object.values(data) : [];
    if (query === '' || tekster.length === 0) {
        return tekster;
    }

    const { tags: queryTags, text } = parseTekst(query);

    const tags = queryTags.map((tag) => tag.toLowerCase());
    const words = text
        .split(' ')
        .map((word) => word.toLowerCase().replace('#', ''))
        .filter((it) => it);

    return tekster
        .filter((tekst) => {
            const searchTags = tekst.tags.map((tag) => tag.toLowerCase());
            return tags.every((tag) => searchTags.includes(tag));
        })
        .filter((tekst) => {
            const matchtext = [tekst.overskrift, Object.values(tekst.innhold).join('\u0000'), tekst.tags.join('\u0000')]
                .join('\u0000')
                .toLowerCase();

            return words.every((word) => matchtext.includes(word));
        });
}

export function erGyldigValg(tekst: StandardTekster.Tekst | undefined, locale: string): tekst is StandardTekster.Tekst {
    if (!tekst) {
        return false;
    }
    const locales = Object.keys(tekst.innhold);
    return locales.includes(locale);
}
