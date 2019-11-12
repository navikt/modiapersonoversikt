import { erPersonResponsAvTypePerson, Kjønn, PersonRespons } from '../../../../models/person/person';
import { NavKontorResponse } from '../../../../models/navkontor';
import { InnloggetSaksbehandler } from '../../../../models/innloggetSaksbehandler';
import { Locale } from './standardTekster/domain';
import { capitalizeName } from '../../../../utils/stringFormatting';
import { loggError } from '../../../../utils/frontendLogger';

export type AutofullforData = {
    person: PersonRespons;
    saksbehandler: InnloggetSaksbehandler;
    kontor: NavKontorResponse;
};

export type AutofullforMap = {
    'bruker.fnr': string;
    'bruker.fornavn': string;
    'bruker.etternavn': string;
    'bruker.navn': string;
    'bruker.navkontor': string;
    'bruker.subjekt': string;
    'bruker.objekt': string;
    'saksbehandler.fornavn': string;
    'saksbehandler.etternavn': string;
    'saksbehandler.navn': string;
    'saksbehandler.enhet': string;
};

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
            loggError(new Error(`Standardtekster::autofullfor Fant ikke nøkkel: ${key}`));
            return '[ukjent nøkkel]';
        }
        return autofullforMap[key] || '[fant ingen verdi]';
    });
}
