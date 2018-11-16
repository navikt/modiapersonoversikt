import * as React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { AnyAction } from 'redux';
import { Normaltekst } from 'nav-frontend-typografi';

import { BrukersNavKontorResponse } from '../../../../../models/navkontor';
import { AppState } from '../../../../../redux/reducers';
import Innholdslaster from '../../../../../components/Innholdslaster';
import { Person } from '../../../../../models/person/person';
import { hentNavKontor } from '../../../../../redux/restReducers/navkontor';
import { STATUS } from '../../../../../redux/restReducers/utils';
import { Loaded, RestReducer } from '../../../../../redux/restReducers/restReducer';
import { Bold } from '../../../../../components/common-styled-components';
import { ThunkDispatch } from 'redux-thunk';

interface StateProps {
    navKontorReducer: RestReducer<BrukersNavKontorResponse>;
}

interface DispatchProps {
    hentNavKontor: (person: Person) => void;
}

interface OwnProps {
    person: Person;
}

type Props = StateProps & DispatchProps & OwnProps;

const NavKontorSection = styled.section`
  margin: .5rem 0 0 0;
  display: flex;
  justify-content: flex-end;
  > * {
    white-space: nowrap;
  }
  > *:first-child:after {
    content: '/';
    margin: 0 0.2em;
  }
  > *:last-child {
    display: flex;
    align-items: center;
    margin: 0;
  }
`;

const onError = (
    <em>Problemer med å hente nav-enhet</em>
);

function NavKontorVisning(props: BrukersNavKontorResponse) {
    if (!props.navKontor) {
        return <Normaltekst><Bold>Ingen enhet</Bold></Normaltekst>;
    }

    return (
        <Normaltekst>
            <Bold>{props.navKontor.enhetId} {props.navKontor.enhetNavn}</Bold>
        </Normaltekst>
    );
}

class NavKontorContainer extends React.Component<Props> {

    componentDidMount() {
        if (this.props.navKontorReducer.status === STATUS.NOT_STARTED) {
            this.props.hentNavKontor(this.props.person);
        }
    }

    componentDidUpdate(prevProps: Props) {
        if (this.props.person.fødselsnummer !== prevProps.person.fødselsnummer) {
            this.props.hentNavKontor(this.props.person);
        }
    }

    render() {
        return (
            <NavKontorSection aria-label="Nav kontor">
                <Normaltekst tag="h2"><Bold>NAV-kontor</Bold></Normaltekst>
                <Innholdslaster
                    avhengigheter={[this.props.navKontorReducer]}
                    spinnerSize={'S'}
                    returnOnError={onError}
                >
                    <NavKontorVisning
                        {...(this.props.navKontorReducer as Loaded<BrukersNavKontorResponse>).data}
                    />
                </Innholdslaster>
            </NavKontorSection>
        );
    }
}

const mapStateToProps = (state: AppState) => {
    return ({
        navKontorReducer: state.restEndepunkter.brukersNavKontor
    });
};

function mapDispatchToProps(dispatch: ThunkDispatch<AppState, undefined, AnyAction>): DispatchProps {
    return {
        hentNavKontor: (person: Person) => dispatch(hentNavKontor(person.geografiskTilknytning, person.diskresjonskode))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(NavKontorContainer);
