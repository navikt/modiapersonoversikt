import * as React from 'react';
import theme from '../../../../../styles/personOversiktTheme';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { AppState } from '../../../../../redux/reducers';
import Innholdslaster from '../../../../../components/Innholdslaster';
import { isNotStarted, Loaded, RestReducer } from '../../../../../redux/restReducers/restReducer';
import { AsyncDispatch } from '../../../../../redux/ThunkTypes';
import { hentPleiepenger } from '../../../../../redux/restReducers/ytelser/pleiepenger';
import { PleiepengerResponse } from '../../../../../models/ytelse/pleiepenger';
import { Undertittel } from 'nav-frontend-typografi';

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
  padding: ${theme.margin.px20};
`;

class PleiePengerContainer extends React.PureComponent<Props> {

    componentDidMount() {
        if (isNotStarted(this.props.pleiepengerReducer)) {
            this.props.hentPleiepenger(this.props.fødselsnummer);
        }
    }

    render() {
        return (
            <Wrapper>
                <Undertittel>Pleiepenger</Undertittel>
                <Innholdslaster avhengigheter={[this.props.pleiepengerReducer]}>
                    {JSON.stringify((this.props.pleiepengerReducer as Loaded<PleiepengerResponse>).data)}
                </Innholdslaster>
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
