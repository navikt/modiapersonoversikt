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
import { useRestResource } from '../../../utils/customHooks';
import { useDispatch } from 'react-redux';

const DialogPanelWrapper = styled.article`
    flex-grow: 1;
    > *:not(:last-child) {
        margin-bottom: ${theme.margin.layout};
    }
`;

function Dialogpanel() {
    const sendReferatResource = useRestResource(resources => resources.sendReferat);
    const dispatch = useDispatch();
    if (isFinishedPosting(sendReferatResource)) {
        //TODO handle sendspørsmål
        return (
            <>
                <VisuallyHiddenAutoFokusHeader tittel="Melding sendt" />
                <AlertStripeSuksess>Melding sendt</AlertStripeSuksess>
                <Preview fritekst={sendReferatResource.payload.fritekst} />
                <KnappBase type="standard" onClick={() => dispatch(sendReferatResource.actions.reset)}>
                    Send ny melding
                </KnappBase>
            </>
        );
    }
    if (isFailedPosting(sendReferatResource)) {
        //TODO handle sendspørsmål
        return (
            <AlertStripeFeil>
                Det skjedde en feil ved sending av melding: {sendReferatResource.error.message}
            </AlertStripeFeil>
        );
    }
    return (
        <ErrorBoundary boundaryName="Dialogpanel">
            <Undertittel>Dialogpanel</Undertittel>
            <HurtigReferatContainer />
            <SendNyMelding />
        </ErrorBoundary>
    );
}

function DialogPanel() {
    return (
        <DialogPanelWrapper role="region" aria-label="Dialogpanel">
            <Dialogpanel />
        </DialogPanelWrapper>
    );
}

export default DialogPanel;
