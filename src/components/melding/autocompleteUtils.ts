import { useAtomValue } from 'jotai';
import type { Me, VeiledersEnhet } from 'src/generated/modiapersonoversikt-api';
import { useEnheter, useInnloggetSaksbehandler, usePersonData } from 'src/lib/clients/modiapersonoversikt-api';
import { aktivEnhetAtom } from 'src/lib/state/context';
import { Kjonn, type PersonData } from 'src/lib/types/modiapersonoversikt-api';
import { Locale } from 'src/lib/types/skrivestotte';
import { loggEvent, loggWarning } from 'src/utils/logger/frontendLogger';
import { capitalizeName } from 'src/utils/string-utils';
import { hentNavn } from '../PersonLinje/utils';

export type AutofullforData = {
    enhet?: VeiledersEnhet;
    person?: PersonData;
    saksbehandler?: Me;
};

type AutofullforMap = {
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
    [Kjonn.M]: {
        [Locale.nb_NO]: 'han',
        [Locale.nn_NO]: 'han',
        [Locale.en_US]: 'he'
    },
    [Kjonn.K]: {
        [Locale.nb_NO]: 'hun',
        [Locale.nn_NO]: 'ho',
        [Locale.en_US]: 'she'
    }
} as Partial<Record<Kjonn, Record<Locale, string>>>;

const objektPronomenMap = {
    [Kjonn.M]: {
        [Locale.nb_NO]: 'ham',
        [Locale.nn_NO]: 'han',
        [Locale.en_US]: 'him'
    },
    [Kjonn.K]: {
        [Locale.nb_NO]: 'henne',
        [Locale.nn_NO]: 'ho',
        [Locale.en_US]: 'her'
    }
} as Partial<Record<Kjonn, Record<Locale, string>>>;

function objektPronomen(kjonn: Kjonn, locale: Locale) {
    return objektPronomenMap[kjonn]?.[locale] || null;
}

function subjectPronomen(kjonn: Kjonn, locale: Locale) {
    return subjectPronomenMap[kjonn]?.[locale] || null;
}

export function byggAutofullforMap(
    locale: string,
    enhet?: VeiledersEnhet,
    person?: PersonData,
    saksbehandler?: Me
): AutofullforMap {
    let personData = {
        'bruker.fnr': '[bruker.fnr]',
        'bruker.fornavn': '[bruker.fornavn]',
        'bruker.etternavn': '[bruker.etternavn]',
        'bruker.navn': '[bruker.navn]',
        'bruker.subjekt': '[bruker.subjekt]',
        'bruker.objekt': '[bruker.objekt]'
    };

    if (person) {
        const kjonn = person.kjonn.firstOrNull()?.kode;
        personData = {
            'bruker.fnr': person.personIdent,
            'bruker.fornavn': capitalizeName(person.navn.firstOrNull()?.fornavn || ''),
            'bruker.etternavn': capitalizeName(
                [person.navn.firstOrNull()?.mellomnavn, person.navn.firstOrNull()?.etternavn].filter((v) => v).join(' ')
            ),
            'bruker.navn': capitalizeName(hentNavn(person.navn.firstOrNull() ?? undefined)),
            'bruker.subjekt': (kjonn && subjectPronomen(kjonn, locale as Locale)) ?? personData['bruker.subjekt'],
            'bruker.objekt': (kjonn && objektPronomen(kjonn, locale as Locale)) ?? personData['bruker.objekt']
        };
    }

    return {
        ...personData,
        'saksbehandler.enhet': enhet?.navn || '[saksbehandler.enhet]',
        'bruker.navkontor': person?.navEnhet?.navn || 'Ukjent kontor',
        'saksbehandler.fornavn': saksbehandler?.fornavn || '[saksbehandler.fornavn]',
        'saksbehandler.etternavn': saksbehandler?.etternavn || '[saksbehandler.etternavn]',
        'saksbehandler.navn': saksbehandler?.navn || '[saksbehandler.navn]'
    };
}

const isAutofullforKey = (key: string, autofullforMap: AutofullforMap): key is keyof AutofullforMap => {
    const keys = Object.keys(autofullforMap);

    return keys.includes(key);
};

export function autofullfor(tekst: string, autofullforMap: AutofullforMap): string {
    return tekst.replace(/\[(.*?)\]/g, (_fullmatch, key: string) => {
        if (!isAutofullforKey(key, autofullforMap)) {
            loggWarning(new Error(`Standardtekster::autofullfor Fant ikke nøkkel: ${key}`));
            loggEvent('manglendeNokkel', 'autofullfør', { nøkkel: key });
            return '[ukjent nøkkel]';
        }

        return autofullforMap[key] || '[fant ingen verdi]';
    });
}

export function useAutoFullforData() {
    const { data: personData } = usePersonData();
    const { data: veilederData } = useInnloggetSaksbehandler();
    const { data: veilederEnheterData } = useEnheter();

    const enheter = veilederEnheterData?.enhetliste ?? [];
    const enhetId = useAtomValue(aktivEnhetAtom);
    const valgtEnhet = enheter.find((enhet) => enhet.enhetId === enhetId);

    return {
        enhet: valgtEnhet,
        person: personData?.person,
        saksbehandler: veilederData
    };
}
