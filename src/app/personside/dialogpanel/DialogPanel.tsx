import * as React from 'react';
import styled from 'styled-components';
import { Undertittel } from 'nav-frontend-typografi';
import { theme } from '../../../styles/personOversiktTheme';
import HurtigReferatContainer from './Hurtigreferat/HurtigreferatContainer';
import { isFailedPosting, isFinishedPosting } from '../../../rest/utils/postResource';
import { AlertStripeFeil, AlertStripeSuksess } from 'nav-frontend-alertstriper';
import Preview from './Hurtigreferat/Preview';
import ErrorBoundary from '../../../components/ErrorBoundary';
import KnappBase from 'nav-frontend-knapper';
import VisuallyHiddenAutoFokusHeader from '../../../components/VisuallyHiddenAutoFokusHeader';
import SendNyMelding from './sendMelding/SendNyMelding';
import { useAppState, useRestResource } from '../../../utils/customHooks';
import { useDispatch } from 'react-redux';
import { KommunikasjonsKanal } from '../../../models/meldinger/meldinger';
import FortsettDialog from './fortsettDialog/FortsettDialog';
import { UnmountClosed } from 'react-collapse';

const DialogPanelWrapper = styled.article`
    flex-grow: 1;
`;

const Padding = styled.div`
    padding: 1rem ${theme.margin.layout};
`;

const KvitteringStyling = styled(Padding)`
    > *:not(:first-child) {
        margin-top: 1rem;
    }
`;

const HurtigreferatWrapper = styled(Padding)`
    background-color: white;
    border-bottom: ${theme.border.skilleSvak};
`;

function Feilmelding(props: { errormessage: string }) {
    return (
        <KvitteringStyling>
            <AlertStripeFeil>Det skjedde en feil ved sending av melding: {props.errormessage}</AlertStripeFeil>
        </KvitteringStyling>
    );
}

function Dialogpanel() {
    const sendReferatResource = useRestResource(resources => resources.sendReferat);
    const sendSpørsmålResource = useRestResource(resources => resources.sendSpørsmål);
    const visFortsettDialogpanel = useAppState(state => state.oppgaver.dialogpanelTraad !== undefined);
    const dispatch = useDispatch();

    if (isFinishedPosting(sendReferatResource)) {
        const kanal = sendReferatResource.payload.kanal === KommunikasjonsKanal.Telefon ? 'Telefon' : 'Oppmøte';
        return (
            <KvitteringStyling>
                <VisuallyHiddenAutoFokusHeader tittel="Referatet ble sendt" />
                <AlertStripeSuksess>Referatet ble loggført</AlertStripeSuksess>
                <Preview fritekst={sendReferatResource.payload.fritekst} tittel={`Samtalereferat / ${kanal}`} />
                <KnappBase type="standard" onClick={() => dispatch(sendReferatResource.actions.reset)}>
                    Send ny melding
                </KnappBase>
            </KvitteringStyling>
        );
    }
    if (isFinishedPosting(sendSpørsmålResource)) {
        return (
            <KvitteringStyling>
                <VisuallyHiddenAutoFokusHeader tittel="Spørsmål ble sendt" />
                <AlertStripeSuksess>Spørsmålet ble sendt</AlertStripeSuksess>
                <Preview fritekst={sendSpørsmålResource.payload.fritekst} tittel={'Spørsmål til bruker'} />
                <KnappBase type="standard" onClick={() => dispatch(sendSpørsmålResource.actions.reset)}>
                    Send ny melding
                </KnappBase>
            </KvitteringStyling>
        );
    }
    if (isFailedPosting(sendReferatResource)) {
        return <Feilmelding errormessage={sendReferatResource.error.message} />;
    }
    if (isFailedPosting(sendSpørsmålResource)) {
        return <Feilmelding errormessage={sendSpørsmålResource.error.message} />;
    }
    return (
        <ErrorBoundary boundaryName="Dialogpanel">
            <UnmountClosed isOpened={visFortsettDialogpanel}>
                <FortsettDialog />
            </UnmountClosed>
            <UnmountClosed isOpened={!visFortsettDialogpanel}>
                <HurtigreferatWrapper>
                    <HurtigReferatContainer />
                </HurtigreferatWrapper>
                <SendNyMelding />
            </UnmountClosed>
        </ErrorBoundary>
    );
}

function DialogPanel() {
    return (
        <DialogPanelWrapper role="region" aria-label="Dialogpanel">
            <Undertittel className="sr-only">Dialogpanel</Undertittel>
            <Dialogpanel />
        </DialogPanelWrapper>
    );
}

export default DialogPanel;
