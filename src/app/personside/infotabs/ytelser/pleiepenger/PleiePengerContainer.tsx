import * as React from 'react';
import theme from '../../../../../styles/personOversiktTheme';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { AppState } from '../../../../../redux/reducers';
import { isNotStarted, RestReducer } from '../../../../../redux/restReducers/restReducer';
import { AsyncDispatch } from '../../../../../redux/ThunkTypes';
import { hentPleiepenger } from '../../../../../redux/restReducers/ytelser/pleiepenger';
import { PleiepengerResponse } from '../../../../../models/ytelse/pleiepenger';
import PlukkRestData from './PlukkRestData';
import { loggEvent } from '../../../../../utils/frontendLogger';
import Pleiepenger from './Pleiepenger';
import { AlertStripeInfo } from 'nav-frontend-alertstriper';

interface OwnProps {
    fødselsnummer: string;
}

interface StateProps {
    pleiepengerReducer: RestReducer<PleiepengerResponse>;
}

interface DispatchProps {
    hentPleiepenger: (fødselsnummer: string) => void;
}

type Props = OwnProps & StateProps & DispatchProps;

const Wrapper = styled.div`
  background-color: white;
  border-radius: ${theme.borderRadius.layout};
`;

class PleiePengerContainer extends React.PureComponent<Props> {

    componentDidMount() {
        loggEvent('Sidevisning', 'Pleiepenger');
        if (isNotStarted(this.props.pleiepengerReducer)) {
            this.props.hentPleiepenger(this.props.fødselsnummer);
        }
    }

    render() {
        return (
            <Wrapper>
                <PlukkRestData restReducer={this.props.pleiepengerReducer}>
                    {data => {
                        if (!data.pleiepenger[0]) {
                            return <AlertStripeInfo>Ingen pleiepenger funnet for brukeren.</AlertStripeInfo>;
                        }
                        return data.pleiepenger.map((pleiepengeRettighet, index) => (
                            <Pleiepenger key={index} pleiepenger={pleiepengeRettighet}/>
                        ));
                    }}
                </PlukkRestData>
            </Wrapper>
        );
    }
}

function mapStateToProps(state: AppState): StateProps {
    return ({
        pleiepengerReducer: state.restEndepunkter.pleiepengerReducer
    });
}

function mapDispatchToProps(dispatch: AsyncDispatch): DispatchProps {
    return {
        hentPleiepenger: (fødselsnummer: string) => dispatch(hentPleiepenger(fødselsnummer))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(PleiePengerContainer);
