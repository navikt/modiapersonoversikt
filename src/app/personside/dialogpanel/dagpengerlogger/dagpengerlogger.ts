import { ForsettDialogRequest, SendReferatRequest } from '../../../../models/meldinger/meldinger';
import { loggError, loggEvent } from '../../../../utils/logger/frontendLogger';
import { useAppState } from '../../../../utils/customHooks';

export function useDagpengerLogger() {
    const jobberMedSTO = useAppState(state => state.session.jobberMedSTO);
    const valgtTemagruppe = useAppState(state => state.session.temagruppeForPlukk);

    return (tekst: SendReferatRequest | ForsettDialogRequest) => {
        try {
            const inneholderDagpenger = tekst.fritekst.toLowerCase().includes('dagpeng');

            if (inneholderDagpenger) {
                loggEvent('DagpengeHenvendelse', 'Dagpengelogger', undefined, {
                    svarValgtTema: (tekst as SendReferatRequest)?.temagruppe,
                    saksbehandlerValgtTema: jobberMedSTO ? valgtTemagruppe : undefined,
                    meldingstype: tekst.meldingstype
                });
            }
        } catch (e) {
            loggError(new Error('Greide ikke logge dagpengermetrikk'));
        }
    };
}
