import * as React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';

import NavFrontendSpinner from 'nav-frontend-spinner';
import AlertStripe, { AlertStripeInfo } from 'nav-frontend-alertstriper';
import { Foreldrepengerettighet, ForeldrepengerResponse } from '../../../models/ytelse/foreldrepenger';
import { isLoaded, RestReducer } from '../../../redux/restReducers/restReducer';
import FillCenterAndFadeIn from '../../FillCenterAndFadeIn';
import { AppState } from '../../../redux/reducers';
import { hentForeldrepenger } from '../../../redux/restReducers/ytelser/foreldrepenger';
import { AsyncDispatch } from '../../../redux/ThunkTypes';
import Foreldrepenger from '../../../app/personside/infotabs/ytelser/foreldrepenger/ForeldrePenger';
import PlukkRestData from '../../../app/personside/infotabs/ytelser/pleiepenger/PlukkRestData';
import { FlexCenter } from '../../common-styled-components';
import theme from '../../../styles/personOversiktTheme';



interface OwnProps {
    fødselsnummer: string;

}

interface StateProps {
    pleiepengerReducer: RestReducer<ForeldrepengerResponse>;
}

interface DispatchProps {
    hentForeldrepenger: (fødelsnummer: string) => void;
}

type Props = OwnProps & StateProps & DispatchProps;

const Margin = styled.div`
  margin: .5em;
`;

const Style = styled.div`
  ${theme.hvittPanel};
  max-width: ${theme.width.ytelser};
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
            Beklager. Det skjedde en feil ved lasting av Foreldrepenger.
        </AlertStripe>
    </FillCenterAndFadeIn>
);

class ForeldrepengerLaster extends React.PureComponent<Props> {

    constructor(props: Props) {
        super(props);
    }

    componentDidMount() {
        if (!isLoaded(this.props.pleiepengerReducer)) {
            this.props.hentForeldrepenger(this.props.fødselsnummer);
        }
    }

    getAktuellForeldrepengeRettighet(ForeldrepengeRettighet: Foreldrepengerettighet[] | null) {
        if (!ForeldrepengeRettighet) {
            return <AlertStripeInfo>Kunne ikke finne noen Foreldrepengerettigheter for bruker</AlertStripeInfo>;
        }

        const aktuellRettighet = ForeldrepengeRettighet
            .find(rettighet => rettighet.forelder === this.props.fødselsnummer);

        if (!aktuellRettighet) {
            return <AlertStripeInfo>Kunne ikke finne Foreldrepengerettighet</AlertStripeInfo>;
        }

        return <FlexCenter><Style><Foreldrepenger foreldrepenger={aktuellRettighet}/></Style></FlexCenter>;
    }

    render() {
        return (
            <PlukkRestData
                restReducer={this.props.pleiepengerReducer}
                returnOnPending={onPending}
                returnOnError={onError}
            >
                {data => this.getAktuellForeldrepengeRettighet(data.foreldrepenger)}
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
        hentForeldrepenger: (fødselsnummer: string) => dispatch(hentForeldrepenger(fødselsnummer))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ForeldrepengerLaster);