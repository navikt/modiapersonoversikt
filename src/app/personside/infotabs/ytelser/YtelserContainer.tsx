import * as React from 'react';
import { AppState } from '../../../../redux/reducers';
import { connect } from 'react-redux';
import { isNotStarted, Loaded, RestReducer } from '../../../../redux/restReducers/restReducer';
import Innholdslaster from '../../../../components/Innholdslaster';
import { SykepengerResponse } from '../../../../models/ytelse/sykepenger';
import { PleiepengerResponse } from '../../../../models/ytelse/pleiepenger';
import { hentSykepenger } from '../../../../redux/restReducers/ytelser/sykepenger';
import { hentPleiepenger } from '../../../../redux/restReducers/ytelser/pleiepenger';
import { Innholdstittel } from 'nav-frontend-typografi';
import { AsyncDispatch } from '../../../../redux/ThunkTypes';
import ForeldrePengerContainer from './foreldrepenger/ForeldrePengerContainer';
import YtelseValgListe from './valg/YtelseValgListe';
import styled from 'styled-components';
import theme from '../../../../styles/personOversiktTheme';

interface StateProps {
    sykepengerReducer: RestReducer<SykepengerResponse>;
    pleiepengerReducer: RestReducer<PleiepengerResponse>;
}

interface DispatchProps {
    hentSykepenger: (fødselsnummer: string) => void;
    hentPleiepenger: (fødselsnummer: string) => void;
}

interface OwnProps {
    fødselsnummer: string;
}

type Props = StateProps & DispatchProps & OwnProps;

const Styling = styled.section`
  display: flex;
  align-items: flex-start;
  > *:last-child {
    margin-left: ${theme.margin.layout};
    flex-grow: 1;
  }
`;

class YtelserContainer extends React.Component<Props> {

    componentDidMount() {
        if (isNotStarted(this.props.sykepengerReducer)) {
            this.props.hentSykepenger(this.props.fødselsnummer);
        }
        if (isNotStarted(this.props.pleiepengerReducer)) {
            this.props.hentPleiepenger(this.props.fødselsnummer);
        }
    }

    render() {
        return (
            <Styling>
                <YtelseValgListe/>
                <div>
                    <ForeldrePengerContainer fødselsnummer={this.props.fødselsnummer}/>
                    <Innholdstittel>Sykepenger</Innholdstittel>
                    <Innholdslaster avhengigheter={[this.props.sykepengerReducer]}>
                        {JSON.stringify((this.props.sykepengerReducer as Loaded<SykepengerResponse>).data)}
                    </Innholdslaster>
                    <Innholdstittel>Pleiepenger</Innholdstittel>
                    <Innholdslaster avhengigheter={[this.props.pleiepengerReducer]}>
                        {JSON.stringify((this.props.pleiepengerReducer as Loaded<PleiepengerResponse>).data)}
                    </Innholdslaster>
                </div>
            </Styling>
        );
    }
}

function mapStateToProps(state: AppState): StateProps {
    return ({
        sykepengerReducer: state.restEndepunkter.sykepengerReducer,
        pleiepengerReducer: state.restEndepunkter.pleiepengerReducer
    });
}

function mapDispatchToProps(dispatch: AsyncDispatch): DispatchProps {
    return {
        hentSykepenger: (fødselsnummer: string) => dispatch(hentSykepenger(fødselsnummer)),
        hentPleiepenger: (fødselsnummer: string) => dispatch(hentPleiepenger(fødselsnummer))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(YtelserContainer);
