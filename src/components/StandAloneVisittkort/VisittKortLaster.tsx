import * as React from 'react';
import { connect, Dispatch } from 'react-redux';

import { AppState, RestReducer } from '../../redux/reducer';
import { BegrensetTilgang, PersonRespons } from '../../models/person/person';
import Innholdslaster from '../../components/Innholdslaster';
import FillCenterAndFadeIn from '../../components/FillCenterAndFadeIn';
import NavFrontendSpinner from 'nav-frontend-spinner';
import AlertStripe from 'nav-frontend-alertstriper';
import { erPersonResponsAvTypeBegrensetTilgang } from '../../models/person/person';
import BegrensetTilgangSide from '../../app/personside/BegrensetTilgangSide';
import VisittkortContainer from '../../app/personside/visittkort/VisittkortContainer';
import styled from 'styled-components';
import { hentAllPersonData } from '../../redux/personinformasjon';
import { Action } from 'redux';

interface OwnProps {
    fødselsnummer: string;
}

interface PersonsideStateProps {
    personReducer: RestReducer<PersonRespons>;
}

interface DispatchProps {
    hentPerson: (fødelsnummer: string) => void;
}

type Props = OwnProps & PersonsideStateProps & DispatchProps;

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
            Beklager. Det skjedde en feil ved lasting av persondata.
        </AlertStripe>
    </FillCenterAndFadeIn>
);

class Personside extends React.PureComponent<Props> {

    constructor(props: Props) {
        super(props);
    }

    componentWillMount() {
        this.props.hentPerson(this.props.fødselsnummer);
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

function mapDispatchToProps(dispatch: Dispatch<Action>): DispatchProps {
    return {
        hentPerson: (fødselsnummer: string) => hentAllPersonData(dispatch, fødselsnummer)
    };
}

export default connect(mapStateToProps, mapDispatchToProps) (Personside);
