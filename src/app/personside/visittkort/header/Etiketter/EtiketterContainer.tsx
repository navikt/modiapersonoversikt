import * as React from 'react';
import { connect } from 'react-redux';
import { Egenansatt } from '../../../../../models/egenansatt';
import { AppState } from '../../../../../redux/reducers';
import { Person, PersonRespons } from '../../../../../models/person/person';
import { Vergemal } from '../../../../../models/vergemal/vergemal';
import { RestReducer } from '../../../../../redux/restReducers/restReducer';
import Etiketter from './Etiketter';

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
        egenAnsattReducer: state.restEndepunkter.egenAnsatt,
        personReducer: state.restEndepunkter.personinformasjon,
        vergemalReducer: state.restEndepunkter.vergemal
    });
};

export default connect(mapStateToProps, null)(EtiketterContainer);