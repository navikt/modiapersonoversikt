import { tekstMaksLengde } from '../sendMelding/SendNyMelding';
import { Meldingstype, Traad } from '../../../../models/meldinger/meldinger';
import { erJournalfort } from '../../infotabs/meldinger/utils/meldingerUtils';
import { FortsettDialogState } from './FortsettDialogTypes';
import { Temagruppe } from '../../../../models/temagrupper';

export class FortsettDialogValidator {
    public static tekst(state: FortsettDialogState) {
        return state.tekst.length <= tekstMaksLengde && state.tekst.length > 0;
    }
    public static sak(state: FortsettDialogState) {
        return state.sak !== undefined;
    }
    public static tema(state: FortsettDialogState) {
        return state.temagruppe !== undefined;
    }
    public static erGyldigSvarSkriftlig(state: FortsettDialogState) {
        return state.dialogType === Meldingstype.SVAR_SKRIFTLIG && this.tekst(state);
    }
    public static erGyldigSporsmaalSkriftlig(state: FortsettDialogState, traad: Traad) {
        const traadTemagruppe = traad.meldinger[0].temagruppe;
        if (traadTemagruppe === Temagruppe.ØkonomiskSosial) {
            return state.dialogType === Meldingstype.SPORSMAL_MODIA_UTGAAENDE && this.tekst(state);
        }
        return (
            state.dialogType === Meldingstype.SPORSMAL_MODIA_UTGAAENDE &&
            this.tekst(state) &&
            (this.sak(state) || erJournalfort(traad))
        );
    }

    public static erGyldigSamtalereferat(state: FortsettDialogState) {
        return (
            [Meldingstype.SAMTALEREFERAT_TELEFON, Meldingstype.SAMTALEREFERAT_OPPMOTE].includes(state.dialogType) &&
            this.tekst(state)
        );
    }
}
