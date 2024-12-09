import { TraadType } from '../../../../models/meldinger/meldinger';
import { type SendNyMeldingState, tekstMaksLengde } from './SendNyMelding';

export class MeldingValidator {
    public static tekst(state: SendNyMeldingState) {
        return (
            state.tekst.length <= tekstMaksLengde && state.tekst.length > 0 && MeldingValidator.inneholderTekst(state)
        );
    }
    public static tema(state: SendNyMeldingState) {
        return state.tema !== undefined;
    }
    public static sak(state: SendNyMeldingState) {
        return state.sak !== undefined;
    }
    public static erReferat(state: SendNyMeldingState) {
        return state.traadType === TraadType.SAMTALEREFERAT;
    }
    public static erSamtale(state: SendNyMeldingState) {
        return state.traadType !== TraadType.SAMTALEREFERAT;
    }
    public static erGyldigReferat(state: SendNyMeldingState) {
        return MeldingValidator.erReferat(state) && MeldingValidator.tema(state) && MeldingValidator.tekst(state);
    }
    public static erGyldigSamtale(state: SendNyMeldingState) {
        return MeldingValidator.erSamtale(state) && MeldingValidator.sak(state) && MeldingValidator.tekst(state);
    }

    private static inneholderTekst(state: SendNyMeldingState) {
        const ikkeTekst = /\S/g;
        return !!state.tekst.match(ikkeTekst);
    }
}
