import { FetchResult, hasData } from '@nutgaard/use-fetch';
import { parseTekst } from '../../../../../components/tag-input/tag-input';
import * as StandardTekster from './domain';
import { AutofullforMap, Locale } from './domain';
import { erPersonResponsAvTypePerson, Kjønn, PersonRespons } from '../../../../../models/person/person';
import { NavKontorResponse } from '../../../../../models/navkontor';
import { InnloggetSaksbehandler } from '../../../../../models/innloggetSaksbehandler';
import { capitalizeName } from '../../../../../utils/stringFormatting';

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

const subjectPronomenMap = {
    [Kjønn.Mann]: {
        [Locale.nb_NO]: 'han',
        [Locale.nn_NO]: 'han',
        [Locale.en_US]: 'he'
    },
    [Kjønn.Kvinne]: {
        [Locale.nb_NO]: 'hun',
        [Locale.nn_NO]: 'ho',
        [Locale.en_US]: 'she'
    }
};

const objektPronomenMap = {
    [Kjønn.Mann]: {
        [Locale.nb_NO]: 'ham',
        [Locale.nn_NO]: 'han',
        [Locale.en_US]: 'him'
    },
    [Kjønn.Kvinne]: {
        [Locale.nb_NO]: 'henne',
        [Locale.nn_NO]: 'ho',
        [Locale.en_US]: 'her'
    }
};

function objektPronomen(kjonn: Kjønn, locale: string) {
    return (objektPronomenMap[kjonn] || {})[locale] || null;
}

function subjectPronomen(kjonn: Kjønn, locale: string) {
    return (subjectPronomenMap[kjonn] || {})[locale] || null;
}

export function byggAutofullforMap(
    person: PersonRespons,
    navKontor: NavKontorResponse,
    saksbehandler: InnloggetSaksbehandler,
    locale: string
): AutofullforMap {
    let personData = {
        'bruker.fnr': '',
        'bruker.fornavn': '',
        'bruker.etternavn': '',
        'bruker.navn': '',
        'bruker.subjekt': '',
        'bruker.objekt': ''
    };

    if (erPersonResponsAvTypePerson(person)) {
        personData = {
            'bruker.fnr': person.fødselsnummer,
            'bruker.fornavn': capitalizeName(person.navn.fornavn || ''),
            'bruker.etternavn': capitalizeName(
                [person.navn.mellomnavn, person.navn.etternavn].filter(v => v).join(' ')
            ),
            'bruker.navn': capitalizeName(
                [person.navn.fornavn, person.navn.mellomnavn, person.navn.etternavn].filter(v => v).join(' ')
            ),
            'bruker.subjekt': subjectPronomen(person.kjønn, locale),
            'bruker.objekt': objektPronomen(person.kjønn, locale)
        };
    }

    return {
        ...personData,
        'bruker.navkontor': navKontor.enhetNavn,
        'saksbehandler.fornavn': saksbehandler.fornavn,
        'saksbehandler.etternavn': saksbehandler.etternavn,
        'saksbehandler.navn': saksbehandler.navn,
        'saksbehandler.enhet': saksbehandler.enhetNavn
    };
}

export function autofullfor(tekst: string, autofullforMap: AutofullforMap): string {
    const keys = Object.keys(autofullforMap);
    return tekst.replace(/\[(.*?)\]/g, (fullmatch, key) => {
        if (!keys.includes(key)) {
            return '[ukjent nøkkel]';
        }
        return autofullforMap[key] || '[fant ingen verdi]';
    });
}
