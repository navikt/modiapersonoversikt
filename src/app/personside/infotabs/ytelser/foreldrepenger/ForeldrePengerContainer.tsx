import * as React from 'react';
import { ForeldrepengerResponse } from '../../../../../models/ytelse/foreldrepenger';
import theme from '../../../../../styles/personOversiktTheme';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { hentForeldrepenger } from '../../../../../redux/restReducers/ytelser/foreldrepenger';
import { AppState } from '../../../../../redux/reducers';
import { isNotStarted, RestReducer } from '../../../../../redux/restReducers/restReducer';
import Foreldrepenger from './ForeldrePenger';
import { AsyncDispatch } from '../../../../../redux/ThunkTypes';
import PlukkRestData from '../pleiepenger/PlukkRestData';
import { loggEvent } from '../../../../../utils/frontendLogger';
import { Undertittel } from 'nav-frontend-typografi';

interface OwnProps {
    fødselsnummer: string;
}

interface StateProps {
    foreldrepengerReducer: RestReducer<ForeldrepengerResponse>;
}

interface DispatchProps {
    hentForeldrepenger: (fødselsnummer: string) => void;
}

type Props = OwnProps & StateProps & DispatchProps;

const Wrapper = styled.div`
  background-color: white;
  border-radius: ${theme.borderRadius.layout};
`;

const TittelStyle = styled.div`
  padding: ${theme.margin.px20} ${theme.margin.px20} ${theme.margin.px10};
`;

class ForeldrePengerContainer extends React.PureComponent<Props> {

    componentDidMount() {
        loggEvent('Sidevisning', 'Foreldrepenger');
        if (isNotStarted(this.props.foreldrepengerReducer)) {
            this.props.hentForeldrepenger(this.props.fødselsnummer);
        }
    }

    render() {
        return (
            <Wrapper>
                <TittelStyle><Undertittel>Foreldrepenger</Undertittel></TittelStyle>
                <PlukkRestData restReducer={this.props.foreldrepengerReducer}>
                    {data => <Foreldrepenger foreldrePengerResponse={data}/>}
                </PlukkRestData>
            </Wrapper>
        );
    }
}

function mapStateToProps(state: AppState): StateProps {
    return ({
        foreldrepengerReducer: state.restEndepunkter.foreldrepengerReducer
    });
}

function mapDispatchToProps(dispatch: AsyncDispatch): DispatchProps {
    return {
        hentForeldrepenger: (fødselsnummer: string) => dispatch(hentForeldrepenger(fødselsnummer))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ForeldrePengerContainer);
