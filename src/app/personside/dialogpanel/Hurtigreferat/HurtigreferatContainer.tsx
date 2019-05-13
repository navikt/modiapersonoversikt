import * as React from 'react';
import { Undertittel } from 'nav-frontend-typografi';
import { EkspanderbartpanelBase } from 'nav-frontend-ekspanderbartpanel';
import theme from '../../../../styles/personOversiktTheme';
import styled from 'styled-components';
import { Tekst, tekster } from './tekster';
import HurtigreferatElement from './HurtigreferatElement';
import { connect } from 'react-redux';
import { isNotStartedPosting, isPosting, PostResource } from '../../../../rest/utils/postResource';
import { SendMeldingRequest } from '../../../../models/meldinger/meldinger';
import { AppState } from '../../../../redux/reducers';
import { sendMeldingActionCreator } from '../../../../redux/restReducers/sendMelding';

interface StateProps {
    sendMeldingResource: PostResource<SendMeldingRequest>;
}

interface DispatchProps {
    sendMelding: (tekst: Tekst) => void;
}

type Props = StateProps & DispatchProps;

const Style = styled.div`
    ${theme.resetEkspanderbartPanelStyling};
    filter: drop-shadow(0 0 1px rgba(0, 0, 0, 0.7));
`;

const MarginBottom = styled.div`
    margin-bottom: 6rem;
`;

function HurtigreferatContainer(props: Props) {
    const sendResource = props.sendMeldingResource;
    return (
        <Style>
            <EkspanderbartpanelBase heading={<Undertittel>Hurtigreferat</Undertittel>} ariaTittel={'Hurtigreferat'}>
                <ul>
                    {tekster.map(tekst => (
                        <HurtigreferatElement
                            key={tekst.tittel}
                            sendResource={sendResource}
                            tekst={tekst}
                            send={isNotStartedPosting(sendResource) ? () => props.sendMelding(tekst) : () => null}
                            spinner={isPosting(sendResource) && sendResource.payload.fritekst === tekst.fritekst}
                        />
                    ))}
                    <MarginBottom />
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
    sendMelding: (tekst: Tekst) => sendMeldingActionCreator({ fritekst: tekst.fritekst })
};

export default connect(
    mapStateToProps,
    actionCreators
)(HurtigreferatContainer);
