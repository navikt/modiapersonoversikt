import * as React from 'react';
import { connect } from 'react-redux';
import { Egenansatt } from '../../../../models/egenansatt';
import { AppState, Reducer } from '../../../../redux/reducer';
import { Person } from '../../../../models/person';
import Etiketter from './Etiketter';

interface Props {
    egenAnsattReducer: Reducer<Egenansatt>;
    personReducer: Reducer<Person>;
}

function EtikkerWrapper(props: { person?: Person, egenAnsatt?: Egenansatt }) {
    if ( !props.person) {
        return <p>Kunne ikke vise etiketter</p>;
    }
    return <Etiketter person={props.person} egenAnsatt={props.egenAnsatt}/>;
}

class EtiketterContainer extends React.Component<Props> {

    render() {
        console.log(this.props.personReducer);
        return (
            <EtikkerWrapper person={this.props.personReducer.data} egenAnsatt={this.props.egenAnsattReducer.data}/>
        );
    }
}

const mapStateToProps = (state: AppState) => {
    return ({
        egenAnsattReducer: state.egenAnsatt,
        personReducer: state.personinformasjon
    });
};

export default connect(mapStateToProps, null)(EtiketterContainer);