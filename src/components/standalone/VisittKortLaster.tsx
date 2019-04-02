import * as React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';

import NavFrontendSpinner from 'nav-frontend-spinner';
import AlertStripe from 'nav-frontend-alertstriper';

import { AppState } from '../../redux/reducers';
import { BegrensetTilgang, erPersonResponsAvTypeBegrensetTilgang, PersonRespons } from '../../models/person/person';
import FillCenterAndFadeIn from '../../components/FillCenterAndFadeIn';
import BegrensetTilgangSide from '../../app/personside/BegrensetTilgangSide';
import { RestResource } from '../../redux/restReducers/restResource';
import Visittkort from '../../app/personside/visittkort/VisittkortContainer';
import PlukkRestData from '../../app/personside/infotabs/ytelser/pleiepenger/PlukkRestData';

interface OwnProps {
    fødselsnummer: string;
}

interface PersonsideStateProps {
    personResource: RestResource<PersonRespons>;
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

class Personside extends React.PureComponent<Props> {
    constructor(props: Props) {
        super(props);
    }

    getSideinnhold(data: PersonRespons) {
        if (erPersonResponsAvTypeBegrensetTilgang(data)) {
            return <BegrensetTilgangSide person={data as BegrensetTilgang} />;
        } else {
            return <Visittkort />;
        }
    }

    render() {
        return (
            <PlukkRestData restResource={this.props.personResource} returnOnPending={onPending} returnOnError={onError}>
                {data => this.getSideinnhold(data)}
            </PlukkRestData>
        );
    }
}

function mapStateToProps(state: AppState): PersonsideStateProps {
    return {
        personResource: state.restResources.personinformasjon
    };
}

export default connect(mapStateToProps)(Personside);
