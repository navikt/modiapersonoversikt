import * as React from 'react';
import { connect } from 'react-redux';
import { Egenansatt } from '../../../../models/egenansatt';
import { AppState, RestReducer } from '../../../../redux/reducer';
import { Person, PersonRespons } from '../../../../models/person/person';
import Etiketter from './Etiketter';
import { Vergemal } from '../../../../models/vergemal/vergemal';

interface Props {
    egenAnsattReducer: RestReducer<Egenansatt>;
    personReducer: RestReducer<PersonRespons>;
    vergemalReducer: RestReducer<Vergemal>;
}

class EtiketterContainer extends React.Component<Props> {

    render() {
        return (
            <Etiketter
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