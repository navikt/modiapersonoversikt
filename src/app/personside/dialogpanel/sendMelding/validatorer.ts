import { FormState, SendNyMeldingDialogTyper } from './SendNyMelding';

export class NyMeldingValidator {
    public static tekst(state: FormState) {
        return state.tekst.length < 5000 && state.tekst.length > 0;
    }
    public static tema(state: FormState) {
        return state.tema !== undefined;
    }
    public static sak(state: FormState) {
        return state.sak !== undefined;
    }
    public static erReferat(state: FormState) {
        return state.dialogType !== SendNyMeldingDialogTyper.SpørsmålSkriftlig;
    }
    public static erSporsmal(state: FormState) {
        return !this.erReferat(state);
    }
    public static erGyldigReferat(state: FormState) {
        return this.erReferat(state) && this.tema(state) && this.tekst(state);
    }
    public static erGyldigSpørsmal(state: FormState) {
        return this.erSporsmal(state) && this.sak(state) && this.tekst(state);
    }
}
