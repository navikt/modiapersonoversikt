import { NySendNyMeldingState, tekstMaksLengde } from './NySendNyMelding';
import { TraadType } from '../../../../models/meldinger/meldinger';

export class NyMeldingValidator {
    public static tekst(state: NySendNyMeldingState) {
        return state.tekst.length <= tekstMaksLengde && state.tekst.length > 0;
    }
    public static tema(state: NySendNyMeldingState) {
        return state.tema !== undefined;
    }
    public static sak(state: NySendNyMeldingState) {
        return state.sak !== undefined;
    }
    public static erReferat(state: NySendNyMeldingState) {
        return state.traadType === TraadType.SAMTALEREFERAT;
    }
    public static erSamtale(state: NySendNyMeldingState) {
        return state.traadType !== TraadType.SAMTALEREFERAT;
    }
    public static erGyldigReferat(state: NySendNyMeldingState) {
        return this.erReferat(state) && this.tema(state) && this.tekst(state);
    }
    public static erGyldigSamtale(state: NySendNyMeldingState) {
        return this.erSamtale(state) && this.sak(state) && this.tekst(state);
    }
}
