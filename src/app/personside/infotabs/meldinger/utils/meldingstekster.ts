import { Meldingstype } from '../../../../../models/meldinger/meldinger';

export function meldingstypeTekst(meldingstype: Meldingstype) {
    switch (meldingstype) {
        case Meldingstype.SVAR_TELEFON:
            return 'Svar telefon';
        case Meldingstype.SPORSMAL_SKRIFTLIG:
            return 'Spørsmål fra bruker';
        case Meldingstype.SAMTALEREFERAT_OPPMOTE:
            return 'Samtalereferat oppmøte';
        case Meldingstype.DELVIS_SVAR_SKRIFTLIG:
            return 'Delsvar';
        case Meldingstype.DOKUMENT_VARSEL:
            return 'Dokument-varsel';
        case Meldingstype.OPPGAVE_VARSEL:
            return 'Oppgave-varsel';
        case Meldingstype.SAMTALEREFERAT_TELEFON:
            return 'Samtalereferat telefon';
        case Meldingstype.SPORSMAL_MODIA_UTGAAENDE:
            return 'Spørsmål fra NAV';
        case Meldingstype.SVAR_OPPMOTE:
            return 'Svar oppmøte';
        case Meldingstype.SVAR_SBL_INNGAAENDE:
            return 'Svar fra bruker';
        case Meldingstype.SVAR_SKRIFTLIG:
            return 'Svar skriftlig';
        default:
            return 'Ukjent meldingstype: ' + meldingstype;
    }
}
