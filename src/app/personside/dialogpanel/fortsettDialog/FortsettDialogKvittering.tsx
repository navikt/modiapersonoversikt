import * as React from 'react';
import { useRestResource } from '../../../../utils/customHooks';
import { useDispatch } from 'react-redux';
import { isFailedPosting, isFinishedPosting } from '../../../../rest/utils/postResource';
import VisuallyHiddenAutoFokusHeader from '../../../../components/VisuallyHiddenAutoFokusHeader';
import { AlertStripeAdvarsel, AlertStripeSuksess } from 'nav-frontend-alertstriper';
import Preview from '../Hurtigreferat/Preview';
import KnappBase from 'nav-frontend-knapper';
import { DialogpanelFeilmelding, DialogpanelKvitteringStyling } from '../fellesStyling';
import { setDialogpanelTraad } from '../../../../redux/oppgave/actions';
import { temagruppeTekst } from '../../infotabs/meldinger/utils/meldingstekster';
import { Temagruppe } from '../../../../models/meldinger/meldinger';

function FortsettDialogKvittering() {
    const sendSvarResource = useRestResource(resources => resources.sendSvar);
    const leggTilbakeOppgaveResource = useRestResource(resources => resources.leggTilbakeOppgave);
    const dispatch = useDispatch();
    const reset = () => {
        dispatch(sendSvarResource.actions.reset);
        dispatch(leggTilbakeOppgaveResource.actions.reset);
        dispatch(setDialogpanelTraad(undefined));
    };
    if (isFinishedPosting(sendSvarResource)) {
        return (
            <DialogpanelKvitteringStyling>
                <VisuallyHiddenAutoFokusHeader tittel="Melding ble sendt" />
                <AlertStripeSuksess>Meldingen ble sendt</AlertStripeSuksess>
                <Preview fritekst={sendSvarResource.payload.fritekst} tittel={'Medling til bruker'} />
                <KnappBase type="standard" onClick={reset}>
                    Lukk
                </KnappBase>
            </DialogpanelKvitteringStyling>
        );
    }
    if (isFinishedPosting(leggTilbakeOppgaveResource)) {
        const payload = leggTilbakeOppgaveResource.payload;
        return (
            <DialogpanelKvitteringStyling>
                <VisuallyHiddenAutoFokusHeader tittel="Oppgaven ble lagt tilbake" />
                {payload.temagruppe && (
                    <AlertStripeSuksess>
                        Oppgaven ble lagt tilbake på {temagruppeTekst(payload.temagruppe as Temagruppe).toLowerCase}
                    </AlertStripeSuksess>
                )}
                {!payload.temagruppe && <AlertStripeSuksess>Oppgaven ble lagt tilbake</AlertStripeSuksess>}
                <KnappBase type="standard" onClick={reset}>
                    Lukk
                </KnappBase>
            </DialogpanelKvitteringStyling>
        );
    }

    if (isFailedPosting(sendSvarResource)) {
        return <DialogpanelFeilmelding errormessage={sendSvarResource.error.message} lukk={reset} />;
    }
    if (isFailedPosting(leggTilbakeOppgaveResource)) {
        return <DialogpanelFeilmelding errormessage={leggTilbakeOppgaveResource.error.message} lukk={reset} />;
    }

    return <AlertStripeAdvarsel>Det skjedde en feil, hit skulle du ikke kommet</AlertStripeAdvarsel>;
}

export default FortsettDialogKvittering;
