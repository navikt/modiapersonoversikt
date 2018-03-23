import * as React from 'react';
import { connect } from 'react-redux';
import Visittkort from './Visittkort';
import { AppState } from '../../redux/reducer';
import { Person } from '../../models/person';

interface VisittkortContainerProps {
    person: Person;
}

class VisittkortContainer extends React.Component<VisittkortContainerProps> {

    render() {
        return <Visittkort person={this.props.person}/>;
    }
}
const mapStateToProps = (state: AppState) => {
    return ({
        person: state.personinformasjon.data
    });
};

export default connect(mapStateToProps, null)(VisittkortContainer);