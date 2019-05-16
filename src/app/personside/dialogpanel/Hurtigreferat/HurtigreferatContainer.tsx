import * as React from 'react';
import { EkspanderbartpanelBase } from 'nav-frontend-ekspanderbartpanel';
import theme from '../../../../styles/personOversiktTheme';
import styled from 'styled-components';
import { tekster } from './tekster';
import HurtigreferatElement from './HurtigreferatElement';
import { connect } from 'react-redux';
import {
    isFailedPosting,
    isFinishedPosting,
    isNotStartedPosting,
    PostResource
} from '../../../../rest/utils/postResource';
import { Meldingstype, SendMeldingRequest } from '../../../../models/meldinger/meldinger';
import { AppState } from '../../../../redux/reducers';
import { sendMeldingActionCreator } from '../../../../redux/restReducers/sendMelding';
import { AlertStripeFeil, AlertStripeInfo } from 'nav-frontend-alertstriper';
import Undertittel from 'nav-frontend-typografi/lib/undertittel';

interface StateProps {
    sendMeldingResource: PostResource<SendMeldingRequest>;
}

interface DispatchProps {
    sendMelding: (tekst: string, temaGruppe: string) => void;
}

type Props = StateProps & DispatchProps;

const Style = styled.div`
    ${theme.resetEkspanderbartPanelStyling};
    filter: drop-shadow(0 0 1px rgba(0, 0, 0, 0.7));
`;

function HurtigreferatContainer(props: Props) {
    const sendResource = props.sendMeldingResource;
    if (isFinishedPosting(sendResource)) {
        return <AlertStripeInfo>Meldingen ble sendt.</AlertStripeInfo>;
    }
    if (isFailedPosting(sendResource)) {
        return <AlertStripeFeil>Det skjedde en feil ved sending av melding.</AlertStripeFeil>;
    }
    return (
        <Style>
            <EkspanderbartpanelBase heading={<Undertittel>Hurtigreferat</Undertittel>} ariaTittel={'Hurtigreferat'}>
                <ul>
                    {tekster.map(tekst => (
                        <HurtigreferatElement
                            key={tekst.tittel}
                            tekst={tekst}
                            sendMelding={isNotStartedPosting(sendResource) ? props.sendMelding : () => null}
                        />
                    ))}
                </ul>
            </EkspanderbartpanelBase>
        </Style>
    );
}

function mapStateToProps(state: AppState): StateProps {
    return {
        sendMeldingResource: state.restResources.sendMelding
    };
}

const actionCreators = {
    sendMelding: (tekst: string, temaGruppe: string) =>
        sendMeldingActionCreator({
            fritekst: tekst,
            kanal: 'Telefon',
            type: Meldingstype.SamtalereferatTelefon,
            temagruppe: temaGruppe,
            traadId: null,
            kontorsperretEnhet: null
        })
};

export default connect(
    mapStateToProps,
    actionCreators
)(HurtigreferatContainer);
