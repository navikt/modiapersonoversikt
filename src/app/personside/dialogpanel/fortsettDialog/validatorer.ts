import { FortsettDialogState } from './FortsettDialog';
import { tekstMaksLengde } from '../sendMelding/SendNyMelding';
import { Meldingstype } from '../../../../models/meldinger/meldinger';

export class FortsettDialogValidator {
    public static tekst(state: FortsettDialogState) {
        return state.tekst.length < tekstMaksLengde && state.tekst.length > 0;
    }
    public static sak(state: FortsettDialogState) {
        return state.sak !== undefined;
    }
    public static tema(state: FortsettDialogState) {
        return state.tema !== undefined;
    }
    public static erGyldigSvarSkriftlig(state: FortsettDialogState) {
        return state.dialogType === Meldingstype.SVAR_SKRIFTLIG && this.tekst(state);
    }
    public static erGyldigSpørsmålSkriftlig(state: FortsettDialogState) {
        return state.dialogType === Meldingstype.SPORSMAL_MODIA_UTGAAENDE && this.tekst(state) && this.sak(state);
    }
    public static erGyldigDelsvar(state: FortsettDialogState) {
        return state.dialogType === Meldingstype.DELVIS_SVAR_SKRIFTLIG && this.tekst(state) && this.tema(state);
    }
    public static erGyldigSvarOppmote(state: FortsettDialogState) {
        return state.dialogType === Meldingstype.SVAR_OPPMOTE && this.tekst(state);
    }
    public static erGyldigSvarTelefon(state: FortsettDialogState) {
        return state.dialogType === Meldingstype.SVAR_TELEFON && this.tekst(state);
    }
}
