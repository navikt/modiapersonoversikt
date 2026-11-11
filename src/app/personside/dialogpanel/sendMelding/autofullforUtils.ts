import { type AutofullforMap, Locale } from 'src/lib/types/skrivestotte';
import { Kjonn, type Data as PersonData } from 'src/models/person/persondata';
import { useValgtenhet } from '../../../../context/valgtenhet-state';
import innloggetSaksbehandler, {
    type InnloggetSaksbehandler
} from '../../../../rest/resources/innloggetSaksbehandlerResource';
import persondataResource from '../../../../rest/resources/persondataResource';
import saksbehandlersEnheter, { type Enhet } from '../../../../rest/resources/saksbehandlersEnheterResource';
import { capitalizeName } from '../../../../utils/string-utils';
import { hentNavn } from '../../visittkort-v2/visittkort-utils';

export type AutofullforData = {
    enhet?: Enhet;
    person?: PersonData;
    saksbehandler?: InnloggetSaksbehandler;
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
            'bruker.fnr': person.personIdent,
            'bruker.fornavn': capitalizeName(person.navn.firstOrNull()?.fornavn || ''),
            'bruker.etternavn': capitalizeName(
                [person.navn.firstOrNull()?.mellomnavn, person.navn.firstOrNull()?.etternavn].filter((v) => v).join(' ')
            ),
            'bruker.navn': capitalizeName(hentNavn(person.navn.firstOrNull())),
            'bruker.subjekt': (kjonn && subjectPronomen(kjonn, locale as Locale)) ?? personData['bruker.subjekt'],
            'bruker.objekt': (kjonn && objektPronomen(kjonn, locale as Locale)) ?? personData['bruker.objekt']
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

export function useAutoFullforData(): AutofullforData | undefined {
    const personResponse = persondataResource.useFetch();
    const saksbehandler = innloggetSaksbehandler.useFetch();
    const enheterResource = saksbehandlersEnheter.useFetch();
    const enheter = enheterResource.data?.enhetliste ?? [];
    const valgtEnhetId = useValgtenhet().enhetId;
    const valgtEnhet = enheter.find((enhet) => enhet.enhetId === valgtEnhetId);

    return {
        enhet: valgtEnhet,
        person: personResponse.data,
        saksbehandler: saksbehandler.data
    };
}
