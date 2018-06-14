import * as React from 'react';
import { connect } from 'react-redux';

import { AppState, RestReducer } from '../../redux/reducer';
import { BegrensetTilgang, PersonRespons } from '../../models/person/person';
import Innholdslaster from '../../components/Innholdslaster';
import FillCenterAndFadeIn from '../../components/FillCenterAndFadeIn';
import NavFrontendSpinner from 'nav-frontend-spinner';
import AlertStripe from 'nav-frontend-alertstriper';
import { erPersonResponsAvTypeBegrensetTilgang } from '../../models/person/person';
import BegrensetTilgangSide from '../../app/personside/BegrensetTilgangSide';
import VisittkortContainer from '../../app/personside/visittkort/VisittkortContainer';

interface PersonsideStateProps {
    personReducer: RestReducer<PersonRespons>;
}

const onPending = (
    <FillCenterAndFadeIn>
        <NavFrontendSpinner type={'XXL'} />
    </FillCenterAndFadeIn>
);

const onError = (
    <FillCenterAndFadeIn>
        <AlertStripe type="advarsel">
            Beklager. Det skjedde en feil ved lasting av persondata.
        </AlertStripe>
    </FillCenterAndFadeIn>
);

class Personside extends React.PureComponent<PersonsideStateProps> {

    constructor(props: PersonsideStateProps) {
        super(props);
    }

    getSideinnhold() {
        const data = this.props.personReducer.data;

        if (erPersonResponsAvTypeBegrensetTilgang(data)) {
            return (
                <BegrensetTilgangSide person={data as BegrensetTilgang}/>
            );
        } else {
            return (
                <VisittkortContainer />
            );
        }
    }

    render() {
        return (
            <Innholdslaster
                avhengigheter={[this.props.personReducer]}
                returnOnPending={onPending}
                returnOnError={onError}
            >
                {this.getSideinnhold()}
            </Innholdslaster>
        );
    }
}

function mapStateToProps(state: AppState): PersonsideStateProps {
    return {
        personReducer: state.personinformasjon
    };
}

export default connect(mapStateToProps, null) (Personside);
