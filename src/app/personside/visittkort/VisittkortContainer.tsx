import * as React from 'react';
import { connect } from 'react-redux';

import Visittkort from './Visittkort';
import { AppState } from '../../../redux/reducer';
import { PersonRespons, Person } from '../../../models/person/person';

interface VisittkortContainerProps {
    person: PersonRespons | undefined;
}

class VisittkortContainer extends React.Component<VisittkortContainerProps> {

    render() {
        if (!this.props.person) {
            return <>Ingen person lastet</>;
        }

        return <Visittkort person={this.props.person as Person}/>;
    }
}
const mapStateToProps = (state: AppState) => {
    return ({
        person: state.personinformasjon.data,
    });
};

export default connect(mapStateToProps, null)(VisittkortContainer);
