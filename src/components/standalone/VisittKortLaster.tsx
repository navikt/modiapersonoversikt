import * as React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { Action, Dispatch } from 'redux';

import NavFrontendSpinner from 'nav-frontend-spinner';
import AlertStripe from 'nav-frontend-alertstriper';

import { AppState } from '../../redux/reducers';
import { BegrensetTilgang, erPersonResponsAvTypeBegrensetTilgang, PersonRespons } from '../../models/person/person';
import Innholdslaster from '../../components/Innholdslaster';
import FillCenterAndFadeIn from '../../components/FillCenterAndFadeIn';
import BegrensetTilgangSide from '../../app/personside/BegrensetTilgangSide';
import { oppslagNyBruker } from '../../redux/restReducers/oppslagNyBruker';
import { isLoaded, Loaded, RestReducer } from '../../redux/restReducers/restReducer';
import Visittkort from '../../app/personside/visittkort/VisittkortContainer';

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

    componentWillMount() {
        this.props.hentPerson(this.props.fødselsnummer);
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
            <Innholdslaster
                avhengigheter={[this.props.personReducer]}
                returnOnPending={onPending}
                returnOnError={onError}
            >
                {isLoaded(this.props.personReducer)
                    ? this.getSideinnhold((this.props.personReducer as Loaded<PersonRespons>).data)
                    : null}
            </Innholdslaster>
        );
    }
}

function mapStateToProps(state: AppState): PersonsideStateProps {
    return {
        personReducer: state.restEndepunkter.personinformasjon
    };
}

function mapDispatchToProps(dispatch: Dispatch<Action>): DispatchProps {
    return {
        hentPerson: (fødselsnummer: string) => oppslagNyBruker(dispatch, fødselsnummer)
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Personside);
