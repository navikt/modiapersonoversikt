import * as React from 'react';
import styled from 'styled-components';
import Undertittel from 'nav-frontend-typografi/lib/undertittel';
import { theme } from '../../../styles/personOversiktTheme';
import { Normaltekst } from 'nav-frontend-typografi';
import HurtigReferatContainer from './Hurtigreferat/HurtigreferatContainer';
import { isFailedPosting, isFinishedPosting, PostResource } from '../../../rest/utils/postResource';
import { AlertStripeAdvarsel, AlertStripeSuksess } from 'nav-frontend-alertstriper';
import { AppState } from '../../../redux/reducers';
import { SendMeldingRequest } from '../../../models/meldinger/meldinger';
import { connect } from 'react-redux';
import Preview from './Hurtigreferat/Preview';
import ErrorBoundary from '../../../components/ErrorBoundary';

interface StateProps {
    sendMeldingResource: PostResource<SendMeldingRequest>;
}

type Props = StateProps;

const border = 'rgba(0, 0, 0, 0.1) 1px solid';

const DialogPanelWrapper = styled.div`
    margin: 0 1em;
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
                <Preview tekst={{ fritekst: props.sendMeldingResource.payload.fritekst, tittel: '' }} />
            </>
        );
    }
    if (isFailedPosting(props.sendMeldingResource)) {
        return <AlertStripeAdvarsel>Kunne ikke sende melding</AlertStripeAdvarsel>;
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

export default connect(mapStateToProps)(DialogPanel);
