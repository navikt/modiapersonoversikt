import { InnloggetSaksbehandler } from '../../../../models/innloggetSaksbehandler';
import { Locale } from './standardTekster/domain';
import { capitalizeName } from '../../../../utils/string-utils';
import { loggEvent, loggWarning } from '../../../../utils/logger/frontendLogger';
import { useRestResource } from '../../../../rest/consumer/useRestResource';
import { Enhet } from '../../../../models/saksbehandlersEnheter';
import { useAppState, useHentPersondata } from '../../../../utils/customHooks';
import { selectValgtEnhet } from '../../../../redux/session/session';
import { hasData } from '@nutgaard/use-fetch';
import { Data as PersonData, Kjonn } from '../../visittkort-v2/PersondataDomain';
import { hentNavn } from '../../visittkort-v2/visittkort-utils';

export type AutofullforData = {
    enhet?: Enhet;
    person?: PersonData;
    saksbehandler?: InnloggetSaksbehandler;
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
};

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
};

function objektPronomen(kjonn: Kjonn, locale: string) {
    return (objektPronomenMap[kjonn] || {})[locale] || null;
}

function subjectPronomen(kjonn: Kjonn, locale: string) {
    return (subjectPronomenMap[kjonn] || {})[locale] || null;
}

export function byggAutofullforMap(
    locale: string,
    enhet?: Enhet,
    persondata?: PersonData,
    saksbehandler?: InnloggetSaksbehandler
): AutofullforMap {
    let personData = {
        'bruker.fnr': '[bruker.fnr]',
        'bruker.fornavn': '[bruker.fornavn]',
        'bruker.etternavn': '[bruker.etternavn]',
        'bruker.navn': '[bruker.navn]',
        'bruker.subjekt': '[bruker.subjekt]',
        'bruker.objekt': '[bruker.objekt]'
    };

    if (persondata) {
        const { person } = persondata;
        const kjonn = person.kjonn.firstOrNull()?.kode;
        personData = {
            'bruker.fnr': person.fnr,
            'bruker.fornavn': capitalizeName(person.navn.firstOrNull()?.fornavn || ''),
            'bruker.etternavn': capitalizeName(
                [person.navn.firstOrNull()?.mellomnavn, person.navn.firstOrNull()?.etternavn].filter((v) => v).join(' ')
            ),
            'bruker.navn': hentNavn(person.navn.firstOrNull()),
            'bruker.subjekt': kjonn && subjectPronomen(kjonn, locale),
            'bruker.objekt': kjonn && objektPronomen(kjonn, locale)
        };
    }

    return {
        ...personData,
        'saksbehandler.enhet': enhet?.navn || '[saksbehandler.enhet]',
        'bruker.navkontor': persondata?.person.navEnhet?.navn || 'Ukjent kontor',
        'saksbehandler.fornavn': saksbehandler?.fornavn || '[saksbehandler.fornavn]',
        'saksbehandler.etternavn': saksbehandler?.etternavn || '[saksbehandler.etternavn]',
        'saksbehandler.navn': saksbehandler?.navn || '[saksbehandler.navn]'
    };
}

export function autofullfor(tekst: string, autofullforMap: AutofullforMap): string {
    const keys = Object.keys(autofullforMap);
    return tekst.replace(/\[(.*?)\]/g, (fullmatch, key) => {
        if (!keys.includes(key)) {
            loggWarning(new Error(`Standardtekster::autofullfor Fant ikke nøkkel: ${key}`));
            loggEvent('manglendeNokkel', 'autofullfør', { nøkkel: key });
            return '[ukjent nøkkel]';
        }
        return autofullforMap[key] || '[fant ingen verdi]';
    });
}

export function useAutoFullforData(): AutofullforData | undefined {
    const personResponse = useHentPersondata();
    const saksbehandler = useRestResource((resources) => resources.innloggetSaksbehandler);
    const enheter = useRestResource((resources) => resources.saksbehandlersEnheter);
    const valgtEnhetId = useAppState(selectValgtEnhet);
    const valgtEnhet = enheter.data?.enhetliste?.find((enhet) => enhet.enhetId === valgtEnhetId);

    return {
        enhet: valgtEnhet,
        person: hasData(personResponse) ? personResponse.data : undefined,
        saksbehandler: saksbehandler.data
    };
}
