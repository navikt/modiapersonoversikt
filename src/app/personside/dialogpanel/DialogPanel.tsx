import * as React from 'react';
import styled from 'styled-components';
import Undertittel from 'nav-frontend-typografi/lib/undertittel';
import { theme } from '../../../styles/personOversiktTheme';
import { Normaltekst } from 'nav-frontend-typografi';
import HurtigReferatContainer from './Hurtigreferat/HurtigreferatContainer';
import { isFailedPosting, isFinishedPosting, PostResource } from '../../../rest/utils/postResource';
import { AlertStripeFeil, AlertStripeSuksess } from 'nav-frontend-alertstriper';
import { AppState } from '../../../redux/reducers';
import { SendMeldingRequest } from '../../../models/meldinger/meldinger';
import { connect } from 'react-redux';
import Preview from './Hurtigreferat/Preview';
import ErrorBoundary from '../../../components/ErrorBoundary';
import KnappBase from 'nav-frontend-knapper';
import { resetSendMeldingActionCreator } from '../../../redux/restReducers/sendMelding';
import { AsyncDispatch } from '../../../redux/ThunkTypes';

interface StateProps {
    sendMeldingResource: PostResource<SendMeldingRequest>;
}

interface DispatchProps {
    resetSendMeldingResource: () => void;
}

type Props = StateProps & DispatchProps;

const border = 'rgba(0, 0, 0, 0.1) 1px solid';

const DialogPanelWrapper = styled.div`
    border-top: ${border};
    border-bottom: ${border};
    flex-grow: 1;
    > *:not(:last-child) {
        margin-bottom: ${theme.margin.layout};
    }
`;

function getInnhold(props: Props) {
    if (isFinishedPosting(props.sendMeldingResource)) {
        return (
            <>
                <AlertStripeSuksess>Melding sendt</AlertStripeSuksess>
                <Preview fritekst={props.sendMeldingResource.payload.fritekst} />
                <KnappBase type="standard" onClick={() => props.resetSendMeldingResource()}>
                    Send ny melding
                </KnappBase>
            </>
        );
    }
    if (isFailedPosting(props.sendMeldingResource)) {
        return (
            <AlertStripeFeil>
                Det skjedde en feil ved sending av melding: {props.sendMeldingResource.error.message}
            </AlertStripeFeil>
        );
    }
    return (
        <ErrorBoundary boundaryName="Dialogpanel">
            <HurtigReferatContainer />
            <Undertittel>Dialogpanel</Undertittel>
            <Normaltekst>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Minus, veniam?</Normaltekst>
        </ErrorBoundary>
    );
}

function DialogPanel(props: Props) {
    return (
        <DialogPanelWrapper role="region" aria-label="Dialogpanel">
            {getInnhold(props)}
        </DialogPanelWrapper>
    );
}

function mapStateToProps(state: AppState): StateProps {
    return {
        sendMeldingResource: state.restResources.sendMelding
    };
}

function mapDispatchToProps(dispatch: AsyncDispatch): DispatchProps {
    return {
        resetSendMeldingResource: () => dispatch(resetSendMeldingActionCreator)
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(DialogPanel);
