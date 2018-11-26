import * as React from 'react';
import { AppState } from '../../../../redux/reducers';
import { connect } from 'react-redux';
import { isNotStarted, Loaded, RestReducer } from '../../../../redux/restReducers/restReducer';
import Innholdslaster from '../../../../components/Innholdslaster';
import { SykepengerResponse } from '../../../../models/ytelse/sykepenger';
import { PleiepengerResponse } from '../../../../models/ytelse/pleiepenger';
import { ForeldrepengerResponse } from '../../../../models/ytelse/foreldrepenger';
import { hentSykepenger } from '../../../../redux/restReducers/ytelser/sykepenger';
import { hentPleiepenger } from '../../../../redux/restReducers/ytelser/pleiepenger';
import { hentForeldrepenger } from '../../../../redux/restReducers/ytelser/foreldrepenger';
import { Innholdstittel } from 'nav-frontend-typografi';
import { AsyncDispatch } from '../../../../redux/ThunkTypes';

interface StateProps {
    sykepengerReducer: RestReducer<SykepengerResponse>;
    pleiepengerReducer: RestReducer<PleiepengerResponse>;
    foreldrepengerReducer: RestReducer<ForeldrepengerResponse>;
}

interface DispatchProps {
    hentSykepenger: (fødselsnummer: string) => void;
    hentPleiepenger: (fødselsnummer: string) => void;
    hentForeldrepenger: (fødselsnummer: string) => void;
}

interface OwnProps {
    fødselsnummer: string;
}

type Props = StateProps & DispatchProps & OwnProps;

class YtelserContainer extends React.Component<Props> {

    componentDidMount() {
        if (isNotStarted(this.props.sykepengerReducer)) {
            this.props.hentSykepenger(this.props.fødselsnummer);
        }
        if (isNotStarted(this.props.pleiepengerReducer)) {
            this.props.hentPleiepenger(this.props.fødselsnummer);
        }
        if (isNotStarted(this.props.foreldrepengerReducer)) {
            this.props.hentForeldrepenger(this.props.fødselsnummer);
        }
    }

    render() {
        return (
            <>
                <Innholdstittel>Sykepenger</Innholdstittel>
                <Innholdslaster avhengigheter={[this.props.sykepengerReducer]}>
                    {JSON.stringify((this.props.sykepengerReducer as Loaded<SykepengerResponse>).data)}
                </Innholdslaster>
                <Innholdstittel>Pleiepenger</Innholdstittel>
                <Innholdslaster avhengigheter={[this.props.pleiepengerReducer]}>
                    {JSON.stringify((this.props.pleiepengerReducer as Loaded<PleiepengerResponse>).data)}
                </Innholdslaster>
                <Innholdstittel>Foreldrepenger</Innholdstittel>
                <Innholdslaster avhengigheter={[this.props.foreldrepengerReducer]}>
                    {JSON.stringify((this.props.foreldrepengerReducer as Loaded<ForeldrepengerResponse>).data)}
                </Innholdslaster>
            </>
        );
    }
}

function mapStateToProps(state: AppState): StateProps {
    return ({
        sykepengerReducer: state.restEndepunkter.sykepengerReducer,
        pleiepengerReducer: state.restEndepunkter.pleiepengerReducer,
        foreldrepengerReducer: state.restEndepunkter.foreldrepengerReducer
    });
}

function mapDispatchToProps(dispatch: AsyncDispatch): DispatchProps {
    return {
        hentSykepenger: (fødselsnummer: string) => dispatch(hentSykepenger(fødselsnummer)),
        hentPleiepenger: (fødselsnummer: string) => dispatch(hentPleiepenger(fødselsnummer)),
        hentForeldrepenger: (fødselsnummer: string) => dispatch(hentForeldrepenger(fødselsnummer))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(YtelserContainer);
