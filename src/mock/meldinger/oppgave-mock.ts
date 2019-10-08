import {
    Ansatt,
    Enhet,
    GsakTema,
    GsakTemaOppgavetype,
    GsakTemaPrioritet,
    GsakTemaUnderkategori
} from '../../models/meldinger/oppgave';

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
        }
    ];
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

export function getMockAnsatte(): Ansatt[] {
    return [
        {
            fornavn: 'Anne',
            etternavn: 'Saksbehandler',
            ident: 'S123456'
        },
        {
            fornavn: 'Bernt',
            etternavn: 'Veileder',
            ident: 'V654321'
        }
    ];
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

function getPrioriteter(): GsakTemaPrioritet[] {
    return [
        {
            kode: 'HOY',
            tekst: 'Høy'
        },
        {
            kode: 'NORM',
            tekst: 'Normal'
        },
        {
            kode: 'LAV',
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
