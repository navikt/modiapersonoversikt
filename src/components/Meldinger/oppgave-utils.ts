import type { Enhet } from 'src/lib/types/modiapersonoversikt-api';

type EnhetOption = { label: string; value: string };
type EnhetValg = Pick<Enhet, 'enhetId' | 'enhetNavn'>;

const enhetLabel = ({ enhetId, enhetNavn }: EnhetValg) => `${enhetId} ${enhetNavn}`;

export const byggEnhetOptions = (enheter: EnhetValg[], foreslotteEnheter: EnhetValg[]): EnhetOption[] => {
    const foreslatteEnhetIder = new Set(foreslotteEnheter.map((enhet) => enhet.enhetId));

    return [
        ...foreslotteEnheter.map((enhet) => ({
            label: `Foreslått: ${enhetLabel(enhet)}`,
            value: enhet.enhetId
        })),
        ...enheter
            .filter((enhet) => !foreslatteEnhetIder.has(enhet.enhetId))
            .map((enhet) => ({
                label: enhetLabel(enhet),
                value: enhet.enhetId
            }))
    ];
};

export enum oppgaveTyper {
    VURD_HENV = 'Vurder henvendelse',
    VUR_SVAR = 'Vurder svar',
    SVAR_IK_MOT = 'Svar ikke mottatt',
    KONT_BRUK = 'Kontakt bruker',
    VUR_KONS_YTE = 'Vurder konsekvens av ytelse'
}

export enum oppgavePrioritet {
    KRITISK = 'Kritisk',
    HOY = 'Høy',
    NORM = 'Normal',
    LAV = 'Lav'
}
