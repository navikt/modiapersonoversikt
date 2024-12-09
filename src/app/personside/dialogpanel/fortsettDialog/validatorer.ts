import { TraadType } from '../../../../models/meldinger/meldinger';
import { tekstMaksLengde } from '../sendMelding/SendNyMelding';
import type { FortsettDialogState } from './FortsettDialogTypes';

export class FortsettDialogValidator {
    public static tekst(state: FortsettDialogState) {
        return state.tekst.length <= tekstMaksLengde && state.tekst.length > 0 && this.inneholderTekst(state);
    }
    public static sak(state: FortsettDialogState) {
        return state.sak !== undefined;
    }
    public static tema(state: FortsettDialogState) {
        return state.temagruppe !== undefined;
    }
    public static erGyldigSamtale(state: FortsettDialogState) {
        return state.traadType !== TraadType.SAMTALEREFERAT && this.tekst(state);
    }
    public static erGyldigSamtalereferat(state: FortsettDialogState) {
        return state.traadType === TraadType.SAMTALEREFERAT && this.tekst(state);
    }
    private static inneholderTekst(state: FortsettDialogState) {
        const ikkeTekst = /\S/g;
        return !!state.tekst.match(ikkeTekst);
    }
}
