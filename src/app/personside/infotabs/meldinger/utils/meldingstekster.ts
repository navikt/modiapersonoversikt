import { Meldingstype } from '../../../../../models/meldinger/meldinger';

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
        default:
            return 'Ukjent meldingstype: ' + meldingstype;
    }
}
