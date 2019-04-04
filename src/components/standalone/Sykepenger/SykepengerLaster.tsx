import * as React from 'react';
import { useEffect } from 'react';
import { connect } from 'react-redux';
import { SykepengerResponse } from '../../../models/ytelse/sykepenger';
import { loggError, loggEvent } from '../../../utils/frontendLogger';
import { AppState } from '../../../redux/reducers';
import { AsyncDispatch } from '../../../redux/ThunkTypes';
import { hentSykepenger } from '../../../redux/restReducers/ytelser/sykepenger';
import Sykepenger from '../../../app/personside/infotabs/ytelser/sykepenger/Sykepenger';
import moment from 'moment';
import { AlertStripeAdvarsel } from 'nav-frontend-alertstriper';
import { isNotStarted, RestResource } from '../../../redux/restReducers/restResource';
import PlukkRestData from '../../../app/personside/infotabs/ytelser/pleiepenger/PlukkRestData';

interface OwnProps {
    fødselsnummer: string;
    sykmeldtFraOgMed: string;
}

interface StateProps {
    sykepengerResource: RestResource<SykepengerResponse>;
}

interface DispatchProps {
    hentSykepenger: (fødselsnummer: string) => void;
}

type Props = OwnProps & StateProps & DispatchProps;

function SykePengerLaster(props: Props) {
    useEffect(() => {
        loggEvent('Sidevisning', 'Sykepenger');
        if (isNotStarted(props.sykepengerResource)) {
            props.hentSykepenger(props.fødselsnummer);
        }
    }, []);

    function getInnhold(data: SykepengerResponse) {
        if (!data.sykepenger) {
            return null;
        }
        const aktuellRettighet = data.sykepenger.find(rettighet =>
            moment(rettighet.sykmeldtFom).isSame(moment(props.sykmeldtFraOgMed))
        );
        if (!aktuellRettighet) {
            loggError(new Error('Kunne ikke finne sykepengerettighet'), undefined, {
                fnr: props.fødselsnummer,
                sykmeldtFraOgMed: props.sykmeldtFraOgMed
            });
            return <AlertStripeAdvarsel>Kunne ikke finne sykepengerettighet</AlertStripeAdvarsel>;
        }
        return (
            <ol>
                <Sykepenger sykepenger={aktuellRettighet} />
            </ol>
        );
    }

    return (
        <PlukkRestData spinnerSize="M" restResource={props.sykepengerResource}>
            {data => getInnhold(data)}
        </PlukkRestData>
    );
}

function mapStateToProps(state: AppState): StateProps {
    return {
        sykepengerResource: state.restResources.sykepenger
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
