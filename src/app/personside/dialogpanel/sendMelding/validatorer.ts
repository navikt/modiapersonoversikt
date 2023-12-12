import { SendNyMeldingState, tekstMaksLengde } from './SendNyMelding';
import { TraadType } from '../../../../models/meldinger/meldinger';

export class MeldingValidator {
    public static tekst(state: SendNyMeldingState) {
        return state.tekst.length <= tekstMaksLengde && state.tekst.length > 0 && this.inneholderTekst(state);
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
        return this.erReferat(state) && this.tema(state) && this.tekst(state);
    }
    public static erGyldigSamtale(state: SendNyMeldingState) {
        return this.erSamtale(state) && this.sak(state) && this.tekst(state);
    }

    private static inneholderTekst(state: SendNyMeldingState) {
        const ikkeTekst = /\S/g
        return !!state.tekst.match(ikkeTekst)
    }
}
