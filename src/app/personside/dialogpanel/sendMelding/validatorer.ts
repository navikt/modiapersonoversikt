import { SendNyMeldingState, tekstMaksLengde } from './SendNyMelding';
import { Meldingstype } from '../../../../models/meldinger/meldinger';

export class NyMeldingValidator {
    public static tekst(state: SendNyMeldingState) {
        return state.tekst.length <= tekstMaksLengde && state.tekst.length > 0;
    }
    public static tema(state: SendNyMeldingState) {
        return state.tema !== undefined;
    }
    public static sak(state: SendNyMeldingState) {
        return state.sak !== undefined;
    }
    public static erReferat(state: SendNyMeldingState) {
        return state.dialogType !== Meldingstype.SPORSMAL_MODIA_UTGAAENDE;
    }
    public static erSporsmal(state: SendNyMeldingState) {
        return !this.erReferat(state);
    }
    public static erGyldigReferat(state: SendNyMeldingState) {
        return this.erReferat(state) && this.tema(state) && this.tekst(state);
    }
    public static erGyldigSpørsmal(state: SendNyMeldingState) {
        return this.erSporsmal(state) && this.sak(state) && this.tekst(state);
    }
}
