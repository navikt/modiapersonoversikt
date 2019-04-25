import * as React from 'react';
import { connect } from 'react-redux';
import AlertStripe from 'nav-frontend-alertstriper';
import { AppState } from '../../redux/reducers';
import { BegrensetTilgang, erPersonResponsAvTypeBegrensetTilgang, PersonRespons } from '../../models/person/person';
import FillCenterAndFadeIn from '../../components/FillCenterAndFadeIn';
import BegrensetTilgangSide from '../../app/personside/BegrensetTilgangSide';
import { DeprecatedRestResource, Loaded } from '../../redux/restReducers/deprecatedRestResource';
import Visittkort from '../../app/personside/visittkort/VisittkortContainer';
import Innholdslaster from '../Innholdslaster';
import { BigCenteredLazySpinner } from '../BigCenteredLazySpinner';

interface OwnProps {
    fødselsnummer: string;
}

interface PersonsideStateProps {
    personResource: DeprecatedRestResource<PersonRespons>;
}

type Props = OwnProps & PersonsideStateProps;

const onError = (
    <FillCenterAndFadeIn>
        <AlertStripe type="advarsel">Beklager. Det skjedde en feil ved lasting av persondata.</AlertStripe>
    </FillCenterAndFadeIn>
);

function Sideinnhold(props: { data: PersonRespons }) {
    if (erPersonResponsAvTypeBegrensetTilgang(props.data)) {
        return <BegrensetTilgangSide person={props.data as BegrensetTilgang} />;
    } else {
        return <Visittkort />;
    }
}

function Personside(props: Props) {
    return (
        <Innholdslaster
            avhengigheter={[props.personResource]}
            returnOnPending={BigCenteredLazySpinner}
            returnOnError={onError}
        >
            <Sideinnhold data={(props.personResource as Loaded<PersonRespons>).data} />
        </Innholdslaster>
    );
}

function mapStateToProps(state: AppState): PersonsideStateProps {
    return {
        personResource: state.restResources.personinformasjon
    };
}

export default connect(mapStateToProps)(Personside);
