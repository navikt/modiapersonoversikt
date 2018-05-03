import * as React from 'react';
import { connect } from 'react-redux';

import { AppState, Reducer } from '../../redux/reducer';
import { Person } from '../../models/person';
import MainLayout from './MainLayout';
import Innholdslaster from '../../components/Innholdslaster';
import FillCenterAndFadeIn from '../../components/FillCenterAndFadeIn';
import NavFrontendSpinner from 'nav-frontend-spinner';
import AlertStripe from 'nav-frontend-alertstriper';

interface PersonsideStateProps {
    personReducer: Reducer<Person>;
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

    render() {
        return (
            <Innholdslaster
                avhengigheter={[this.props.personReducer]}
                returnOnPending={onPending}
                returnOnError={onError}
            >
                <MainLayout />
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
