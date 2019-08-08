import { FormState, SendNyMeldingDialogTyper } from './SendNyMelding';
import { NyMeldingValidator } from './validatorer';
import { SendMeldingRequestRequiredFormData } from '../../../../redux/restReducers/sendMelding';

export function byggSendNyMeldingRequest(state: FormState): SendMeldingRequestRequiredFormData | null {
    if (NyMeldingValidator.erGyldigReferat(state) && state.tema) {
        const erOppmøte = state.dialogType === SendNyMeldingDialogTyper.SamtaleReferatOppmøte;
        return {
            fritekst: state.tekst,
            kanal: erOppmøte ? 'OPPMOTE' : 'TELEFON',
            type: (state.dialogType as unknown) as string,
            temagruppe: state.tema.kodeRef,
            traadId: null,
            kontorsperretEnhet: null,
            erTilknyttetAnsatt: true
        };
    } else if (NyMeldingValidator.erGyldigSpørsmal(state) && state.sak) {
        return {
            fritekst: state.tekst,
            kanal: '',
            type: (state.dialogType as unknown) as string,
            temagruppe: state.sak.temaKode,
            traadId: null,
            kontorsperretEnhet: null,
            erTilknyttetAnsatt: true
        };
    }
    return null;
}
