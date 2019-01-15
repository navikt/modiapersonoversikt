import * as React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';

import NavFrontendSpinner from 'nav-frontend-spinner';
import AlertStripe, { AlertStripeInfo } from 'nav-frontend-alertstriper';
import { Pleiepengerettighet, PleiepengerResponse } from '../../../models/ytelse/pleiepenger';
import { isLoaded, RestReducer } from '../../../redux/restReducers/restReducer';
import FillCenterAndFadeIn from '../../FillCenterAndFadeIn';
import { AppState } from '../../../redux/reducers';
import { hentPleiepenger } from '../../../redux/restReducers/ytelser/pleiepenger';
import { AsyncDispatch } from '../../../redux/ThunkTypes';
import PlukkRestData from '../../../app/personside/infotabs/ytelser/pleiepenger/PlukkRestData';
import Pleiepenger from '../../../app/personside/infotabs/ytelser/pleiepenger/Pleiepenger';

interface OwnProps {
    fødselsnummer: string;
    barnetsFødselsnummer: string;
}

interface StateProps {
    pleiepengerReducer: RestReducer<PleiepengerResponse>;
}

interface DispatchProps {
    hentPleiepenger: (fødelsnummer: string) => void;
}

type Props = OwnProps & StateProps & DispatchProps;

const Margin = styled.div`
  margin: .5em;
`;

const onPending = (
    <FillCenterAndFadeIn>
        <Margin>
            <NavFrontendSpinner type={'XL'}/>
        </Margin>
    </FillCenterAndFadeIn>
);

const onError = (
    <FillCenterAndFadeIn>
        <AlertStripe type="advarsel">
            Beklager. Det skjedde en feil ved lasting av pleiepenger.
        </AlertStripe>
    </FillCenterAndFadeIn>
);

class PleiepengerLaster extends React.PureComponent<Props> {

    constructor(props: Props) {
        super(props);
    }

    componentDidMount() {
        if (!isLoaded(this.props.pleiepengerReducer)) {
            this.props.hentPleiepenger(this.props.fødselsnummer);
        }
    }

    getAktuellPleiepengeRettighet(pleiepengeRettighet: Pleiepengerettighet[] | null) {
        if (!pleiepengeRettighet) {
            return <AlertStripeInfo>Kunne ikke finne noen pleiepengerettigheter for bruker</AlertStripeInfo>;
        }

        const aktuellRettighet = pleiepengeRettighet
            .find(rettighet => rettighet.barnet === this.props.barnetsFødselsnummer);

        if (!aktuellRettighet) {
            return <AlertStripeInfo>Kunne ikke finne pleiepengerettighet for barnet</AlertStripeInfo>;
        }

        return <Pleiepenger pleiepenger={aktuellRettighet}/>;
    }

    render() {
        return (
            <PlukkRestData
                restReducer={this.props.pleiepengerReducer}
                returnOnPending={onPending}
                returnOnError={onError}
            >
                    {data => this.getAktuellPleiepengeRettighet(data.pleiepenger)}
            </PlukkRestData>
        );
    }
}

function mapStateToProps(state: AppState): StateProps {
    return {
        pleiepengerReducer: state.restEndepunkter.pleiepengerReducer
    };
}

function mapDispatchToProps(dispatch: AsyncDispatch): DispatchProps {
    return {
        hentPleiepenger: (fødselsnummer: string) => dispatch(hentPleiepenger(fødselsnummer))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(PleiepengerLaster);
