import { erPersonResponsAvTypePerson, Kjønn, PersonRespons } from '../../../../models/person/person';
import { NavKontorResponse } from '../../../../models/navkontor';
import { InnloggetSaksbehandler } from '../../../../models/innloggetSaksbehandler';
import { Locale } from './standardTekster/domain';
import { capitalizeName } from '../../../../utils/string-utils';
import { loggEvent, loggWarning } from '../../../../utils/logger/frontendLogger';
import { useRestResource } from '../../../../rest/consumer/useRestResource';
import { Enhet } from '../../../../models/saksbehandlersEnheter';
import { useAppState } from '../../../../utils/customHooks';
import { selectValgtEnhet } from '../../../../redux/session/session';

export type AutofullforData = {
    enhet: Enhet;
    person?: PersonRespons;
    saksbehandler?: InnloggetSaksbehandler;
    kontor?: NavKontorResponse;
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
    locale: string,
    enhet: Enhet,
    person?: PersonRespons,
    navKontor?: NavKontorResponse,
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

    if (person && erPersonResponsAvTypePerson(person)) {
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
        'saksbehandler.enhet': enhet?.navn || '[saksbehandler.enhet]',
        'bruker.navkontor': navKontor?.enhetNavn || 'Ukjent kontor',
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

export function useAutoFullførData(): AutofullforData | undefined {
    const personResource = useRestResource(resources => resources.personinformasjon);
    const saksbehandler = useRestResource(resources => resources.innloggetSaksbehandler);
    const navKontorResource = useRestResource(resources => resources.brukersNavKontor);
    const enheter = useRestResource(resources => resources.saksbehandlersEnheter);
    const valgtEnhetId = useAppState(selectValgtEnhet);
    const valgtEnhet = enheter.data?.enhetliste?.find(enhet => enhet.enhetId === valgtEnhetId);

    if (!valgtEnhet) {
        loggWarning(new Error(`Fant ingen enhet`));
        return;
    }

    return {
        enhet: valgtEnhet,
        person: personResource.data,
        kontor: navKontorResource.data,
        saksbehandler: saksbehandler.data
    };
}
