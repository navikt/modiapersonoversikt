import * as React from 'react';
import { connect } from 'react-redux';

import AlertStripe from 'nav-frontend-alertstriper';

import { AppState } from '../../redux/reducers';
import { erPersonResponsAvTypeBegrensetTilgang, PersonRespons } from '../../models/person/person';
import MainLayout from './MainLayout';
import Innholdslaster from '../../components/Innholdslaster';
import FillCenterAndFadeIn from '../../components/FillCenterAndFadeIn';
import BegrensetTilgangSide from './BegrensetTilgangSide';
import { isLoaded, DeprecatedRestResource } from '../../redux/restReducers/deprecatedRestResource';

interface PersonsideStateProps {
    personResource: DeprecatedRestResource<PersonRespons>;
}

const onError = (
    <FillCenterAndFadeIn>
        <AlertStripe type="advarsel">Beklager. Det skjedde en feil ved lasting av persondata.</AlertStripe>
    </FillCenterAndFadeIn>
);

class Personside extends React.PureComponent<PersonsideStateProps> {
    constructor(props: PersonsideStateProps) {
        super(props);
    }

    getSideinnhold() {
        const personResource = this.props.personResource;

        if (isLoaded(personResource) && erPersonResponsAvTypeBegrensetTilgang(personResource.data)) {
            return <BegrensetTilgangSide person={personResource.data} />;
        } else {
            return <MainLayout />;
        }
    }

    render() {
        return (
            <Innholdslaster avhengigheter={[this.props.personResource]} returnOnError={onError}>
                {this.getSideinnhold()}
            </Innholdslaster>
        );
    }
}

function mapStateToProps(state: AppState): PersonsideStateProps {
    return {
        personResource: state.restResources.personinformasjon
    };
}

export default connect(
    mapStateToProps,
    null
)(Personside);
