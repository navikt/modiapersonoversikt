import * as React from 'react';
import { connect } from 'react-redux';
import { Egenansatt } from '../../../../models/egenansatt';
import { AppState, Reducer } from '../../../../redux/reducer';
import { Person, PersonRespons } from '../../../../models/person/person';
import Etiketter from './Etiketter';
import { Vergemal } from '../../../../models/vergemal/vergemal';

interface Props {
    egenAnsattReducer: Reducer<Egenansatt>;
    personReducer: Reducer<PersonRespons>;
    vergemalReducer: Reducer<Vergemal>;
}

function EtikkerWrapper(props: { person?: Person, egenAnsatt?: Egenansatt, vergemal?: Vergemal }) {
    if ( !props.person) {
        return <p>Kunne ikke vise etiketter</p>;
    }
    return (
        <Etiketter
            person={props.person}
            egenAnsatt={props.egenAnsatt}
            vergemal={props.vergemal}
        />
    );
}

class EtiketterContainer extends React.Component<Props> {

    render() {
        return (
            <EtikkerWrapper
                person={this.props.personReducer.data as Person}
                egenAnsatt={this.props.egenAnsattReducer.data}
                vergemal={this.props.vergemalReducer.data}
            />
        );
    }
}

const mapStateToProps = (state: AppState) => {
    return ({
        egenAnsattReducer: state.egenAnsatt,
        personReducer: state.personinformasjon,
        vergemalReducer: state.vergemal
    });
};

export default connect(mapStateToProps, null)(EtiketterContainer);