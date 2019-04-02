import * as React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';

import NavFrontendSpinner from 'nav-frontend-spinner';
import AlertStripe, { AlertStripeInfo } from 'nav-frontend-alertstriper';
import { Pleiepengerettighet, PleiepengerResponse } from '../../../models/ytelse/pleiepenger';
import { isLoaded, RestResource } from '../../../redux/restReducers/restResource';
import FillCenterAndFadeIn from '../../FillCenterAndFadeIn';
import { AppState } from '../../../redux/reducers';
import { hentPleiepenger } from '../../../redux/restReducers/ytelser/pleiepenger';
import { AsyncDispatch } from '../../../redux/ThunkTypes';
import PlukkRestData from '../../../app/personside/infotabs/ytelser/pleiepenger/PlukkRestData';
import Pleiepenger from '../../../app/personside/infotabs/ytelser/pleiepenger/Pleiepenger';
import { FlexCenter } from '../../common-styled-components';
import theme from '../../../styles/personOversiktTheme';

interface OwnProps {
    fødselsnummer: string;
    barnetsFødselsnummer: string;
}

interface StateProps {
    pleiepengerResource: RestResource<PleiepengerResponse>;
}

interface DispatchProps {
    hentPleiepenger: (fødelsnummer: string) => void;
}

type Props = OwnProps & StateProps & DispatchProps;

const Margin = styled.div`
    margin: 0.5em;
`;

const Style = styled.div`
    ${theme.hvittPanel};
    max-width: ${theme.width.ytelser};
`;

const onPending = (
    <FillCenterAndFadeIn>
        <Margin>
            <NavFrontendSpinner type={'XL'} />
        </Margin>
    </FillCenterAndFadeIn>
);

const onError = (
    <FillCenterAndFadeIn>
        <AlertStripe type="advarsel">Beklager. Det skjedde en feil ved lasting av pleiepenger.</AlertStripe>
    </FillCenterAndFadeIn>
);

class PleiepengerLaster extends React.PureComponent<Props> {
    constructor(props: Props) {
        super(props);
    }

    componentDidMount() {
        if (!isLoaded(this.props.pleiepengerResource)) {
            this.props.hentPleiepenger(this.props.fødselsnummer);
        }
    }

    getAktuellPleiepengeRettighet(pleiepengeRettighet: Pleiepengerettighet[] | null) {
        if (!pleiepengeRettighet) {
            return <AlertStripeInfo>Kunne ikke finne noen pleiepengerettigheter for bruker</AlertStripeInfo>;
        }

        const aktuellRettighet = pleiepengeRettighet.find(
            rettighet => rettighet.barnet === this.props.barnetsFødselsnummer
        );

        if (!aktuellRettighet) {
            return <AlertStripeInfo>Kunne ikke finne pleiepengerettighet for barnet</AlertStripeInfo>;
        }

        return (
            <FlexCenter>
                <Style>
                    <Pleiepenger pleiepenger={aktuellRettighet} />
                </Style>
            </FlexCenter>
        );
    }

    render() {
        return (
            <PlukkRestData
                restResource={this.props.pleiepengerResource}
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
        pleiepengerResource: state.restResources.pleiepenger
    };
}

function mapDispatchToProps(dispatch: AsyncDispatch): DispatchProps {
    return {
        hentPleiepenger: (fødselsnummer: string) => dispatch(hentPleiepenger(fødselsnummer))
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(PleiepengerLaster);
