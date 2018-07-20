import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import styled from 'styled-components';

import Undertekst from 'nav-frontend-typografi/lib/undertekst';

import { BrukersNavKontorResponse, NavKontor } from '../../../../../models/navkontor';
import { AppState } from '../../../../../redux/reducers';
import Innholdslaster from '../../../../../components/Innholdslaster';
import { Person } from '../../../../../models/person/person';
import { Action } from 'history';
import { hentNavKontor } from '../../../../../redux/restReducers/navkontor';
import { STATUS } from '../../../../../redux/restReducers/utils';
import { RestReducer } from '../../../../../redux/restReducers/restReducer';

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

const NavKontorDescriptionList = styled.dl`
  margin: initial;
  margin-left: 1em;
  display: flex;
  justify-content: flex-end;
  > * {
  white-space: nowrap;
  }
  dt:after {
    content: '/';
    margin: 0 0.2em;
  }
  dd {
    display: flex;
    align-items: center;
    margin: 0;
  }
`;

const onError = (
    <em>Problemer med å hente nav-enhet</em>
);

function NavKontorVisning(props: { navKontor: NavKontor | null}) {
    if (!props.navKontor) {
        return <>Ingen enhet</>;
    }

    return (
        <>
            {props.navKontor.enhetId} {props.navKontor.enhetNavn}
        </>
    );
}

class NavKontorContainer extends React.Component<Props> {

    componentDidMount() {
        if (this.props.navKontorReducer.status === STATUS.NOT_STARTED) {
            this.props.hentNavKontor(this.props.person);
        }
    }

    render() {
        return (
            <Undertekst tag="span">
                <NavKontorDescriptionList>
                    <dt>NAV-kontor</dt>
                    <dd>
                        <Innholdslaster
                            avhengigheter={[this.props.navKontorReducer]}
                            spinnerSize={'XXS'}
                            returnOnError={onError}
                        >
                            <NavKontorVisning navKontor={this.props.navKontorReducer.data.navKontor}/>
                        </Innholdslaster>
                    </dd>
                </NavKontorDescriptionList>
            </Undertekst>
        );
    }
}

const mapStateToProps = (state: AppState) => {
    return ({
        navKontorReducer: state.restEndepunkter.brukersNavKontor
    });
};

function mapDispatchToProps(dispatch: Dispatch<Action>): DispatchProps {
    return {
        hentNavKontor: (person: Person) => dispatch(hentNavKontor(person.geografiskTilknytning, person.diskresjonskode))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(NavKontorContainer);
