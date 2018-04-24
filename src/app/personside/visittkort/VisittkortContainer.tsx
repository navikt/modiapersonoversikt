import * as React from 'react';
import { connect } from 'react-redux';

import Visittkort from './Visittkort';
import { AppState } from '../../../redux/reducer';
import { Person } from '../../../models/person';
import {Egenansatt} from "../../../models/egenansatt";

interface VisittkortContainerProps {
    person: Person | undefined;
    egenAnsatt: Egenansatt | undefined;
}

class VisittkortContainer extends React.Component<VisittkortContainerProps> {

    render() {
        if (!this.props.person) {
            return <>Ingen person lastet</>;
        }

        return <Visittkort person={this.props.person}/>;
    }
}
const mapStateToProps = (state: AppState) => {
    return ({
        person: state.personinformasjon.data,
        egenAnsatt: state.egenAnsatt.data,
    });
};

export default connect(mapStateToProps, null)(VisittkortContainer);
