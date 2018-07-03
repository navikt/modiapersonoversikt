import * as React from 'react';
import { connect } from 'react-redux';

import Visittkort from './Visittkort';
import { AppState } from '../../../redux/reducer';
import { Person, PersonRespons } from '../../../models/person/person';

interface VisittkortContainerProps {
    personResponse: PersonRespons;
}

class VisittkortContainer extends React.Component<VisittkortContainerProps> {

    render() {
        return <Visittkort person={this.props.personResponse as Person}/>;
    }
}

const mapStateToProps = (state: AppState) => {
    return ({
        personResponse: state.personinformasjon.data
    });
};

export default connect(mapStateToProps, null)(VisittkortContainer);
