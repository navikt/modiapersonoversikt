import * as React from 'react';
import { connect } from 'react-redux';
import { SykepengerResponse } from '../../../models/ytelse/sykepenger';
import { isNotStarted, RestReducer } from '../../../redux/restReducers/restReducer';
import { loggError, loggEvent } from '../../../utils/frontendLogger';
import PlukkRestData from '../../../app/personside/infotabs/ytelser/pleiepenger/PlukkRestData';
import { AppState } from '../../../redux/reducers';
import { AsyncDispatch } from '../../../redux/ThunkTypes';
import { hentSykepenger } from '../../../redux/restReducers/ytelser/sykepenger';
import Sykepenger from '../../../app/personside/infotabs/ytelser/sykepenger/Sykepenger';
import moment from 'moment';
import { AlertStripeAdvarsel } from 'nav-frontend-alertstriper';

interface OwnProps {
    fødselsnummer: string;
    sykmeldtFraOgMed: string;
}

interface StateProps {
    sykepengerReducer: RestReducer<SykepengerResponse>;
}

interface DispatchProps {
    hentSykepenger: (fødselsnummer: string) => void;
}

type Props = OwnProps & StateProps & DispatchProps;

class SykePengerLaster extends React.PureComponent<Props> {
    componentDidMount() {
        loggEvent('Sidevisning', 'Sykepenger');
        if (isNotStarted(this.props.sykepengerReducer)) {
            this.props.hentSykepenger(this.props.fødselsnummer);
        }
    }

    render() {
        return (
            <PlukkRestData spinnerSize="M" restReducer={this.props.sykepengerReducer}>
                {data => {
                    if (!data.sykepenger) {
                        return null;
                    }
                    const aktuellRettighet = data.sykepenger.find(rettighet =>
                        moment(rettighet.sykmeldtFom).isSame(moment(this.props.sykmeldtFraOgMed))
                    );
                    if (!aktuellRettighet) {
                        loggError(new Error('Kunne ikke finne sykepengerettighet'), undefined, {
                            fnr: this.props.fødselsnummer,
                            sykmeldtFraOgMed: this.props.sykmeldtFraOgMed
                        });
                        return <AlertStripeAdvarsel>Kunne ikke finne sykepengerettighet</AlertStripeAdvarsel>;
                    }
                    return (
                        <ol>
                            <Sykepenger sykepenger={aktuellRettighet} />
                        </ol>
                    );
                }}
            </PlukkRestData>
        );
    }
}

function mapStateToProps(state: AppState): StateProps {
    return {
        sykepengerReducer: state.restEndepunkter.sykepengerReducer
    };
}

function mapDispatchToProps(dispatch: AsyncDispatch): DispatchProps {
    return {
        hentSykepenger: (fødselsnummer: string) => dispatch(hentSykepenger(fødselsnummer))
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SykePengerLaster);
