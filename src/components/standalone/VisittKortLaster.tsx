import * as React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import NavFrontendSpinner from 'nav-frontend-spinner';
import AlertStripe from 'nav-frontend-alertstriper';
import { AppState } from '../../redux/reducers';
import { BegrensetTilgang, erPersonResponsAvTypeBegrensetTilgang, PersonRespons } from '../../models/person/person';
import FillCenterAndFadeIn from '../../components/FillCenterAndFadeIn';
import BegrensetTilgangSide from '../../app/personside/BegrensetTilgangSide';
import { DeprecatedRestResource, Loaded } from '../../redux/restReducers/deprecatedRestResource';
import Visittkort from '../../app/personside/visittkort/VisittkortContainer';
import Innholdslaster from '../Innholdslaster';

interface OwnProps {
    fødselsnummer: string;
}

interface PersonsideStateProps {
    personResource: DeprecatedRestResource<PersonRespons>;
}

type Props = OwnProps & PersonsideStateProps;

const Margin = styled.div`
    margin: 0.5em;
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
        <Innholdslaster avhengigheter={[props.personResource]} returnOnPending={onPending} returnOnError={onError}>
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
