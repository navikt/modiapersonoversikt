import * as React from 'react';
import theme from '../../../../../styles/personOversiktTheme';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { AppState } from '../../../../../redux/reducers';
import { isNotStarted, RestReducer } from '../../../../../redux/restReducers/restReducer';
import { AsyncDispatch } from '../../../../../redux/ThunkTypes';
import { Undertittel } from 'nav-frontend-typografi';
import { SykepengerResponse } from '../../../../../models/ytelse/sykepenger';
import { hentSykepenger } from '../../../../../redux/restReducers/ytelser/sykepenger';
import PlukkRestData from '../pleiepenger/PlukkRestData';
import { loggEvent } from '../../../../../utils/frontendLogger';

interface OwnProps {
    fødselsnummer: string;
}

interface StateProps {
    sykepengerReducer: RestReducer<SykepengerResponse>;
}

interface DispatchProps {
    hentSykepenger: (fødselsnummer: string) => void;
}

type Props = OwnProps & StateProps & DispatchProps;

const Wrapper = styled.div`
  background-color: white;
  border-radius: ${theme.borderRadius.layout};
  padding: ${theme.margin.px20};
`;

class SykePengerContainer extends React.PureComponent<Props> {

    componentDidMount() {
        loggEvent('Sidevisning', 'Sykepenger');
        if (isNotStarted(this.props.sykepengerReducer)) {
            this.props.hentSykepenger(this.props.fødselsnummer);
        }
    }

    render() {
        return (
            <Wrapper>
                <Undertittel>Sykepenger</Undertittel>
                <PlukkRestData restReducer={this.props.sykepengerReducer}>
                    {data => JSON.stringify(data)}
                </PlukkRestData>
            </Wrapper>
        );
    }
}

function mapStateToProps(state: AppState): StateProps {
    return ({
        sykepengerReducer: state.restEndepunkter.sykepengerReducer
    });
}

function mapDispatchToProps(dispatch: AsyncDispatch): DispatchProps {
    return {
        hentSykepenger: (fødselsnummer: string) => dispatch(hentSykepenger(fødselsnummer))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(SykePengerContainer);
