import * as React from 'react';
import { isFailedPosting, isFinishedPosting } from '../../../../rest/utils/postResource';
import { KommunikasjonsKanal } from '../../../../models/meldinger/meldinger';
import VisuallyHiddenAutoFokusHeader from '../../../../components/VisuallyHiddenAutoFokusHeader';
import { AlertStripeAdvarsel, AlertStripeSuksess } from 'nav-frontend-alertstriper';
import Preview from '../Hurtigreferat/Preview';
import KnappBase from 'nav-frontend-knapper';
import { useRestResource } from '../../../../utils/customHooks';
import { useDispatch } from 'react-redux';
import { DialogpanelFeilmelding, DialogpanelKvitteringStyling } from '../fellesStyling';

function SendNyMeldingKvittering() {
    const dispatch = useDispatch();
    const sendReferatResource = useRestResource(resources => resources.sendReferat);
    const sendSpørsmålResource = useRestResource(resources => resources.sendSpørsmål);
    if (isFinishedPosting(sendReferatResource)) {
        const kanal = sendReferatResource.payload.kanal === KommunikasjonsKanal.Telefon ? 'Telefon' : 'Oppmøte';
        return (
            <DialogpanelKvitteringStyling>
                <VisuallyHiddenAutoFokusHeader tittel="Referatet ble sendt" />
                <AlertStripeSuksess>Referatet ble loggført</AlertStripeSuksess>
                <Preview fritekst={sendReferatResource.payload.fritekst} tittel={`Samtalereferat / ${kanal}`} />
                <KnappBase type="standard" onClick={() => dispatch(sendReferatResource.actions.reset)}>
                    Send ny melding
                </KnappBase>
            </DialogpanelKvitteringStyling>
        );
    }
    if (isFinishedPosting(sendSpørsmålResource)) {
        return (
            <DialogpanelKvitteringStyling>
                <VisuallyHiddenAutoFokusHeader tittel="Spørsmål ble sendt" />
                <AlertStripeSuksess>Spørsmålet ble sendt</AlertStripeSuksess>
                <Preview fritekst={sendSpørsmålResource.payload.fritekst} tittel={'Spørsmål til bruker'} />
                <KnappBase type="standard" onClick={() => dispatch(sendSpørsmålResource.actions.reset)}>
                    Send ny melding
                </KnappBase>
            </DialogpanelKvitteringStyling>
        );
    }
    if (isFailedPosting(sendReferatResource)) {
        return (
            <DialogpanelFeilmelding
                errormessage={sendReferatResource.error.message}
                lukk={() => dispatch(sendReferatResource.actions.reset)}
            />
        );
    }
    if (isFailedPosting(sendSpørsmålResource)) {
        return (
            <DialogpanelFeilmelding
                errormessage={sendSpørsmålResource.error.message}
                lukk={() => dispatch(sendSpørsmålResource.actions.reset)}
            />
        );
    }

    return <AlertStripeAdvarsel>Det skjedde en feil, hit skulle du ikke kommet</AlertStripeAdvarsel>;
}

export default SendNyMeldingKvittering;
