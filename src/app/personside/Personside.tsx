import * as React from 'react';
import { connect } from 'react-redux';

import AlertStripe from 'nav-frontend-alertstriper';

import { AppState } from '../../redux/reducers';
import { BegrensetTilgang, erPersonResponsAvTypeBegrensetTilgang, PersonRespons } from '../../models/person/person';
import MainLayout from './MainLayout';
import Innholdslaster from '../../components/Innholdslaster';
import FillCenterAndFadeIn from '../../components/FillCenterAndFadeIn';
import BegrensetTilgangSide from './BegrensetTilgangSide';
import { RestReducer } from '../../redux/restReducers/restReducer';

interface PersonsideStateProps {
    personReducer: RestReducer<PersonRespons>;
}

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
                <MainLayout />
            );
        }
    }

    render() {
        return (
            <Innholdslaster
                avhengigheter={[this.props.personReducer]}
                returnOnError={onError}
            >
                {this.getSideinnhold()}
            </Innholdslaster>
        );
    }
}

function mapStateToProps(state: AppState): PersonsideStateProps {

    return {
        personReducer: state.restEndepunkter.personinformasjon
    };
}

export default connect(mapStateToProps, null) (Personside);
