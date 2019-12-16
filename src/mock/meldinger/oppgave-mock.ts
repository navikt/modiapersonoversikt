import {
    Ansatt,
    Enhet,
    GsakTema,
    GsakTemaOppgavetype,
    GsakTemaPrioritet,
    GsakTemaUnderkategori
} from '../../models/meldinger/oppgave';
import faker from 'faker/locale/nb_NO';
import navfaker from 'nav-faker';
import { fyllRandomListe } from '../utils/mock-utils';

export function getMockGsakTema(): GsakTema[] {
    return [
        {
            kode: 'AGR',
            tekst: 'Ajourhold - Grunnopplysninger',
            oppgavetyper: getOppgavetyper(),
            prioriteter: getPrioriteter(),
            underkategorier: getUnderkategorier()
        },
        {
            kode: 'AAP',
            tekst: 'Arbeidsavklaringspenger',
            oppgavetyper: getOppgavetyper(),
            prioriteter: getPrioriteter(),
            underkategorier: getUnderkategorier()
        },
        {
            kode: 'BID',
            tekst: 'Bidrag',
            oppgavetyper: getOppgavetyper(),
            prioriteter: getPrioriteterUtenNormal(),
            underkategorier: getUnderkategorier()
        }
    ];
}

export function getForeslattEnhet(): Enhet[] {
    return getMockEnheter().slice(0, navfaker.random.integer(2, 0));
}

export function getMockEnheter(): Enhet[] {
    return [
        {
            enhetId: '1234',
            enhetNavn: 'NAV Aremark',
            status: 'Aktiv'
        },
        {
            enhetId: '4321',
            enhetNavn: 'NAV Moss',
            status: 'Aktiv'
        },
        {
            enhetId: '7658',
            enhetNavn: 'NAV Bergen',
            status: 'Aktiv'
        }
    ];
}

export function getMockAnsatte(enhetId: string): Ansatt[] {
    faker.seed(Number(enhetId));
    navfaker.seed(enhetId);
    return fyllRandomListe(() => mockAnsatt(), 10);
}

function mockAnsatt(): Ansatt {
    return {
        fornavn: navfaker.navn.fornavn(),
        etternavn: faker.name.lastName(),
        ident: faker.random.alphaNumeric(7).toUpperCase()
    };
}

function getOppgavetyper(): GsakTemaOppgavetype[] {
    return [
        {
            kode: 'VURD_HENV',
            tekst: 'Vurder henvendelse',
            dagerFrist: 3
        },
        {
            kode: 'KONT_BRUK',
            tekst: 'Kontakt bruker',
            dagerFrist: 1
        },
        {
            kode: 'VUR_KONS_YTE',
            tekst: 'Vurder konsekvens av ytelse',
            dagerFrist: 0
        }
    ];
}

function getPrioriteterUtenNormal(): GsakTemaPrioritet[] {
    return getPrioriteter().filter(it => !it.kode.includes('NORM'));
}

function getPrioriteter(): GsakTemaPrioritet[] {
    return [
        {
            kode: 'HOY_TEMA',
            tekst: 'Høy'
        },
        {
            kode: 'NORM_TEMA',
            tekst: 'Normal'
        },
        {
            kode: 'LAV_TEMA',
            tekst: 'Lav'
        }
    ];
}

function getUnderkategorier(): GsakTemaUnderkategori[] {
    return [
        {
            kode: 'ENDR_INST',
            tekst: 'Endring i institusjonsopphold',
            erGyldig: true
        },
        {
            kode: 'ANKE',
            tekst: 'Anke',
            erGyldig: true
        }
    ];
}
