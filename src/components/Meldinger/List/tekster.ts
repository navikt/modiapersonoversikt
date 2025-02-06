import { Meldingstype, TraadType } from 'src/lib/types/modiapersonoversikt-api';

export function meldingstypeTekst(meldingstype: Meldingstype) {
    switch (meldingstype) {
        case Meldingstype.SPORSMAL_SKRIFTLIG:
            return 'Spørsmål fra bruker';
        case Meldingstype.SAMTALEREFERAT_OPPMOTE:
            return 'Samtalereferat oppmøte';
        case Meldingstype.SAMTALEREFERAT_TELEFON:
            return 'Samtalereferat telefon';
        case Meldingstype.SPORSMAL_MODIA_UTGAAENDE:
            return 'Spørsmål fra NAV';
        case Meldingstype.SVAR_SBL_INNGAAENDE:
            return 'Svar fra bruker';
        case Meldingstype.SVAR_SKRIFTLIG:
            return 'Svar skriftlig';
        case Meldingstype.INFOMELDING_MODIA_UTGAAENDE:
            return 'Infomelding';
        case Meldingstype.CHATMELDING_FRA_BRUKER:
            return 'Chatmelding fra bruker';
        case Meldingstype.CHATMELDING_FRA_NAV:
            return 'Chatmelding fra NAV';
        default:
            return `Ukjent meldingstype: ${meldingstype}`;
    }
}

export function traadTypeTekst(infoMelding: boolean, traadType?: TraadType) {
    switch (traadType) {
        case TraadType.CHAT:
            return 'Chat';
        case TraadType.MELDINGSKJEDE:
            return infoMelding ? 'Infomelding' : 'Samtale';
        case TraadType.SAMTALEREFERAT:
            return 'Referat';
        default:
            return `Ukjent meldingstype: ${traadType}`;
    }
}
